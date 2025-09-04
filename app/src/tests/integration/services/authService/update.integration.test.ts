
import { User } from "../../../../entities/User";
import { authRepository } from "../../../../repositories/authRepository";
import { update } from '../../../../services/authService';


// app/src/services/authService.update.spec.ts
// Manual mock for User class
const mockUser = {
  // Add methods if needed
} as unknown as jest.Mocked<User>;

// Manual mock for Auth class
class MockAuth {
  public token: string = '';
  public user: User = mockUser;
}

// Manual mock for IAuth interface
interface MockIAuth {
  token?: string;
  id?: number;
  user?: {
    id?: number;
  };
}

// Manual mock for authRepository
class MockauthRepository {
  public findOne = jest.fn();
  public save = jest.fn();
}
let mockauthRepository: MockauthRepository;

// Patch the imported authRepository with our mock
jest.mock("../../../../repositories/authRepository", () => ({
  authRepository: new (class {
    public findOne = jest.fn();
    public save = jest.fn();
  })(),
}));

// Import the patched authRepository
describe('update() update method', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Re-initialize the mock repository
    mockauthRepository = new MockauthRepository();
    // Patch the imported authRepository's methods with our mock's methods
    (authRepository.findOne as any) = jest.mocked(mockauthRepository.findOne);
    (authRepository.save as any) = jest.mocked(mockauthRepository.save);
  });

  // =========================
  // Happy Path Tests
  // =========================

  it('should update the token of an existing Auth and save it (happy path)', async () => {
    // This test ensures that the update function correctly updates the token and saves the Auth entity.

    const mockAuth: MockAuth = new MockAuth();
    mockAuth.token = 'oldToken';
    mockAuth.user = { id: 1 } as any;

    const mockIAuth: MockIAuth = {
      token: 'newToken',
      user: { id: 1 },
    };

    jest.mocked(authRepository.findOne).mockResolvedValue(mockAuth as any as never);
    jest.mocked(authRepository.save).mockResolvedValue({
      ...mockAuth,
      token: 'newToken',
    } as any as never);

    const result = await update(mockIAuth as any);

    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: 1 } },
    });
    expect(mockAuth.token).toBe('newToken');
    expect(jest.mocked(authRepository.save)).toHaveBeenCalledWith(mockAuth as any);
    expect(result.token).toBe('newToken');
  });

  it('should update the token when user.id is a different value', async () => {
    // This test checks that the function works for a different user id.

    const mockAuth: MockAuth = new MockAuth();
    mockAuth.token = 'oldToken';
    mockAuth.user = { id: 42 } as any;

    const mockIAuth: MockIAuth = {
      token: 'anotherToken',
      user: { id: 42 },
    };

    jest.mocked(authRepository.findOne).mockResolvedValue(mockAuth as any as never);
    jest.mocked(authRepository.save).mockResolvedValue({
      ...mockAuth,
      token: 'anotherToken',
    } as any as never);

    const result = await update(mockIAuth as any);

    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: 42 } },
    });
    expect(mockAuth.token).toBe('anotherToken');
    expect(jest.mocked(authRepository.save)).toHaveBeenCalledWith(mockAuth as any);
    expect(result.token).toBe('anotherToken');
  });

  it('should handle when token is an empty string', async () => {
    // This test ensures that the function can handle an empty string as a token.

    const mockAuth: MockAuth = new MockAuth();
    mockAuth.token = 'oldToken';
    mockAuth.user = { id: 7 } as any;

    const mockIAuth: MockIAuth = {
      token: '',
      user: { id: 7 },
    };

    jest.mocked(authRepository.findOne).mockResolvedValue(mockAuth as any as never);
    jest.mocked(authRepository.save).mockResolvedValue({
      ...mockAuth,
      token: '',
    } as any as never);

    const result = await update(mockIAuth as any);

    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: 7 } },
    });
    expect(mockAuth.token).toBe('');
    expect(jest.mocked(authRepository.save)).toHaveBeenCalledWith(mockAuth as any);
    expect(result.token).toBe('');
  });

  // =========================
  // Edge Case Tests
  // =========================

  it('should throw if authRepository.findOne returns undefined (no Auth found)', async () => {
    // This test checks that the function throws if no Auth entity is found for the user.

    const mockIAuth: MockIAuth = {
      token: 'token',
      user: { id: 99 },
    };

    jest.mocked(authRepository.findOne).mockResolvedValue(undefined as any as never);

    await expect(update(mockIAuth as any)).rejects.toThrow();
    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: 99 } },
    });
    expect(jest.mocked(authRepository.save)).not.toHaveBeenCalled();
  });

  it('should throw if auth.user is missing', async () => {
    // This test ensures that the function throws if the user property is missing from the input.

    const mockIAuth: MockIAuth = {
      token: 'token',
      // user is missing
    };

    // The function will try to access auth.user.id, which will be undefined
    // The repository will be called with { where: { user: { id: undefined } } }
    jest.mocked(authRepository.findOne).mockResolvedValue(undefined as any as never);

    await expect(update(mockIAuth as any)).rejects.toThrow();
    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: undefined } },
    });
    expect(jest.mocked(authRepository.save)).not.toHaveBeenCalled();
  });

  it('should throw if auth.user.id is missing', async () => {
    // This test ensures that the function throws if the user.id property is missing from the input.

    const mockIAuth: MockIAuth = {
      token: 'token',
      user: {
        // id is missing
      },
    };

    jest.mocked(authRepository.findOne).mockResolvedValue(undefined as any as never);

    await expect(update(mockIAuth as any)).rejects.toThrow();
    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: undefined } },
    });
    expect(jest.mocked(authRepository.save)).not.toHaveBeenCalled();
  });

  it('should throw if authRepository.save throws an error', async () => {
    // This test ensures that the function propagates errors from the save method.

    const mockAuth: MockAuth = new MockAuth();
    mockAuth.token = 'oldToken';
    mockAuth.user = { id: 5 } as any;

    const mockIAuth: MockIAuth = {
      token: 'token',
      user: { id: 5 },
    };

    jest.mocked(authRepository.findOne).mockResolvedValue(mockAuth as any as never);
    jest.mocked(authRepository.save).mockRejectedValue(new Error('Save failed') as never);

    await expect(update(mockIAuth as any)).rejects.toThrow('Save failed');
    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: 5 } },
    });
    expect(jest.mocked(authRepository.save)).toHaveBeenCalledWith(mockAuth as any);
  });

  it('should throw if authRepository.findOne throws an error', async () => {
    // This test ensures that the function propagates errors from the findOne method.

    const mockIAuth: MockIAuth = {
      token: 'token',
      user: { id: 123 },
    };

    jest.mocked(authRepository.findOne).mockRejectedValue(new Error('FindOne failed') as never);

    await expect(update(mockIAuth as any)).rejects.toThrow('FindOne failed');
    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: 123 } },
    });
    expect(jest.mocked(authRepository.save)).not.toHaveBeenCalled();
  });

  it('should handle when token is undefined', async () => {
    // This test ensures that the function can handle when the token is undefined.

    const mockAuth: MockAuth = new MockAuth();
    mockAuth.token = 'oldToken';
    mockAuth.user = { id: 8 } as any;

    const mockIAuth: MockIAuth = {
      // token is undefined
      user: { id: 8 },
    };

    jest.mocked(authRepository.findOne).mockResolvedValue(mockAuth as any as never);
    jest.mocked(authRepository.save).mockResolvedValue({
      ...mockAuth,
      token: undefined,
    } as any as never);

    const result = await update(mockIAuth as any);

    expect(jest.mocked(authRepository.findOne)).toHaveBeenCalledWith({
      where: { user: { id: 8 } },
    });
    expect(mockAuth.token).toBe(undefined as any);
    expect(jest.mocked(authRepository.save)).toHaveBeenCalledWith(mockAuth as any);
    expect(result.token).toBe(undefined as any);
  });
});
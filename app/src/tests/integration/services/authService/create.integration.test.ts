
import { authRepository } from "../../../../repositories/authRepository";
import { create } from '../../../../services/authService';


// app/src/services/authService.create.spec.ts
// Manual mocks for dependencies

// Mock for User class
const mockUser = {
  // Add methods as needed for future expansion
} as unknown as jest.Mocked<import('../../../../entities/User').User>;

// Mock for Auth class

// Manual mock interface for IAuth
interface MockIAuth {
  token?: string;
  id?: number;
  user?: typeof mockUser;
}

// Manual mock class for authRepository
class MockauthRepository {
  public save = jest.fn();
}

// Replace the actual authRepository with our mock
let mockauthRepository: MockauthRepository;


// Replace the actual authRepository with our mock in the module under test
jest.mock("../../../../repositories/authRepository", () => {
  // Singleton instance for test control
    return {
    authRepository: {} as any,
  };
  // const instance = new MockauthRepository();
  // return {
  //   authRepository: instance,
  // };
});
describe('create() create method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    beforeEach(() => {
      // Reset mock state before each test
      //jest.clearAllMocks();
      mockauthRepository = new MockauthRepository();
    // @ts-ignore
    // Patch the imported userRepository to use our mock
    const authRepoModule = require('../../../../repositories/authRepository');
    authRepoModule.authRepository = mockauthRepository as any;
  
    });

    it('should save a valid auth object with all properties and return the saved value', async () => {
      // This test ensures that a fully populated auth object is saved and returned as expected.
      const mockAuthObj: MockIAuth = {
        token: 'sometoken',
        id: 123,
        user: mockUser,
      };

      // Simulate repository returning the saved object
      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledTimes(1);
      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
      expect(result).toBe(mockAuthObj);
    });

    it('should save an auth object with only token property', async () => {
      // This test ensures that an auth object with only the token property is handled correctly.
      const mockAuthObj: MockIAuth = {
        token: 'tokenOnly',
      };

      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
      expect(result).toBe(mockAuthObj);
    });

    it('should save an auth object with only id property', async () => {
      // This test ensures that an auth object with only the id property is handled correctly.
      const mockAuthObj: MockIAuth = {
        id: 456,
      };

      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
      expect(result).toBe(mockAuthObj);
    });

    it('should save an auth object with only user property', async () => {
      // This test ensures that an auth object with only the user property is handled correctly.
      const mockAuthObj: MockIAuth = {
        user: mockUser,
      };

      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
      expect(result).toBe(mockAuthObj);
    });

    it('should save an empty auth object (no properties)', async () => {
      // This test ensures that an empty auth object is still passed to the repository and returned.
      const mockAuthObj: MockIAuth = {};

      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
      expect(result).toBe(mockAuthObj);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should propagate errors thrown by authRepository.save', async () => {
      // This test ensures that if the repository throws, the error is propagated.
      const mockAuthObj: MockIAuth = {
        token: 'errorToken',
      };
      const error = new Error('Save failed');

      jest.mocked((authRepository as any).save).mockRejectedValue(error as never);

      await expect(create(mockAuthObj as any)).rejects.toThrow('Save failed');
      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
    });

    it('should handle auth object with unusual property values (empty string, zero)', async () => {
      // This test ensures that edge values like empty string and zero are handled.
      const mockAuthObj: MockIAuth = {
        token: '',
        id: 0,
        user: mockUser,
      };

      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);+
      expect(result).toBe(mockAuthObj);
    });

    it('should handle auth object with a user object that has no methods', async () => {
      // This test ensures that a user object with no methods does not cause issues.
      const minimalUser = {} as unknown as jest.Mocked<import('../../../../entities/User').User>;
      const mockAuthObj: MockIAuth = {
        user: minimalUser,
      };

      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
      expect(result).toBe(mockAuthObj);
    });

    it('should handle auth object with extra unexpected properties', async () => {
      // This test ensures that extra properties are passed through to the repository.
      const mockAuthObj: MockIAuth & { extra: string } = {
        token: 'token',
        extra: 'unexpected',
      };

      jest.mocked((authRepository as any).save).mockResolvedValue(mockAuthObj as any as never);

      const result = await create(mockAuthObj as any);

      expect(authRepository.save).toHaveBeenCalledWith(mockAuthObj as any);
      expect(result).toBe(mockAuthObj);
    });
  });
});
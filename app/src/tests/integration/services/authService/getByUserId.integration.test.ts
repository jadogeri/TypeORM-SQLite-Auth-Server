
import { getByUserId } from '../../../../services/authService';


// app/src/services/authService.getByUserId.spec.ts
// Manual mocks for dependencies
class MockUser {
  public id: number = 1;
  public name: string = 'Test User';
}

class MockAuth {
  public id: number = 10;
  public token: string = 'mock-token';
  public user: MockUser = new MockUser();
}


// Manual mock for AppDataSource and its repository
class MockRepository {
  public findOne = jest.fn();
}

class MockAppDataSource {
  public static getRepository = jest.fn();
}

// Patch the actual AppDataSource.getRepository to use our mock
jest.mock("../../data-source", () => ({
  AppDataSource: MockAppDataSource,
}));

// Patch the actual Auth entity import to use our mock
jest.mock("../../entities/Auth", () => ({
  Auth: MockAuth,
}));

// Patch the actual User entity import to use our mock
jest.mock("../../entities/User", () => ({
  User: MockUser,
}));

describe('getByUserId() getByUserId method', () => {
  let mockRepository: MockRepository;

  beforeEach(() => {
    mockRepository = new MockRepository();
    // Always return our mock repository when getRepository is called
    jest.mocked(MockAppDataSource.getRepository).mockReturnValue(mockRepository as any);
  });

  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should return an Auth object when a valid userId exists', async () => {
      // This test ensures that getByUserId returns the expected Auth object for a valid userId.
      const expectedAuth = new MockAuth();
      jest.mocked(mockRepository.findOne).mockResolvedValue(expectedAuth as any);

      const result = await getByUserId(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
      expect(result).toBe(expectedAuth);
    });

    it('should return an Auth object with correct user data', async () => {
      // This test ensures that the returned Auth object contains the correct user data.
      const expectedAuth = new MockAuth();
      expectedAuth.user = new MockUser();
      expectedAuth.user.id = 42;
      expectedAuth.user.name = 'Alice';
      jest.mocked(mockRepository.findOne).mockResolvedValue(expectedAuth as any);

      const result = await getByUserId(42);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 42 } },
      });
      expect(result?.user?.id).toBe(42);
      expect(result?.user?.name).toBe('Alice');
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return null when no Auth record is found for the userId', async () => {
      // This test ensures that getByUserId returns null when no record is found.
      jest.mocked(mockRepository.findOne).mockResolvedValue(null as any);

      const result = await getByUserId(999);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 999 } },
      });
      expect(result).toBeNull();
    });

    it('should handle userId as zero', async () => {
      // This test ensures that getByUserId works when userId is zero.
      const expectedAuth = new MockAuth();
      expectedAuth.user.id = 0;
      jest.mocked(mockRepository.findOne).mockResolvedValue(expectedAuth as any);

      const result = await getByUserId(0);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 0 } },
      });
      expect(result?.user?.id).toBe(0);
    });

    it('should handle userId as a large number', async () => {
      // This test ensures that getByUserId works with a very large userId.
      const largeId = Number.MAX_SAFE_INTEGER;
      const expectedAuth = new MockAuth();
      expectedAuth.user.id = largeId;
      jest.mocked(mockRepository.findOne).mockResolvedValue(expectedAuth as any);

      const result = await getByUserId(largeId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: largeId } },
      });
      expect(result?.user?.id).toBe(largeId);
    });

    it('should throw an error if the repository throws', async () => {
      // This test ensures that getByUserId propagates errors from the repository.
      const error = new Error('Database failure');
      jest.mocked(mockRepository.findOne).mockRejectedValue(error as never);

      await expect(getByUserId(1)).rejects.toThrow('Database failure');
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
    });

    it('should handle userId as a negative number', async () => {
      // This test ensures that getByUserId works with a negative userId.
      const expectedAuth = new MockAuth();
      expectedAuth.user.id = -5;
      jest.mocked(mockRepository.findOne).mockResolvedValue(expectedAuth as any);

      const result = await getByUserId(-5);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: -5 } },
      });
      expect(result?.user?.id).toBe(-5);
    });
  });
});
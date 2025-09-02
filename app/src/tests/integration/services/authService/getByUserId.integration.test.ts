
import { getByUserId } from '../../../../services/authService';



// Manual mock for User entity
class MockUser {
  public id: number = 1;
  public name: string = 'Test User';
}

// Manual mock for Auth entity
class MockAuth {
  public id: number = 10;
  public token: string = 'mock-token';
  public user: MockUser = new MockUser();
}

// Manual mock for authRepository
class MockauthRepository {
  public findOne = jest.fn();
}

// Replace the actual userRepository with our mock
let mockauthRepository: MockauthRepository;

// // Replace the actual authRepository with our manual mock
// jest.mock("../../../../repositories/authRepository", () => ({
//   authRepository: new MockauthRepository() as any,
// }));

 // Replace the actual authRepository with our manual mock
    jest.mock("../../../../repositories/authRepository", () => ({
      authRepository: {} as any,
    }));

// Import the mocked authRepository for type assertion and spying
describe('getByUserId() getByUserId method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    beforeEach(() => {
  mockauthRepository = new MockauthRepository();
  // @ts-ignore
  // Patch the imported userRepository to use our mock
  const authRepoModule = require('../../../../repositories/authRepository');
  authRepoModule.authRepository = mockauthRepository as any;

      //jest.clearAllMocks();   

    });

    it('should return an Auth object when a valid userId is provided and record exists', async () => {
      // This test ensures that a valid userId returns the expected Auth object.
      const mockAuth = new MockAuth() as any;
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByUserId(1);

      expect(mockauthRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
      expect(result).toBe(mockAuth);
    });

    it('should return an Auth object with correct nested user when userId matches', async () => {
      // This test ensures that the returned Auth object contains the correct nested user.
      const mockUser = new MockUser() as any;
      const mockAuth = {
        id: 20,
        token: 'another-token',
        user: mockUser,
      } as any;
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByUserId(mockUser.id);

      expect(mockauthRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: mockUser.id } },
      });
      expect(result).toBe(mockAuth);
      expect(result?.user).toBe(mockUser);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return null when no Auth record is found for the given userId', async () => {
      // This test ensures that the function returns null when no record is found.
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(null as any);

      const result = await getByUserId(999);

      expect(mockauthRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 999 } },
      });
      expect(result).toBeNull();
    });

    test('should throw an error if the repository throws an error', async () => {
      // This test ensures that errors from the repository are propagated.
      const error = new Error('Database failure');
      jest.mocked(mockauthRepository.findOne).mockRejectedValue(error as never);

      await expect(getByUserId(1)).rejects.toThrow('Database failure');
      expect(mockauthRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
    });

    it('should handle edge userId values (e.g., 0)', async () => {
      // This test ensures that edge userId values are handled correctly.
      const mockAuth = new MockAuth() as any;
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByUserId(0);

      expect(mockauthRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 0 } },
      });
      expect(result).toBe(mockAuth);
    });

    it('should handle large userId values', async () => {
      // This test ensures that very large userId values are handled correctly.
      const largeUserId = Number.MAX_SAFE_INTEGER;
      const mockAuth = new MockAuth() as any;
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByUserId(largeUserId);

      expect(mockauthRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: largeUserId } },
      });
      expect(result).toBe(mockAuth);
    });

    it('should handle negative userId values', async () => {
      // This test ensures that negative userId values are handled correctly.
      const negativeUserId = -5;
      const mockAuth = new MockAuth() as any;
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByUserId(negativeUserId);

      expect(mockauthRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: negativeUserId } },
      });
      expect(result).toBe(mockAuth);
    });
  });
});

import { authRepository } from "../../../../repositories/authRepository";
import { getByToken } from '../../../../services/authService';



// Manual mock for User entity
class MockUser {
  public id: number = 1;
  public name: string = 'Test User';
}

// Manual mock for Auth entity
class MockAuth {
  public token: string = 'valid-token';
  public id: number = 123;
  public user: MockUser = new MockUser();
}

// Manual mock for authRepository
class MockauthRepository {
  public findOne = jest.fn();
}

// Replace the actual userRepository with our mock
let mockauthRepository: MockauthRepository;


// Replace the actual authRepository with our manual mock
// jest.mock("../../../../repositories/authRepository", () => {
//   return {
//     authRepository: new MockauthRepository() as any,
//   };
// });


// Replace the actual authRepository with our manual mock
jest.mock("../../../../repositories/authRepository", () => {
  return {
    authRepository: {} as any,
  };
});
describe('getByToken() getByToken method', () => {
  // Happy Paths
  describe('Happy paths', () => {
    // beforeEach(() => {
    //   jest.clearAllMocks();
    // });
    beforeEach(() => {
  mockauthRepository = new MockauthRepository();
  // @ts-ignore
  // Patch the imported userRepository to use our mock
  const authRepoModule = require('../../../../repositories/authRepository');
  authRepoModule.authRepository = mockauthRepository as any;

      //jest.clearAllMocks();   

    });

    it('should return an Auth object when a valid token is provided', async () => {
      // This test ensures that getByToken returns the expected Auth object for a valid token.
      const mockAuth: MockAuth = new MockAuth();
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByToken('valid-token');
      expect(mockauthRepository.findOne).toHaveBeenCalledWith({ where: { token: 'valid-token' } });
      expect(result).toEqual(mockAuth as any);
    });

    it('should return an Auth object with all properties populated', async () => {
      // This test ensures that getByToken returns an Auth object with all expected properties.
      const mockUser: MockUser = new MockUser();
      const mockAuth: MockAuth = new MockAuth();
      mockAuth.user = mockUser;
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByToken('valid-token');
      expect(result?.token).toBe('valid-token');
      expect(result?.id).toBe(123);
      expect(result?.user).toEqual(mockUser);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return null when no Auth object is found for the token', async () => {
      // This test ensures that getByToken returns null when the token does not exist.
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(null as any);

      const result = await getByToken('non-existent-token');
      expect(authRepository.findOne).toHaveBeenCalledWith({ where: { token: 'non-existent-token' } });
      expect(result).toBeNull();
    });

    it('should handle empty string token and return null', async () => {
      // This test ensures that getByToken returns null when an empty string is provided as token.
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(null as any);

      const result = await getByToken('');
      expect(mockauthRepository.findOne).toHaveBeenCalledWith({ where: { token: '' } });
      expect(result).toBeNull();
    });

    it('should handle token with special characters', async () => {
      // This test ensures that getByToken can handle tokens with special characters.
      const specialToken = '!@#$%^&*()_+';
      const mockAuth: MockAuth = new MockAuth();
      mockAuth.token = specialToken;
      jest.mocked(mockauthRepository.findOne).mockResolvedValue(mockAuth as any);

      const result = await getByToken(specialToken);
      expect(mockauthRepository.findOne).toHaveBeenCalledWith({ where: { token: specialToken } });
      expect(result?.token).toBe(specialToken);
    });

    it('should propagate errors thrown by authRepository.findOne', async () => {
      // This test ensures that getByToken propagates errors from the repository.
      const error = new Error('Database error');
      jest.mocked(mockauthRepository.findOne).mockRejectedValue(error as never);

      await expect(getByToken('any-token')).rejects.toThrow('Database error');
      expect(mockauthRepository.findOne).toHaveBeenCalledWith({ where: { token: 'any-token' } });
    });
  });
});

import { getByToken } from '../../../../services/authService';


// app/src/services/authService.getByToken.spec.ts
// Manual mock for IAuth interface
interface MockIAuth {
  token?: string;
  id?: number;
  user?: MockUser;
}

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

// Manual mock for Repository
class MockRepository {
  public findOneBy = jest.fn();
}

// Manual mock for AppDataSource
class MockAppDataSource {
  public getRepository = jest.fn();
}

// Helper to reset all mocks before each test
function setupMockAppDataSourceWithRepository(mockFindOneByImpl: any) {
  const mockRepository = new MockRepository();
  jest.mocked(mockRepository.findOneBy).mockImplementation(mockFindOneByImpl);
  const mockAppDataSource = new MockAppDataSource();
  jest.mocked(mockAppDataSource.getRepository).mockReturnValue(mockRepository as any);
  return { mockAppDataSource, mockRepository };
}

// Patch the internal AppDataSource used in authService
jest.mock("../../data-source", () => {
  // Will be replaced in each test
  return {
    AppDataSource: new MockAppDataSource() as any,
  };
});

describe('getByToken() getByToken method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should return an Auth object when a valid token is provided', async () => {
      // This test ensures that getByToken returns the expected Auth object for a valid token.
      const expectedAuth = new MockAuth();
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockResolvedValue(expectedAuth as any)
      );

      // Patch AppDataSource.getRepository to return our mockRepository
      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      const result = await getByToken('valid-token');
      expect(result).toEqual(expectedAuth as any);
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: 'valid-token' });
    });

    it('should return an Auth object with all properties populated', async () => {
      // This test ensures that getByToken returns an Auth object with all expected properties.
      const expectedAuth: MockIAuth = {
        token: 'full-token',
        id: 999,
        user: new MockUser(),
      };
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockResolvedValue(expectedAuth as any)
      );

      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      const result = await getByToken('full-token');
      expect(result).toEqual(expectedAuth as any);
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: 'full-token' });
    });

    it('should call findOneBy with the correct token value', async () => {
      // This test ensures that the repository's findOneBy method is called with the correct token.
      const expectedAuth = new MockAuth();
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockResolvedValue(expectedAuth as any)
      );

      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      await getByToken('expected-token');
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: 'expected-token' });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return null when no Auth object is found for the token', async () => {
      // This test ensures that getByToken returns null when the token does not exist.
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockResolvedValue(null as any)
      );

      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      const result = await getByToken('non-existent-token');
      expect(result).toBeNull();
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: 'non-existent-token' });
    });

    it('should handle empty string token and return null', async () => {
      // This test ensures that getByToken handles an empty string token gracefully.
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockResolvedValue(null as any)
      );

      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      const result = await getByToken('');
      expect(result).toBeNull();
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: '' });
    });

    it('should handle tokens with special characters', async () => {
      // This test ensures that getByToken works with tokens containing special characters.
      const specialToken = '!@#$%^&*()_+-=';
      const expectedAuth = new MockAuth();
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockResolvedValue(expectedAuth as any)
      );

      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      const result = await getByToken(specialToken);
      expect(result).toEqual(expectedAuth as any);
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: specialToken });
    });

    it('should propagate errors thrown by the repository', async () => {
      // This test ensures that getByToken propagates errors from the repository.
      const error = new Error('Database error');
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockRejectedValue(error as never)
      );

      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      await expect(getByToken('error-token')).rejects.toThrow('Database error');
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: 'error-token' });
    });

    it('should handle very long token strings', async () => {
      // This test ensures that getByToken can handle very long token strings.
      const longToken = 'a'.repeat(1000);
      const expectedAuth = new MockAuth();
      const { mockRepository } = setupMockAppDataSourceWithRepository(
        jest.fn().mockResolvedValue(expectedAuth as any)
      );

      (require('../data-source').AppDataSource.getRepository as any) = jest.fn().mockReturnValue(mockRepository as any);

      const result = await getByToken(longToken);
      expect(result).toEqual(expectedAuth as any);
      expect(jest.mocked(mockRepository.findOneBy)).toHaveBeenCalledWith({ token: longToken });
    });
  });
});
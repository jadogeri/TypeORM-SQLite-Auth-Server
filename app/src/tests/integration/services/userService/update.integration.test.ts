
import { User } from "../../../../entities/User";
import { update } from '../../../../services/userService';


// app/src/services/userService.update.spec.ts
// Manual mock for userRepository
class MockuserRepository {
  public save = jest.fn();
}

// Manual mock for User class
const mockUser = {
  _id: '123',
  username: 'testuser',
  email: 'test@example.com',
  password: 'securepassword',
  phone: '1234567890',
  isEnabled: true,
  failedLogins: 0,
} as unknown as jest.Mocked<User>;

// Replace the actual userRepository with our mock
let mockuserRepository: MockuserRepository;

jest.mock("../../../../repositories/userRepository", () => ({
  userRepository: {} as any,
}));

// Patch the imported userRepository to use our mock before each test
beforeEach(() => {
  mockuserRepository = new MockuserRepository();
  // @ts-ignore
  // Patch the imported userRepository to use our mock
  const userRepoModule = require('../../../../repositories/userRepository');
  userRepoModule.userRepository = mockuserRepository as any;
});

describe('update() update method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should update an existing user and return the updated user', async () => {
      // This test ensures that update returns the updated user when save succeeds.
      jest.mocked(mockuserRepository.save).mockResolvedValue({
        ...mockUser,
        username: 'updateduser',
      } as any as never);

      const result = await update(mockUser as any);

      expect(mockuserRepository.save).toHaveBeenCalledWith(mockUser as any);
      expect(result).toMatchObject({
        _id: '123',
        username: 'updateduser',
      });
    });

    it('should create a new user if user does not exist', async () => {
      // This test ensures that update returns the created user when save is called for a new user.
      const newUser = {
        _id: '456',
        username: 'newuser',
        email: 'new@example.com',
        password: 'newpassword',
        phone: '0987654321',
        isEnabled: true,
        failedLogins: 0,
      } as unknown as jest.Mocked<User>;

      jest.mocked(mockuserRepository.save).mockResolvedValue(newUser as any as never);

      const result = await update(newUser as any);

      expect(mockuserRepository.save).toHaveBeenCalledWith(newUser as any);
      expect(result).toMatchObject({
        _id: '456',
        username: 'newuser',
      });
    });

    it('should update user with minimal required fields', async () => {
      // This test ensures that update works with minimal user data.
      const minimalUser = {
        _id: '789',
        username: 'minimal',
      } as unknown as jest.Mocked<User>;

      jest.mocked(mockuserRepository.save).mockResolvedValue(minimalUser as any as never);

      const result = await update(minimalUser as any);

      expect(mockuserRepository.save).toHaveBeenCalledWith(minimalUser as any);
      expect(result).toMatchObject({
        _id: '789',
        username: 'minimal',
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle user with all optional fields missing', async () => {
      // This test ensures that update works when optional fields are missing.
      const userWithMissingFields = {
        _id: '101',
      } as unknown as jest.Mocked<User>;

      jest.mocked(mockuserRepository.save).mockResolvedValue(userWithMissingFields as any as never);

      const result = await update(userWithMissingFields as any);

      expect(mockuserRepository.save).toHaveBeenCalledWith(userWithMissingFields as any);
      expect(result).toMatchObject({
        _id: '101',
      });
    });

    it('should handle user with edge values for fields', async () => {
      // This test ensures that update works with edge values for fields.
      const edgeUser = {
        _id: '202',
        username: '',
        email: '',
        password: '',
        phone: '',
        isEnabled: false,
        failedLogins: Number.MAX_SAFE_INTEGER,
      } as unknown as jest.Mocked<User>;

      jest.mocked(mockuserRepository.save).mockResolvedValue(edgeUser as any as never);

      const result = await update(edgeUser as any);

      expect(mockuserRepository.save).toHaveBeenCalledWith(edgeUser as any);
      expect(result).toMatchObject({
        _id: '202',
        username: '',
        email: '',
        password: '',
        phone: '',
        isEnabled: false,
        failedLogins: Number.MAX_SAFE_INTEGER,
      });
    });

    it('should propagate errors thrown by userRepository.save', async () => {
      // This test ensures that update propagates errors from userRepository.save.
      const error = new Error('Database error');
      jest.mocked(mockuserRepository.save).mockRejectedValue(error as never);

      await expect(update(mockUser as any)).rejects.toThrow('Database error');
      expect(mockuserRepository.save).toHaveBeenCalledWith(mockUser as any);
    });

    it('should handle user with very large string fields', async () => {
      // This test ensures that update works with very large string values.
      const largeString = 'a'.repeat(10000);
      const largeUser = {
        _id: '303',
        username: largeString,
        email: largeString,
        password: largeString,
        phone: largeString,
        isEnabled: true,
        failedLogins: 0,
      } as unknown as jest.Mocked<User>;

      jest.mocked(mockuserRepository.save).mockResolvedValue(largeUser as any as never);

      const result = await update(largeUser as any);

      expect(mockuserRepository.save).toHaveBeenCalledWith(largeUser as any);
      expect(result).toMatchObject({
        _id: '303',
        username: largeString,
        email: largeString,
        password: largeString,
        phone: largeString,
        isEnabled: true,
        failedLogins: 0,
      });
    });

    it('should handle user with failedLogins set to zero', async () => {
      // This test ensures that update works when failedLogins is zero.
      const zeroFailedLoginsUser = {
        _id: '404',
        username: 'zero',
        failedLogins: 0,
      } as unknown as jest.Mocked<User>;

      jest.mocked(mockuserRepository.save).mockResolvedValue(zeroFailedLoginsUser as any as never);

      const result = await update(zeroFailedLoginsUser as any);

      expect(mockuserRepository.save).toHaveBeenCalledWith(zeroFailedLoginsUser as any);
      expect(result).toMatchObject({
        _id: '404',
        username: 'zero',
        failedLogins: 0,
      });
    });
  });
});
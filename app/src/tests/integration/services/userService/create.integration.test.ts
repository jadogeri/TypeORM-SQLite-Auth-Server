
import { User } from "../../../../entities";
import { IUser } from "../../../../interfaces/IUser";
import { create } from '../../../../services/userService';


// app/src/services/userService.create.spec.ts
// Mock for userRepository
class MockuserRepository {
  public save = jest.fn();
}
// Save original userRepository to restore after tests
const originalUserRepository = jest.requireActual("../../../../repositories/userRepository").userRepository;

// Replace userRepository with our mock
// jest.mock("../../../../repositories/userRepository", () => {
//   return {
//     userRepository: new MockuserRepository() as any,
//   };
// });

describe('create() create method', () => {
  let mockUserRepository: MockuserRepository;

  beforeEach(() => {
    // Re-initialize the mock before each test
    mockUserRepository = new MockuserRepository();
    // Replace the userRepository in the module with our fresh mock
    (require('../../../../repositories/userRepository').userRepository as any) = mockUserRepository as any;
  });

  afterAll(() => {
    // Restore the original userRepository after all tests
    (require('../../../../repositories/userRepository').userRepository as any) = originalUserRepository as any;
  });

  // Happy Path Tests
  describe('Happy Paths', () => {
    test('should create a user with all fields provided', async () => {
      // This test ensures that a user with all fields is created successfully.
      const inputUser: IUser = {
        id: 1,
        email: 'test@example.com',
        password: 'securepassword',
        username: 'testuser',
        phone: '1234567890',
        isEnabled: true,
        failedLogins: 0,
      };

      const createdUser = {
        ...inputUser,
        createdAt: new Date(),
      };

      jest.mocked(mockUserRepository.save).mockResolvedValue(createdUser as any);

      const result = await create(inputUser as any);

      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
      expect(result).toEqual(createdUser);
    });

    test('should create a user with only required fields', async () => {
      // This test ensures that a user with only required fields is created successfully.
      const inputUser: IUser = {
        email: 'minimal@example.com',
        password: 'minpass',
      };

      const createdUser = {
        ...inputUser,
        id: 2,
        createdAt: new Date(),
      };

      jest.mocked(mockUserRepository.save).mockResolvedValue(createdUser as any);

      const result = await create(inputUser as any);

      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
      expect(result).toEqual(createdUser);
    });

    test('should create a user with optional fields omitted', async () => {
      // This test ensures that a user is created even if optional fields are omitted.
      const inputUser: IUser = {
        email: 'optional@example.com',
        password: 'optionalpass',
        username: 'optionaluser',
      };

      const createdUser = {
        ...inputUser,
        id: 3,
        createdAt: new Date(),
      };

      jest.mocked(mockUserRepository.save).mockResolvedValue(createdUser as any);

      const result = await create(inputUser as any);

      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
      expect(result).toEqual(createdUser);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should handle user creation when failedLogins is a large number', async () => {
      // This test ensures that a user with a large failedLogins value is handled correctly.
      const inputUser: IUser = {
        email: 'edge@example.com',
        password: 'edgepass',
        failedLogins: Number.MAX_SAFE_INTEGER,
      };

      const createdUser = {
        ...inputUser,
        id: 4,
        createdAt: new Date(),
      };

      jest.mocked(mockUserRepository.save).mockResolvedValue(createdUser as any);

      const result = await create(inputUser as any);

      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
      expect(result).toEqual(createdUser);
    });

    test('should handle user creation when isEnabled is false', async () => {
      // This test ensures that a user with isEnabled set to false is handled correctly.
      const inputUser: IUser = {
        email: 'disabled@example.com',
        password: 'disabledpass',
        isEnabled: false,
      };

      const createdUser = {
        ...inputUser,
        id: 5,
        createdAt: new Date(),
      };

      jest.mocked(mockUserRepository.save).mockResolvedValue(createdUser as any);

      const result = await create(inputUser as any);

      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
      expect(result).toEqual(createdUser);
    });

    test('should throw an error if userRepository.save rejects', async () => {
      // This test ensures that an error is thrown if userRepository.save fails.
      const inputUser: IUser = {
        email: 'error@example.com',
        password: 'errorpass',
      };

      const error = new Error('Database error');

      jest.mocked(mockUserRepository.save).mockRejectedValue(error as never);

      await expect(create(inputUser as any)).rejects.toThrow('Database error');
      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
    });

    test('should handle user creation with empty string fields', async () => {
      // This test ensures that a user with empty string fields is handled correctly.
      const inputUser: IUser = {
        email: '',
        password: '',
        username: '',
        phone: '',
      };

      const createdUser = {
        ...inputUser,
        id: 6,
        createdAt: new Date(),
      };

      jest.mocked(mockUserRepository.save).mockResolvedValue(createdUser as any);

      const result = await create(inputUser as any);

      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
      expect(result).toEqual(createdUser);
    });

    test('should handle user creation with zero failedLogins', async () => {
      // This test ensures that a user with failedLogins set to zero is handled correctly.
      const inputUser: IUser = {
        email: 'zero@example.com',
        password: 'zeropass',
        failedLogins: 0,
      };

      const createdUser = {
        ...inputUser,
        id: 7,
        createdAt: new Date(),
      };

      jest.mocked(mockUserRepository.save).mockResolvedValue(createdUser as any);

      const result = await create(inputUser as any);

      expect(mockUserRepository.save).toHaveBeenCalledWith(inputUser as any);
      expect(result).toEqual(createdUser);
    });
  });
});
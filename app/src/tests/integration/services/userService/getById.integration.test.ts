
import { getById } from '../../../../services/userService';
import { User } from "../../../../entities/User";


// Mock implementation of userRepository
class MockuserRepository {
  public findOne = jest.fn();
}
// Manual mock for User class
const mockUser = {
  id: 123,
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
describe('getById() getById method', () => {

  // Patch the actual userRepository import in the module under test
  beforeAll(() => {
    // jest.resetModules();
    // jest.doMock('../../../../repositories/userRepository', () => ({
    //   userRepository: new MockuserRepository() as any,
    // }));


  });

  beforeEach(() => {
    // mockuserRepository = new MockuserRepository() as any;
    // // Re-assign the mock to the module's userRepository
    // jest.resetModules();
    // jest.doMock('../../../../repositories/userRepository', () => ({
    //   userRepository: mockuserRepository as any,
    // }));
      mockuserRepository = new MockuserRepository();
  // @ts-ignore
  // Patch the imported userRepository to use our mock
  const userRepoModule = require('../../../../repositories/userRepository');
  userRepoModule.userRepository = mockuserRepository as any;
  });

  // Happy Path Tests
  describe('Happy Paths', () => {
    test('should return a User when a valid userId exists', async () => {
      // This test checks that getById returns a User object for a valid userId.
      jest.mocked(mockuserRepository.findOne).mockResolvedValue(mockUser as any);

      const result = await getById(1);

      expect(mockuserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser as any);
    });

    test('should return a User with all properties populated', async () => {
      // This test ensures that all expected User properties are present in the returned object.
      // const mockUser = new MockUser();
      jest.mocked(mockuserRepository.findOne).mockResolvedValue(mockUser as any);

      const result = await getById(1);

      expect(result).toHaveProperty('id', 123);
      expect(result).toHaveProperty('username', 'testuser');
      expect(result).toHaveProperty('email', 'test@example.com');
      expect(result).toHaveProperty('password', 'securepassword');
      expect(result).toHaveProperty('phone', '1234567890');
      expect(result).toHaveProperty('isEnabled', true);
      expect(result).toHaveProperty('failedLogins', 0);
    });

    test('should call findOne with correct where clause', async () => {
      // This test verifies that findOne is called with the correct query object.
      // const mockUser = new MockUser();
      jest.mocked(mockuserRepository.findOne).mockResolvedValue(mockUser as any);

      await getById(42);

      expect(mockuserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 42 },
      });
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return null when no user is found for the given userId', async () => {
      // This test checks that getById returns null if the user does not exist.
      jest.mocked(mockuserRepository.findOne).mockResolvedValue(null as any);

      const result = await getById(999);

      expect(mockuserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
      expect(result).toBeNull();
    });

    it('should handle userId as zero', async () => {
      // This test checks behavior when userId is zero (boundary value).
      jest.mocked(mockuserRepository.findOne).mockResolvedValue(null as any);

      const result = await getById(0);

      expect(mockuserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 0 },
      });
      expect(result).toBeNull();
    });

    it('should handle negative userId', async () => {
      // This test checks behavior when userId is negative (boundary value).
      jest.mocked(mockuserRepository.findOne).mockResolvedValue(null as any);

      const result = await getById(-1);

      expect(mockuserRepository.findOne).toHaveBeenCalledWith({
        where: { id: -1 },
      });
      expect(result).toBeNull();
    });

    it('should propagate errors thrown by userRepository.findOne', async () => {
      // This test ensures that errors from findOne are propagated.
      const error = new Error('Database error');
      jest.mocked(mockuserRepository.findOne).mockRejectedValue(error as never);

      await expect(getById(1)).rejects.toThrow('Database error');
      expect(mockuserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should handle userId as a very large number', async () => {
      // This test checks behavior for a very large userId value.
      jest.mocked(mockuserRepository.findOne).mockResolvedValue(null as any);

      const largeId = Number.MAX_SAFE_INTEGER;
      const result = await getById(largeId);

      expect(mockuserRepository.findOne).toHaveBeenCalledWith({
        where: { id: largeId },
      });
      expect(result).toBeNull();
    });
  });
});
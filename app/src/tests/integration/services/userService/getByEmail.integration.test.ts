
import { User } from "../../../../entities/User";
import { getByEmail } from '../../../../services/userService';


// Custom mock for userRepository
class MockuserRepository {
  public findOneBy = jest.fn();
}

// Helper: create a mock User object
function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    password: 'hashedpassword',
    phone: '1234567890',
    isEnabled: true,
    failedLogins: 0,
    ...overrides,
  } as any;
}

// Save original userRepository to restore after tests
const originalUserRepository = jest.requireActual("../../../../repositories/userRepository").userRepository;

describe('getByEmail() getByEmail method', () => {
  let mockuserRepository: MockuserRepository;

  beforeEach(() => {
    // Setup a fresh mock before each test
    mockuserRepository = new MockuserRepository();
    // Replace the actual userRepository with our mock
    (require('../../../../repositories/userRepository').userRepository as any) = mockuserRepository as any;
  });

  afterEach(() => {
    // Restore the original userRepository after each test
    (require('../../../../repositories/userRepository').userRepository as any) = originalUserRepository as any;
    jest.clearAllMocks();
  });

  // --- Happy Path Tests ---

  it('should return a user when a user with the given email exists', async () => {
    // This test verifies that getByEmail returns the correct user when found.
    const expectedUser = createMockUser();
    jest.mocked(mockuserRepository.findOneBy).mockResolvedValue(expectedUser as any);

    const result = await getByEmail('test@example.com');
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(result).toEqual(expectedUser);
  });

  it('should return a user with different properties when found', async () => {
    // This test checks that getByEmail works for users with different property values.
    const expectedUser = createMockUser({
      id: 2,
      email: 'another@example.com',
      username: 'anotheruser',
      isEnabled: false,
      failedLogins: 3,
    });
    jest.mocked(mockuserRepository.findOneBy).mockResolvedValue(expectedUser as any);

    const result = await getByEmail('another@example.com');
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: 'another@example.com' });
    expect(result).toEqual(expectedUser);
  });

  // --- Edge Case Tests ---

  it('should return null when no user with the given email exists', async () => {
    // This test ensures getByEmail returns null if no user is found.
    jest.mocked(mockuserRepository.findOneBy).mockResolvedValue(null as any);

    const result = await getByEmail('notfound@example.com');
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: 'notfound@example.com' });
    expect(result).toBeNull();
  });

  it('should handle emails with unusual formats', async () => {
    // This test checks that getByEmail can handle emails with special characters.
    const specialEmail = 'user+tag@sub.domain.com';
    const expectedUser = createMockUser({ email: specialEmail });
    jest.mocked(mockuserRepository.findOneBy).mockResolvedValue(expectedUser as any);

    const result = await getByEmail(specialEmail);
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: specialEmail });
    expect(result).toEqual(expectedUser);
  });

  it('should throw an error if userRepository.findOneBy throws', async () => {
    // This test verifies that getByEmail propagates errors from the repository.
    const error = new Error('Database failure');
    jest.mocked(mockuserRepository.findOneBy).mockRejectedValue(error as never);

    await expect(getByEmail('test@example.com')).rejects.toThrow('Database failure');
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should handle empty string email input', async () => {
    // This test checks behavior when an empty string is provided as email.
    jest.mocked(mockuserRepository.findOneBy).mockResolvedValue(null as any);

    const result = await getByEmail('');
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: '' });
    expect(result).toBeNull();
  });

  it('should handle very long email addresses', async () => {
    // This test checks that getByEmail can handle unusually long email strings.
    const longEmail = 'a'.repeat(200) + '@example.com';
    const expectedUser = createMockUser({ email: longEmail });
    jest.mocked(mockuserRepository.findOneBy).mockResolvedValue(expectedUser as any);

    const result = await getByEmail(longEmail);
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: longEmail });
    expect(result).toEqual(expectedUser);
  });

  it('should handle emails with leading/trailing whitespace', async () => {
    // This test checks that getByEmail receives the email as-is, including whitespace.
    const emailWithSpaces = '  spaced@example.com  ';
    jest.mocked(mockuserRepository.findOneBy).mockResolvedValue(null as any);

    const result = await getByEmail(emailWithSpaces);
    expect(mockuserRepository.findOneBy).toHaveBeenCalledWith({ email: emailWithSpaces });
    expect(result).toBeNull();
  });
});

import { itemRepository } from "../../../../repositories/itemRepository";
import { getAll } from '../../../../services/itemService';


// Manual mocks for dependencies

// Mock for IJwtPayload
interface MockIJwtPayload {
  user: {
    id: number;
    // Add other properties if needed
  };
}

// Mock for IItem
interface MockIItem {
  user?: {
    id: number;
  };
  name: string;
}

// Mock for itemRepository
class MockitemRepository {
  public find = jest.fn();
}

let mockitemRepository: MockitemRepository;

// Replace the actual itemRepository with our mock
jest.mock("../../../../repositories/itemRepository", () => {
  return {
    itemRepository: {} as any,
  };
});

// Import the mocked itemRepository for type assertion
describe('getAll() getAll method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    beforeEach(() => {
      //jest.clearAllMocks();
      mockitemRepository = new MockitemRepository();
      const itemRepoModule = require('../../../../repositories/itemRepository');
      itemRepoModule.itemRepository = mockitemRepository as any;    
    });

    it('should return an array of items for a valid user', async () => {
      // Test: Returns items for a valid user
      const mockReq: MockIJwtPayload = {
        user: { id: 1 },
      };

      const mockItems: MockIItem[] = [
        { user: { id: 1 }, name: 'Item 1' },
        { user: { id: 1 }, name: 'Item 2' },
      ];

      jest.mocked(itemRepository.find).mockResolvedValue(mockItems as any);

      const result = await getAll(mockReq as any);

      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
      expect(result).toEqual(mockItems as any);
    });

    it('should return an empty array if user has no items', async () => {
      // Test: Returns empty array if user has no items
      const mockReq: MockIJwtPayload = {
        user: { id: 2 },
      };

      const mockItems: MockIItem[] = [];

      jest.mocked(itemRepository.find).mockResolvedValue(mockItems as any);

      const result = await getAll(mockReq as any);

      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 2 } },
      });
      expect(result).toEqual([]);
    });

    it('should handle multiple users with different items', async () => {
      // Test: Returns correct items for different users
      const mockReq: MockIJwtPayload = {
        user: { id: 3 },
      };

      const mockItems: MockIItem[] = [
        { user: { id: 3 }, name: 'User3 Item1' },
        { user: { id: 3 }, name: 'User3 Item2' },
      ];

      jest.mocked(itemRepository.find).mockResolvedValue(mockItems as any);

      const result = await getAll(mockReq as any);

      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 3 } },
      });
      expect(result).toEqual(mockItems as any);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return null if repository returns null', async () => {
      // Test: Handles repository returning null
      const mockReq: MockIJwtPayload = {
        user: { id: 4 },
      };

      jest.mocked(itemRepository.find).mockResolvedValue(null as any);

      const result = await getAll(mockReq as any);

      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 4 } },
      });
      expect(result).toBeNull();
    });

    it('should throw if itemRepository.find throws an error', async () => {
      // Test: Handles repository throwing error
      const mockReq: MockIJwtPayload = {
        user: { id: 5 },
      };

      const error = new Error('Database error');
      jest.mocked(itemRepository.find).mockRejectedValue(error as never);

      await expect(getAll(mockReq as any)).rejects.toThrow('Database error');
      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 5 } },
      });
    });

    it('should handle user id as a large number', async () => {
      // Test: Handles large user id values
      const mockReq: MockIJwtPayload = {
        user: { id: Number.MAX_SAFE_INTEGER },
      };

      const mockItems: MockIItem[] = [
        { user: { id: Number.MAX_SAFE_INTEGER }, name: 'Big User Item' },
      ];

      jest.mocked(itemRepository.find).mockResolvedValue(mockItems as any);

      const result = await getAll(mockReq as any);

      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: Number.MAX_SAFE_INTEGER } },
      });
      expect(result).toEqual(mockItems as any);
    });

    it('should handle user id as zero', async () => {
      // Test: Handles user id of zero
      const mockReq: MockIJwtPayload = {
        user: { id: 0 },
      };

      const mockItems: MockIItem[] = [
        { user: { id: 0 }, name: 'Zero User Item' },
      ];

      jest.mocked(itemRepository.find).mockResolvedValue(mockItems as any);

      const result = await getAll(mockReq as any);

      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 0 } },
      });
      expect(result).toEqual(mockItems as any);
    });

    it('should handle user id as negative number', async () => {
      // Test: Handles negative user id values
      const mockReq: MockIJwtPayload = {
        user: { id: -1 },
      };

      const mockItems: MockIItem[] = [
        { user: { id: -1 }, name: 'Negative User Item' },
      ];

      jest.mocked(itemRepository.find).mockResolvedValue(mockItems as any);

      const result = await getAll(mockReq as any);

      expect(itemRepository.find).toHaveBeenCalledWith({
        where: { user: { id: -1 } },
      });
      expect(result).toEqual(mockItems as any);
    });
  });
});
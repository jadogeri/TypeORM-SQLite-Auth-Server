
import { removeAll } from '../../../../services/itemService';


// Manual mocks for dependencies

// Mock for IJwtPayload
interface MockIJwtPayload {
  user: {
    id: number;
    // other properties can be added as needed
  };
}

// Mock for IItem
interface MockIItem {
  user?: {
    id: number;
  };
  name: string;
  id?: number;
}

// Mock for itemRepository
class MockitemRepository {
  public delete = jest.fn();
}

// Replace the actual itemRepository with our mock
jest.mock("../../../../repositories/itemRepository", () => {
  return {
    itemRepository: {} as any,
  };
});
  let mockItemRepository: MockitemRepository;


describe('removeAll() removeAll method', () => {
  let originalItemRepository: any;

  beforeEach(() => {
    // Re-initialize the mock before each test
    mockItemRepository = new MockitemRepository();
    // Overwrite the imported itemRepository with our mock
    originalItemRepository = require('../../../../repositories/itemRepository');
    originalItemRepository.itemRepository = mockItemRepository as any;
  });

  // Happy Path Tests
  describe('Happy Paths', () => {
    test('should call itemRepository.delete with correct user id and return its result', async () => {
      // This test ensures removeAll calls itemRepository.delete with the correct filter and returns its result.
      const mockReq: MockIJwtPayload = {
        user: {
          id: 42,
        },
      };

      const expectedResult = [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }] as any;
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any as never);

      const result = await removeAll(mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ user: { id: 42 } });
      expect(result).toBe(expectedResult);
    });

    test('should work with different user ids', async () => {
      // This test checks that removeAll works for different user ids.
      const mockReq: MockIJwtPayload = {
        user: {
          id: 99,
        },
      };

      const expectedResult = [{ id: 3, name: 'item3' }] as any;
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any as never);

      const result = await removeAll(mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ user: { id: 99 } });
      expect(result).toBe(expectedResult);
    });

    test('should handle empty result from itemRepository.delete', async () => {
      // This test ensures removeAll correctly returns an empty array if no items are deleted.
      const mockReq: MockIJwtPayload = {
        user: {
          id: 123,
        },
      };

      const expectedResult: MockIItem[] = [];
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any as never);

      const result = await removeAll(mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ user: { id: 123 } });
      expect(result).toEqual([]);
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    test('should throw if itemRepository.delete rejects', async () => {
      // This test ensures removeAll propagates errors from itemRepository.delete.
      const mockReq: MockIJwtPayload = {
        user: {
          id: 7,
        },
      };

      const error = new Error('Delete failed');
      jest.mocked(mockItemRepository.delete).mockRejectedValue(error as never);

      await expect(removeAll(mockReq as any)).rejects.toThrow('Delete failed');
      expect(mockItemRepository.delete).toHaveBeenCalledWith({ user: { id: 7 } });
    });

    test('should work if user id is zero', async () => {
      // This test checks that removeAll works when user id is zero (boundary value).
      const mockReq: MockIJwtPayload = {
        user: {
          id: 0,
        },
      };

      const expectedResult = [{ id: 10, name: 'item10' }] as any;
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any as never);

      const result = await removeAll(mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ user: { id: 0 } });
      expect(result).toBe(expectedResult);
    });

    test('should work if user id is a large number', async () => {
      // This test checks that removeAll works for a very large user id.
      const mockReq: MockIJwtPayload = {
        user: {
          id: Number.MAX_SAFE_INTEGER,
        },
      };

      const expectedResult = [{ id: 999, name: 'bigitem' }] as any;
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any as never);

      const result = await removeAll(mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ user: { id: Number.MAX_SAFE_INTEGER } });
      expect(result).toBe(expectedResult);
    });

    test('should work if itemRepository.delete returns undefined', async () => {
      // This test ensures removeAll handles undefined return from itemRepository.delete.
      const mockReq: MockIJwtPayload = {
        user: {
          id: 55,
        },
      };

      jest.mocked(mockItemRepository.delete).mockResolvedValue(undefined as any as never);

      const result = await removeAll(mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ user: { id: 55 } });
      expect(result).toBeUndefined();
    });
  });
});
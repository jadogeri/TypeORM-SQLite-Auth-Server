
import { deleteByUserId } from '../../../../services/itemService';


// app/src/services/itemService.deleteByUserId.spec.ts
// Manual mocks for dependencies

// Mock for IJwtPayload
interface MockIJwtPayload {
  user: {
    id: number;
    // Add more properties if needed
  };
}


// Mock for itemRepository
class MockitemRepository {
  public delete = jest.fn();
}

// Replace the actual itemRepository with our mock in the tested module
jest.mock("../../../../repositories/itemRepository", () => {
  return {
    itemRepository: {} as any,
  };
});

describe('deleteByUserId() deleteByUserId method', () => {
  let mockItemRepository: MockitemRepository;

  beforeEach(() => {
    // Reset the mock implementation and calls before each test
    //jest.resetModules();
    mockItemRepository = new MockitemRepository();
    // Re-assign the mock to the imported itemRepository
    (require('../../../../repositories/itemRepository').itemRepository as any).delete = jest.mocked(mockItemRepository.delete);
  });

  // Happy Paths
  describe('Happy paths', () => {
    it('should call itemRepository.delete with correct filter when valid itemId and user id are provided', async () => {
      // This test ensures that the repository is called with the correct filter object.
      const itemId = 42;
      const mockReq: MockIJwtPayload = {
        user: {
          id: 7,
        },
      };
      const expectedResult = { affected: 1 };
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any);

      const result = await deleteByUserId(itemId, mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ id: itemId, user: { id: mockReq.user.id } } as any);
      expect(result).toBe(expectedResult);
    });

    it('should work with different user ids and item ids', async () => {
      // This test checks that the function works for different combinations of ids.
      const itemId = 100;
      const mockReq: MockIJwtPayload = {
        user: {
          id: 200,
        },
      };
      const expectedResult = { affected: 1 };
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any);

      const result = await deleteByUserId(itemId, mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ id: itemId, user: { id: mockReq.user.id } } as any);
      expect(result).toBe(expectedResult);
    });

    it('should return the value returned by itemRepository.delete', async () => {
      // This test ensures that the return value from the repository is passed through.
      const itemId = 1;
      const mockReq: MockIJwtPayload = {
        user: {
          id: 2,
        },
      };
      const expectedResult = { affected: 5, raw: [] };
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any);

      const result = await deleteByUserId(itemId, mockReq as any);

      expect(result).toBe(expectedResult);
    });
  });

  // Edge Cases
  describe('Edge cases', () => {
    it('should handle itemRepository.delete returning 0 affected (item not found or not owned by user)', async () => {
      // This test checks the case where the item does not exist or does not belong to the user.
      const itemId = 999;
      const mockReq: MockIJwtPayload = {
        user: {
          id: 888,
        },
      };
      const expectedResult = { affected: 0 };
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any);

      const result = await deleteByUserId(itemId, mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ id: itemId, user: { id: mockReq.user.id } } as any);
      expect(result).toBe(expectedResult);
    });

    it('should throw if itemRepository.delete rejects with an error', async () => {
      // This test ensures that errors from the repository are propagated.
      const itemId = 123;
      const mockReq: MockIJwtPayload = {
        user: {
          id: 456,
        },
      };
      const error = new Error('DB error');
      jest.mocked(mockItemRepository.delete).mockRejectedValue(error as never);

      await expect(deleteByUserId(itemId, mockReq as any)).rejects.toThrow('DB error');
      expect(mockItemRepository.delete).toHaveBeenCalledWith({ id: itemId, user: { id: mockReq.user.id } } as any);
    });

    it('should work with itemId = 0 (edge case for id)', async () => {
      // This test checks the behavior when itemId is 0.
      const itemId = 0;
      const mockReq: MockIJwtPayload = {
        user: {
          id: 1,
        },
      };
      const expectedResult = { affected: 1 };
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any);

      const result = await deleteByUserId(itemId, mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ id: itemId, user: { id: mockReq.user.id } } as any);
      expect(result).toBe(expectedResult);
    });

    it('should work with large itemId and user id values', async () => {
      // This test checks the function with very large numbers.
      const itemId = Number.MAX_SAFE_INTEGER;
      const mockReq: MockIJwtPayload = {
        user: {
          id: Number.MAX_SAFE_INTEGER,
        },
      };
      const expectedResult = { affected: 1 };
      jest.mocked(mockItemRepository.delete).mockResolvedValue(expectedResult as any);

      const result = await deleteByUserId(itemId, mockReq as any);

      expect(mockItemRepository.delete).toHaveBeenCalledWith({ id: itemId, user: { id: mockReq.user.id } } as any);
      expect(result).toBe(expectedResult);
    });
  });
});
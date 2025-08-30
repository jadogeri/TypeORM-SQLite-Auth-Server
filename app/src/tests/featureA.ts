    // src/features/featureA.ts
    import { describe, expect, test } from '@jest/globals';

    export const featureATests = () => {
      describe('Feature A', () => {
        test('should do something specific for Feature A', () => {
          expect(true).toBe(true);
        });

        test('should handle another scenario in Feature A', () => {
          expect(1 + 1).toBe(2);
        });
      });
    };
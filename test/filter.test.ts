import { checkValueWithFilter } from "../src/utils/filter";

describe.only('checkValueWithFilter', () => {
  describe('equals', () => {
    it('should return true', () => {
      const item = {
        name: 'test',
      };
      const result = checkValueWithFilter(item, {
        id: 'name',
        condition: 'equals',
        value: 'test',
      });

      expect(result).toBe(true);
    });

    it('should return false', () => {
      const item = {
        count: 2,
      };
      const result = checkValueWithFilter(item, {
        id: 'count',
        condition: 'equals',
        value: 3,
      });

      expect(result).toBe(false);
    });
  });

  describe('does_not_equal', () => {
    it('should return true', () => {
      const item = {
        name: 'test',
      };
      const result = checkValueWithFilter(item, {
        id: 'name',
        condition: 'does_not_equal',
        value: 'test1',
      });

      expect(result).toBe(true);
    });

    it('should return false', () => {
      const item = {
        count: 2,
      };
      const result = checkValueWithFilter(item, {
        id: 'count',
        condition: 'does_not_equal',
        value: 2,
      });

      expect(result).toBe(false);
    });
  });

  describe('greater_than', () => {
    it('should return true for strings', () => {
      const item = {
        name: 'test',
      };
      const result = checkValueWithFilter(item, {
        id: 'name',
        condition: 'greater_than',
        value: 'jest1',
      });

      expect(result).toBe(true);
    });

    it('should return false', () => {
      const item = {
        count: 2,
      };
      const result = checkValueWithFilter(item, {
        id: 'count',
        condition: 'greater_than',
        value: 3,
      });

      expect(result).toBe(false);
    });
  });

  describe('less_than', () => {
    it('should return true for strings', () => {
      const item = {
        name: 'test',
      };
      const result = checkValueWithFilter(item, {
        id: 'name',
        condition: 'less_than',
        value: 'zest1',
      });

      expect(result).toBe(true);
    });

    it('should return false', () => {
      const item = {
        count: 3,
      };
      const result = checkValueWithFilter(item, {
        id: 'count',
        condition: 'less_than',
        value: 2,
      });

      expect(result).toBe(false);
    });
  });
});

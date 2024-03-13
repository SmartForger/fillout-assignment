import axios from 'axios';
import { FormResponseAdapter } from "../src/adapters/FormResponseAdapter";
import { generateSampleResponses, mockGetResponses } from './mock';

jest.mock('axios');

describe('FormResponseAdapter', () => {
  let adapter: FormResponseAdapter;
  const sampleResponses = generateSampleResponses(550);

  beforeEach(() => {
    adapter = new FormResponseAdapter();

    (axios.get as jest.Mock).mockImplementation(mockGetResponses(sampleResponses, false));
  });

  describe('getDataRequest', () => {
    it('should fetch data', async () => {
      const result = await adapter.getDataRequest({ formId: '1', limit: 100, offset: 0 });
      expect(result.items.length).toBe(100);
    });
  });

  describe('filterItems', () => {
    let response: any;

    beforeEach(() => {
      response = {
        items: [
          {
            submissionId: '1',
            submissionTime: '2024-03-12T20:00:00Z',
            type: 1,
          },
          {
            submissionId: '2',
            submissionTime: '2024-03-12T21:00:00Z',
            type: 1,
          },
          {
            submissionId: '3',
            submissionTime: '2024-03-12T19:00:00Z',
            type: 2,
          },
          {
            submissionId: '4',
            submissionTime: '2024-03-12T21:30:00Z',
            type: 2,
          },
          {
            submissionId: '5',
            submissionTime: '2024-03-12T22:00:00Z',
            type: 1,
          }
        ],
        totalCount: sampleResponses.length,
        pageCount: Math.ceil(sampleResponses.length / 150),
      };
    });

    it('should return all items without filters', () => {
      const result = adapter.filterItems(response);
      expect(result.length).toBe(5);
    });

    it('should filter with 1 filter', () => {
      adapter.setFilters([
        {
          id: 'type',
          condition: 'equals',
          value: 1,
        }
      ]);
      const result = adapter.filterItems(response);

      expect(result).toEqual([
        {
          submissionId: '1',
          submissionTime: '2024-03-12T20:00:00Z',
          type: 1,
        },
        {
          submissionId: '2',
          submissionTime: '2024-03-12T21:00:00Z',
          type: 1,
        },
        {
          submissionId: '5',
          submissionTime: '2024-03-12T22:00:00Z',
          type: 1,
        }
      ]);
    });

    it('should filter with multiple filters', () => {
      adapter.setFilters([
        {
          id: 'type',
          condition: 'equals',
          value: 1,
        },
        {
          id: 'submissionTime',
          condition: 'greater_than',
          value: '2024-03-12T21:01:00Z',
        },
      ]);
      const result = adapter.filterItems(response);

      expect(result).toEqual([
        {
          submissionId: '5',
          submissionTime: '2024-03-12T22:00:00Z',
          type: 1,
        }
      ]);
    });
  });

  describe('getFilteredItems', () => {
    it('should fetch all data in multiple requests', async () => {
      const mockGetDataRequest = jest.spyOn(adapter, 'getDataRequest');

      await adapter.getFilteredItems({
        formId: '1',
      });

      for (let i = 0; i < 4; i ++) {
        expect(mockGetDataRequest).toHaveBeenCalledWith({
          formId: '1',
          limit: 150,
          offset: 150 * i,
        });
      }
    });

    it('should return items in order', async () => {
      (axios.get as jest.Mock).mockImplementation(mockGetResponses(sampleResponses, true));

      const result = await adapter.getFilteredItems({
        formId: '1',
      });

      // Check total items length
      expect(result.length).toBe(sampleResponses.length);

      // Check if item order is retained
      for (let i = 0; i < sampleResponses.length; i ++) {
        expect(result[i].submissionId).toBe(sampleResponses[i].submissionId.toString());
      }
    });
  });
});

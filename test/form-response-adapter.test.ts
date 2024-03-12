import axios from 'axios';
import { FormResponseAdapter } from "../src/adapters/FormResponseAdapter";
import { generateSampleResponses, mockGetResponses } from './mock';

jest.mock('axios');

describe('FormResponseAdapter', () => {
  let adapter: FormResponseAdapter;
  const sampleResponses = generateSampleResponses(550);

  beforeEach(() => {
    adapter = new FormResponseAdapter();

    (axios.get as jest.Mock).mockImplementation(mockGetResponses(sampleResponses));
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
        items: [ { id: '1' }, { id: '2' } ],
        totalCount: 1,
        pageCount: 1,
      };
    });

    it('should return all items without filters', () => {
      const result = adapter.filterItems(response);
      expect(result.length).toBe(2);
    });
  });

  describe('getPaginatedRequest', () => {
    it('should fetch all data in multiple requests', async () => {
      const mockGetDataRequest = jest.spyOn(adapter, 'getDataRequest');

      const result = await adapter.getFilteredItems({
        formId: '1',
      });

      for (let i = 0; i < 4; i ++) {
        expect(mockGetDataRequest).toHaveBeenCalledWith({
          formId: '1',
          limit: 150,
          offset: 150 * i,
        });
      }

      // Check total items length
      expect(result.length).toBe(sampleResponses.length);

      // Check if item order is retained
      for (let i = 0; i < sampleResponses.length; i ++) {
        expect(result[i].submissionId).toBe(sampleResponses[i].submissionId.toString());
      }
    });
  });
});

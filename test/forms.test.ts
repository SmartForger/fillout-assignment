import request from 'supertest';
import axios from 'axios';

import app from '../src/app';
import { generateSampleResponses, mockGetResponses } from './mock';

jest.mock('axios');

describe('GET /api/v1/forms/:formId/filteredResponses', () => {
  const sampleResponses = generateSampleResponses(550);

  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementation(mockGetResponses(sampleResponses, false));
  });

  it('should respond with 400 if filters is missing', (done) => {
    request(app)
      .get('/api/v1/forms/1/filteredResponses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  })

  it('responds with filtered responses', async () => {
    const res = await request(app)
      .get('/api/v1/forms/1/filteredResponses?limit=10&offset=10&filters=[{"id":"submissionTime","condition":"greater_than","value":"2024-03-12T23:00:00Z"}]')
      .set('Accept', 'application/json')
      .expect(200);

    expect(res.body.responses.length).toBe(10);
    expect(res.body.totalResponses).toBe(514);
    expect(res.body.pageCount).toBe(52);
  });
});

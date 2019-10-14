import { readByCommandRequest } from './index';
import * as EventService from '../events-service/index';
import sinon from 'sinon';
import June5th2019Data from '../data/events-service/6-5-2019.json';
import July19th2019Data from '../data/events-service/7-19-2019.json';
import June5th2019Response from '../data/slack-service/6-5-2019-response.json';
import July19th2019Response from '../data/slack-service/7-19-2019-response.json';

describe('Slack Service', () => {
  let readByRequestStub;

  beforeEach(() => {
    readByRequestStub = sinon.stub(EventService, 'readByRequest');
  });

  afterEach(() => {
    readByRequestStub.restore();
  });

  test('throws an error if the EventService fails', async () => {
    readByRequestStub.throws(new Error("must be a string"));
    await expect(readByCommandRequest({text: ''})).rejects.toThrow('must be a string')
  });

  test('returns a message when no events are scheduled', async() => {
    readByRequestStub.resolves([]);
    const result = await readByCommandRequest({text: 'TODAY'});
    expect(result.text).toBe('No events scheduled for TODAY');
  });

  describe('when events are happening for the date', () => {

    test('verify the structure for June 5th 2019 events', async() => {
      readByRequestStub.resolves(June5th2019Data);
      const result = await readByCommandRequest({text: '2019-06-05'});
      expect(JSON.stringify(result)).toEqual(JSON.stringify(June5th2019Response));
    });

    test('verify the structure for July 19 2019 events', async() => {
      readByRequestStub.resolves(July19th2019Data);
      const result = await readByCommandRequest({text: '2019-07-19'});
      expect(JSON.stringify(result)).toEqual(JSON.stringify(July19th2019Response));
    });

  });

});
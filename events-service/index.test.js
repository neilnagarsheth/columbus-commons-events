import sinon from 'sinon';
import { readByRequest } from './index';
import * as api from '../api';
import AugustSeptemberData from '../data/api/august-sept-2019';

describe('Event Service', () => {
  describe('readByRequest', () => {
    test('undefined parameter passed in throws an error', async() => {
      await expect(readByRequest()).rejects.toThrow('query parameter is required')
    });

    test('invalid type throws error', async() => {
      await expect(readByRequest(23)).rejects.toThrow('must be a string')
    });

    describe('for existing query parameters', () => {
      let getEventsForMonthStub;
      let getEventsWithStartDateStub;

      beforeEach(() => {
        getEventsForMonthStub = sinon.stub(api, 'getEventsForMonth');
        getEventsWithStartDateStub = sinon.stub(api, 'getEventsWithStartDate');
      });

      afterEach(() => {
        getEventsForMonthStub.restore();
        getEventsWithStartDateStub.restore();
      });

      test('get events for today', async() => {
        getEventsForMonthStub.resolves(AugustSeptemberData);
        const events = await readByRequest('today');
        expect(getEventsForMonthStub.calledOnce).toBeTruthy();
        expect(events.length).toBe(0);
      });

      test('gets events for tomorrow', async() => {
        getEventsForMonthStub.resolves(AugustSeptemberData);
        const events = await readByRequest('tomorrow');
        expect(getEventsForMonthStub.calledOnce).toBeTruthy();
        expect(events.length).toBe(0);
      });

      test('gets an events for 8/7/19', async() => {
        getEventsWithStartDateStub.resolves(AugustSeptemberData);
        const events = await readByRequest('2019-08-07');
        expect(getEventsWithStartDateStub.calledOnce).toBeTruthy();
        events.forEach(event => {
          expect(event.id).toBeTruthy();
          expect(event.start_date).toBe('2019-08-07');
        });
      });

    });
  });

});
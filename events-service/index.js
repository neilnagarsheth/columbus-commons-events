import { getEventsForMonth, getEventsWithStartDate } from '../api';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';
const TODAY = 'TODAY';
const TOMORROW = 'TOMORROW';

export async function readByRequest(when) {
  if(when) {
    return await getEventsByWhen(when);
  } else {
    throw new Error('\'when\' query parameter is required for this request');
  }
}

const getEventsByWhen = async (when) => {
  if(typeof when !== 'string') {
    throw new Error(`${when} must be a string`);
  }
  if([TODAY, TOMORROW].includes(when.toUpperCase())) {
    return await getEventsForMonthByDay(when);
  } else {
    return await getEventsForMonthByStartDate(when);
  }

};

const getEventsForMonthByDay = async(day) => {
  const events = await getEventsForMonth();
  let date;
  if(day.toUpperCase() === TODAY) {
    date = moment().format(DATE_FORMAT);
  } else {
    date = moment().add(1, 'days').format(DATE_FORMAT);
  }
  return filterEventsByDate(events, date);
}

const getEventsForMonthByStartDate = async(date) => {
  const dateFormatted = moment(date).format(DATE_FORMAT);
  const events = await getEventsWithStartDate(dateFormatted);
  return filterEventsByDate(events, dateFormatted);
}

const filterEventsByDate = (events, date) => {
  const dayKeys = Object.keys(events);
  const eventDayKey = dayKeys.find((day) => events[day].find((event) => event.start_date === date));
  return events[eventDayKey] || [];
}

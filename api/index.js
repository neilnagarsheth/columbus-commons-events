import request from 'request-promise';
const options = {
  method: 'POST',
  uri: 'https://columbuscommons.org/assets/json/event-calendar.php',
  json: true,
}

export async function getEventsForMonth() {
  return request(options);
}

export async function getEventsWithStartDate(start) {
  return request({...options, form: { start, }});
}

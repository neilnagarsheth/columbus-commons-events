import { readByRequest } from '../events-service';

export async function readByCommandRequest(slackRequest) {
  const { text } = slackRequest;
  try {
    const events = await readByRequest(text);
    let attachments = [];
    let responseText = `No events scheduled for ${text}.`;
    if(events.length) {
      responseText = `Here\'s whats happening for ${text}.`
      attachments = getTextAttachmentsFromEvents(events);
    }
    return {
      response_type: "ephemeral",
      text: responseText,
      attachments,
    };
  } catch(err) {
    console.log(err);
    throw {
      response_type: "ephemeral",
      text: 'There was an error, please try again later',
    }
  }
}

const getTextAttachmentsFromEvents = (events) => {
  return events.map(event => {
    return {
      text: event.long_description,
    };
  });
};
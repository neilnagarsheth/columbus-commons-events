import stringStripHtml from 'string-strip-html'
import { readByRequest } from '../events-service';

export async function readByCommandRequest(slackRequest) {
  const { text } = slackRequest;
  const response_type = 'ephemeral';
  const events = await readByRequest(text);
  if(!events.length) {
    return {
      response_type,
      text: `No events scheduled for ${text}`,
    };
  }
  const headerText = `Here\'s whats happening for ${text}.`
  return {
    response_type,
    blocks: generateBlocksFromEvents(headerText, events)
  };
}

const generateBlocksFromEvents = (headerText, events) => {
  let blocks = events.map(event => generateBlocksFromEventProperties(event));
  return blocks.reduce((mappedBlocks, eventBlock) => [...mappedBlocks, ...eventBlock], [generateTextSectionWithPlainText(headerText)] )
};

const generateBlocksFromEventProperties = (event) => {
  const blocks = [];
  blocks.push(generateDivider());
  const boldEventName = `*${event.event_name}*`;
  blocks.push(generateTextSectionWithMarkDown(boldEventName));
  blocks.push(generateTextSectionWithPlainText(stringStripHtml(event.long_description)));
  blocks.push(generateContextWithPlainText(`${event.start_time} - ${event.end_time}`));
  let eventUrl = event.link;
  if(eventUrl.startsWith('/')) {
    eventUrl = `http://columbuscommons.org${eventUrl}`;
  }
  if(eventUrl) {
    blocks.push(generateButton('Details', eventUrl));
  }
  return blocks;
}

const generateTextSectionWithPlainText = (text) => {
  return generateTextSection(text, 'plain_text');
};

const generateTextSectionWithMarkDown = (text) => {
  return generateTextSection(text, 'mrkdwn');
}

const generateTextSection = (text, type) => {
  return {
    type: 'section',
    text: { type, text}
  };
}

const generateDivider = () => ({ type: 'divider' });

const generateContextWithPlainText = (text) => {
  return {
    type: 'context',
    elements: [{
      type: 'plain_text',
      text,
    }]
  };
}

const generateButton = (text, url) => {
  return {
    type: 'actions',
    elements: [{
      type: 'button',
      text: {
        type: 'plain_text',
        text,
      },
      url,
    }],
  }
};

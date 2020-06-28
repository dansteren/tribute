const middy = require('@middy/core');
const slackTextParser = require('./middleware/slackTextParser');

function noOptions(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: `Thanks for trying the \`/tribute\` command. It's currently in early development stages so all it can do is echo back what you send:\n>${event.text}`,
  });
}

function swap(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: `Looks like you called the swap command with the following args: ${event.args}`,
  });
}

function help(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: `Looks like you called for help (${event.command})`,
  });
}

function handleSlashCommands(event, context, callback) {
  const [command, ...args] = event.body.text.split(/\s+/);
  const newEvent = {
    ...event.body,
    command,
    args,
  };
  switch (command) {
    case 'help':
      help(newEvent, context, callback);
      break;
    case 'swap':
      swap(newEvent, context, callback);
      break;
    default:
      noOptions(newEvent, context, callback);
      break;
  }
}

const handler = middy(handleSlashCommands).use(slackTextParser());

exports.handler = handler;

const middy = require('@middy/core');
const slackTextParser = require('./middleware/slackTextParser');

function handleSlashCommands(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: `Thanks for trying the \`/tribute\` command. It's currently in early development stages so all it can do is echo back what you send:\n>${event.body.text}`,
  });
}

const handler = middy(handleSlashCommands).use(slackTextParser());

exports.handler = handler;

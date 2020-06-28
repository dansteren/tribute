const middy = require('@middy/core');
const slackTextParser = require('./middleware/slackTextParser');
const octothorpe = require('./octothorpe');

const app = octothorpe((event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `Thanks for trying the \`/tribute\` command. It's currently in early development stages so all it can do is echo back what you sent:\n>${event.text}`,
  });
});

app.on('help', (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `Looks like you called for help (${event.command})`,
  });
});

app.on('swap', (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `Looks like you called the swap command with the following args: ${event.args}`,
  });
});

const handler = middy(app.listen).use(slackTextParser());

exports.handler = handler;

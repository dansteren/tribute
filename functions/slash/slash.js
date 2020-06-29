const middy = require('@middy/core');
const slackTextParser = require('./middleware/slackTextParser');
const octothorpe = require('./octothorpe');

const app = octothorpe((event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: `Thanks for trying the \`/tribute\` command. It's currently in early development stages so all it can do is echo back what you sent:\n>${event.text}`,
  });
});

app.on('init', (event, context, callback) => {
  const response = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            "Welcome to Tribute! Let's get this channel set up for an on-call rotation. Select the users you want to include in the rotation.",
        },
        accessory: {
          type: 'multi_users_select',
          action_id: 'slash_init_users_selected',
          placeholder: {
            type: 'plain_text',
            text: 'Select users',
          },
        },
      },
    ],
  };
  callback(null, {
    statusCode: 200,
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(response),
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

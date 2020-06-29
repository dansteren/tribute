const axios = require('axios');
const middy = require('@middy/core');
const slackTextParser = require('./middleware/slackTextParser');

function interactions(event, context, callback) {
  if (event.body.payload.actions[0].action_id === 'slash_init_users_selected') {
    const selectedUsers = event.body.payload.actions[0].selected_users;
    const rotation = selectedUsers.map((userId) => `<@${userId}>`).join(', ');

    axios
      .post(
        event.body.payload.response_url,
        {
          replace_original: 'true',
          text: `Success! This channel has been configured with the following rotation: ${rotation}`,
        },
        {
          headers: { 'Content-type': 'application/json' },
        }
      )
      .catch(() => {});
    callback(null, {
      statusCode: 200,
      body: 'OK',
    });
  }
}
const handler = middy(interactions).use(slackTextParser());

exports.handler = handler;

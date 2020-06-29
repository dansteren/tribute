const axios = require('axios');
const middy = require('@middy/core');
const slackTextParser = require('../middleware/slackTextParser');

function interactions(event, context, callback) {
  if (event.body.payload.actions[0].action_id === 'slash_init_users_selected') {
    const selectedUsers = event.body.payload.actions[0].selected_users;
    if (selectedUsers.length === 0) {
      axios
        .post(
          event.body.payload.response_url,
          { delete_original: 'true' },
          { headers: { 'Content-type': 'application/json' } }
        )
        .catch(() => {});
    } else {
      const rotation = selectedUsers.map((userId) => `<@${userId}>`).join(', ');
      axios
        .post(
          event.body.payload.response_url,
          {
            delete_original: 'true',
            response_type: 'in_channel',
            text: `This channel has been configured with the following on-call rotation: ${rotation}\nTo manage this schedule use the \`/tribute\` command.`,
          },
          {
            headers: { 'Content-type': 'application/json' },
          }
        )
        .catch(() => {});
    }
    callback(null, {
      statusCode: 200,
      body: 'OK',
    });
  }
}
const handler = middy(interactions).use(slackTextParser());

exports.handler = handler;

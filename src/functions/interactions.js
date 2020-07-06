import axios from 'axios';
import middy from '@middy/core';
import slackTextParser from './middleware/slackTextParser';

async function interactions(event) {
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
    return {
      statusCode: 200,
      body: 'OK',
    };
  }
  return null;
}

// This cannot be exported as a default because of the way netlify expects this
// eslint-disable-next-line import/prefer-default-export
export const handler = middy(interactions).use(slackTextParser());

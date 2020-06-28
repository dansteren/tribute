/**
 * Takes an '=' separated key/value pair as a string and puts the value into the
 * object at the given key.
 * @param {{}} object - The object in which to put the key/value pair
 * @param {String} string - A string of shape "key=value"
 * @return {{}} The original object with the new key
 */
function stringToObject(object, string) {
  const [key, value] = string.split('=');
  return { ...object, [key]: value };
}

/**
 * Takes a string of query params and converts it into a proper JS object.
 * @param {string} string - The string of key/value pairs from Slack
 * @returns {Object<string, string>} string - The object
 */
function parseSlackMessage(string) {
  if (!string) {
    return {};
  }
  const chunks = string
    .split('&')
    .map((chunk) => decodeURIComponent(chunk).replace(/\+/g, ' '));
  return chunks.reduce(stringToObject, {});
}

const middleware = () => {
  return {
    before(handler, next) {
      const originalBody = handler.event.body;
      const newBody = parseSlackMessage(originalBody);
      // eslint-disable-next-line no-param-reassign
      handler.event.body = newBody;
      next();
    },
  };
};

module.exports = middleware;

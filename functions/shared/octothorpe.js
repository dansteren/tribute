function OctothorpeException(message) {
  this.message = message;
  this.name = 'OctothorpeException';
}

/**
 * Handles a slack slash command action.
 *
 * @callback routeHandler
 * @param event
 * @param context
 * @param callback
 * @return {null}
 */

/**
 * A router for handling actions in a Slack slash command.
 * @param {routeHandler} defaultHandler - A default handler to use if the action
 *   isn't specified.
 */
const octothorpe = (defaultHandler) => {
  if (typeof defaultHandler !== 'function') {
    throw new OctothorpeException('No default route handler defined!');
  }

  const routes = {};
  const defaultRouteHandler = defaultHandler;
  return {
    /**
     * Defines a function to invoke when the given route is called in the slack
     * slash command
     * @param {string} route the first word provided to the slash command
     * @param {routeHandler} callback the callback to invoke when the route
     *   is called.
     */
    on(route, callback) {
      if (Array.isArray(routes)) {
        route.forEach((entry) => {
          routes[entry] = callback;
        });
      } else {
        routes[route] = callback;
      }
    },
    /**
     * Routes incoming lambda calls to the defined routes.
     * @param event
     * @param context
     * @param callback
     */
    listen(event, context, callback) {
      const [command, ...args] = event.body.text.split(/\s+/);
      const newEvent = {
        ...event.body,
        command,
        args,
      };
      if (typeof routes[command] === 'function') {
        routes[command](newEvent, context, callback);
      } else {
        defaultRouteHandler(newEvent, context, callback);
      }
    },
  };
};

module.exports = octothorpe;

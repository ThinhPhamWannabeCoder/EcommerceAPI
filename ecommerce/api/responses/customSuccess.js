/**
 * customSuccess.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.customSuccess();
 *     // -or-
 *     return res.customSuccess(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'customSuccess'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function customSuccess(statusCode, jsonMessage) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;
  
  const httpVerb = req.method;
  const endpoint = req.url;


  
  // If status code is provided, mean therese logic error - normal outcome for that request
  const successMessage = `${httpVerb}: \t${statusCode} \t request to: ${endpoint}`
  sails.log.info(successMessage)

  return res.status(statusCode).send(
    jsonMessage
  )

};

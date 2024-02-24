

module.exports = function customError(err) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;
  
  const httpVerb = req.method;
  const endpoint = req.url;

  const defaultStatusCode = 500;
  const defaultErrorMessage = "Internal Server Error"

  const statusCode = err.statusCode
  const message = err.message

  // IF STATUS CODE IS NOT PROVIDED: server have logic bug
  if(!statusCode){
    const errorMessage = `${httpVerb}: \t${defaultStatusCode} \t request to: ${endpoint} \n ${err.stack}`
    sails.log.error(errorMessage);
    return res.status(defaultStatusCode).json({
      status: defaultStatusCode,
      error: defaultErrorMessage
    })
  }


  // If status code is provided, mean therese logic error - normal outcome for that request
  const errorMessage = `${httpVerb}: ${statusCode} \t \n ${message} \n request to: ${endpoint}`
  sails.log.warn(errorMessage)

  return res.status(statusCode).json({
    status: statusCode,
    error: message
  })


};

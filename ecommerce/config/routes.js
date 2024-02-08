/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    "POST /user/login": "user/login",
    "POST /user/register": "user/register",
    "GET /user/info": "user/get-info",
    "GET /user/logout": "user/logout",
    "POST /user/changePassword": "user/change-password"
};

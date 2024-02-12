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
    "POST /user/login": {
        action: "user/login",
        csrf: false
    },
    "POST /user/register": { 
        action: "user/register",
        csrf: false,
    },
    "GET /user/info": "user/get-info",
    "GET /user/logout": "user/logout",
    "POST /user/changePassword": "user/change-password",
    // 'GET /csrfToken': 'security/grant-csrf-token' 

    // 
    "GET /product": {
        action: "product/get-all"
    },
    // Store
    "POST /product/create": "product/create",
    "DELETE /product/:productId" : "product/delete",
    "PUT /product/:productId/update":"product/update" 
};

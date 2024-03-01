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
  // AUTH
  'POST /api/v1/auth/register': {
    action: 'v1/auth/register',
    csrf: false,
  },
  'POST /api/v1/auth/login': {
    action: 'v1/auth/login',
    csrf: false
  },
  'GET /api/v1/auth/logout': 'v1/auth/logout',
  'POST /api/v1/auth/forgot-password': 'v1/auth/forgot-password',
  // Verification
  'GET /api/v1/auth/verify': 'v1/auth/verify',
  'PATCH /api/v1/auth/reset-password': 'v1/auth/reset-password',


  // USERS
  'PUT /api/v1/users': 'v1/users/update-info',
  'GET /api/v1/users': 'v1/users/get-info',
  'GET /api/v1/users/to-seller': 'v1/users/upgrade-to-seller',

  // 'GET /csrfToken': 'security/grant-csrf-token'

  // STORE
  'POST /api/v1/store': 'v1/store/create-store',
  'GET /api/v1/store/:id': 'v1/store/get-store-info',
  'POST /api/v1/store/:id': 'v1/store/update-store',
  'DELETE /api/v1/store/:id': 'v1/store/delete-store',

  // PRRODUCTS
  'GET /api/v1/store/:storeId/products': {
    action: 'v1/store/products/get-all'
  },
  'POST /api/v1/store/products': 'v1/store/products/create',
  'DELETE /api/v1/store/:storeId/products/:productId' : 'v1/store/products/delete',
  'PUT /api/v1/store/:storeId/products/:productId':'v1/store/products/update',


  // Test
  'GET /api/v1/test/error': 'v1/test/err',
  'GET /api/v1/test/error2': 'v1/test/test-2',

};

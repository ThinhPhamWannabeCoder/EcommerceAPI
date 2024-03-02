/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  '*': ['isLoggedIn'],

  // 'isAdmin'
  // 'isBuyer'
  // 'isSeller'
  // 'isDelivery

  'v1/auth/login': true, 
  'v1/auth/register': true,
  // 'v1/test/err': true,
  'v1/auth/verify': true,
  // '*': true
  'v1/store/*': ['isLoggedIn','isSeller'],
  'v1/buyer/*': ['isLoggedIn','isBuyer']
};

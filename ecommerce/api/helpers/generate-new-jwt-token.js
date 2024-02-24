const jwt = require('jsonwebtoken')

module.exports = {


  friendlyName: 'Generate new jwt token',


  description: 'Jwt token will be used to the future for fast authentication and authorization',


  inputs: {
    payload:{
      type: 'ref',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const issuer = 'Thinh Ecommerce';
    inputs.payload.iss = issuer;
    const secret = sails.config.jwtSecretKey;
    const token = jwt.sign(inputs.payload, secret, {expiresIn: '30m'});
    return token; e
  }


};


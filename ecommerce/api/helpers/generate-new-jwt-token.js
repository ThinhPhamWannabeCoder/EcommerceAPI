const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Generate new jwt token',


  description: 'Jwt token will be used to the future for fast authentication and authorization',


  inputs: {
    subject:{
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const payload = {
      subject: inputs.subject,
      iss: 'Thinh Ecommerce',
    }
    const secret = 'bacd60458c82c5ab076c5458426cff02f54e78b1c0cce45bf6fea16b0514aaf4';
    const token = jwt.sign(payload, secret, {expiresIn: '1d'});
    return token;
  }


};


const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Jwt validicate',


  description: '',


  inputs: {
    token: {
      type: 'string',
      require: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    const secret = sails.config.jwtSecretKey;

    await jwt.verify(inputs.token, secret,{ issuer: 'your_issuer'})
      .then(decode =>{
        return decode
      })
      .catch(err =>{
        return err
      })
    
  }


};


const fs = require('fs');

module.exports = {


  friendlyName: 'Delete file',


  description: '',


  inputs: {
    url:{
      type: 'string',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    try {
      const {url} = inputs;
      fs.unlinkSync(url);
      return exits.success(1)

    } catch (err) {
      sails.log.error('Unhandled error:', err);
      return exits.error(new CustomError(500, 'Internal Server Error'));
    }
  }


};


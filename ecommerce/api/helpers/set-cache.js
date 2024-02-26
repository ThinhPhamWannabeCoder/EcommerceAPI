var util = require('util')

module.exports = {


  friendlyName: 'Set cache',


  description: '',


  inputs: {
    key:{
      type: 'string',
      require: true
    },
    value:{
      type: 'string',
      require: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    try {
      const {key, value} = inputs
      console.log(TTL)
      await sails.getDatastore('cache').leaseConnection(async (db)=>{
        await (util.promisify(db.setex).bind(db))(key, TTL, value)
      })
      return 1
    } catch (error) {
      console.log(error)

      return error;
    }
    
  }


};


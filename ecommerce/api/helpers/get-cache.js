var util = require('util')

module.exports = {


  friendlyName: 'Get cache',


  description: '',


  inputs: {
    key:{
      type: 'string',
      require: true
    }
  },


  exits: {

    success: {
      outputFriendlyName: 'Cache',
    },

  },


  fn: async function (inputs) {
    
      const {key}  = inputs
      
      await sails.getDatastore('cache').leaseConnection(async (db) =>{
        var found = await (util.promisify(db.get).bind(db))(key)

        // console.log('hihi')
        if(found === null){
          return false
        }
        return JSON.parse(found)

      })

  }


};


var util = require('util')
module.exports = {


  friendlyName: 'Err',


  description: 'Err test.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    
      try {

        const userId = /*req.user.id*/ 1; // Assuming you have user authentication
        const userStatusKey = `user:${userId}:status`;
  
        await sails.getDatastore('cache').leaseConnection(async (db)=>{
          await (util.promisify(db.setex).bind(db))(userStatusKey, 60, JSON.stringify('nothing'))
        })
        
        return this.res.status(200).json({
          status: 200,
          message: 'fine'
        })
      } catch (error) {
        return this.res.status(500).json({
          status: 500,
          message: 'not good'
        })
      }
  }

};

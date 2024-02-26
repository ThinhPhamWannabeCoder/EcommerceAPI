module.exports = {


  friendlyName: 'Get online userline user',


  description: '',


  inputs: {
    // Query string se o trong nauy
  },


  exits: {

  },


  fn: async function (inputs) {
      // const userId = /*req.user.id*/ 1; // Assuming you have user authentication
      // const userStatusKey = `user:${userId}:status`;
      // var result;
      // // await sails.getDatastore('cache').leaseConnection(async (db)=>{
      // //   await (util.promisify(db.setex).bind(db))(userStatusKey, 60, JSON.stringify('notthing'))
      // // })
      // await sails.getDatastore('cache').leaseConnection(async (db) =>{
      //   var found = await (util.promisify(db.get).bind(db))(userStatusKey)

      //   console.log('hihi')
      //   if(found === null){
      //     return this.res.status(500).json({
      //       status: 404,
      //       message: "can't find shit"
      //     })
      //   }
      //   result = JSON.parse(found)

      // })
  }


};

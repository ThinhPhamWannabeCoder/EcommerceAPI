module.exports = {


  friendlyName: 'Get info',


  description: '',


  inputs: {

  },


  exits: {
    userNotFound:{
      statusCode: 400,
      description: 'User not found',
    },
    error: {
      statusCode: 404,
      description: "something wrong"
    }
  },


  fn: async function (inputs,exits) {

    try {
      const email = this.req.session.email
      // console.log(typeof userId)
      const user = await Users.findOne({ email: email});
      if(!user){
        return exits.userNotFound({
          error: 'User not found'
        })
      }
      return exits.success({
        user
      })
    } catch (err) {
      return exits.error({
        message: 'something went wrong'
      });
    }
  }


};

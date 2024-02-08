module.exports = {


  friendlyName: 'Change password',


  description: '',


  inputs: {
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    }
  },


  exits: {
    success:{
      statusCode: 200,
      desription: 'password has been changed successfully'
    }
  },


  fn: async function (inputs, exits) {
    try{
      const email = this.req.session.email;
      const newPassword = inputs.password
      await Users.update({email: email}).set({password: newPassword})
      this.req.session.destroy();
      return exits.success({
        message: "Password has been successfully changed, please login agin"
      })

    }
    catch(err){ 
      return exits.error({
        message: 'Oops an error occured',
        error: error.message
      });
    }


  }


};

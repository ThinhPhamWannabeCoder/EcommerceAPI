module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: {
    
  },


  fn: async function (inputs, exits) {
    try {
    
      this.req.session.destroy()
      return exits.success({
        message: "logout successfully"
      })
    } catch (error) {
      return exits.error({
        message: 'something went wrong'
      });
    }
    

  }


};

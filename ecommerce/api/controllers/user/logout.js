module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: {
    
  },


  fn: async function (inputs, exits) {
    try {
      const email  = this.req.session.email;
      this.req.session.destroy()
      return this.res.customSuccess(200, {
        message: `${email} logout successfully`
      })
    } catch (err) {
      return this.res.customError(err)
    }
    

  }


};

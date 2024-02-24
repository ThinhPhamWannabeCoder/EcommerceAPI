module.exports = {


  friendlyName: 'Reset password',


  description: '',


  inputs: {
    token:{
      type: 'string',
      require: 'true'
    },
    password: {
      type: 'string',
      require: 'true'
    }
  },

  exits: {

  },


  fn: async function (inputs) {
    try {
      const {token, password} = inputs;
    // Check token get user
      const user = await Users.findOne({
        passwordResetToken:token
      })
      // User hasn't confirmed can't reset password
      if(!user || user.passwordResetTokenExpiresAt <= Date.now() || user.emailStatus==='unconfirmed'){
        throw new CustomError(404, 'The provided token is expired, invalid, or already used up.')
      }

    // Hash password -- Already in User
 
    // Update
      await Users.updateOne({
        id: user.id
      }).set({
        password: password,
        passwordResetToken: '',
        passwordResetTokenExpiresAt: 0,
      }).intercept(()=>{
        return new CustomError(500, 'Interal Server Error')
      })
    // Return
      return this.res.customSuccess(200,{
        status: 200,
        message: 'Message has been updated please re-login'
      })
    // All done.
    } catch (error) {
      return this.res.customError(err)
    }

  }


};

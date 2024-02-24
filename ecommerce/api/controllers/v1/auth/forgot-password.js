module.exports = {


  friendlyName: 'Forgot password',


  description: 'This action will be served to help user change their password by verify through their email',


  inputs: {
    email: {
      type: 'string',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    try {
      const userEmail = inputs.email
      const user = await Users.findOne({
          email: userEmail
      })

      if(!user || user.emailStatus==='unconfirmed'){
        throw new CustomError(404, "User not found")
      }

      const token = await sails.helpers.strings.random('url-friendly');
      const expireIn = sails.config.custom.passwordResetTokenTTL + Date.now();
      const confirmLink = `${sails.config.custom.baseUrl}/api/v1/auth/reset-password?token=${token}`

      await Users.update({
        id: user.id
      }).set({
        passwordResetToken: token,
        passwordResetTokenExpiresAt: expireIn
      }).intercept(()=>{ 
        return new CustomError(500, "Server Internal Error") 
      })
      
      const header = 'Reset Password'
      const message = 'Thank you for signing up! Please verify your email by clicking the link below:'

      await sails.helpers.sendEmail(userEmail,confirmLink, header, message).intercept(()=>{
        return new CustomError(500, "Interal Server Error")

      })

      return this.res.customSuccess(200,{
        message: `Please check your email to change your passwrod`,
      })
    } catch (err) {
      return this.res.customError(err)
    }

  }


};

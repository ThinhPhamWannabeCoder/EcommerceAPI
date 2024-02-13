module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    email:{
      type: 'string',
      isEmail: true,
      required: true,
    },
    password:{
      type: 'string',
      required: true,
    }
  },


  exits: {
  
  },


  fn: async function (inputs, exits) {
    try {
      const {email, password} = inputs;
      const user = await Users.findOne({
        email: email
      });
      if(!user){
        throw new CustomError(404, 'Account was not found')
      }
      await sails.helpers.passwords.checkPassword(password, user.password)
          .intercept('incorrect', ()=>{
            return new CustomError(401, 'Email or password is incorrect.')
          });
        // Tiep tuc handle, intercept tai day neu can, de co the phat hien phan nao co van di
      const token =  await sails.helpers.generateNewJwtToken(email).intercept(()=>{
        return new CustomError(401, 'JWT is not available')
      });
      this.req.session.email = email;
      // sails.log.info(`POST: user: ${email} logged in`)
      return this.res.customSuccess(200,{
        message: `${email} has been logged in`,
        data: user,
        token,
      })
    } catch (err) {
      return this.res.customError(err)
    }

  }


};

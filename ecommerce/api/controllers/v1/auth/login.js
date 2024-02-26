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
      }).populate('roles');
      if(!user /*|| user.emailStatus==='unconfirmed'*/){
        throw new CustomError(404, 'Account was not found')
      }
      await sails.helpers.passwords.checkPassword(password, user.password)
          .intercept('incorrect', ()=>{
            return new CustomError(401, 'Email or password is incorrect.')
          });
        // Tiep tuc handle, intercept tai day neu can, de co the phat hien phan nao co van di
      user.roles = user.roles.map(role => role.name)
      const payload = {
        userId: user.id,
        email : user.email,
        roleNames: user.roles
      }
      
      const token =  await sails.helpers.generateNewJwtToken(payload).intercept(()=>{
        return new CustomError(401, 'JWT is not available')
      });
      // this.req.session.email = email;
      // this.req.session.username =  'Thinh'
      const key = `user:${user.id}:status`
      const value = "online"
      await sails.helpers.setCache(key, value)
        .intercept((x)=>{
          return new CustomError(500, 'Internal Server Error')
        })
      this.res.set('Authentication',`Bearer ${token}`)
      return this.res.customSuccess(200,{
        status: 200,
        message: `${email} has been logged in`,
        // test: this.req.session.username
      })
    } catch (err) {
      return this.res.customError(err)
    }

  }


};

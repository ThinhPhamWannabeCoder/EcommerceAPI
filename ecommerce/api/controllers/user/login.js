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
    success:{
      description: 'Login Successful',
    },
    notAUser:{
      statusCode: 404,
      description: 'User not found',
    },
    passwordMismatch:{
      statusCode: 401,
      description: 'Password do not match',
    },
    operationError:{ 
      statusCode: 400,
      description: 'The request was formed properly'
    },
    error: {
      description: 'Something went wrong',
    }
  },


  fn: async function (inputs, exits) {
    try {
      const {email, password} = inputs;
      const user = await Users.findOne({
        email: email
      });
      if(!user){
        return exits.notAUser({
          error: "Account was not found"
        })
      }
      await sails.helpers.passwords.checkPassword(password, user.password)
          .intercept('incorrect', ()=>{
            return exits.passwordMismatch({
              error: 'Email or password is incorrect.'
            })
          });
      const token =  await sails.helpers.generateNewJwtToken(email);

      
      this.req.session.email = email;

      return exits.success({
        message: `${email} has been logged in`,
        data: user,
        token,
      })
    } catch (err) {
      // sails.log.error(error);
      if (err.isOperational) {
        return exits.operationalError({
          message: `Error logging in user ${inputs.email}`,
          error: error.raw,
        });
      }
      return exits.error({
        message: `Error logging in user ${inputs.email}`,
        error: error.message,
      });
    }

  }


};

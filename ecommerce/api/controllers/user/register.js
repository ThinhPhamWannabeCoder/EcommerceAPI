module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    name:{
      type: 'string',
      required: true
    },
    email:{
      type: 'string',
      isEmail: true,
      required: true,
    },
    password:{
      type: 'string',
      required: true,
      minLength: 6,

    }
  },


  exits: {
    success:{
      statusCode: 200,
      description: 'New muna user created',
    },
    emailAlreadyInUsee:{
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Something went wrong',
    }
  },


  fn: async function (inputs, exits) {
    try{
      const {name, email, password} = inputs;
      const newEmailAddress = email.toLowerCase();
      let newUser = await Users.create({
        name: name,
        email: newEmailAddress,
        password: password
      }).fetch();
      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,

      })
    }
    catch(err){
      if(error.code === 'E_UNIQUE'){
        return exits.emailAlreadyInUsee({
          message: 'Oops an error occured',
          error: 'This email address already exits',
        })
      };
      if(error.code === 'E_MISSING_OR_INVALID_PARAMS'){
        return exits.error({
          error: 'Email or Password haven\'t meet standard',
        })
      }
      return exits.error({
        message: 'Oops an error occured',
        error: error.message
      });
    }

  }


};
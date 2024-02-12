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
      let bUser = await Users.create({
        name: name,
        email: newEmailAddress,
        password: password
      })
      .fetch();
      // Make sure default role: buyer is set in database
      sails.log(`Created user ${bUser.email}`)
      await Users.addToCollection(bUser.id, 'roles', 1);

      let newUser = await Users.findOne({email: email}).populate('roles')
      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,

      })
    }
    catch(err){
      if(err.code === 'E_UNIQUE'){
        return exits.emailAlreadyInUsee({
          message: 'Oops an error occured',
          error: 'This email address already exits',
        })
      };
      if(err.code === 'E_MISSING_OR_INVALID_PARAMS'){
        return exits.error({
          error: 'Email or Password haven\'t meet standard',
        })
      }
      sails.log.error(`Created user ${bUser.email}`)

      return exits.error({
        message: 'Oops an error occured',
        error: err.message
      });
    }

  }


};

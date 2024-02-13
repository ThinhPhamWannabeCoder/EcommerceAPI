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

  },


  fn: async function (inputs, exits) {
    try{
      const {name, email, password} = inputs;
      const newEmailAddress = email.toLowerCase();
      let bUser = await Users.create({
        name: name,
        email: newEmailAddress,
        password: password
      }).intercept('E_UNIQUE',()=>{       
        return new CustomError(400, "There's already an account using that email")
        // throw CustomError()
      }).intercept('E_MISSING_OR_INVALID_PARAMS', ()=>{
        return new CustomError(404, "Email or Password haven't met standard")
      })
      .fetch();
      // Make sure default role: buyer is set in database
      sails.log(`Created user ${bUser.email}`)
      await Users.addToCollection(bUser.id, 'roles', 1);

      let newUser = await Users.findOne({email: email}).populate('roles')

      return this.res.customSuccess(201,{
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
      })
    }
    catch(err){
      return this.res.customError(err)
    }

  }


};

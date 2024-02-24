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

      const token = await sails.helpers.strings.random('url-friendly');
      const expireIn = sails.config.custom.emailProofTokenTTL + Date.now();


      var bUser = await Users.create({
        name: name,
        email: newEmailAddress,
        password: password,
        emailProofToken: token,
        emailProofTokenExpiresAt: expireIn
      }).intercept('E_UNIQUE',()=>{       
        return new CustomError(400, "There's already an account using that email")
      }).intercept('E_MISSING_OR_INVALID_PARAMS', ()=>{
        return new CustomError(404, "Email or Password haven't met standard")
      })
      .fetch();
      
      const confilmLink = `${sails.config.custom.baseUrl}/api/v1/auth/verify?token=${token}`
     
    
      // SENDEMAIL
      const header = 'Email Verification'
      const message = 'Thank you for signing up! Please verify your email by clicking the link below:'
      await sails.helpers.sendEmail(email, confilmLink, header, message).intercept(()=>{
        return new CustomError(500, "Interal Server Error")

      })

      // By default through this URL, Every account will be assign to role: Buyer
      await Users.addToCollection(bUser.id, 'roles', 1);
      sails.log(`Created user ${bUser.email}`)

      // await Users.findOne({email: email}).populate('roles')

      
      return this.res.customSuccess(201,{
        message: `An account has been created for ${email} successfully. Check your email (gmail) to verify`,
      })
    }
    catch(err){
      return this.res.customError(err)
    }

  }


};

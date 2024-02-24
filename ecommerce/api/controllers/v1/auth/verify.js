module.exports = {


  friendlyName: 'Verify',


  description: 'Verify auth.',


  inputs: {
    token: {
      type: 'string',
      required: true,
      description: 'The verification token sent in the email link.',
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    try{
      const token = inputs.token;
      if(!token){
        throw new CustomError(404, 'The provided token is expired, invalid, or already used up.')
      }
      
      const user = await Users.findOne({
        emailProofToken: token
      })
      if(!user || user.semailProofTokenExpiresAt <= Date.now()){
        throw new CustomError(404, 'The provided token is expired, invalid, or already used up.')
      }
      
      if(user.emailStatus === 'unconfirmed'){
        await Users.update({
          id: user.id
        }).set({
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          emailStatus: 'confirmed'
        }).intercept(()=>{
          throw new CustomError(500, 'Interal Server Error')
        })
      }
      return this.res.customSuccess(200,{
        status: 200,
        message: `Account ${user.email} is verified`
      });
    }
    catch(err){
      return this.res.customError(err)

    }
    

  }


};

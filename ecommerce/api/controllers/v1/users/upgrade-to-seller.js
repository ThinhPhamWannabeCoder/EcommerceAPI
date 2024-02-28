module.exports = {


  friendlyName: 'Upgrade to seller',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {
    // const id = this.req.user.userId
    // const email = this.req.user.email
    // const roles = this.req.user.roles
    try {
      const userId = 1;
      const userEmail = 'thinh';
      const sellerId = 2;
      const roles = ['buyer'];
      // IsLoggedIn da kiem tra cho minh roi nen khong can phai kiem tra laj email status nua
      if(roles.includes('seller') || roles.includes('admin') || roles.includes('delivery') ){
        throw new customError(400, 'User was already seller or not allowed')
      }

      await Users.addToCollection(userId, 'roles', sellerId).intercept(()=>{
        return new customError(500, 'Interal Sever Error');
      })

      const {iss, iat, exp, ...newPayload}=this.req.user;
      // const newPayload = this.req.user;
      newPayload.roles.push('seller');
      
      const newToken =  await sails.helpers.generateNewJwtToken(newPayload)
    
      this.res.set('Authentication',`Bearer ${newToken}`)

      return this.res.customSuccess(200, {
        status: 200,
        message: `${userEmail} has been upgraded to be a Seller\n Please redirect to create Store`
      });
    } catch (err) {
      return this.res.customError(err);
    }
   
  }


};

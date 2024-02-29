module.exports = {


  friendlyName: 'Get store info',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    try {
      const storeId = this.req.param('id');
      const userId = this.req.user.userId;

      const store = await Store.findOne({
        id: storeId
      });     
      if(!store|| store.owner  !== userId ){
        throw new CustomError(403, "You're not the owner or store is not exists") 
      }
      // Con phai Fetch them
      //  Ward, District, City
      return this.res.customSuccess(200,{
        status: 200,
        store
      })
    } catch (err) {
      return this.res.customError(err);
    }
  }


};

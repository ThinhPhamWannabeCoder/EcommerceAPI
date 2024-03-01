module.exports = {


  friendlyName: 'Get all',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      const {storeId }= this.req.params;
      // console.log(storeId)
      const userId = this.req.user.userId

      // Checking owner 
      const store = await Store.findOne({
        id: storeId
      });

      if(!store|| store.owner  !== userId ){
        throw new CustomError(403, "You're not the owner or store is not exists") 
      }
      // const result = Product.find({
      //   store: storeId
      // }).intercept(()=> new CustomError(500, 'Internal Server Error'))
      const result = await Product.find({
        where: { store: storeId}})
      .intercept(() => new CustomError(500, 'Internal Server Error'));

      return this.res.customSuccess(200, result)
    } catch (err) {
      return this.res.customError(err)
    }
    

  }


};

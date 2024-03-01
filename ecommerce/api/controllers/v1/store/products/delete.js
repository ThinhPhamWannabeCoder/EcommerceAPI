module.exports = {


  friendlyName: 'Delete',


  description: 'Delete product.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      const {storeId, productId }= this.req.params
      const userId = this.req.user.userId
      const store = await Store.findOne({
        id: storeId
      });

      if(!store|| store.owner  !== userId ){
        throw new CustomError(403, "You're not the owner or store is not exists") 
      }
      const product = await Product.findOne({id: productId});

      if(/*!productId || */product.store != storeId){
        throw new CustomError(403, "You're not the owner or product is not exists") 
      }
      await Product.destroyOne({
        id: productId
      }).intercept(() => new CustomError(400, 'Somthing went wrong'))
        return this.res.customSuccess(200, {
          status: 200,
          message: `Product deleted successfully`
        })
    } catch (err) {
      return this.res.customError(err)
    }
    
  }


};

module.exports = {


  friendlyName: 'Delete',


  description: 'Delete product.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      const productId = this.req.params.productId;
      const product = await Product.findOne( {id: productId});
      if(!product){
        throw new CustomError(404, 'Product-id is already deleted before')
      }
      await Product.destroy( {id : productId})
      return this.res.customSuccess(200, {
        message: "Delete successfully"
      })
    } catch (err) {
      return this.res.customError(err)
    }
    
  }


};

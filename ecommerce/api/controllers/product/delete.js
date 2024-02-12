module.exports = {


  friendlyName: 'Delete',


  description: 'Delete product.',


  inputs: {

  },


  exits: {
    deleteSuccess:{
      statusCode: 200,
      description: "Deleted successfully"
    },
    productNotFound: {
      statusCode: 404,
      description: 'Product not found',
    },
    internalError:{
      statusCode: 500,
      description: "Some thing logically went wrong"
    }
  },


  fn: async function (inputs, exits) {
    try {
      const productId = this.req.params.productId;
      const product = await Product.findOne( {id: productId});
      if(!product){
        sails.log.warn('DELETE 404: product already deleted')
        // console.log(process.cwd())
        return exits.productNotFound({
          error: "Product-id is already deleted before in database" 
        })
      }
      await Product.destroy( {id : productId});
      sails.log.info(`DELETE 200: deleted ${productId}`)
      return exits.deleteSuccess({
        message: "Delete successfully"
      })
    } catch (error) {
      if(err.code === 'AdapterError' ){
        sails.log.error('DELETE: 500 - product/delete- Something went wrong with database adpater in Postgres')
        return exits.internalError({
          error: 'Internal error'
        })
      }
      if(err.code === 'UsageError' ){
        sails.log.error('DELETE: 500 - UsageError at created product/delete')
        return exits.internalError({
          error: 'Internal error'
        })
      }
      sails.log.error('DELETE 500 - Some thing went wrong with product/delete')

      return exits.internalError({
        error: 'Internal error'
  
       })
    }
    
  }


};

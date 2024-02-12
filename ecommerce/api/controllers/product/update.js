module.exports = {


  friendlyName: 'Update',


  description: 'Update product.',


  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    desc: {
      type: 'string',
      required: true,
    },
    total_inventory: {
      type: 'number',
      required: true,
    },
    subcategory_id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    updateSuccess:{
      statusCode: 200,
      description: "Deleted successfully"
    },
    productNotFound: {
      statusCode: 404,
      description: 'Product not found',
    },
    criteriaError:{
      statusCode: 400,
      description: 'Criteria for filter record went wrong'
    },
    internalError:{
      statusCode: 500,
      description: "Some thing logically went wrong"
    }
  },


  fn: async function (inputs, exits) {

    try {
      const productId = this.req.params.productId;
      const {name, desc, total_inventory, subcategory_id} = inputs;
      await Product.update({id: productId}).set({
        name: name,
        desc: desc,
        total_inventory: total_inventory,
        subCategory: subcategory_id
      })
      sails.log(`PUT product/udate: 200: updated product ${productId}`)
      return exits.updateSuccess({
        message: `Product ${productId} updated successfully`
      })
    } catch (err) {
      if(err.code === 'E_NOT_FOUND'){
        sails.log.warn(`PUT product/udate: 404: product ${productId} not found`)

        return exits.productNotFound({
          error: `Product ${productId} not found`
        })
      }
      if(err.code === 'E_INVALID_CRITERIA'){
        sails.log.warn(`PUT product/udate: 400: product ${productId} has invalid criteria`)

        return exits.criteriaError({
          error: `Criteria ${productId} is not proper`
        })
      }
      if(err.code === 'AdapterError' ){
        sails.log.error('POST: 500 - createProduct - Something went wrong with database adpater in Postgres')
        return exits.internalError({
          error: 'Internal error'
        })
      }
      if(err.code === 'UsageError' ){
        sails.log.error('POST: 500 - UsageError at created product action')
        return exits.internalError({
          error: 'Internal error'
        })
      }
      sails.log.error(`PUT product/udate: 404: product ${productId} Some thing went wrong with product/update`)
      return exits.error({
        error: err.message
      })
      
    }

  }


};

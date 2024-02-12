module.exports = {


  friendlyName: 'Create',


  description: 'Create product.',


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
    created: {
      statusCode: 201,
      description: "Product has been created successfullly"
    },
    operationError:{ 
      statusCode: 400,
      description: 'The request was formed properly'
    },
    internalError:{
      statusCode: 500,
      description: "Some thing logically went wrong"
    }


  },


  fn: async function (inputs, exits) {
    try {
      const {name, desc, total_inventory, subcategory_id} = inputs

      const newProduct = await Product.create({
        name: name,
        desc: desc,
        total_inventory: total_inventory,
        subCategory: subcategory_id
      }).fetch();

      // All done.
      sails.log.info(`POST 201: create new product ${newProduct.id}: ${newProduct.name}`)

      return exits.created({
        message: `product ${newProduct.id} has been created`
      });
    } catch (err) {
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
      sails.log.error('POST 500 - Some thing went wrong with product/create')

      return exits.internalError({
        error: 'Internal error'
  
       })

    }
    

  }


};

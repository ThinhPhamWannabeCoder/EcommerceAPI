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
      }).intercept((err)=>{
        return new CustomError(400, err.message)
      })
      .fetch();
  
      return this.res.customSuccess(201, {
        message: `product ${newProduct.id} has been created`
      })
    } catch (err) {
      return this.res.customError(err)

    }
    

  }


};

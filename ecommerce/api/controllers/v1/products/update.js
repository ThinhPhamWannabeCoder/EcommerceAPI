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

  },


  fn: async function (inputs, exits) {

    try {
      const productId = this.req.params.productId
      // const product =
      if(!await Product.findOne({id:productId})){
        throw new CustomError(404, `product ${productId} not found`)
      }
      const {name, desc, total_inventory, subcategory_id} = inputs;
      await Product.update({id: productId}).set({
        name: name,
        desc: desc,
        total_inventory: total_inventory,
        subCategory: subcategory_id
      }).intercept((err) => {
        return new CustomError(404, err.message)
      })
      return this.res.customSuccess(200,{
        message: `Product ${productId} updated successfully`
      })
    } catch (err) {
      return this.res.customError(err)
      
    }

  }


};

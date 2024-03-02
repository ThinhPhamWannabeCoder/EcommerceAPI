module.exports = {


  friendlyName: 'Check inventory',


  description: '',


  inputs: {
    productId:{
      type: 'number',
      required: true
    },
    amount:{
      type: 'number',
      required: true
    }
  },


  exits: {

    success: {
      description: 'Can be added to order or cart.',
    },
    error:{
      description: 'Out of order'
    }

  },


  fn: async function (inputs, exits) {
    try {
      const {productId, amount} = inputs;
      // Fetch
      const product = await Product.findOne({
        id: productId
      })
      if(!product){
        return exits.error(new CustomError(400, 'No product found'));
      }
      // Product Inventory have to at least surpass the order amount
      if(product.inventory >= amount){
        return exits.success(1);
      }
      return exits.sucess(0)
      
    } catch (error) {
      return exits.error(new CustomError(500, 'Internal Server Error'));
    }
  }


};


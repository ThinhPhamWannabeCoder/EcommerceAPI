module.exports = {


  friendlyName: 'Create cart',


  description: '',


  inputs: {
    productId:{
      type: 'number',
      required: true
    },
    amount: {
      type: 'number',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    try {
      const {productId, amount} = inputs
      const result = await sails.helpers.checkInventory(productId, amount).intercept(()=>{
        return new CustomError(500, 'huhu')
      });
      return this.res.customSuccess(200,{
        status: 200,
        message: result
      })
    } catch (err) {
      return this.res.customError(err)
    }

  }


};

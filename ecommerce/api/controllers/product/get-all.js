module.exports = {


  friendlyName: 'Get all',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      const result = await Product.find().populate('subCategory');
      return this.res.customSuccess(200, result)
    } catch (err) {
      return this.res.customError(err)
    }
    

  }


};

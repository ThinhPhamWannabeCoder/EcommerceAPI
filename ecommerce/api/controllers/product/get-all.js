module.exports = {


  friendlyName: 'Get all',


  description: '',


  inputs: {

  },


  exits: {
    internalError:{
      statusCode: 500,
      description: "Some thing logically went wrong"
    }
  },


  fn: async function (inputs, exits) {
    try {


      const result = await Product.find().populate('subCategory');
      // const category = await ProductCategory.findOne({
      //   id: 1
      // })

      // x = result.subCategory.productCategory
      // sails.log(x)
      sails.log.info('GET: 200: Get all product')
      return exits.success({
        result,


      })


    } catch (err) {
     if(err.code === 'AdapterError' ){
      sails.log.error('Something went wrong with database adpater in Postgres')
      return exits.internalError({
        error: 'Internal error'
      })
     }
     if(err.code === 'UsageError' ){
      sails.log.error('UsageError at getAll product action')
      return exits.internalError({
        error: 'Internal error'
      })
     }
     sails.log.error('Something went wrong at getAll product action')
     return exits.internalError({
      error: 'Internal error'

     })
    }
    

  }


};

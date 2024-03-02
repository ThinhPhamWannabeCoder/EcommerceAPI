/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */


module.exports = {

  attributes: {

    name:{
      type: 'string',
      required: true,
      // columnType: 'NVARCHAR(255)'
    },
    desc:{
      type: 'string',
      required: true,
      columnType: 'TEXT'

    },
    inventory:{
      type: 'number',
    },
    // store:{
    //   columnName: 'store_id',
    //   model: 'store'
    // },
    subCategory:{
      columnName: 'subcategory_id',
      model: 'subProductCategory',
    },
    images:{
      collection: 'productImages',
      via: 'product',
    },
    // inventory:{
    //   collection: 'store',
    //   via: 'product',
    //   through: 'inventory'
    // }
    buyersPutInCart:{
      collection: 'users',
      via: 'products',
      through: 'cart'
    },
    ordersDetail:{
      collection: 'orderDetail',
      via: 'product',
    }



  },
  beforeCreate: async function(values, proceed){
    if(await SubProductCategory.findOne({
      id: values.subCategory
    })){
      return proceed()
    }
    sails.log.error(values.subCategory)
    return proceed(new Error("There's no subcategry id"))
  },
  beforeUpdate: async function(values, proceed){
    
    if(!await ProductCategory.findOne({id: values.subCategory}) ){
      return proceed(new Error("There's no subcateogry id"))
    }
    return proceed()
    
  }
  // beforeCreate: async function (values, proceed) {
  //   try {
  //     // Check if the referenced userId exists in the User model
  //     const userExists = await User.findOne({ id: values.userId });

  //     if (!userExists) {
  //       return proceed({ error: 'User not found' }); // Abort the create operation
  //     }

  //     // Continue with the create operation if the user exists
  //     return proceed();
  //   } catch (error) {
  //     console.error(error);
  //     return proceed(error); // Handle other errors
  //   }
  

};


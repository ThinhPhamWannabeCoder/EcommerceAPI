/**
 * OrderDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    order:{
      columnName: 'order_id',
      model: 'orders',
      required: true,
    },
    product:{
      columnName: 'product_id',
      model: 'product',
      required: true
    },
    amount:{
      type: 'number',
      required: true,
    },
    // totalPrice:{
    //   type: 'number'
    // }
    // Will be added later

  },

};


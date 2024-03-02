/**
 * Cart.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
// Will only be save on Redis ? - how
  attributes: {

    buyers:{
      columnName: 'buyer_id',
      required: true,
      model: 'users'
    },
    products:{
      columnName: 'product_id',
      required: true,
      model: 'product',
    },
    amount:{
      type: 'number',
      required: true,
    }

  },

};


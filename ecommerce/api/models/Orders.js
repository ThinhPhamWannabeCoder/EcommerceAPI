/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    buyer:{
      columnName: 'buyer_id',
      model: 'users',
      required: true,
    },
    contact:{
      columnName: 'contact_id',
      model: 'userDeliveryContacts',
      required: true
    },
    // Date da duoc tao default

  },

};


/**
 * ProductImages.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    product:{
      columnName: 'product_id',
      model: 'product'
    },
    imageUrl:{
      type: 'string',
      required: true
    }

  },

};


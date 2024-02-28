/**
 * City.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'city',

  attributes: {
    name:{
      type: 'string',
      // columnName: 'city_name',
      required: true,
      unique: true

    },
    ward:{
      collection: 'district',
      via: 'city'
    }

  },

};


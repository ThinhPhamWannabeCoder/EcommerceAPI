/**
 * District.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'district',
  attributes: {
    name:{
      type: 'string',
      required: true,
      unique: true
    },
    city:{
      columnName: 'city_id',
      model: 'city',
    },
    ward:{
      collection: 'ward',
      via: 'district'
    }

  },

};


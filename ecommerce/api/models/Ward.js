/**
 * Ward.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'ward',
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    district:{
      columnName: 'district_id',
      model: 'district',
    },
    storeLocation:{
      collection: 'store',
      via: 'ward'
    },
    userLocation:{
      collection: 'userLocation',
      via: 'ward'
    }

  },

};


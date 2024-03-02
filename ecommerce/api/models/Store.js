/**
 * Store.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'store',
  attributes: {
    name:{
      type: 'string',
      required: true,
    },
    owner:{
      columnName: 'owner_id',
      model: 'users',
      unique: true,
    },
    // These are locations
    ward:{
      columnName: 'ward_id',
      model: 'ward',
      required: true,
    },
    location:{
      type: 'string',
      required: true,
    },
    bio:{
      type: 'string',
      allowNull: true,
    },
    avatarUrl:{
      type: 'string',
      description: "Avatar URL will be stored here for FE to fetch",
      allowNull: true,
    },
    // product:{
    //   collection: 'product',
    //   via: 'store'
    // }
    // inventory:{
    //   collection: 'product',
    //   via: 'store',
    //   through: 'inventory'
    // }
  },

};


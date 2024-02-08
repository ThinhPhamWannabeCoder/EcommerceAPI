/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    name:{
      type: 'string',
      required: true,
      // columnType: 'NVARCHAR(100)' - recommeded for the future
    },
    email:{
      type: 'string',
      required: true,
      unique: true,
    },
    password:{
      type: 'string',
      required: true,

    },
    birthdate:{
      type: 'ref',
      columnType: 'date',
      // allowNull: true,
    },
    phone:{
      type: 'string',
      allowNull: true,

    },
    gender:{
      type: 'string',
      allowNull: true,

    },
    bio:{
      type: 'string',
      allowNull: true,


    },
    // avatar:{
    //   type: 'string',
    // },
    roles:{
      collection: 'roles',
      via: 'users',
      // through: 'usersRoles'

    }
  },
  customToJSON: function(){
    return _.omit(this, ["password"]);
  },
  
  beforeCreate: async function(record, proceed){
    const hashPassword = await sails.helpers.passwords.hashPassword(record.password);
    record.password = hashPassword;
    return proceed()
  }

};


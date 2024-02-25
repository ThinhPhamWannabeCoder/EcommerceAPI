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
      // type: 'number',
      // isDate: true, // This indicates that the input should be a valid date string
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
    avatarUrl:{
      type: 'string',
      description: "Avatar URL will be stored here for FE to fetch",
      allowNull: true,
    },
    roles:{
      collection: 'roles',
      via: 'users',
      // through: 'usersRoles'
    },
    emailProofToken:{
      type: 'string',
      description: 'This will be used in the account verification email',
      columnName: 'email_proof_token',
    },
    emailProofTokenExpiresAt:{
      type: 'number',
      description:
        'time in milliseconds representing when the emailProofToken will expire',
      columnName: 'email_proof_token_expires_at',
    },
    emailStatus:{
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'unconfirmed',
      columnName: 'email_status',
    },
    passwordResetToken: {
      type: 'string',
      description:
        'A unique token used to verify the user\'s identity when recovering a password.',
      columnName: 'password_reset_token',
    },
    passwordResetTokenExpiresAt: {
      type: 'number',
      description:
        'A timestamp representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).',
      example: 1508944074211,
      columnName: 'password_reset_token_expires_at',
    },
  },
  
  customToJSON: function(){
    return _.omit(this, ["password"]);
  },
  
  beforeCreate: async function(record, proceed){
    const hashPassword = await sails.helpers.passwords.hashPassword(record.password);
    record.password = hashPassword;
    return proceed()
  },
  beforeUpdate: async function(record, proceed){
    if(record.password){
      const hashPassword = await sails.helpers.passwords.hashPassword(record.password);
      record.password = hashPassword;
    }
    return proceed()
  }

};


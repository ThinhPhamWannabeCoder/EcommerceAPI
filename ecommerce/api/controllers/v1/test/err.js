module.exports = {


  friendlyName: 'Err',


  description: 'Err test.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    
    return exits.success({
      message: "Hi there"
    })
  }

};

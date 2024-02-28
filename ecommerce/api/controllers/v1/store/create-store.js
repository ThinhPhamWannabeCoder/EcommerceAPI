module.exports = {


  friendlyName: 'Create store',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try {
      const req = this.req;
      const res = this.res;
      // const payload = req.user
      const ownderId = req.user.userId;

      const {name, wardId, location, bio} = req.body;
      let url;
      // Neu co avatar thi upload len
      // sails.helpers.uploadFile











      await Store.create({
        name: name,
        owner: ownderId,
        ward: wardId,
        location: location,
        bio: bio || '',
        avatarUrl: url,
      });
      return res.customSuccess(201,{
        status: 201,
        message: `A store name ${name} has been created`
      });
    } catch (err) {
      return res.customErrer(err)
    }
    

  }


};

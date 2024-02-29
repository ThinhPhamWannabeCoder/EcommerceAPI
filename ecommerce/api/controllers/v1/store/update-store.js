module.exports = {


  friendlyName: 'Update store',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    try {

      const storeId = this.req.param('id');
      const userId = this.req.user.userId;
      const storeAvatarPath = sails.config.storeAvatarDestination;
      const {name, wardId, location, bio} = this.req.body;

      // Phai xoa file cu da
      let url='';
      const store = await Store.findOne({
        id: storeId
      }); 
      if(!store|| store.owner  !== userId ){
        throw new CustomError(403, "You're not the owner or store is not exists") 
      }

      const oldUrl = store.avatarUrl;
      if(this.req.file('avatar')){
        url = await sails.helpers.updateFile(this.req.file('avatar'),oldUrl, storeAvatarPath);
      }
      else{
        // Xoa thang thong tin di
      }
      // Con phai Fetch them
      //  Ward, District, City


      // Update thong tin moi
      const newStore = await Store.update({
        id: store.id
      }).set({
        name: name,
        ward: wardId,
        location: location,
        bio: bio,
        avatarUrl: url
      }).fetch();

      return this.res.customSuccess(200,{
        status: 200,
        newStore
      })
    } catch (err) {
      return this.res.customError(err);
    }
  }

};

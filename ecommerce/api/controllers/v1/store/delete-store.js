module.exports = {


  friendlyName: 'Delete store',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    try {
      const storeId = this.req.param('id');
      // Xoa file
      const store = await Store.findOne({
        id: storeId
      })
      if(!store){
        throw new CustomError(400, 'No store found');
      }

      const url = store.avatarUrl
      console.log(url)
      await sails.helpers.deleteFile(url);
      await Store.destroyOne({
        id: storeId
      }).intercept(()=>{
        return new CustomError(500, 'Internal Server Error')
      })
      return this.res.customSuccess(200, {
        status: 200,
        message: `Store ${store.name} deleted successfully`
      });
    } catch (err) {
      return this.res.customError(err);
    }
    

  }


};

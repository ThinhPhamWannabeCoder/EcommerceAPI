
module.exports = {


  friendlyName: 'Update',


  description: 'Update product.',


  inputs: {
   
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    try {
      let req = this.req
      const {storeId, productId} = this.req.params;
      const userId = req.user.userId;
      const productImagePath = sails.config.productImagesDestination;
      const {name, desc, subCategoryId, inventory} = req.body;
      let url = '';
      let oldUrl ='';
      // Checking owner 
      const store = await Store.findOne({
        id: storeId
      });
      
      if(!store|| store.owner  !== userId ){
        throw new CustomError(403, "You're not the owner or store is not exists") 
      }
      // Check proudct  available
      const product = await Product.findOne({id: productId}).populate('images');

      if(!product || product.store != storeId){
        throw new CustomError(403, "You're not the owner or product is not exists") 
      }

      // Updating produc image if needed
      oldUrl = product.images[0].imageUrl;
      imageId = product.images[0].id;
      //  Upload file
      if(req.file('image')){
        url = await sails.helpers.updateFile(req.file('image'),oldUrl, productImagePath);
        // Xoa roi
        await ProductImages.destroyOne({
          id: imageId
        }).intercept(()=>{
          return new CustomError(500, 'Internal Server Error')
        })
      }

      // Finally update
      await Product.update({id: productId}).set({
        name: name,
        desc: desc,
        subCategory: subCategoryId,
        store: storeId
      }).intercept((err) => {
        return new CustomError(404, err.message)
      }).fetch();
      
      await ProductImages.create({
        product: productId,
        imageUrl: url
      }).intercept((err)=>{
        return new CustomError(400, err.message);
      })
      return this.res.customSuccess(200,{
        message: `Product ${productId} updated successfully`
      })
    } catch (err) {
      return this.res.customError(err)
      
    }

  }


};

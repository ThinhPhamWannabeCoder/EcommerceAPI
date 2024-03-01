module.exports = {


  friendlyName: 'Create',


  description: 'Create product.',


  inputs: {
    // name: {
    //   type: 'string',
    //   required: true,
    // },
    // desc: {
    //   type: 'string',
    //   required: true,
    // },
    // total_inventory: {
    //   type: 'number',
    //   required: true,
    // },
    // subcategory_id: {
    //   type: 'number',
    //   required: true
    // }
  },


  exits: {
    created: {
      statusCode: 201,
      description: "Product has been created successfullly"
    },
    operationError:{ 
      statusCode: 400,
      description: 'The request was formed properly'
    },
    internalError:{
      statusCode: 500,
      description: "Some thing logically went wrong"
    }


  },


  fn: async function (inputs, exits) {
    try {
      let req = this.req
      const userId = req.user.userId
      const productImagePath = sails.config.productImagesDestination
      const {storeId, name, desc, subCategoryId, inventory} = req.body
      let url = '';

      // Checking owner 
      const store = await Store.findOne({
        id: storeId
      });

      if(!store|| store.owner  !== userId ){
        throw new CustomError(403, "You're not the owner or store is not exists") 
      }

      //  Upload file
      if(req.file('image')){
        url = await sails.helpers.uploadFile(req.file('image'), productImagePath)
      }
      const newProduct = await Product.create({
        name: name,
        desc: desc,
        subCategory: subCategoryId,
        inventory: inventory,
        store: storeId,
        // images: [url]
      }).intercept((err)=>{
        return new CustomError(400, err.message);
      })
      .fetch();
      await ProductImages.create({
        product: newProduct.id,
        imageUrl: url
      }).intercept((err)=>{
        return new CustomError(400, err.message);
      })
      // thu xem []
      
  
      return this.res.customSuccess(201, {
        message: `product ${newProduct.name} has been created`
      })
    } catch (err) {
      return this.res.customError(err)

    }
    

  }


};

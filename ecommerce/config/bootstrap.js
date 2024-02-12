/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */



module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  
  // ------------- USERS MODULE ---------------
  await Roles.create({
    name: 'buyer',
    desc: 'Default role for client'

  })
  bUser = await Users.create({
    name: 'Pham Tien Thinh',
    email: 'thinhbinhthuog7@gmail.com',
    password: '12345678',

    roles: 1
  }).fetch()
  // await Users.addToCollection(bUser.id, 'roles', 1);

  // ------------- PRODUCTS MODULE ---------------
  // Product
  bProductCategory =  await ProductCategory.create({
    name: 'Fashion' 
  }).fetch()
  // sails.log.info(bProductCategory)
    // SubProduct
  await SubProductCategory.create({
    name: 'Jacket',

    productCategory: bProductCategory.id
  })
  await SubProductCategory.create({
    name: 'Hoodie',

    productCategory: bProductCategory.id
  })
  await SubProductCategory.create({
    name: 'T-Shirt',

    productCategory: bProductCategory.id
  })
  // Product
  await Product.create({
    name: 'Uniqlo Bomber Jacket',
    desc: 'Male Uniqlo Bomber for male in Vietname',
    total_inventory: 100,
    subCategory: 1
  })
  // const testResult = await  Product.findOne({
  //   id: 1
  // }).populate('subCategory')
  // sails.log(testResult)

};

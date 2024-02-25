module.exports = {


  friendlyName: 'Get info',


  description: '',


  inputs: {
    id:{
      type: 'number'
    },
    email:{
      type: 'string'
    },
    name:{
      type: 'string'
    },
    sortBy:{
      type: 'string'
    },
    sort:{
      type:'string'
    }
  },


  exits: {
    
  },


  fn: async function (inputs,exits) {

    try {
      // this.req.user.id
      const id = 1
  

      const user = await Users.find({
        id: id
      });
      if(!user){
        throw new CustomError(400, 'User not found')
      }
      const result = {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        birthdate: user[0].birthdate,
        phone: user[0].phone,
        gender: user[0].gender,
        bio: user[0].bio,
        avatarUrl: user[0].avatarUrl
      }
      
      return this.res.customSuccess(200, result)
    } catch (err) {
      return this.res.customError(err)

    }
  }


};

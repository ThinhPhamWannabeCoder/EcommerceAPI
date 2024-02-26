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
  
      const user = await Users.findOne({
        id:id
      })
      const key = `user:${user.id}`

      var value = await sails.helpers.getCache(key).intercept(()=>{
        return new CustomError(500, 'Internal Server Error')
      })
      console.log(value)
      if(!value){
        value = {
          id: user.id,
          name: user.name,
          email: user.email,
          birthdate: user.birthdate,
          phone: user.phone,
          gender: user.gender,
          bio: user.bio,
          avatarUrl: user.avatarUrl
        }

        await sails.helpers.setCache(key, JSON.stringify(value))
          .intercept(()=>{
            return new CustomError(400, 'Loi tai setCahce')
          })
        
      }

      return this.res.customSuccess(200, value)
    } catch (err) {
      // console.log(err)
      return this.res.customError(err)

    }
  }


};

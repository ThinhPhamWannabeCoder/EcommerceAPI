var sails = require('sails')

const jwt = require('jsonwebtoken');


describe("JWT", ()=>{
  // Wake sails app to do the work
    beforeAll(function (done) {
      sails.load(
        {
          hooks: { grunt: false },
          log: { level: 'warn' },
        },
        function (err) {
          if (err) {
            return done(err)
          }
          return done()
        }
      )
    })
      // Global after hook
    afterAll(function (done) {
      sails.lower(done)
    })
    

    const hookEmail = "thinh@gmail.com";
    const secretKey = 'bacd60458c82c5ab076c5458426cff02f54e78b1c0cce45bf6fea16b0514aaf4';
    const wrongKey  = 'bacd60458c82c5ab076c5458426cff02f54e78b1c0cce45bf6fea16b0514aaf3';


    it('It should generate JWT token',async ()=>{
      const token = await sails.helpers.generateNewJwtToken(hookEmail);
      // Check if this JWT was generated Correctly
      expect(token).not.toBeUndefined()
      const decode =  await jwt.verify(token,secretKey)
      expect(hookEmail).toBe(decode.email)

    })

 
    

})
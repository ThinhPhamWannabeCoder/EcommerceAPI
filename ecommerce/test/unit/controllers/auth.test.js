var sails = require('sails')
const request = require('supertest')
const jwt = require('jsonwebtoken');

describe('Auth Controller', ()=>{
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
        // here you can clear fixtures, etc.
        // (e.g. you might want to destroy the records you created above)
        sails.lower(done)
      })
      const userHook = {
        name: 'Pham Tien Thinh',
        email: 'thinhbinhthuog7@gmail.com',
        password: '12345678',
        roles: 1
      }
      

    it('Login',async ()=>{
        await request(sails.hooks.http.app)
            .post('/api/v1/auth/login')
            .send({email: userHook.email, password: userHook.password})
            .expect(200)
            .then((res)=>{
                const header = res.header['authentication']
                console.log(header)
                expect(header).not.toBeUndefined();
            })
            .catch((err)=>{
                console.log(err.message)
            })
    })
    // it('Logout',async()=>{
    //     await request(sails.hooks.http.app)
    //         .post('/api/v1/auth/login')
    //         .send({email: userHook.email, password: userHook.password})
    //         .expect(200)
    //     await request(sails.hooks.http.app)
    //         .get('/api/v1/auth/logout')
    //         .expect(200)
    //         // .send((err,res)=>{
    //         //     expect(res.body.message).toBe(``)
    //         // })
    // } )

    // it('It should generate JWT', async()=>{
    //     const subject = "thinh@gmail.com";
    //     token = await sails.helpers.generateNewJwtToken(subject)
    //     const secret = 'bacd60458c82c5ab076c5458426cff02f54e78b1c0cce45bf6fea16b0514aaf4';
    //     jwt.verify(token, secret, (err, decoded) => {
    //         if (err) {
    //           console.error('JWT Verification Failed:', err.message);
    //         } else {
    //           expect(decoded.subject).toBe(subject)
    //         }
    //       });
    // })
    it.todo("It should return user info")
    
})
const jwt = require('jsonwebtoken')
module.exports = async function (req, res, proceed){
    const auth = req.headers['authentication']

    if(!auth || !auth.startsWith('Bearer ')){
        
       return res.status(403).send({
            'error': 'Forbidden',
            'status': 403,
            'message': 'Please login',
            'data': sails.config.hi,
            'data2': sails.config.HI
       })
    }
    const secret = sails.config.jwtSecretKey;
    const token = auth.split(' ')[1]

    await jwt.verify(token, secret,{ issuer: 'Thinh Ecommerce'},(err, decode)=>{
        if(err){
            return res.status(403).send({
                'error': 'Forbidden',
                'status': 403,
                'message': 'Please re-login'
           })
        }
        req.user = decode
        return proceed()
    })


}
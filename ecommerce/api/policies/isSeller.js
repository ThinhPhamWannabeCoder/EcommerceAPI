// const jwt = require('jsonwebtoken')
module.exports = async function (req, res, proceed){
        const checkRole = 'seller';

        const roles = req.user.roles;
        if(!roles.includes(checkRole)){
                return res.status(403).send({
                        'error': 'Forbidden',
                        'status': 403,
                        'message': 'Please upgrade to seller',
                   })
        }
        
        return proceed();


}
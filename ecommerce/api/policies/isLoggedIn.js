module.exports = async function (req, res, proceed){
    if(!req.session.email){
        return res.forbidden()
    }
    return proceed();

}
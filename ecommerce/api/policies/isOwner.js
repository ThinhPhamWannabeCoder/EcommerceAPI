module.exports = async function (req, res, proceed){
  const storeId = req.param('id');
  const userId = req.user.userId
  const store = await Store.findOne({
    id: storeId
  });
  
  if(store.owner  !== userId || !store){
    return res.status(403).json({
      error: 'Forbidden',
      status: 403,
      message: "You're not the owner or store is not exists",
    });
  }
  return proceed();
}
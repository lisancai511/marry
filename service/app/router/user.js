module.exports = (app) => {
  const { router, controller, jwt } = app
  router.get('/api/createUserFromInter', controller.user.createUserFromInter)
  router.get('/api/getWx', controller.user.getWx)
}

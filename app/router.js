module.exports = app => {
  require('./router/front')(app)
  require('./router/back')(app)
}

// app/extend/context.js
const ONLINEUSERS = Symbol('Context#bar')

// FIXME: 啊啊啊啊啊啊啊
module.exports = {
  get onlineUsers () {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    // if (!this[ONLINEUSERS]) {
    //   // 例如，从 header 中获取，实际情况肯定更复杂
    //   this[ONLINEUSERS] = this.get('x-bar')
    // }
    return this[ONLINEUSERS]
  },
  set onlineUsers (users) {
    this[ONLINEUSERS] = users
  }
}

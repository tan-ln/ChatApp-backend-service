module.exports = function (email) {
  if(email) {
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if(!reg.test(email)) {
      return false
    }
  }
  return true
}

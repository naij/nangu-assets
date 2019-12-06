var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@index.html',
  render: function() {
    var me = this
    me.data = {
      list: [
        {name: '首页轮播', position: 'index|slider'},
        {name: '民宿精选轮播', position: 'roomvoucher|slider'},
        {name: '景区门票轮播', position: 'activity|slider'}
      ]
    }
    me.setView()
  }
})
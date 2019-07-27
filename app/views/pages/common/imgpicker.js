var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@imgpicker.html',
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    me.request().all([{
      name: 'picture_list'
    }], function(e, MesModel) {
      var data = MesModel.get('data')

      me.data = {
        list: data
      }
      me.setView()
    })
  },
  'pick<click>': function(e) {
    let me = this
    let limit = me.extraData.limit
    let index = e.params.index
    let list = me.data.list
    let selectedList = me.data.selectedList || []

    if (selectedList.length < limit) {
      selectedList.push(list[index])
    } else {
      selectedList.shift()
      selectedList.push(list[index])
    }

    $.each(list, function(i, v) {
      v.selected = false
      $.each(selectedList, function(subi, subv) {
        if (v.id == subv.id) {
          v.selected = true
        }
      })
    })

    me.data = {
      list: list,
      selectedList: selectedList
    }
    me.setView()
  },
  'submit<click>': function (e) {
    e.preventDefault()
    
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.data.dialog.close()
  }
})
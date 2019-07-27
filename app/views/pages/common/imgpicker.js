var Magix = require('magix')
var $ = require('jquery')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@imgpicker.html',
  mixins: [Dialog],
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
        list: data,
        selectedList: []
      }
      me.setView()
    })
  },
  'pick<click>': function(e) {
    let me = this
    let limit = me.extraData.limit
    let index = e.params.index
    let list = me.data.list
    let selectedList = me.data.selectedList
    let selectedIndex

    $.each(selectedList, function(i, v) {
      if (v.id == list[index].id) {
        selectedIndex = i
      }
    })

    if (typeof(selectedIndex) != "undefined") {
      selectedList.splice(selectedIndex, 1)
    } else if (selectedList.length < limit) {
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
  'upload<click>': function(e) {
    e.preventDefault()
    var me = this
    me.mxDialog('app/views/pages/picture/upload', {
      width: 700, 
      callback: function() {
        me.render()
      }
    })
  },
  'submit<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
    this.extraData.callback(this.data.selectedList)
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
  }
})
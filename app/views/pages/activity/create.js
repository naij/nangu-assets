var Magix = require('magix')
var $ = require('jquery')
var Editor = require('app/coms/editor/editor')
var Dialog = require('app/mixins/dialog')

module.exports = Magix.View.extend({
  tmpl: '@create.html',
  mixins: [Dialog],
  render: function() {
    let me = this
    me.data = {
      cover: '',
      locationCover: '',
      slide: []
    }
    me.setView().then(function() {
      me._rendered()
    })
  },
  _rendered: function() {
    let noticeEditor = new Editor('#notice-editor')
    noticeEditor.create()
    let descriptionEditor = new Editor('#description-editor')
    descriptionEditor.create()
  },
  'pickLocationCover<click>': function(e) {
    e.preventDefault()
    let me = this
    me.mxDialog('app/views/pages/common/imgpicker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        me.data.locationCover = data[0].picPath
        me.setView()
      }
    })
  },
  'pickCover<click>': function(e) {
    e.preventDefault()
    let me = this
    me.mxDialog('app/views/pages/common/imgpicker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        me.data.cover = data[0].picPath
        me.setView()
      }
    })
  },
  'pickSlide<click>': function(e) {
    e.preventDefault()
    let me = this
    let index = e.params.index
    me.mxDialog('app/views/pages/common/imgpicker', {
      width: 700,
      limit: 1,
      callback: function(data) {
        // 有index 说明是替换操作
        if (typeof(index) != "undefined") {
          me.data.slide.splice(index, 1, data[0])
        } else {
          me.data.slide.push(data[0])
        }
        
        me.setView()
      }
    })
  }
})
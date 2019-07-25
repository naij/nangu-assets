var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@upload.html',
  init: function(extra) {
    this.data = extra
  },
  render: function() {
    var me = this
    me.setView()
  },
  picPreview: function (files) {
    var me = this
    var filesLength = files.length
    var pics = []

    for (var i = 0; i < filesLength; i ++) {
      var file = files[i]
      var fileObj = {}

      if (file) {
        var fileSize = 0
        if (file.size > 1024 * 1024) {
          fileObj.fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB'
        } else {
          fileObj.fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB'
        }
      }

      if (file.type.indexOf("image") == 0) {
        var reader = new FileReader()
        if (reader.readAsDataURL) {
          reader.readAsDataURL(file)
        } else if (reader.readAsDataurl) {
          reader.readAsDataurl(file)
        }

        (function (fileObj, index) {
          reader.onload = function (e) {
            fileObj.filePath = e.target.result
            pics.push(fileObj)

            if (index == filesLength -1) {
              me.data = {
                pics: pics
              }
              me.setView()
            }
          }
        }(fileObj, i))
      }
    }
  },
  uploadFile: function (files) {
    var me = this
    var index = 0

    function upload() {
      if (index < files.length && index != files.length) {
        // 创建FormData()对象
        var fd = new FormData()
        // 文件对象 file 
        fd.append('pic', files[index])
        // 准备使用ajax上传
        var xhr = new XMLHttpRequest()
        // 进度条      
        xhr.upload.addEventListener('progress', uploadProgress, false)
        // 上传完成
        xhr.addEventListener('load', uploadComplete, false)
        // 上传
        xhr.open('POST', '/api/tool/pic/create.json?_csrf=')
        // 发送
        xhr.send(fd)
      }
    }
    upload()

    function uploadProgress(evt) {
      if (evt.lengthComputable) {
        // evt.loaded：文件上传的大小   
        // evt.total：文件总的大小
        var percentComplete = Math.round((evt.loaded) * 100 / evt.total)

        // 加载进度条，同时显示信息
        var progressBar = $('.progress' + index)
        progressBar.html('<div style="width:' + percentComplete.toString() + '%;"></div>')
      }
    }

    function uploadComplete(evt) {
      index ++
      upload()

      if (index == files.length) {
        me.data.dialog.close()
        me.data.callback()
      }
    }
  },
  'fileChange<change>': function (e) {
    var files = $('#J_upload')[0].files
    this.picPreview(files)
  },
  'upload<click>': function (e) {
    e.preventDefault()
    var files = $('#J_upload')[0].files
    this.uploadFile(files)
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.data.dialog.close()
  }
})
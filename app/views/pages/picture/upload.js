var Magix = require('magix')
var $ = require('jquery')

module.exports = Magix.View.extend({
  tmpl: '@upload.html',
  init: function(extra) {
    this.extraData = extra
  },
  render: function() {
    var me = this
    me.data = {
      fileList: []
    }
    me.setView()
  },
  picPreview: function (fileList) {
    var me = this
    var fileListLength = fileList.length
    var pics = []

    for (var i = 0; i < fileListLength; i ++) {
      var file = fileList[i]
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

            if (index == fileListLength -1) {
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
  uploadFile: function () {
    var me = this
    var index = 0
    var fileList = me.data.fileList

    function upload() {
      if (index < fileList.length && index != fileList.length) {
        // 创建FormData()对象
        var fd = new FormData()
        // 文件对象 file 
        fd.append('pic', fileList[index])
        // 准备使用ajax上传
        var xhr = new XMLHttpRequest()
        // 进度条      
        xhr.upload.addEventListener('progress', uploadProgress, false)
        // 上传完成
        xhr.addEventListener('load', uploadComplete, false)
        // 上传
        xhr.open('POST', '/api/tool/pic/create.json?_csrf=' + Magix.config('csrf'))
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

      if (index == fileList.length) {
        me.extraData.dialog.close()
        me.extraData.callback()
      }
    }
  },
  'fileChange<change>': function (e) {
    var fileList = $('#J_upload')[0].files

    if (fileList.length > 0) {
      this.data.fileList = fileList
      this.setView()
      this.picPreview(fileList)
    }
  },
  'upload<click>': function (e) {
    e.preventDefault()
    this.uploadFile()
  },
  'cancel<click>': function (e) {
    e.preventDefault()
    this.extraData.dialog.close()
  }
})
$(function () {
  var layer = layui.layer

  // 1.1获取裁剪区域的dom元素
  var $image = $('#image')
 // 1.2 配置选项
  const options = {
    // 纵横比:指定裁剪框是啥形状的1:1、16:9等
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 1.3 创建裁剪区域
  $image.cropper(options)


  // 为上传按钮绑定事件
  $('#upfile').on('click', function () {
    $('#file').click()
  })

  // 为文件选择框绑定change事件
  $('#file').on('change', function (e) {
    // 获得用户选择的文件
    // console.log(e);
    var fileList = e.target.files
    if (fileList.length === 0) {
      return layer.msg('请选择图片！')
    }
    // 1、拿到用户选择的第一个文件
    // 2、根据选择的文件，创建一个对应的URL地址
    // 3、先销毁旧的裁剪区域，在重新设置图片路径，之后再重新创建新的裁剪区域
    var file = e.target.files[0]
    var imgURL = URL.createObjectURL(file)
    // 3.1 重新初始化裁剪区域
    $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options) // 重新初始化裁剪区域
  })

  // 为确定按钮，绑定点击事件
  $('#btnUpload').on('click', function (e) {
    // 1、要拿到用户裁剪之后的头像
     var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')  //将Canvas画布上的内容。转化为base64格式的字符串
    // 2、调用接口，把头像上传到服务器
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar:dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        window.parent.getUserInfo()
      }
    })
  })

})
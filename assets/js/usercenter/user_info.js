$(function () {
  var form = layui.form
  var layer = layui.layer

   // 通过form.verify()函数自定义校验规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符之间!'
      }
    }
  })
  initUserInfo()
  

  // 初始化用户的基本信息
  function initUserInfo () {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
      //  调用 form.val() 快速为表单赋值
        form.val('formUserInfo',res.data)
        
      }
    })  
  }

  //监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    // 1、阻止表单的默认提交行为
    e.preventDefault()
    // 2、发起ajax数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      // $(this)代表当前的表单
      data:$(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message)
        // 3、调用父页面中的方法，重新渲染用户头像和信息
        window.parent.getUserInfo()
      }
    })
  })

  
  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 1、阻止表单的默认重置行为
    e.preventDefault()
    // 2、再次调用函数重新获取用户信息
    initUserInfo ()
  })
})
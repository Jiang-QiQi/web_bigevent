$(function () {
  var form = layui.form
  var layer = layui.layer

     // 通过form.verify()函数自定义校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (val) {
      // 里面的val是你把samePwd应用到谁身上，就是谁的值
      if (val === $('[name=oldPwd').val()) {
        return '新旧密码不能相同'
      }
    },
    rePwd: function (val) {
      // 里面的val是你把samePwd应用到谁身上，就是谁的值
      if (val !== $('[name=newPwd').val()) {
        return '两次密码输入不一致！'
      }
    }
  })

  // 
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      // $(this)代表当前的表单
      data:$(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message)
        // $('.layui-form')拿到的是一个jQuery元素，后面加[0]是转化成了原生dom元素
        // form表单有一个reset方法，重置表单
        $('.layui-form')[0].reset()
      }
    })
})
})
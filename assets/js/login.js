$(function () {
  // 点击去“去注册账号”链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去“去登录”链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

// 从layui中获取form对象
  var form = layui.form
  var layer = layui.layer

  // 通过form.verify()函数自定义校验规则
  form.verify({
    'pwd': [
      // 自定义了 一个pwd的校验规则
      /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
    ],
    // 检验两次密码是否一致
    'repwd': function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容，然会进行判断
      // 若失败，则return提示消息
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1.阻止默认的提交行为
    e.preventDefault()
    // 2、发起ajax的POST请求
    var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser',data, function (res) {
      if (res.status !== 0) {
        // return console.log('注册失败！');
        return layer.msg(res.message)
      } else {
        // return console.log('注册成功！');
        layer.msg('注册成功，请登录!')
      }
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })
  // 监听登录表单的提交事件
  $('#form_login').on('submit', function (e) {
    // 1.阻止默认的提交行为
    e.preventDefault()
    // 2、发起ajax的POST请求
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // $(this):表示登录页这个表单对象
      // serialize()：快速获取表单中的数据
      data: $(this).serialize(),
      success:function (res) {
        if (res.status !== 0) {
          // return console.log('注册失败！');
          return layer.msg(res.message)
        }
        layer.msg('登录成功!')
        console.log(res.token);
        // 将登录成功得到的token字符串，保存到local Storage中
        localStorage.setItem('token',res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      },  
    })
  })
  
})
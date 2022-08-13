// 入口函数
$(function () {
  // 从layui中获取某些对象
  var layer = layui.layer
  
  // 调用 getUserInfo() 获取用户基本信息
  getUserInfo()


  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
      //do something
      // 1、清空本地存储中的token
      localStorage.removeItem('token')
      // 2、跳转到登录页
      location.href = '/login.html'
      // 3、官方自带的，关闭confirm询问框，index是第几个
      layer.close(index);
    });
  })
})


// 入口函数中可以调用一个方法来获取用户基本信息
// 这个方法写在入口函数之外
function getUserInfo () {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 就是请求头配置对象
    // headers: {
    //   // 以/my 开头的请求路径，需要在请求头中携带Authorization身份认证字段，才能正常访问成功
    //   // token是键，没有这个键用空字符串
    //   Authorization:localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      // 调用函数渲染用户头像
      //  console.log(res);
      renderAvatar(res.data)
    },
    // 不论成功还是失败，最终都会调用这个回调函数
    // complete: function (res) {
    //   // console.log('执行了complete回调：');
    //   // console.log(res);
    //   // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 1、强制清空token
    //     localStorage.removeItem('token')
    //     // 2、强制跳转到登录页面
    //     location.href = '/login.html'
    //   }
    // }
  })
}

// 渲染用户的头像
function renderAvatar (user) {
  // 1、获取用户昵称
  var name = user.nickname || user.username
  // 2、设置欢迎的文本
  $('#welcome').html(`欢迎&nbsp;${name}`)
  // 3、按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1 渲染图片图像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}


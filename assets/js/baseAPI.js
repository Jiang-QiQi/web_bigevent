// 注意：每次调用$.get()或者$.post()或$.ajax()时，会先调用ajaxPrefilter这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  // 在发起真正的ajax请求之前，统一拼接请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
})

/**
 * Created by 79013 on 2018/9/16.
 */

//退出登录
//    1.获取到退出登录按钮并添加点击事件
//    2.调用退出登录接口实现退出登录
//    3.如果退出成功 跳转到首页

//保存用户信息
var userInfo = null;

//获取用户信息 解决退出登录后点击用户中心依然显示登录的问题
$.ajax({
    url: '/user/queryUserMessage',
    type:'get',
    //将异步请求修改为同步的
    async: false,
    success: function (res) {
        console.log(res);

        //判断用户是否登录
        if (res.error && res.error == 400) {
            location.href = 'login.html';
        }

        userInfo = res;
    }
});

$(function () {

    $('#logout').on('tap', function () {
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (res) {
                //console.log(res);
                if(res.success) {

                    mui.toast('退出登录成功');

                    setTimeout (function () {
                        location.href = 'index.html';
                    }, 2000)

                }

            }
        })
    })

    //拼接模板
    var html = template('userTpl', userInfo);
    //console.log(html);
    $('#userInfoBox').html(html);

})
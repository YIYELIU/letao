/**
 * Created by 79013 on 2018/9/16.
 */

    //用户登录
    //    1.获取登录按钮并且添加点击事件
    //    2.获取到用户输入的表单信息
    //    3.调用登录接口实现登录
    //    4.如果用户登录成功就跳转到会员中心

$(function () {

    $('#login-Btn').on('tap', function () {

        var username = $('[name="username"]').val().trim();
        var password = $('[name="password"]').val().trim();

        //验证用户名
        if(!username){
            //mui.toast是mui框架提供的弹框方法,用户体验比alert好太多
            mui.toast('请输入用户名');
            return;
        }
        if(!password){
            mui.toast('请输入密码');
            return;
        }

        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function () {
                $('#login-Btn').html('正在登录...');
            },
            success: function (res) {
                //console.log(res);
                mui.toast('登陆成功');
                $('#login-Btn').html('登录');

                setTimeout (function () {
                    location.href = 'user.html';
                }, 2000)
            }




        })
    })

})
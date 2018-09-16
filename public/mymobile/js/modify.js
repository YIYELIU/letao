/**
 * Created by 79013 on 2018/9/16.
 */
/**
 * Created by 79013 on 2018/9/15.
 */
//修改密码
//    1.获取修改密码按钮并添加点击事件
//    2.获取用户输入的信息
//    3.对用户输入的信息做校验
//    4.调用修改密码接口 实现修改密码功能
//    5.跳转到登录页面 重新登录

//当html页面结构加载完成后执行js文件
$(function () {

    $('#modify-Btn').on('tap', function () {

        //原密码
        var originPass = $('[name="originPass"]').val().trim();
        //新密码
        var newPass = $('[name="newPass"]').val().trim();
        //确认新密码
        var sureNewPass = $('[name="sureNewPass"]').val().trim();
        //验证码
        var vCode = $('[name="vCode"]').val().trim();

        //验证用户名
        if(!originPass){
            mui.toast('请输入正确的原密码');
            return;
        }
        if(!newPass){
            mui.toast('请输入正确的新密码');
            return;
        }
        if(newPass != sureNewPass){
            mui.toast('两次输入的密码不一样');
            return;
        }
        if(!vCode){
            mui.toast('验证码错误');
            return;
        }
        console.log(123);

        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: originPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function (res) {
                console.log(res);
                if (res.success) {

                    console.log(res);
                    mui.toast('密码修改成功');

                    setTimeout(function () {
                        location.href = 'login.html';
                    }, 2000)
                }else {
                    mui.toast('原密码错误');
                }
            }
        })

    });

    //获取认证码
    //    1.给获取认证码按钮添加点击事件
    //    2.调用接口获取认证码
    //    3.将认证码输出到控制台

    $('#getCode').on('tap', function () {

        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res) {
                console.log(res.vCode);
            }
        })


    })


})
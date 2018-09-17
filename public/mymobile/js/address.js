/**
 * Created by 79013 on 2018/9/17.
 */

$(function () {

    //获取用户存储的收货地址

    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            console.log(res);
            var html =template('addressTpl', {result:res});
            $('#address').html(html);
        }
    })





})
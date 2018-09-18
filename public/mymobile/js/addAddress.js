/**
 * Created by 79013 on 2018/9/17.
 */

$(function () {

    //创建picker选择器
    var picker = new mui.PopPicker({layer:3});
    //为picker选择器添加数据
    picker.setData(cityData);

    //详细地址点击事件
    $('#selectCity').on('tap', function () {

        picker.show(function (selectItems) {

            //console.log(selectItems);
            //console.log(selectItems[0].text);
            //console.log(selectItems[1].text);
            //console.log(selectItems[2].text);

            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });
    })

    //添加收货地址
    //    1.获取收货地址管理按钮并且添加点击事件
    //    2.获取用户输入的表单信息
    //    3.对用户输入的表单信息进行校验
    //    4.调用添加收货地址接口 实现功能
    //    5.挑战回收货地址列表页面
    $('#addAddress').on('tap', function () {

        var recipients = $("[name='recipients']").val().trim();
        var postcode = $("[name='postcode']").val().trim();
        var selectCity = $("[name='selectCity']").val();
        var addressDetail = $("[name='addressDetail']").val().trim();

        if (!recipients) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if (!postcode) {
            mui.toast('请输入邮政编码');
            return;
        }
        //if (!selectCity) {
        //    mui.toast('请选择省市区');
        //    return;
        //}
        if (!addressDetail) {
            mui.toast('请输入详细地址');
            return;
        }

        $.ajax({
            url: '/address/addAddress',
            type: 'post',
            data: {
                address: selectCity,
                addressDetail: addressDetail,
                recipients: recipients,
                postcode: postcode
            },
            success: function (res) {
                //console.log(res);
                if (res.success) {
                    mui.toast('地址添加成功');

                    setTimeout(function () {
                        location.href = 'address.html';
                    }, 2000)
                }
            }
        })

    });

    //这里editAddress是页面本地存储的地址名 在Application里
    //获取地址名来获取内容
    if (localStorage.getItem('editAddress')) {
        var address = JSON.parse(localStorage.getItem('editAddress'));
        //console.log(address);

       var html = template('editTpl', address);
        //console.log(html);

        $('#editForm').html(html);
    }


})
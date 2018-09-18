/**
 * Created by 79013 on 2018/9/17.
 */

$(function () {

    //获取用户存储的收货地址

    //存储收货地址
    var address = null;

    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            console.log(res);

            address = res;

            var html =template('addressTpl', {result:res});
            $('#address-box').html(html);
        }
    })

    //删除收货地址
    //    1.给删除按钮添加点击事件
    //    2.当用户点击删除按钮时 弹出确认删除的弹框
    //    3.如果用户点击确认 就删除 反之就取消
    //    4.调用删除收货地址的接口 完成删除操作
    //    5.删除后刷新当前页面
    $('#address-box').on('tap', '.delete-btn', function () {
        //消息提示框
        //confirm('确认要删除吗');

        var id = this.getAttribute('data-id');

        var li = this.parentNode.parentNode;

        console.log(id);
        mui.confirm('确认要删除吗?', function (message) {
            //console.log(message);

            //判断用户是否删除
            if (message.index == 1) { //确认删除

                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        //确认删除
                        if (res.success) {
                            //重新加载页面
                            location.reload();
                        }
                    }
                })
            }else {
            //取消删除 关闭列表滑出效果
                 mui.swipeoutClose(li);
            }

        });

    });


    //编辑收货地址
    //    1.给编辑按钮添加点击事件
    //    2.跳转到收货地址编辑页面 并且要将编辑的数据传递到这个页面
    //    3.将数据展示在页面中
    //    4.给确定按钮添加点击事件
    //    5.调用接口 执行编辑操作
    //    6.跳转回收货地址列表页面
    //这里要用click,如果用tap就需要将address.html里编辑的a标签改为span
    $('#address-box').on('click', '.edit-btn', function () {

        var id = this.getAttribute('data-id');
        //console.log(address);
        //console.log(id);

        for (var i = 0; i < address.length; i++) {

            if (address[i].id == id) {
                address[i];
                localStorage.setItem('editAddress', JSON.stringify(address[i]));
                //终止循环
                break;
            }
        }
        //跳转到编辑页面
        location.href = "addAddress.html?isEdit=1";

    })



})
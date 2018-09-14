/**
 * Created by 79013 on 2018/9/14.
 */
$(function () {
    //实现用户点击搜索按钮跳转到搜索结果页
    //    1.给搜索按钮添加点击事件
    //    2.获取用户输入的搜索关键字
    //    3.判断用户 是否输入了搜索关键字
    //    4.如果用户没有输入 阻止跳转 并给出提示
    //    5.如果用户输入了 就跳转到搜索结果页面 并且要讲用户输入的关键字带到跳转的页面中去
    $('#search-btn').on('click', function () {
        //用户输入的搜索关键字
        var keyword = $(this).siblings('input').val();
        //用户输入了关键字
        if(keyword) {
            location.href="search-result.html?keyword=" + keyword;
        }else {
            //用户没有输入搜索关键字
            alert('请输入要搜索的商品关键字');
        }
    })



})
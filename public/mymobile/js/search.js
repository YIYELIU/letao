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
            //将用户输入的关键字存储到数组中
            //用unshift可以将最新输入的关键字显示在最前面
            keyArr.unshift(keyword);

            //将关键字数组存储到本地
            //setItem('')中的第一个参数是为了方便获取起的名字,与上面的变量数组keyArr无关
            //第二个参数才是变量数组keyArr,但不能直接放进去,因为localStorage只能存字符串,要先转换
            localStorage.setItem('keyArr', JSON.stringify(keyArr));

            //用户点击搜索按钮,跳转到结果页面,根据输入内容显示不同的数据
            location.href="search-result.html?keyword=" + keyword;
        }else {
            //用户没有输入搜索关键字
            alert('请输入要搜索的商品关键字');
        }
    });

    //实现历史关键字存储
    //    1.准备一个存储关键字的数组
    //    2.当用户点击搜索按钮的时候,将用户输入的关键字追加到数组中
    //    3.将数组存储到本地存储中
    //    4.在页面一上来的时候,判断本地存储中是否有已经存储的关键字
    //    5.将数据和html拼接,再将数据展示到页面上

    //存储关键字的数组
    var keyArr = [];
    //在页面一上来的时候,判断本地存储中是否有已经存储的关键字
    if(localStorage.getItem('keyArr')) {
        //这里将localStorage.getItem('keyArr')重新赋值给keyArr的原因:
        //    假如keyArr中已经有值了,在下一次用户输入以后再将这个值push到keyArr中,再整体的上传到本地存储中
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
        //console.log(keyArr);

        var html = template('historyTpl', {result: keyArr});
        //console.log(html);

        $('#history-box').html(html);
    }

    //实现清空历史
    //    1.给元素添加点击事件
    //    2.清空页面中的数据 清空本地存储中的数据

    $('#clear-btn').on('click', function () {
        //清空页面中的数据
        $('#history-box').html("");
        //清空本地存储中数据
        localStorage.removeItem("keyArr");
    });

    //优化
    $('#history-box').on('click', function () {
        console.log($(this).text());
        location.href = 'search-result.html?keyword=' + $(this).text();
    })




})
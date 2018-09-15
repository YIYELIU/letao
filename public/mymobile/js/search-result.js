/**
 * Created by 79013 on 2018/9/14.
 */
//获取地址栏中用户输入的关键字
var keyword = getParamsByUrl(location.href, 'keyword');
//console.log(keyword);
//默认第一次加载页数为1
var page = 1;
//页面中的数据一开始为空
var html = '';
//声明一个价格默认为升序 在文档中 price是对价格进行排序：1为升序，2为降序
var priceSort = 1;

var This = null;

$(function () {

    //根据用户输入的关键字获取搜索结果
    //    1.获取到地址栏中用户输入的搜索关键字
    //    2.用关键字去调取搜索接口
    //    3.将搜索结果展示在页面中

    mui.init({
        pullRefresh : {
            container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                //callback: 页面一上来的时候会自动调用一次,当页面上拉到底部的时候还会自动调用一次
            }
        }
    });

    //按照价格对商品进行排序
    //    1.对价格按钮添加轻敲事件
    //    2.价格排序规则传递到接口中
    //    3.对之前的各种配置进行初始化
    //        清空页面中的数据
    //        恢复当前页的值为1
    //        重新开启上拉加载
    //    4.将排序后的结果重新展示在页面中

    //tap和click都是点击事件,没有多大区别,但在原生js中没有tap
    $('#priceSort').on('tap', function () {
        //更改价格排序条件
        //给priceSort重新赋值,看priceSort等不等于1,如果等于1就让它等于2,如果等于2就让它恢复为1
        priceSort = priceSort == 1 ? 2 : 1;

        //对之前的各种配置进行初始化
        html = '';
        page = 1;
        //切换到另外一个类别后,重置上拉加载控件
        mui('#refreshContainer').pullRefresh().refresh(true);
        //重新将排序后的数据展示在页面上
        getData();
    })

});

//getParamsByUrl()从地址栏中获取参数
//@param {string} name 要获取的参数名称
//@param {string} url 地址字符串
//@return {string}  返回参数名称对应的参数值
function getParamsByUrl (url, name) {

    //indexOf():获取字符串中某一个位置
    //substr():从某一个点截取字符串后面的内容
    var params = url.substr(url.indexOf('?')+1);
    //console.log(params.split('&'));
    var param = params.split('&');

    //循环遍历数组,判断假如用户输入的数据与库中的name相等,则输出数据,否则返回值为空
    for (var i = 0; i < param.length; i++) {
        //console.log(param[i].split('='));
        var current = param[i].split('=');

        if (current[0] == name) {
            return current[1];
        }
    }
    return null;
}

function getData () {
    //var This = this;
    //这里在全局声明This而不在这里声明是因为,这里的This指向的是windows,没有组件提供的功能
    //而这里判断如果This不为假,那么无论页面刷新加载多少次,这里的This都是指向mui.init
    if(!This){
      This = this;
    }

    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price: priceSort
        },
        success: function (response) {
            //console.log(response);
            if (response.data.length > 0) {
                //var html = template('searchTpl', response);
                //这里为了让页面下拉加载的时候保留第一次加载的数据,页面一起显示第一和第二的数据,
                // 所以在全局声明了一个变量,这里就不需要重新声明了
                html += template('searchTpl', response);
                $('#search-product').html(html);
                //告诉上拉加载组件当前数据加载完毕
                This.endPullupToRefresh(false);
            }else {
                //告诉上拉加载组件当前数据已全部加载完毕,没有更多数据了
                This.endPullupToRefresh(true);
            }


        }
    });
}
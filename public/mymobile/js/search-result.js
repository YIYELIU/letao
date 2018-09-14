/**
 * Created by 79013 on 2018/9/14.
 */
$(function () {

    //根据用户输入的关键字获取搜索结果
    //    1.获取到地址栏中用户输入的搜索关键字
    //    2.用关键字去调取搜索接口
    //    3.将搜索结果展示在页面中

    var keyword = getParamsByUrl(location.href, 'keyword');
    console.log(keyword);

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
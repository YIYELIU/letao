/**
 * Created by 79013 on 2018/9/15.
 */
$(function () {

    //mui组件里默认a链接无法跳转
    //恢复a元素的跳转
    $('body').on('tap', 'a', function () {

        mui.openWindow({
            url: $(this).attr('href')
        });
    })

})
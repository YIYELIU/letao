/**
 * Created by 79013 on 2018/9/15.
 */
$(function () {

    //mui�����Ĭ��a�����޷���ת
    //�ָ�aԪ�ص���ת
    $('body').on('tap', 'a', function () {

        mui.openWindow({
            url: $(this).attr('href')
        });
    })

})
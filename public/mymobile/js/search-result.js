/**
 * Created by 79013 on 2018/9/14.
 */
$(function () {

    //�����û�����Ĺؼ��ֻ�ȡ�������
    //    1.��ȡ����ַ�����û�����������ؼ���
    //    2.�ùؼ���ȥ��ȡ�����ӿ�
    //    3.���������չʾ��ҳ����

    var keyword = getParamsByUrl(location.href, 'keyword');
    console.log(keyword);

});

//getParamsByUrl()�ӵ�ַ���л�ȡ����
//@param {string} name Ҫ��ȡ�Ĳ�������
//@param {string} url ��ַ�ַ���
//@return {string}  ���ز������ƶ�Ӧ�Ĳ���ֵ
function getParamsByUrl (url, name) {

    //indexOf():��ȡ�ַ�����ĳһ��λ��
    //substr():��ĳһ�����ȡ�ַ������������
    var params = url.substr(url.indexOf('?')+1);
    //console.log(params.split('&'));
    var param = params.split('&');

    //ѭ����������,�жϼ����û��������������е�name���,���������,���򷵻�ֵΪ��
    for (var i = 0; i < param.length; i++) {
        //console.log(param[i].split('='));
        var current = param[i].split('=');

        if (current[0] == name) {
            return current[1];
        }
    }
    return null;
}
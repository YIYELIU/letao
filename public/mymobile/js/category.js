/**
 * Created by 79013 on 2018/9/12.
 */
//��ҳ���dom�ṹ�������֮�� ִ�лص������еĴ���
$(function () {
    //		��ʼ������������
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick ����ϵ����ϵ��Խ�󣬹����ٶ�Խ������������ԽС��Ĭ��ֵ0.0006
    });

    //��ȡ���һ����������
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (response){
            //ģ����������: ���������ǽ����ݺ�htmlƴ�Ӻ�,��ƴ�ӺõĽ�����ظ�����
            //console.log(response);

            //�����ݺ�html��ƴ��
            //1.htmlģ��
            //2.����
            //3.����ģ������ html��������ô������ƴ��
            //result��ģ������൱����������,������ʹ��result���൱��ʹ������
            var html = template('category-first', {result: response.rows});
            //console.log(html);

            $('#links').html(html); //��һ��html��zepto���ṩ�ķ���

            //���һ�����������ݵĻ�
            if(response.rows.length){
                //����һ��һ���������ѡ��״̬
                $('#links').find('a').eq(0).addClass('active');
                //��ȡ��һ��һ�������id
                var id = response.rows[0].id;
                //����һ������ID��ȡ��������
                getSecondCategory(id);
            }
        }
    })

    //���һ�������ȡ�������������
    //  1.һ��������ӵ���¼�
    //  2.���¼��������л�ȡ��һ�������ID
    //  3.���ö�������Ľӿڻ�ȡ��Ӧ������
    //  4.������չʾ����Ӧ��λ����
    //  5.����ӿ���û������ Ҫ��ҳ������ʾ��������

    //1.һ��������ӵ���¼�
    //����html��links�е���������jsģ���������׷�ӵ����е�,���Դ˴�����ֱ��д$('#links a'),Ҫ���¼�ί��,���ø�a��ǩ����¼�
    $('#links').on('click', 'a', function () {

        //2.��ȡ��ǰ�����һ������ID
        //console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id');
        //����ǰ�����һ���������ѡ��״̬
        $(this).addClass('active').siblings().removeClass('active');

        //3.���ö�������Ľӿڻ�ȡ��Ӧ������
        getSecondCategory(id);
    });

});

//��װһ������: ����һ������ID��ȡ��������
function getSecondCategory (id) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: {
            id: id
        },
        success: function (response) {
            //console.log(response);
            //����Ҫ��һ����������Ϊresult: response.rows,���ﷵ�صĸպþ���һ����������,���Կ���ֱ��дresponse
            var html = template('category-second', response);
            //console.log(html);
            $('.brand-list').html(html);
        }
    })
}


/**
 * Created by 79013 on 2018/9/12.
 */
//当页面的dom结构加载完成之后 执行回调函数中的代码
$(function () {
    //		初始化区域滚动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //获取左侧一级分类数据
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success: function (response){
            //模板引擎作用: 用来帮我们将数据和html拼接好,将拼接好的结果返回给我们
            //console.log(response);

            //将数据和html做拼接
            //1.html模板
            //2.数据
            //3.告诉模板引擎 html和数据怎么样进行拼接
            //result在模板里就相当于是数组了,在这里使用result就相当于使用数组
            var html = template('category-first', {result: response.rows});
            //console.log(html);

            $('#links').html(html); //第一个html是zepto里提供的方法

            //如果一级分类又数据的话
            if(response.rows.length){
                //给第一个一级分类添加选中状态
                $('#links').find('a').eq(0).addClass('active');
                //获取第一个一级分类的id
                var id = response.rows[0].id;
                //根据一级分类ID获取二级分类
                getSecondCategory(id);
            }
        }
    })

    //点击一级分类获取二级分类的数据
    //  1.一级分类添加点击事件
    //  2.在事件处理函数中获取到一级分类的ID
    //  3.调用二级分类的接口获取对应的数据
    //  4.将数据展示到对应的位置中
    //  5.如果接口中没有数据 要在页面中显示暂无数据

    //1.一级分类添加点击事件
    //由于html中links中的数据是由js模板引擎后续追加到其中的,所以此处不能直接写$('#links a'),要用事件委托,利用给a标签点击事件
    $('#links').on('click', 'a', function () {

        //2.获取当前点击的一级分类ID
        //console.log($(this).attr('data-id'));
        var id = $(this).attr('data-id');
        //给当前点击的一级分类添加选中状态
        $(this).addClass('active').siblings().removeClass('active');

        //3.调用二级分类的接口获取对应的数据
        getSecondCategory(id);
    });

});

//封装一个函数: 根据一级分类ID获取二级分类
function getSecondCategory (id) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: {
            id: id
        },
        success: function (response) {
            //console.log(response);
            //下面要求传一个数据类型为result: response.rows,这里返回的刚好就是一个数据类型,所以可以直接写response
            var html = template('category-second', response);
            //console.log(html);
            $('.brand-list').html(html);
        }
    })
}


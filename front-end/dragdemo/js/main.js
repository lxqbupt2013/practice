/**
 * @file dragdemo 主入口
 * @author liuxiaqi(liuxiaqi@baidu.com)
 */

require.config({
    baseUrl: './js',
    paths: {
        jquery: 'jquery',
        operates: 'operates',
        drag: 'drag'
    },
    shim: {
        drag1: {
            deps: ['jquery', 'operates'],
            exports: 'drag'
        }
    }
});

require(['jquery', 'drag'], function ($, Drag) {
    var imgurl = [
        'http://bcscdn.baidu.com/resource/e0f811609417029b351bd5a30ddde93c.jpg',
        'http://bcscdn.baidu.com/resource/2ab0c51af57ff48354c9c8a41d74965f.jpg',
        'http://bcscdn.baidu.com/resource/77befba86c8f9293e682ca77a234a2bc.jpg',
        'http://bcscdn.baidu.com/resource/14bb0988325c62db419eb775c6543420.jpg',
        'http://bcscdn.baidu.com/resource/6c76036634a7e95a87e536bb09a6882c.jpg',
        'http://bcscdn.baidu.com/resource/2681f619cea3396af5afea8c8348aacd.jpg',
        'http://bcscdn.baidu.com/resource/91499f1bb5b248694442ef6755fb0441.jpg',
        'http://bcscdn.baidu.com/resource/eade68bb125301e552887edf24b28b61.jpg',
        'http://bcscdn.baidu.com/resource/197e335ff2c1cc4b8ccd61c992c5a466.jpg',
        'http://bcscdn.baidu.com/resource/501cb75147ef3cba30c1bc962ef89167.jpg',
        'http://bcscdn.baidu.com/resource/f753b71ba0948c15bfd10fb04395e01d.jpg',
        'http://bcscdn.baidu.com/resource/944b84a12f89b0af0d2a8101cae4f1c6.jpg',
        'http://bcscdn.baidu.com/resource/6a3a5a5f4d70e193112c1d215a27b5fe.jpg',
        'http://bcscdn.baidu.com/resource/345a32fd11a69c314f1dc88fe6ab330b.jpg',
        'http://bcscdn.baidu.com/resource/157f86a117a5ea5be072cf941cacc5dc.jpg',
        'http://bcscdn.baidu.com/resource/f60312ea1680324a603249375b87a963.jpg',
        'http://bcscdn.baidu.com/resource/31e641e7ce2c2683d08289d8e9f856ab.jpg',
        'http://bcscdn.baidu.com/resource/c85eaf7696c9ad5dd960fdd479a7565a.jpg',
        'http://bcscdn.baidu.com/resource/72e37dff8ed24be62048a30b0ecda9e8.jpg',
        'http://bcscdn.baidu.com/resource/7659e63fbb7584022cf58f75dbfcd315.jpg'
    ];

    /**
    * 初始化组件参数
    * @param: {string} parentContainer: 父容器
    * @param: {number} num 图片数量
    * @param: {number} row 列数
    * @param: {number} imgsize 图片大小
    * @param: {Array} source 存储图标url的数组
    */

    new Drag.render({
        parentContainer: 'parent-container',
        imgNum: 20,
        maxRow: 5,
        imgsize: 70,
        imgurl: imgurl
    });
});

/* eslint-disable max-len */
/**
 * @file dragdemo oprates 封装公用操作
 * @author liuxiaqi(liuxiaqi@baidu.com)
 */

define(function () {

    var operate = {

        /**
         * 创建DOM元素
         * @param: {string} parentContainer 父容器
         * @param: {number} imgNum 图标数量
         */

        createDiv: function (parentContainer, imgNum) {
            for (var i = 0; i < imgNum; i++) {
                var divElem = $('<div class="dragbox"><img class="shu" src="http://bcscdn.baidu.com/resource/8a49a6c21cbea84badc8e568e3043e2f.png" alt="shu"><img src="#" class="dragimg" alt="dragimg"></div>');
                divElem.appendTo($('#' + parentContainer));
            }
        },

        /**
         * 绘制DOM
         * @param: {string} parentContainer 父容器
         * @param: {number} imgsize 图标边长
         * @param: {number} maxRow 最大列数
         */

        showDOM: function (parentContainer, imgsize, maxRow) {
            $('.dragimg').css('width', imgsize + 'px');
            $('.dragimg').css('height', imgsize + 'px');
            $('.shu').css('height', imgsize + 6 + 'px');
            $('#' + parentContainer).css('width', (imgsize + 25) * (maxRow + 1) + 'px');
        },

        /**
         * 初始化图标
         * @param: {Array} arr 存储图标url的数组
         */

        initImgs: function (arr) {
            var imgs = $('.dragimg');
            imgs.each(function (i, data) {
                imgs.eq(i).attr('src', arr[i]);
                imgs.eq(i).css('top', 0);
                imgs.eq(i).css('left', 0);
            });
        },

        /**
         * 从localstorage中存取图标url
         * @param: {string} key localstorage相应字段key
         * @param: {Array} arr 存储图标url的数组
         * @param: {boolen} flag 存取标识
         */

        localArr: function (key, arr, flag) {
            if (window.localStorage) {
                var str = localStorage.getItem(key);
                if (str && str !== '[]' && flag === 0) {
                    arr = JSON.parse(str);
                }
                else if (!str || flag === 1 || str === '[]') {
                    str = JSON.stringify(arr);
                    localStorage.setItem(key, str);
                }
            }
            operate.initImgs(arr);
        },

        /**
         * 插入数组
         * @param: {string} item 要插入的url
         * @param: {number} index 插入位置索引
         * @param: {Array} arr 存储图标url的数组
         */

        insert: function (item, index, arr) {
            arr.splice(index, 0, item);
        },

        /**
         * 删除数组
         * @param: {number} index 删除位置索引
         * @param: {Array} arr 存储图标url的数组
         */

        remove: function (index, arr) {
            arr.splice(index, 1);
        }
    };


    return operate;
});

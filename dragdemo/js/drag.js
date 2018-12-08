/**
 * @file dragdemo drag操作
 * @author liuxiaqi(liuxiaqi@baidu.com)
 */

define(function (require) {
    var $ = require('jquery');
    var operate = require('operates');

    var drag = {

        /**
         * 返回图标的新位置
         * @param: {HTMLElement} target 被移动的对象
         * @return {number} 实时计算后得到的元素新索引
         */

        posNum: function (target) {
            var objY = parseInt(target.css('top'), 10);
            var objX = parseInt(target.css('left'), 10);

            var index = $.inArray(target.attr('src'), drag.options.imgurl);
            var line = Math.floor(index / drag.options.maxRow);
            var row = index % drag.options.maxRow;

            line += Math.round(objY / drag.options.imgwidth);
            row += Math.round(objX / drag.options.imgwidth);

            line = (line < 0) ? 0 : line;
            line = (line > (drag.options.maxLine - 1)) ? (drag.options.maxLine - 1) : line;
            row = (row < 0) ? 0 : row;
            row = (row > (drag.options.maxRow - 1)) ? (drag.options.maxRow - 1) : row;

            return line * drag.options.maxRow + row;
        },

        /**
         * 图标前竖线的隐现行为
         * @param: {number} index 被移动图标的索引
         * @param: {boolen} flag 标记对象是否在移动中
         */

        line: function (index, flag) {
            $('.shu').each(function (i, data) {
                $('.shu').eq(i).css('visibility', 'hidden');
                if (flag === 1) {
                    if ($('.shu').eq(index).css('visibility') === 'hidden') {
                        $('.shu').eq(index).css('visibility', 'visible');
                    }
                }
            });
        },

        /**
         * @event mousedown事件
         * @param: {Object} e 事件
         */

        dragstart: function (e) {

            // 在mousedown的时候绑定mousemove和mouseup
            $('.dragimg').mousemove(drag.draging);
            // dragboxs.on('mousemove', '.dragimg', drag.draging);
            drag.dragboxs.on('mouseup', '.dragimg', drag.dragend);

            e.preventDefault();
            window.event.returnValue = false;

            var that = $(this);

            drag.options.isdrag = true;

            drag.options.startX = parseInt(e.clientX, 10);
            drag.options.startY = parseInt(e.clientY, 10);
            that.css('border-color', 'red');
            that.css('z-index', '100');
            that.parent().css('z-index', '100');

            this.target = e.currentTarget;
        },

        /**
         * @event: mousemove事件
         * @param: {Object} e 事件
         */

        draging: function (e) {

            if (drag.options.isdrag) {
                var that = $(this);
                var posX = e.clientX - drag.options.startX;
                var posY = e.clientY - drag.options.startY;
                if (Math.abs(posX) > 1 || Math.abs(posY) > 1) {
                    $(this.target).css('z-index', '100');
                    $(this.target).css('top', posY + 'px');
                    $(this.target).css('left', posX + 'px');
                }
                var pos = drag.posNum(that);
                if (Math.abs(posX) > 3 || Math.abs(posY) > 3) {
                    drag.line(pos, 1);
                }
            }
        },

        /**
         * @event: mouseup事件
         * @param: {Object} e 事件
         */

        dragend: function (e) {

            // 在mouseup的时候移除mousemove事件
            $('.dragimg').unbind('mousemove');

            var that = $(this);

            var pos = drag.posNum(that);

            var index = $.inArray(this.src, drag.options.imgurl);

            drag.line(pos, 0);

            if (index < pos) {
                operate.remove(index, drag.options.imgurl);
                operate.insert(this.src, pos - 1, drag.options.imgurl);
            }
            else {
                operate.remove(index, drag.options.imgurl);
                operate.insert(this.src, pos, drag.options.imgurl);
            }

            that.css('z-index', '0');
            that.parent().css('z-index', '0');
            operate.localArr('imgUrl', drag.options.imgurl, 1);

            $('.dragimg').css('border-color', '#dadadb');
            var posX = e.clientX - drag.options.startX;
            var posY = e.clientY - drag.options.startY;
            if (Math.abs(posX) < 3 && Math.abs(posY) < 3) {
                $(this).css('border-color', 'red');
            }
            drag.options.isdrag = false;
        },

        /**
         * 初始化DOM
         * @param: {Object} options 配置参数
         */
        initStructure: function (options) {

            operate.createDiv(options.parentContainer, options.imgNum);
            operate.showDOM(options.parentContainer, options.imgsize, options.maxRow);
            operate.localArr('imgUrl', options.imgurl, 0);
        },

        /**
         * 渲染入口
         * @param: {Object} option 配置参数
         */

        render: function (option) {

            drag.options = drag.init(option);
            drag.initStructure(drag.options);

            drag.dragboxs = $('#' + drag.options.parentContainer);
            drag.dragboxs.on('mousedown', '.dragimg', drag.dragstart);
        },

        /**
         * 初始化参数
         * @param: {Object} option 配置参数
         */

        init: function (option) {

            var options = {
                isdrag: false,
                parentContainer: option.parentContainer,
                imgurl: option.imgurl,
                imgNum: option.imgNum,
                imgsize: option.imgsize,
                imgwidth: option.imgsize + 20,
                maxRow: option.maxRow,
                maxLine: Math.ceil((option.num - 1) / option.row),
                startX: 0,
                startY: 0
            };
            return options;
        }
    };

    return drag;
});

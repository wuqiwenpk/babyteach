function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

function isAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('android') != -1) {
        return true;
    } else {
        return false;
    }
}

function isIos() {
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1)) {
        return true;
    } else {
        return false;
    }
}

function isMobile() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

(function ($) {
    $.fn.togglePassword = function (options) {
        var s = $.extend($.fn.togglePassword.defaults, options), input = $(this);

        $(s.el).bind(s.ev, function () {
            "password" == $(input).attr("type") ?
                $(input).attr("type", "text") :
                $(input).attr("type", "password");
        });
    };

    $.fn.togglePassword.defaults = {
        ev: "click"
    };
}(jQuery));

function getVideoPlayer(type, parameter, width, height, isLive, poster) {
    document.write('<span class="js-show-video-player" style="text-align:center;">视频载入中...</span>');
    $.ajax({
        type: 'GET',
        cache: false,
        dataType: "jsonp",
        data: {type: type, parameter: parameter, width: width, height: height, isLive: isLive, poster: poster},
        url: apiUrl + '/video/get-player?time=' + new Date().toString(),
        success: function (result) {
            if (result.code == 0) {
                $('.js-show-video-player').html(result.data);
            }
            if (result.code == 1) {
                $('.js-show-video-player').html(result.msg);
            }
        }
    });
    document.close();
}

function getLiveProgram(elementId, type, channel) {
    if ($("." + elementId).length > 0) {
        //document.write('<span class="' + elementId + '">数据载入中...</span>');
    } else {
        document.write('<span class="' + elementId + '">数据载入中...</span>');
    }
    $.ajax({
        type: 'GET',
        cache: false,
        dataType: "jsonp",
        data: {type: type, channel: channel},
        url: apiUrl + '/program/get-' + type + '?time=' + new Date().toString() + '',
        success: function (result) {
            if (result.code == 0) {
                var temp = $("." + elementId).html();
                var string = '';
                $.each(result.data, function (i, value) {
                    //string += temp.replace("节目", "" + value.name + "").replace("时间", "" + value.startTime + "");
                    if (value.status == 1) {
                        string += temp.replace("节目", "<strong>" + value.name + "</strong>（正在播出）").replace("时间", "" + value.startTime + "");
                        $('.' + elementId + '-live-now').html('正在播出：' + value.name);
                    } else if (value.status == 2) {
                        string += temp.replace("节目", "<strong>" + value.name + "</strong>（即将播出）").replace("时间", "" + value.startTime + "");
                        $('.' + elementId + '-live-coming').html('即将播出：' + value.name);
                    } else {
                        string += temp.replace("节目", "" + value.name + "").replace("时间", "" + value.startTime + "");
                    }
                    /*
                    if (value.status == 1) {
                        string += '<li class="on">';
                        string += '<strong>' + value.startTime + ' ' + value.name + '</strong>（正在播出）';
                        string += '</li>';
                        $('#' + elementId + '-live-now').html('正在播出：' + value.name);
                    } else if (value.status == 2) {
                        string += '<li>';
                        string += '<strong>' + value.startTime + ' ' + value.name + '</strong>（即将播出）';
                        string += '</li>';
                        $('#' + elementId + '-live-coming').html('即将播出：' + value.name);
                    } else {
                        string += '<li>';
                        string += '' + value.startTime + ' ' + value.name + '';
                        string += '</li>';
                    }
                    */
                });
                $('.' + elementId).html(string);
            }
            if (result.code == 1) {
                $('.' + elementId).html();
            }
        }
    });
    document.close();
}

function getLiveEpg(elementId, type, parameter) {
    if ($("." + elementId).length > 0) {
        //document.write('<span class="' + elementId + '">数据载入中...</span>');
    } else {
        document.write('<span class="' + elementId + '">数据载入中...</span>');
    }
    $.ajax({
        type: 'GET',
        cache: false,
        dataType: "jsonp",
        data: {type: type, parameter: parameter},
        url: apiUrl + '/epg/get-' + type + '?time=' + new Date().toString() + '',
        success: function (result) {
            if (result.code == 0) {
                var temp = $("." + elementId).html();
                var string = '';
                if (result.data.now) $('.' + elementId + '-live-now').html('正在播出：' + result.data.now.name);
                if (result.data.wait) $('.' + elementId + '-live-coming').html('即将播出：' + result.data.wait.name);
                $.each(result.data.programs, function (i, value) {
                    //string += temp.replace("节目", "" + value.name + "").replace("时间", "" + value.startTime + "");
                    if (value.status == 1) {
                        string += temp.replace("节目", "<strong>" + value.name + "</strong>（正在播出）").replace("时间", "" + value.startDateTime + "");
                    } else if (value.status == 2) {
                        string += temp.replace("节目", "<strong>" + value.name + "</strong>（即将播出）").replace("时间", "" + value.startDateTime + "");
                    } else {
                        string += temp.replace("节目", "" + value.name + "").replace("时间", "" + value.startDateTime + "");
                    }
                    /*
                    if (value.status == 1) {
                        string += '<li class="on">';
                        string += '<strong>' + value.startTime + ' ' + value.name + '</strong>（正在播出）';
                        string += '</li>';
                        $('#' + elementId + '-live-now').html('正在播出：' + value.name);
                    } else if (value.status == 2) {
                        string += '<li>';
                        string += '<strong>' + value.startTime + ' ' + value.name + '</strong>（即将播出）';
                        string += '</li>';
                        $('#' + elementId + '-live-coming').html('即将播出：' + value.name);
                    } else {
                        string += '<li>';
                        string += '' + value.startTime + ' ' + value.name + '';
                        string += '</li>';
                    }
                    */
                });
                $('.' + elementId).html(string);
            }
            if (result.code == 1) {
                $('.' + elementId).html();
            }
        }
    });
    document.close();
}

function getCountByType(iclass, type, parameter) {
    document.write('<span class="js-click-number" style="text-align:center;">载入中...</span>');
    $.ajax({
        type: 'GET',
        cache: false,
        dataType: "json",
        data: {class: iclass, type: type, parameter: parameter},
        url: apiUrl + '/count/get?time=' + new Date().toString(),
        success: function (result) {
            if (result.code == 0) {
                $('.js-click-number').html(result.data.total);
            }
            if (result.code == 1) {
                $('.js-click-number').html(result.msg);
            }
        }
    });
    document.close();
}

function getClickNumber(iclass, parameter) {
    getCountByType(iclass, 'click', parameter);
}

function getGoodNumber(iclass, parameter) {
    getCountByType(iclass, 'good', parameter);
}

function getBadNumber(iclass, parameter) {
    getCountByType(iclass, 'bad', parameter);
}

//检测用户登录状态
function checkUserLoginStatus() {
    $.ajax({
        async: false,
        type: 'GET',
        url: userUrl + '/ajax/get-user-login-status?time=' + new Date().toString(),
        dataType: 'jsonp',
        success: function (result) {
            if (result.code == 0) {
                return true;
            }
            if (result.code == 1) {
                return false;
            }
        }
    });
}

function getAd(marke) {
    document.write('<span class="js-show-ad-' + marke + '"></span>');
    $.ajax({
        type: 'GET',
        cache: false,
        dataType: "jsonp",
        data: {marke: marke},
        url: apiUrl + '/ad/get-view?time=' + new Date().toString(),
        success: function (result) {
            if (result.code == 0) {
                $('.js-show-ad-' + marke).html(result.data);
            } else if (result.code == 1) {
                //$('.js-show-ad-' + marke).html(result.msg);
            }
        }
    });
    document.close();
}

function getSearchIframe(elementId, modelId, columnId, keyword, isHot, isModel) {
    $.ajax({
        type: 'GET',
        cache: false,
        dataType: "jsonp",
        data: {modelId: modelId, columnId: columnId, keyword: keyword, isHot: isHot, isModel: isModel},
        url: webUrl + '/searchstatus.html&time=' + new Date().toString(),
        success: function (result) {
            if (result.code == 0) {
                $(elementId).html(result.data);
            } else if (result.code == 1) {
                //$(elementId).html(result.msg);
            }
        }
    });
}

$.fn.select_ = function (params) {
    params = $.extend({
        elementId: 'js-id',
        upTime: 100,
        downTime: 500
    }, params || {});

    var select = $(this);

    $(params.elementId).val(select.find("ul>li:first").data('id'));

    select.find("ul:first").hide().parent().prepend("<ul><li data-id=\"" + select.find("ul>li:first").data('id') + "\" class=\"on\">" + select.find("ul>li:first").html() + "</li></ul>");
    select.hover(function () {
        $(this).find("ul:first").addClass('hover').siblings().slideDown(params.downTime);
    }, function () {
        $(this).find("ul:first").removeClass("hover").siblings().removeClass("hover").slideUp(params.upTime);
    });
    select.find('ul > li').bind("click", function (event) {
        select.find("ul>li:first").html($(this).html());
        select.find("ul>li:first").data('id', $(this).data('id'));
        $(params.elementId).val($(this).data('id'));
        select.find("ul:last").slideUp(params.upTime);
        event.stopPropagation();
    }).mouseover(function () {
        $(this).addClass("hover");
    }).mouseout(function () {
        $(this).removeClass("hover");
    });
};

$.fn.fullFocus = function (options) {
    //默认设置
    var defaultOptions = {
        //幻灯片高度 默认500
        width: '100%',
        //幻灯片高度 默认500
        height: 350,
        //幻灯片切换间隔时间 单位:秒
        intervalTime: 5,
        //幻灯片切换时间 单位：毫秒 ,若设置为0 则无切换效果 直接跳到下一张
        switchtime: 1000,
        //悬停暂停切换 鼠标停留在fullFocus内 是否暂停切换 默认true 悬停暂停，设置为false 悬停不暂停
        hoverpause: true,
        //擦除效果(切换) jQuery自带有 "linear" 和 "swing" ,如需要其他擦除效果请使用 jquery.easing.js  插件
        easing: 'linear',
        //图片对齐方式
        backgroundAlign: 'center center',
        //介绍
        text: {
            //是否显示
            show: false,
            //样式  支持常规CSS样式，方法同jQuery css({key:val,……})
            wrap: {
                position: 'relative',
                width: '960px',
                height: '100%',
                margin: '0px auto',
                display: 'inline-block',
                textAlign: 'center'
            },
            title: {
                position: 'absolute',
                top: '50px',
                left: '10px',
                width: 'auto',
                height: '50px',
                lineHeight: '44px',
                fontSize: '44px',
                fontWeight: 'bold',
                background: "transparent",
                border: "0px solid #ffffff",
                textAlign: 'left',
                overflow: 'hidden',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0, 0, 0, .4)'
            },
            abstract: {
                position: 'absolute',
                top: '140px',
                left: '10px',
                width: '350px',
                height: 'auto',
                lineHeight: '30px',
                fontSize: '16px',
                fontWeight: '400',
                background: "transparent",
                border: "0px solid #ffffff",
                textAlign: 'left',
                overflow: 'hidden',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0, 0, 0, .4)'
            }
        },
        //按钮
        button: {
            //按钮鼠标切换事件 可选事件 click、mouseover
            switchEvent: 'click',
            //按钮上是否显示索引数字，从1开始，默认不显示
            showIndex: false,
            //按钮样式
            //正常 按钮样式  支持常规CSS样式，方法同jQuery css({key:val,……})
            normal: {
                width: '14px',
                height: '14px',
                lineHeight: '14px',
                left: '50%',
                bottom: '10px',
                fontSize: '12px',
                background: "#cccaca",
                border: "1px solid #ffffff",
                color: "#0c69a9",
                textAlign: 'center',
                margin: '4px',
                fontFamily: "Verdana",
                display: 'inline-block',
                borderRadius: '10px',
                float: "left"
            },
            //当前 按钮样式
            focus: {background: "#CC0000", border: "1px solid #FF0000", color: "#000000"}
        },
        //切换回调 index 当前图片索引，action 动作 的切入 还是 切出 值:fadeIn或fadeOut ，函数内 this指向 当前图片容器对象 可用来操作里面元素的动作 详情见demo。
        callback: function (index, action) {
        }

    };
    options = jQuery.extend(true, {}, defaultOptions, options);

    var _focus = {};

    //当前选择符
    _focus.selector = $(this).selector;

    //判断是否有多个对象 如选取了多个对象抛出错误，同一页面可以使用多个 但需要分别调用并且建议选择符用id。
    if ($(this).length > 1) {
        $.error('fullFocus error[More than one selected object]');
        return false;
    }

    //当前操作对象
    _focus.self = this;
    //当前图片索引
    _focus.index = 0;
    //前一个图片索引
    _focus.lindex = 0;
    //图片数量
    _focus.size = $(_focus.self).find('li').size();
    //CSS class命名空间前缀
    _focus.prename = '' + _focus.selector.replace(/\W/ig, '') + '_';
    //数据存储
    _focus.data = {};
    //支持函数集合
    _focus.fn = {};

    //加载 解析幻灯片宽和高
    _focus.onload = function () {
        //设置容器尺寸 并且暂时隐藏内容部分
        $(_focus.self).css({
            width: options.width,
            height: options.height,
            overflow: 'hidden',
            position: 'relative'
        }).find('li').addClass(_focus.prename + 'background-item').hide();
        //初始化
        _focus.init();

    };


    //初始化
    _focus.init = function () {

        _focus.setLayout();
        _focus.setAnimate();

    };

    //布局
    _focus.setLayout = function () {

        //background 容器
        $(_focus.self).find('li').wrapAll('<div class="' + _focus.prename + 'background-box"></div>');
        $('.' + _focus.prename + 'background-item', _focus.self).each(function (index, element) {
            var a = $(this).children('a');
            if (a.length) {
                var backgroundImage = a.children('img').attr('src');
                var backgroundColor = a.attr('data-background-color');
                a.children('img').remove();
                a.addClass(_focus.prename + 'coverlink');
                if (options.text.show) {
                    if (options.text.title.display != 'none' || options.text.abstract.display != 'none') {
                        var ahtml = '<div id="' + _focus.prename + 'text' + index + '" class="' + _focus.prename + 'text">';
                    }
                    if (options.text.title.display != 'none') {
                        ahtml += '<h3 id="h3_' + index + '">' + a.attr('data-title') + '</h3>';
                    }
                    if (options.text.abstract.display != 'none') {
                        ahtml += '<h5 id="h5_' + index + '">' + a.attr('data-abstract') + '</h5>';
                    }
                    if (options.text.title.display != 'none' || options.text.abstract.display != 'none') {
                        ahtml += '</div>';
                        a.append(ahtml);
                    }
                }
            } else {
                var backgroundImage = $(this).children('img').attr('src');
                $(this).children('img').remove();
                if (options.text.show) {
                    if (options.text.title.display != 'none' || options.text.abstract.display != 'none') {
                        var ahtml = '<div class="' + _focus.prename + 'text">';
                    }
                    if (options.text.title.display != 'none') {
                        ahtml += '<h3>' + $(this).attr('data-title') + '</h3>';
                    }
                    if (options.text.abstract.display != 'none') {
                        ahtml += '<h5>' + $(this).attr('data-abstract') + '</h5>';
                    }
                    if (options.text.title.display != 'none' || options.text.abstract.display != 'none') {
                        ahtml += '</div>';
                        $(this).append(ahtml);
                    }
                }
            }
            //
            $(this).css({
                background: '' + backgroundColor + ' url(' + backgroundImage + ') no-repeat ' + options.backgroundAlign,
                'z-index': 1
            });

        });

        $('.' + _focus.prename + 'background-item', _focus.self).eq(0).css('z-index', '2');

        //button 容器
        if (options.button.normal.display != 'none') {
            var buttonList = '';
            for (i = 1; i <= _focus.size; i++) {
                if (options.button.showIndex) {
                    buttonList += '<li>' + i + '</li>';
                } else {
                    buttonList += '<li> </li>';
                }
            }
            $(_focus.self).append('<ul class="' + _focus.prename + 'button">' + buttonList + '</ul>');
            $('.' + _focus.prename + 'button li', _focus.self).eq(0).addClass(_focus.prename + 'focus');
        }

        //设置 css
        _focus.setCss();

        //显示内容
        $('.' + _focus.prename + 'background-item:gt(0)', _focus.self).css('z-index', 1).css({opacity: 0});
        $('.' + _focus.prename + 'background-item', _focus.self).show();
        $(_focus.self).css({overflow: 'visible', visibility: 'visible', display: 'block'});
    };

    //CSS
    _focus.setCss = function () {

        var cssCode = '<style type="text/css">';
        cssCode += _focus.selector + ' *{ margin:0;padding:0;} ';
        cssCode += _focus.selector + ' .' + _focus.prename + 'background-box{width:100%;height:' + parseInt(options.height) + 'px;position:relative;z-index:1;} ';
        cssCode += _focus.selector + ' .' + _focus.prename + 'background-box .' + _focus.prename + 'background-item{width:100%;height:' + parseInt(options.height) + 'px;position:absolute;overflow:hidden;} ';
        cssCode += _focus.selector + ' .' + _focus.prename + 'background-box .' + _focus.prename + 'background-item a.' + _focus.prename + 'coverlink{width:100%;height:' + parseInt(options.height) + 'px;display:block;text-decoration:none;padding:0;margin:0px auto;background:transparent;text-indent:0;outline:none;hide-focus:expression(this.hideFocus=true);z-index:1000;} ';
        if (options.text.title.display != 'none' || options.text.abstract.display != 'none') {
            //cssCode+= _focus.selector+' .'+_focus.prename+'background-box .'+_focus.prename+'background-item .'+_focus.prename+'text{width:960px;height:'+parseInt(options.height)+'px;display:block;text-decoration:none;padding:0;margin:0px auto;background:transparent;text-indent:0;outline:none;hide-focus:expression(this.hideFocus=true);z-index:1000;position:relative;} ';
            cssCode += _focus.selector + ' .' + _focus.prename + 'background-box .' + _focus.prename + 'background-item .' + _focus.prename + 'text{' + _focus.fn.objtoCss(options.text.wrap) + ';overflow:hidden;_zoom:1;}';
        }
        if (options.text.title.display != 'none') {
            cssCode += _focus.selector + ' .' + _focus.prename + 'background-box .' + _focus.prename + 'background-item .' + _focus.prename + 'text h3{' + _focus.fn.objtoCss(options.text.title) + ';overflow:hidden;_zoom:1;}';
        }
        if (options.text.abstract.display != 'none') {
            cssCode += _focus.selector + ' .' + _focus.prename + 'background-box .' + _focus.prename + 'background-item .' + _focus.prename + 'text h5{' + _focus.fn.objtoCss(options.text.abstract) + ';overflow:hidden;_zoom:1;}';
        }
        if (options.button.normal.display != 'none') {
            cssCode += _focus.selector + ' .' + _focus.prename + 'button{' + _focus.fn.objtoCss(options.button.normal, ['top', 'right', 'bottom', 'left'], true) + ';position:absolute;list-style:none;z-index:2;overflow:hidden;_zoom:1;display:inline-block;margin-left:-' + $(".my_focusbutton").width() / 2 + 'px;}';
            cssCode += _focus.selector + ' .' + _focus.prename + 'button li{' + _focus.fn.objtoCss(options.button.normal, ['top', 'right', 'bottom', 'left']) + ';cursor:pointer;-webkit-text-size-adjust:none;}';
            cssCode += _focus.selector + ' .' + _focus.prename + 'button li.' + _focus.prename + 'focus{' + _focus.fn.objtoCss(options.button.focus, ['top', 'right', 'bottom', 'left']) + ';cursor:default;}';
        }
        cssCode += '</style>';
        $(_focus.self).prepend(cssCode);
        $("." + _focus.prename + "button").css("margin-left", "-" + $("." + _focus.prename + "button").width() / 2 + "px");//定义居中
    }

    //动画管理
    _focus.setAnimate = function () {

        options.callback.call($('.' + _focus.prename + 'background-item:eq(' + _focus.index + ')', _focus.self), _focus.index, 'fadeIn');

        var overDelayTimer;//当switchEvent是mouseover时  执行延迟计时器
        $('.' + _focus.prename + 'button', _focus.self).delegate('li', options.button.switchEvent, function () {
            _this = this;

            function setChange() {
                _focus.index = $(_this).index();
                _focus.setOpacity();
            }

            if (options.button.switchEvent == 'mouseover') {
                overDelayTimer = setTimeout(setChange, 200);
            } else {
                setChange();
            }
        })
        //mouseover 延时
        if (options.button.switchEvent == 'mouseover') {
            $('.' + _focus.prename + 'button', _focus.self).delegate('li', 'mouseout', function () {
                clearTimeout(overDelayTimer);
            })
        }

        //设置索引
        _focus.index = 1;
        _focus.lindex = 0;
        //自动切换定时器
        _focus.data.moveTimer = setInterval(_focus.setOpacity, options.intervalTime * 1000 + options.switchtime);

        //悬停暂停
        if (options.hoverpause) {
            $(_focus.self).hover(function () {
                clearInterval(_focus.data.moveTimer);
            }, function () {
                _focus.data.moveTimer = setInterval(_focus.setOpacity, options.intervalTime * 1000 + options.switchtime);
            })
        }

    };

    //擦除(切换)
    _focus.setOpacity = function () {

        //回调 fadeOut callback
        options.callback.call($('.' + _focus.prename + 'background-item:eq(' + (_focus.lindex) + ')', _focus.self), _focus.lindex, 'fadeOut');
        //按钮切换
        if (options.button.normal.display != 'none') {
            $('ul.' + _focus.prename + 'button li', _focus.self).removeClass(_focus.prename + 'focus');
            $('ul.' + _focus.prename + 'button li', _focus.self).eq(_focus.index).addClass(_focus.prename + 'focus');
        }

        //停止执行中的动画
        $('.' + _focus.prename + 'background-item:animated', _focus.self).stop(true, false);
        //设置上一个显示的z-index为0
        $('.' + _focus.prename + 'background-item', _focus.self).css('z-index', 1);
        //设置当前显示的z-index为1
        $('.' + _focus.prename + 'background-item', _focus.self).eq(_focus.index).css({opacity: 0, 'z-index': 2});
        //alert(_focus.index)
        $('.' + _focus.prename + 'background-item', _focus.self).eq(_focus.index).animate({opacity: 1}, options.switchtime, options.easing, function () {
                $('.' + _focus.prename + 'background-box .' + _focus.prename + 'background-item:not(:eq(' + _focus.index + '))', _focus.self).css({opacity: 0});
                //回调 fadeIn callback
                options.callback.call($('.' + _focus.prename + 'background-item:eq(' + _focus.index + ')', _focus.self), _focus.index, 'fadeIn');
                _focus.lindex = _focus.index;
                if (_focus.index == _focus.size - 1) {
                    _focus.index = 0;
                } else {
                    _focus.index++;
                }
            }
        );

    };

    //运行
    _focus.run = function () {
        _focus.onload();
    };

    /* obj 对象样式，带有"-"的需要转为驼峰式写法 如：font-size:12px; fontSize:12px;  excArr:不需要转换的列表排除在外的 类型 数组 ['test1','opacity'] 若excFlag为ture则只转换excArr数组中的CSS*/
    _focus.fn.objtoCss = function (obj, excArr, excFlag) {
        excFlag = excFlag ? true : false;
        var isIe = navigator.userAgent.indexOf("MSIE") != -1;
        var style = '';
        if (excFlag) {
            for (var key in obj) {
                if ($.inArray(key, excArr) != -1) {
                    pKey = key.replace(/([A-Z])/, focusToLowerCase);
                    if (pKey == 'opacity' && isIe) {
                        style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                    } else {
                        style += pKey + ":" + obj[key] + ";";
                    }
                }
            }
            ;
        } else {
            for (var key in obj) {
                if ($.isArray(excArr)) {
                    if ($.inArray(key, excArr) == -1) {
                        pKey = key.replace(/([A-Z])/, focusToLowerCase);
                        if (pKey == 'opacity' && isIe) {
                            style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                        } else {
                            style += pKey + ":" + obj[key] + ";";
                        }
                    }
                } else {
                    pKey = key.replace(/([A-Z])/, focusToLowerCase);
                    if (pKey == 'opacity' && isIe) {
                        style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                    } else {
                        style += pKey + ":" + obj[key] + ";";
                    }
                }
            }
            ;
        }


        function focusToLowerCase(word) {
            var str = '';
            str = '-' + word.toLowerCase();
            return str;
        };
        return style;
    };

    /* 运行 */
    _focus.run();
}

function backToTop(elementId) {
    var $backToTopTxt = "返回顶部", $backToTopEle = $('<div class="' + elementId + '"></div>').appendTo($("body"))
        .text($backToTopTxt).attr("title", $backToTopTxt).click(function () {
            $("html, body").animate({scrollTop: 0}, 120);
        }), $backToTopFun = function () {
        var st = $(document).scrollTop(), winh = $(window).height();
        (st > 0) ? $backToTopEle.show() : $backToTopEle.hide();
        //IE6下的定位
        if (!window.XMLHttpRequest) {
            $backToTopEle.css("top", st + winh - 166);
        }
    };
    $(window).bind("scroll", $backToTopFun);
    $(function () {
        $backToTopFun();
    });
}

function getUserLoginIframe() {
    $.ajax({
        async: false,
        type: 'GET',
        url: userUrl + '/userstatus.html&time=' +new Date().toString(),
        dataType: 'jsonp',
        success: function (result) {
            if (result.code == 0) {
                $('.js-user-login').html(result.data);
            } else if (result.code == 1) {
                $('.js-user-login').hide();
            }
        }
    });
}

function userGroupById(id) {
    $.ajax({
        async: false,
        type: 'GET',
        data: {id: id},
        url: userUrl + '/ajax/user-group-by-id?time=' +new Date().toString(),
        dataType: 'jsonp',
        success: function (result) {
            if (result.code == 0) {
                $('.js-user-login').html(result.data);
            } else if (result.code == 1) {
                $('.js-user-login').hide();
            }
        }
    });
}

function loginOut() {
    dabali.confirm(false, '你确认要退出账户吗？', true, true, function () {
        $.ajax({
            async: false,
            type: 'GET',
            url: userUrl + '/ajax/logout?time=' +new Date().toString(),
            dataType: 'jsonp',
            success: function (result) {
                if (result.code == 0) {
                    dabali.tips('你已经成功退出了账户，欢迎你下次继续登录！', 3, 'success', true, true, function() {
                        if (result.data.referrer != '') {
                            location.replace(result.data.referrer);
                        } else {
                            location.replace(webUrl);
                        }
                    });
                } else if (result.code == 1) {
                    dabali.tips(result.msg, 2, 'error');
                }
            }
        });
    }, function () {
        //dabali.tips('你已经取消了退出账户操作！', 2, 'error');
    });
}
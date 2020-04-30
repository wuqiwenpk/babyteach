var dabali = function () {

    /**
     * 页面提示
     * @param $msg 消息
     * @param $time 时间
     * @param $icon 图标，例如：'fa fa-user' 或 'glyphicon glyphicon-warning-sign'
     * @param $isFixed 开启固定定位
     * @param $isLock 开启锁屏
     * @param $callback 返回
     */
    var tips = function ($msg = '温馨提示', $time = 2, $icon = '', $isFixed = true, $isLock = false, $callback) {
        var d = dialog({
            fixed: $isFixed,
            content: $msg,
            skin: 'danger-dialog',
            onclose: $callback,
            backdropOpacity: 0.3
        });
        if ($isLock == true) {
            d.showModal();
        } else {
            d.show();
        }
        setTimeout(function () {
            d.close().remove();
        }, 1000 * $time);
    }

    /**
     * 确认对话框
     * @param $title 标题
     * @param $content 内容
     * @param $isFixed 开启固定定位
     * @param $isLock 开启锁屏
     * @param $okCallback 返回
     * @param $cancelCallback 返回
     */
    var confirm = function ($title = '', $content = '', $isFixed = true, $isLock = false, $okCallback, $cancelCallback, $okValue = '确定', $cancelValue = '取消') {
        var d = dialog({
            title: $title,
            content: $content,
            width: 260,
            //height: 160,
            padding: 20,
            skin: 'danger-dialog',
            fixed: $isFixed,
            okValue: $okValue,
            ok: function (here) {
                return $okCallback.call(this, here);
            },
            cancelValue: $cancelValue,
            cancel: function (here) {
                return $cancelCallback && $cancelCallback.call(this, here);
            },
            backdropOpacity: 0.3
        });
        if ($isLock == true) {
            d.showModal();
        } else {
            d.show();
        }
    }

    /**
     * 弹出窗口
     * @param $id ID
     * @param $width 宽度
     * @param $height 高度
     * @param $title 标题
     * @param $content 内容
     * @param $isFixed 开启固定定位
     * @param $isLock 开启锁屏
     * @param $isReload 开启关闭窗口刷新
     * @param $button 按钮
     *
     * @param $callback 返回
     */
    var window = function ($elementId = 'window', $width = 400, $height = 300, $title = '弹窗', $content = '', $isFixed = true, $isLock = false, $isReload = false, $button = false) {
        var d = top.dialog({
            id: $elementId,
            width: $width,
            height: $height,
            padding: 0,
            fixed: $isFixed,
            title: $title,
            url: $content,
            skin: 'danger-dialog',
            zIndex: 100000,
            //quickClose: true,
            //backdropOpacity: 0.3,
            onshow: function () {
                console.log('onshow');
            },
            oniframeload: function () {
                console.log('oniframeload');
            },
            onclose: function () {
                if ($isReload == true) {
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }
            },
            onremove: function () {
                console.log('onremove');
            }
            //okValue: '确定',
            //ok: function () {
            //this.title('提交中…');
            //var iframe = this.iframeNode.contentWindow;
            //if (!iframe.document.body) {
            //alert('iframe还没加载完毕呢');
            //return false;
            //}
            //iframe.$('body').contents().find('.js-ok').click();

            /*var that = this;
            setTimeout(function () {
                that.close().remove();
            }, 2000);*/

            //return false;
            //},
            //cancelValue: '取消',
            //cancel: function () {
            //var iframe = this.iframeNode.contentWindow;
            //if (!iframe.document.body) {
            //alert('iframe还没加载完毕呢');
            //return false;
            //}
            //iframe.$('body').contents().find('.js-cancel').click();

            /*var that = this;
            setTimeout(function () {
                that.close().remove();
            }, 2000);*/

            //return false;
            //}
        });

        if ($isLock == true) {
            d.showModal();
        } else {
            d.show();
        }

        if ($button == true) {
            d.button([
                {
                    value: '取消',
                    callback: function () {
                        //this.title('提交中…');
                        var iframe = this.iframeNode.contentWindow;
                        if (!iframe.document.body) {
                            alert('iframe还没加载完毕呢');
                            return false;
                        }
                        iframe.$('body').contents().find('.js-ok').click();

                        /*var that = this;
                        setTimeout(function () {
                            that.close().remove();
                        }, 2000);*/

                        return false;
                    }
                },
                {
                    value: '确定',
                    callback: function () {
                        //this.title('提交中…');
                        var iframe = this.iframeNode.contentWindow;
                        if (!iframe.document.body) {
                            alert('iframe还没加载完毕呢');
                            return false;
                        }
                        iframe.$('body').contents().find('.js-ok').click();

                        /*var that = this;
                        setTimeout(function () {
                            that.close().remove();
                        }, 2000);*/

                        return false;
                    },
                    autofocus: true
                }
            ]);
        }

        return false;
    }

    /**
     * 页面小提示
     * @param $title 消息标题
     * @param $msg 提示信息
     * @param $type 提示类型:'info', 'success', 'warning', 'danger'
     * @param $icon 图标，例如：'fa fa-user' 或 'glyphicon glyphicon-warning-sign'
     * @param $from 'top' 或 'bottom'
     * @param $align 'left', 'right', 'center'
     * @param $time 显示时间
     * @param $isfixed 是否固定
     * @param $islock 是否锁屏
     * @param $isclose 是否显示关闭按钮
     * @param $callback 返回
     */
    var notify = function ($title, $msg, $type, $icon, $from, $align, $time, $isfixed, $islock, $isclose, $callback) {
        $title = $title || '';
        $type = $type || 'info';
        $from = $from || 'top';
        $align = $align || 'center';
        $enter = $type == 'success' ? 'animated fadeInUp' : 'animated shake';
        $time = $time || 1000;
        $isclose = $isclose || false;
        $callback = $callback || '';

        jQuery.notify({
                icon: $icon,
                title: $title,
                message: $msg
            },
            {
                element: 'body',
                type: $type,
                allow_dismiss: $isclose,
                newest_on_top: true,
                showProgressbar: false,
                placement: {
                    from: $from,
                    align: $align
                },
                offset: 20,
                spacing: 10,
                z_index: 10800,
                delay: 3000,
                timer: $time,
                animate: {
                    enter: $enter,
                    exit: 'animated fadeOutDown'
                }
            });
        if ($islock) {
            jQuery('body').prepend('<div class="modal-backdrop fade in"></div>');
            setTimeout(function () {
                if (jQuery('.modal-backdrop').length) {
                    jQuery('.modal-backdrop').fadeOut(250);
                }
            }, $time);
        }
        if ($callback) {
            setTimeout($callback, $time);
        }
    };

    return {
        // 页面小提示
        tips: function ($msg, $time, $icon, $isFixed, $isLock, $callback) {
            tips($msg, $time, $icon, $isFixed, $isLock, $callback);
        },
        // 确认对话框
        confirm: function ($title, $content, $isFixed, $isLock, $okCallback, $cancelCallback, $okValue, $cancelValue) {
            confirm($title, $content, $isFixed, $isLock, $okCallback, $cancelCallback, $okValue, $cancelValue);
        },
        // 弹出窗口
        window: function ($elementId, $width, $height, $title, $content, $isFixed, $isLock, $isReload, $button) {
            window($elementId, $width, $height, $title, $content, $isFixed, $isLock, $isReload, $button);
        },
        // 页面小提示
        notify: function ($title, $msg, $type, $icon, $from, $align, $time, $isfixed, $islock, $isclose, $callback) {
            notify($title, $msg, $type, $icon, $from, $align, $time, $isfixed, $islock, $isclose, $callback);
        }
    };
}();

// Initialize app when page loads
jQuery(function () {
    //dabali.init();
});
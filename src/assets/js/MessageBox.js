import { MessageBox as eleMB, Notification } from 'element-ui';

/******************
*** MessageBox 消息弹框
*** msg 提示信息
*** type 消息类型
******************/
window.ShowMsgBox = window.showMsgBox = function(msg, type, callback) {
    callback = callback || function () { }
    
    eleMB.alert(msg, {
        type: type || "warning",
        callback: callback,
        dangerouslyUseHTMLString: true
    });
}

/******************
*** Notification 消息通知
*** msg 提示信息
*** type 消息类型
******************/
window.ShowMsg = window.showMsg = function(msg, type) {
    Notification({
        message: msg,
        type: type || "warning"
    });
    //$message({ showClose: true, message: msg, type: type || "warning", duration: 1500 });
}

/**
 * confirm确认选择框
 * @param  {string} msg  提示信息
 * @param  {string} type 提示类型
 * @param  {function} cb1  确认回调
 * @param  {Function} cb2  取消回调
 * @return {null}      无返回值
 */
 window.ShowConfirm = window.showConfirm = function (msg, type, cb1, cb2) {
    cb1 = cb1 || function () {};
    cb2 = cb2 || function () {};

    eleMB.confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type || 'warning',
        showClose: false,
        dangerouslyUseHTMLString: true,
        callback: function (action, instance) {
            if (action == 'confirm') {
                cb1();
            } else {
                cb2();
            }
        }
    })
}

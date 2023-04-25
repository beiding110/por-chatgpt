import { MessageBox as eleMB } from 'element-ui';

var donotShowAgain = false;

export function showMB (msg, type, callback) {
    if (donotShowAgain) {
        return;
    }

    var innerCallback = callback || function () { };

    eleMB.alert(msg, {
        type: type || 'warning',
        callback() {
            innerCallback();
            donotShowAgain = false;
        },
        dangerouslyUseHTMLString: true
    });
}

export function unlockMB() {
    donotShowAgain = false;
}

export function lockMB() {
    donotShowAgain = true;

    if (window) {
        // 如果页面发生了切换，则取消lock
        function hashChangeHandler() {
            unlockMB();

            window.removeEventListener('hashchange', hashChangeHandler);
        }

        window.addEventListener('hashchange', hashChangeHandler, false);
    }
}
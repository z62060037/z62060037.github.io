
//百度搜索js


(function () {
    var b = window.BaiduHttps = { _option: {} };
    var f = function () { if (d()) { i() } else { c("http") } };
    function d() {
        var k = (navigator && navigator.userAgent) ? navigator.userAgent : "", j = new RegExp(/msie 6/i), l = j.test(k);
        return !l
    }
    function i() { h({ url: "https://www.baidu.com/con", tn: "zhanzhang" }) }
    function c(j) {
        b._option.protocol = j;
        b._option.checked = true
    }
    function e() { return (new Date()).getTime().toString(16) }
    function h(l) {
        var k = l.url ? l.url : "https://www.baidu.com/con", j = document.createElement("script");
        j.onload = function () { };
        j.onerror = function () { c("http") };
        j.src = k + "?from=" + l.tn;
        document.body.appendChild(j)
    } b.callbacks = function (j) {
        if (typeof j === "object") {
            if (j.s == 0) {
                c("https")
            }
            else {
                c("http")
            }
        }
    };
    var a;
    b.useHttps = function () {
        if (this._option.timeout === true) {
            f();
            this._option.timeout = false;
            this._option.time_checked = false;
            a = setTimeout(g, 1000 * 120)
        };
        if (!this._option.time_checked) {
            a = setTimeout(g, 1000 * 120)
        }
        if (this._option.checked && this._option.protocol == "https")
        { return { s: 1, ssl_code: "ssl10_" + e() }; }
        else {
            return { s: 0, ssl_code: "ssl9_" + e() };
        }
    };
    function g() {
        b._option.time_checked = true;
        b._option.timeout = true
    } f()
})();




function checkHttps()
{ BaiduHttps.useHttps(); };
function baiduWithHttps(formname) {
    var data = BaiduHttps.useHttps();
    if (data.s === 0) {
        return true;
    }
    else {
        formname.action = 'https://www.baidu.com/baidu' + '?ssl_s=1&ssl_c' + data.ssl_code;
        return true;
    }
};



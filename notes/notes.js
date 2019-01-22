// 原生js和jquery

// 声明赋值
function declarativeAssignment() {

    // 未声明赋值
    console.log(a); //undefined
    a = 1;
    console.log(a); //1
    var a = 2;
    console.log(a); //2

    // 赋值
    var a = 1;
    var b = 2;
    a = b;
    console.log(a); //2
    b = 3;
    console.log(a); //2

    // 函数重复
    function aaa() {
        console.log(1);
    }
    function aaa() {
        console.log(2);
    }
    aaa(); //2

    // 全局变量
    var name = "max";
    console.log(name); //"max"
    window.name = "sar";
    console.log(name); //"sar"
    

    var newVal = oldVal; // 不会抛出错误，因为这是一次属性查询
    console.log(newVal); // 抛出错误，因为oldVal未定义
    var newVal=window.oldVal; 
    console.log(newVal); // undefined

}



// 数据类型
function dataType() {


    // 数值
    this.number= function () {
        // 数值转字符串
        var aaa = 111;
        aaa = aaa.toString();

        // 四舍五入为指定小数位数的数字
        var aaa = 1.234;
        aaa.toFixed(2); //aaa=1.23
        // 向上取整
        Math.ceil(5.4); //6
        // 向下取整
        Math.floor(5.4); //5
        // 返回介于 0 ~ 1 之间的一个随机数。
        Math.random();


    }

    // 字符串
    this.string=function() {


        //字符串转数值
        parseInt("111");    //return  111
        parseInt("1234blue");  //return  1234 

        // 替换字符
        // 正则
        "abc123".replace(/\d+/g, "789"); //abc789
        // 普通
        "abc789".replace("abc", "asd"); //asd789


        // 提取字符
        "abc123".slice(1, 3); //bc1

        // 转换成大写
        toUpperCase()
        // 转换成小写
        toLowerCase()


        //字符串转数组
        var a = "0,1,2,3,4,5";
        var b = a.split(",");

        // json字符串转换为json对象 
        formFile = JSON.parse(formFile);
    }

    // 正则表达式
     this.regular=function() {

        /*
        非打印字符
            \cx  匹配由x指明的控制字符。例如， \cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。 
            \f  匹配一个换页符。等价于 \x0c 和 \cL。 
            \n  匹配一个换行符。等价于 \x0a 和 \cJ。 
            \r  匹配一个回车符。等价于 \x0d 和 \cM。 
            \s  匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。 
            \S  匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。 
            \t  匹配一个制表符。等价于 \x09 和 \cI。 
            \v  匹配一个垂直制表符。等价于 \x0b 和 \cK。 


        特殊字符
            $ 匹配输入字符串的结尾位置。如果设置了 RegExp 对象的 Multiline 属性，则 $ 也匹配 '\n' 或 '\r'。要匹配 $ 字符本身，请使用 \$。 
            ( ) 标记一个子表达式的开始和结束位置。子表达式可以获取供以后使用。要匹配这些字符，请使用 \( 和 \)。 
            * 匹配前面的子表达式零次或多次。要匹配 * 字符，请使用 \*。 
            + 匹配前面的子表达式一次或多次。要匹配 + 字符，请使用 \+。 
            . 匹配除换行符 \n之外的任何单字符。要匹配 .，请使用 \。 
            [  标记一个中括号表达式的开始。要匹配 [，请使用 \[。 
            ? 匹配前面的子表达式零次或一次，或指明一个非贪婪限定符。要匹配 ? 字符，请使用 \?。 
            \ 将下一个字符标记为或特殊字符、或原义字符、或向后引用、或八进制转义符。例如， 'n' 匹配字符 'n'。'\n' 匹配换行符。序列 '\\' 匹配 "\"，而 '\(' 则匹配 "("。 
            ^ 匹配输入字符串的开始位置，除非在方括号表达式中使用，此时它表示不接受该字符集合。要匹配 ^ 字符本身，请使用 \^。 
            { 标记限定符表达式的开始。要匹配 {，请使用 \{。 
            | 指明两项之间的一个选择。要匹配 |，请使用 \|。 
            
        
        限定符
            *  匹配前面的子表达式零次或多次。例如，zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}。 
            +  匹配前面的子表达式一次或多次。例如，'zo+' 能匹配 "zo" 以及 "zoo"，但不能匹配 "z"。+ 等价于 {1,}。 
            ?  匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 或 "does" 中的"do" 。? 等价于 {0,1}。 
            {n}  n 是一个非负整数。匹配确定的 n 次。例如，'o{2}' 不能匹配 "Bob" 中的 'o'，但是能匹配 "food" 中的两个 o。 
            {n,}  n 是一个非负整数。至少匹配n 次。例如，'o{2,}' 不能匹配 "Bob" 中的 'o'，但能匹配 "foooood" 中的所有 o。'o{1,}' 等价于 'o+'。'o{0,}' 则等价于 'o*'。 
            {n,m}  m 和 n 均为非负整数，其中n <= m。最少匹配 n 次且最多匹配 m 次。例如，"o{1,3}" 将匹配 "fooooood" 中的前三个 o。'o{0,1}' 等价于 'o?'。请注意在逗号和两个数之间不能有空格。 
        
        各种操作符的运算优先级
            \  转义符 
            (), (?:), (?=), []  圆括号和方括号 
            *, +, ?, {n}, {n,}, {n,m}  限定符 
            ^, $, \anymetacharacter  位置和顺序 
            |  “或”操作 
        */

        //    ^\w{4}$  匹配4个字符   aaaa
    }




    // 数组 
    function array() {


        var aaa = [0, 1, 2, 3, 4, 5];
        var bbb = ["d", "a", "b", "e", "c"];

        // 数组转字符串
        aaa.join(","); //"0,1,2,3,4,5"

        // 数组删除
        aaa.splice(0, 1);  //[1, 2, 3, 4, 5]

        // 数组连接
        aaa.concat([4, 5, 6]); //[0, 1, 2, 3, 4, 5 , 4, 5, 6]

        // 数组按照首字母大小进行排序
        bbb.sort(); //["a", "b", "c", "d", "e"]

        // 数组打乱
        bbb.sort(function () { return Math.random() > 0.5 ? -1 : 1; }); //[ "d", "a", "b", "e", "c" ]

        // 数组随机抽取
        var index = Math.floor((Math.random() * arr.length));
        console.log(arr[index]);

        // 创建与aaa相同的数组
        var ccc = [].concat(aaa);
        // 比较aaa与ccc数组是否相同
        JSON.stringify(ccc) == JSON.stringify(aaa);
    }


    // 对象
    function object() {
        // 获取数据中的键(字段)和对应的值
        for (var key in Object) {
            console.log(key);
            console.log(Object[key]);
        }

        // 对象的所有属性
        var aaa = {
            name: "abc",
            age: 11
        }
        console.log(Object.keys(aaa)); //["name","age"]

        // 对象的长度
        var aaa = {
            name: "abc",
            age: 11
        }
        console.log(Object.keys(aaa).length); //2


        // json对象转换为json字符串
        formFile = JSON.stringify(formFile);


        // 对象里放函数
        var aaa = {
            zidingyifangfa: function (num) {
                console.log(num);
            }
        }
        aaa.zidingyifangfa("123"); //"123"

        // 传递参数  js高级程序P70
        var aaa = {};
        var bbb = aaa;
        aaa.name = "x";
        console.log(bbb);

        //对象删除属性
        var aaa = {
            name: "abc",
            age: 11
        }
        delete aaa.name;

        // 判断数组是否含有某个属性
        var aaa = {
            name: "abc",
            age: 11
        }
        aaa.hasOwnProperty(name) //true




    }





}



// 事件
function event() {

    // 自 jQuery 版本 1.7 起，on() 方法是 bind()、live() 和 delegate() 方法的新的替代品。
    // on()和bind()的函数签名
    // bind(type, [data], fn)  
    // on(type,[selector],[data],fn)  

    // on()函数的参数selector就是为了在事件冒泡的时候，让父元素能够过滤掉子元素上发生的事件。
    // 如果使用了bind，那么就没有这个能力，子元素上发生的事件一定会触发父元素事件。
    // on绑定的事件处理函数，对于未来新增的元素一样可以，和delegate效果相同，而bind则不行。

    //静态标签添加事件 $("$(#headId)").click(function () {});和$("#headId").on('click', function () {});
    //动态标签添加事件 $(document).on('click','#headId',function(){});



    // 点击在aaa中除了bbb的区域会触发事件
    // <div class="aaa">
    //      <div class="bbb">
    //      </div>
    //  </div> 
    $(document).on("click", "#aaa", function () {
        console.log("触发事件");
    });
    $(".bbb").on("click", function (event) {
        // 阻止冒泡 
        event.stopPropagation();
    });

    // 按键监听
    $("#aaa").keydown(function (event) {
        if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {
            console.log('按下了← ↑ ↓ →');
        }
        if (event.keyCode == 13) {
            console.log('按下了Enter');
        }
    });

    // 屏蔽指定区域浏览器原右键菜单
    var nodeId = document.getElementById("aaa");
    nodeId.oncontextmenu = function () {
        return false;
    }


}

// 方法
function method() {

    // 打印数据
    console.log('log');
    document.writeln('write');
    window.alert('alert');
    window.prompt();

    // 获取节点
    getElementById();	       //返回带有指定 ID 的元素。
    getElementsByName();       //返回带有指定名称的对象集合。
    getElementsByTagName();     //返回包含带有指定标签名称的所有元素的节点列表.
    getElementsByClassName();   //返回包含带有指定类名的所有元素的节点列表。
    querySelector();            //返回匹配指定选择器的第一个元素
    querySelectorAll();         //返回匹配指定选择器的所有元素

    // 修改节点
    appendChild();	    //把新的子节点添加到指定节点。
    removeChild();   	//删除子节点。
    replaceChild(); 	    //替换子节点。
    insertBefore(); 	    //在指定的子节点前面插入新的子节点。
    createAttribute();	//创建属性节点。
    createElement(); 	//创建元素节点。
    createTextNode();	//创建文本节点。
    getAttribute();  	//返回指定的属性值。
    setAttribute(); 	//把指定属性设置或修改为指定的值。

    //返回某个指定的字符串值在字符串中首次出现的位置。  
    // 字符串
    var aaa = "abcdef";
    aaa.indexOf("abc"); //0
    // 数组
    var bbb = ["a", "b"];
    bbb.indexOf("a"); //0

    //  延迟执行一次
    setTimeout(function () { }, 500);
    //  延迟执行多次
    var doShing = setInterval(function () { }, 1000);
    // 取消延迟执行多次
    clearInterval(doShing);

    // 按aaa元素持续执行aaa函数
    var sidebarScrollUp;
    $(document).on("mousedown", "#aaa", function () {
        sidebarScrollUp = self.setInterval("aaa()", 50);
    });
    // 取消执行
    sidebarScrollUp = window.clearInterval(sidebarScrollUp);


    // url传递参数
    window.open("www.aaa.com/aaa?bbb=" + encodeURIComponent(postData.relationGroups) + "");

    // 检测函数执行时间
    console.time('1');
    //待检测函数
    console.timeEnd('1');


    // 获取aaa标签相对于窗口的高度
    $("#aaa").scrollTop()


    //获取当前时间
    var nowDate = new Date();







}



// 语句
function statement() {

    // if/else语句 
    if (x = 1) {
        // 当条件为 true 时执行的代码
    }
    else {
        // 当条件不为 true 时执行的代码
    }

    // try/catch/finally语句 
    try {
        // tryCode - 尝试执行代码块
    }
    catch (err) {
        // catchCode - 捕获错误的代码块
    }
    finally {
        // finallyCode - 无论 try / catch 结果如何都会执行的代码块
    }

    //  switch 语句
    switch (n) {
        case 1:
            //  执行代码块 1
            break;
        case 2:
            //  执行代码块 2
            break;
        default:
        //  n 与 case 1 和 case 2 不同时执行的代码
    }

    //for 循环
    for (var i = 0; i < array.lenght; i++) {
        //  被执行的代码块
    }


    //for/In 循环
    var person = { fname: "John", lname: "Doe", age: 25 };
    for (x in person) {
        txt = txt + person[x];
    }
    // 所有属性都会被返回一次，但返回的先后次序可能会因浏览器而异
    // ES5之前，对象值如果为null或undefined会抛出错误。safari3以前版本可能会返回两次。


    //while 循环 
    while (x = 1) {
        // 需要执行的代码
    }


    // do/while 循环
    do {
        // 需要执行的代码
    }
    while (x = 1);

    // JS没有块级作用域 P76
    if (true) {
        var aaa = "aaa";
    }
    console.log(aaa);  // aaa


    for (var i = 0; i < 5; i++) {
        var aaa;
        aaa++;
    }
    console.log(i + " " + aaa);  //5 NaN



}



// 函数
function functionNote() {

    // 函数表达式 写法
    function expression() {



        // 加载完执行
        // jquery写法
        $(document).ready(function () { });
        $(function () { });  //简写
        // js写法
        window.onload = function () { }



        // 函数写法
        // 关键字来定义
        function test1() { alert('1'); }
        test1();
        // 字面量定义，表达式
        var test2 = function () { alert('2') }();
        // 表面上看是以关键词来定义的，但是加括号后返回一个表达式形式
        (function (key) { alert(key); })(3);

        /*
       自执行的匿名函数
       防止重复定义全局变量
        ( function() {}() );
        ( function() {} )();
        [ function() {}() ];
       
        ~ function() {}();
        ! function() {}();
        + function() {}();
        - function() {}();
       
        delete function() {}();
        typeof function() {}();
        void function() {}();
        new function() {}();
        new function() {};
       
        var f = function() {}();
       
        1, function() {}();
        1 ^ function() {}();
        1 > function() {}();
       
        链接：https://www.zhihu.com/question/20249179/answer/14487857
       */


        function apple() {
            console.log("a apple");
            this.weight = function () {
                console.log("500g");
            }
        }
        // 实例化
        var newApple = new apple(); //"a apple"
        newApple.weight(); //"500g"

        function apple() {
            this.weight = "500g";
        }
        var newApple = new apple(); //"a apple"
        console.log(newApple.weight);  //"500g"


    }




    // 页面跳转 iframe操作
    function pageOperating() {
        // 操作iframe中js函数

        // js写法
        document.getElementById("iframeId").contentWindow.iframeFunction("abc");
        window.frames["iframeName"].window.iframeFunction("abc");
        // jquery写法
        $("#iframeId")[0].contentWindow.iframeFunction("abc");

        // 加载js
        $.getScript("../WdatePicker.js", function () {  //加载test.js,成功后，并执行回调函数
            console.log("js文件加载完毕");
        });

        // 动态加载 CSS 文件
        dynamicLoading.css("../../css/esop/productPlanaPrintForFF.css");

        var dynamicLoading = {
            css: function (path) {
                if (!path || path.length === 0) {
                    throw new Error('argument "path" is required !');
                }
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.href = path;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                head.appendChild(link);
            },
            js: function (path) {
                if (!path || path.length === 0) {
                    throw new Error('argument "path" is required !');
                }
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.src = path;
                script.type = 'text/javascript';
                head.appendChild(script);
            }
        }

        // 修改iframe引用的页面
        $("iframe[name=aaa]").attr("src", "../../pages/base/aaa.html");
        // 等iframe页面加载完执行iframe页面的函数
        $("iframe[name=aaa]").load(function () {
            document.getElementById("aaa").contentWindow.imagePreview(fileUrl);
        });

        // 获取iframe页面中，获取父页面的内容
        var aaa = parent.$("[name=aaa]").contents().find("#aaa").attr("aaa");


        // 在ifeame页面js中调用父页面函数
        window.parent.parentFunction();

        
    }

}


function ajax() {





    // 原生JS AJAX  GET

    //  get使用a标签，更简单也更快，用于获取数据。

    var request = new XMLHttpRequest();
    request.open("GET", "http://192.168.1.125:8100/pgs/system/skin?_=1545029305143", true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert("发送成功：" + request.status);
                alert("获得数据：" + request.responseText);
            } else {
                alert("发生错误：" + request.status);
            }
        }
    }



    // jQuery AJAX GET

    var jsonData = new Array();
    $.ajax({
        url: ajaxUrlPrefix + ajaxUrlSuffix,
        // url: "data/jsonData.json",
        // ajax获取json文件的路径是根据引用js的html文件的位置决定的
        type: "get",
        data: jsonData,
        dataType: "json",
        async: true,
        //AJAX async属性异步默认值为true
        success: function (data) {
            console.log(data);
            //ajax回调函数  执行成功后执行
            successfunction(data);
        }
    });

    // 原生JS AJAX  POST

    // 在以下情况中，使用 POST 请求：无法使用缓存文件（更新服务器上的文件或数据库）,向服务器发送大量数据（POST 没有数据量限制）,发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

    // post用button标签

    // <!-- <div href="" id="fasong">fasong</div> -->

    document.getElementById("fasong").onclick = function () {
        var request = new XMLHttpRequest();
        // 请求地址
        request.open("POST", "http://192.168.1.125:8100/pgs/esop/prodLine/add", true);
        // 请求数据
        var data = {
            "lineName": "产线6",
            "remarks": "",
            "enableReceive": 0,
            "enableStart": 0,
            "autoComplete": 0,
        };
        data = JSON.stringify(data);
        // 请求头
        // 在最开始的请求方式中，请求参数都是放在url中，表单提交的时候，都是以key=&value=的方式写在url后面。这也是浏览器表单提交的默认方式
        // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 此种方式多用于文件上传，表单数据都保存在http的正文部分，各个表单项之间用boundary分开。
        // request.setRequestHeader("Content-type", "multipart/form-data");
        // 现在越来越多的应用使用application/json,用来告诉服务端消息主体是序列化的json字符串。
        request.setRequestHeader("Content-Type", "application/json");
        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        // request.setRequestHeader("Accept", "application/json, text/javascript");
        request.responseType = "json";
        request.send(data);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    alert("发送成功：" + request.status);
                } else {
                    alert("发生错误：" + request.status);
                }
            }
        }
    }












    // jQuery ajax

    var jsonData = new Array();
    $.ajax({
        url: ajaxUrlPrefix + ajaxUrlSuffix,
        type: "post",
        data: jsonData,
        dataType: "json",
        // contentType: "application/json",
        async: true,
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log("数据获取失败");
        }
    });



    // jQuery AJAX设置

    // IE8跨域
    jQuery.support.cors = true;

    $.ajaxSetup({
        // 跨域
        crossDomain: true,
        xhrFields: { withCredentials: true },
        error: function (xhr, status, error) {
            var sessionStatus = xhr.getResponseHeader('sessionStatus');
            if (sessionStatus == 'timeout') {
                parent.layer.confirm('由于您长时间没有操作, 请您重新登录', {
                    btn: ['确定'],
                    closeBtn: 0
                }, function () {
                    top.location.href = '../../login.html';
                });
            } else if (status == 'error') {
                parent.layer.confirm('该用户已在其他终端上线，该终端被踢出', {
                    btn: ['确定'],
                    closeBtn: 0
                }, function () {
                    top.location.href = '../../login.html';
                });
            } else {
                getTopWindow().layer.msg("服务器出错啦");
            }
        }
    });

}



// 表单操作
function form() {


    // 多选框 判断复选框是否勾选 
    $("#aaa").is(":checked");
    document.getElementById("aaa").checked;

    //多选框 复选框不勾选
    $("#aaa").prop("checked", false);

    // 表单数据获取
    $.each($('#modifyFileForms').serializeArray(), function () {
        formFile[this.name] = this.value;
    });

    // 匹配除第一个的元素
    // 清空表格表体内容
    $("#form tr").not(":eq(0)").remove();








}

// 自写函数
function selfWrittenFunction() {
    // div随意拖拽放置
    $("#aaa").on({
        mousedown: function (e) {
            var el = $(this);
            var os = el.offset(); dx = e.pageX - os.left, dy = e.pageY - os.top;
            $(document).on('mousemove.drag', function (e) {
                el.offset({
                    top: e.pageY - dy, left: e.pageX - dx
                });
            });
        },
        mouseup: function (e) { $(document).off('mousemove.drag'); }
    });


    //html页面 传参 方法
    // 跳转的html页面 通过url传参
    // 适合给通用的html页面和新打开的页面传参，缺点是参数会直接暴露在地址栏,参数是中文或者url会比较麻烦。

    // 获取url参数 
    var $getUrlParameter = (function () {
        var url = window.document.location.href.toString();
        var u = url.split("?");
        if (typeof (u[1]) == "string") {
            u = u[1].split("&");
            var get = {};
            for (var i in u) {
                var j = u[i].split("=");
                get[j[0]] = j[1];
            }
            return get;
        } else {
            return {};
        }
    })();

    // "aaa.html??key=123"
    $getUrlParameter['key'];

    // 不跳转的同html页面  给iframe页面传参
    // ztree弹出层页面
    var aaa = parent.$("[name=workArea]").contents().find("#pageStoringData").attr("waitPreviewFileUrl");
    // 同页面iframe
    var bbb = window.parent.document.getElementById("pageStoringData").getAttribute("waitPreviewFileUrl");


    // input输入时，实时搜索指定内容的元素
    $(document).on("input propertychange", "#aaa", function () {
        var searchContent = $("#aaa").val();
        var searchResult = $("a:contains(" + searchContent + ")");
    });

    $(document).on("change", "#aaa", function () { });

    // 搜索框
    $(document).on('keydown', '#search', function (event) {
        // 回车
        if (event.keyCode == 13) {
            var searchData = $("#search").val();
            if (searchData.length > 0) {
                $("ul>li").hide();
                $("ul>li:contains(" + searchData + ")").show();
            } else if (searchData.length == 0) {
                $("ul>li").show();
            }
        }
    });


    // 时钟
    myClock();
    setInterval("myClock()", 60000);

    // 时钟
    function myClock() {
        var myYear = new Date().getFullYear();
        var mymonth = new Date().getMonth() + 1;
        var myday = new Date().getDate();
        var time = new Date();
        var hour = "00" + time.getHours();
        var minute = "00" + time.getMinutes();
        var attime =
            hour.substring(hour.length - 2, hour.length) + ":" + minute.substring(minute.length - 2, minute.length);
        //   年月日
        $("#header_date").text("" + myYear + "年" + mymonth + "月" + myday + "日");
        // 时分
        $("#footer_time").text("" + myYear + "-" + mymonth + "-" + myday + "  " + attime + "");
    }

    // 启动轮播
    tableCarousel(5);

    // 启动轮播
    function tableCarousel(pagingTime) {
        var autoPlayint = self.setInterval("nextPage()", pagingTime * 1000);
        // window.clearInterval(autoPlayint);
    }

    // 上一页
    function prevPage() {
        pageNum--;
        if (pageNum == 0) {
            pageNum = pageTotalNum;
            tableContentChangeData(pageNum);
        } else if (pageNum <= pageTotalNum) {
            tableContentChangeData(pageNum);
        }
    }

    // 下一页
    function nextPage() {
        pageNum++;
        if (pageNum <= pageTotalNum) {
            tableContentChangeData(pageNum);
        } else if (pageNum > pageTotalNum) {
            pageNum = 1;
            tableContentChangeData(pageNum);
        }
    }

    //  页面大小自适应
    function layerPageSizeAdapt() {

        // 计算比例
        var pageWith = $(window).width();
        var widthScale = (pageWith / 1920).toFixed(4);
        var left = -(1920 * (1 - widthScale)) / 2;
        var pageHeight = $(window).height();
        var heightScale = (pageHeight / 1080).toFixed(4);
        var top = -(1080 * (1 - heightScale)) / 2;
        var pageMainCss = { "transform": "scale(" + widthScale + ", " + heightScale + ")", "left": left, "top": top }
        $("#pageMain").css(boardCss);
    }

    // 滚动通知
    function scrollNotice() {
        var textId = '.notice_text';
        var textParentId = '#notice';
        $(textId).text(noticeText);
        var textWidth = $(textId).width();
        var textLeft = $(textParentId).width();
        var parentElementWIdth = $(textParentId).width();
        autoNoticeInterval = setInterval(function () {
            if (textLeft <= parentElementWIdth && textLeft >= -textWidth) {
                textLeft -= 3;
                $(textId).animate({ 'left': textLeft + 'px' }, 20);
            } else if (textLeft < -textWidth) {
                $(textId).stop();
                textLeft = parentElementWIdth;
                $(textId).css("left", parentElementWIdth + "px");
            }
        }, 30);
    }

    // 单选
    $(document).on('click', '.item', function () {
        $(this).attr("selected", "selected");
        $(".item").not(this).removeAttr("selected");
    });








}

// ES6
function ECMAScript6() {

    // ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
    if (true) {
        var a = 1;
        let b = 2;
        console.log(b); //2
    }
    console.log(a); //1
    console.log(b); //未定义

    for (let i = 0; i < 10; i++) { }
    console.log(i); //未定义

    // 暂时性死区,只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError
    let tmp;
    // TDZ结束
    console.log(tmp); // undefined
    tmp = 123;
    console.log(tmp); // 123


    // 不允许重复声明。let不允许在相同作用域内，重复声明同一个变量。
    // 报错
    function func() {
        let a = 10;
        let a = 1;
    }

}




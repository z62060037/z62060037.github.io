


$(function () {
  // 创建新样式
  createNewType();

  // 工具栏创建
  tools();

  // 自动展开
  autoExpand();
});


// 创建新样式
function createNewType() {
  // 删除无用内容
  $("h1:eq(0)").text("bookmarks");
  $("dl:eq(0)>dt").remove();
  $("dl:eq(0)>dd:last").contents().first().remove();
  $("dl:eq(0)>dd:last>dl>dd:last").remove();

  // 收藏夹手风琴效果
  $("dl>dt>dl").hide();
  $(document).on("click", "dl>dt>h3", function () {
    $(this).next("dl").slideToggle("fast");
  });

  //给书签列表项添加属性
  $("body>dl:eq(0)>dd:eq(0)>dl:eq(0)>dt").each(function (index) {
    // let num = "a" + (index + 1);
    // $(this).attr("id", num);
    $(this).attr("listOrder", "1");
    $(this).children("h3:eq(0)").addClass("color1");
  });

  $("body>dl:eq(0)>dd:eq(0)>dl:eq(0)>dt>dl>dt").each(function (index) {
    $(this).attr("listOrder", "2");
    $(this).children("dl>dt>h3:eq(0)").addClass("color2");
  });

  $("body>dl:eq(0)>dd:eq(0)>dl:eq(0)>dt>dl>dt>dl>dt").each(function (index) {
    $(this).attr("listOrder", "3");
    $(this).children("dl>dt>h3:eq(0)").addClass("color3");
  });

  $("body>dl:eq(0)>dd:eq(0)>dl:eq(0)>dt>dl>dt>dl>dt>dl>dt").each(function (index) {
    $(this).attr("listOrder", "4");
    $(this).children("dl>dt>h3:eq(0)").addClass("color4");
  });


  //给所有a元素添加属性
  $("a").each(function (index) {
    $(this).css("color", randomRgbColor());
    $(this).attr("target", "_blank");
    $(this).attr("title", $(this).text());
  });

  $("h3:contains('欲')").hide();
}

// 自动展开
function autoExpand() {

  //获取url参数
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

  //  根据navigation.html页面携带的参数，跳转到相应位置。
  var anchorText = $getUrlParameter['anchor'];
  // 将参数转换为中文
  anchorText = decodeURI(decodeURI(anchorText));
  $("h3:contains(" + anchorText + ")").click();

}


// 工具栏创建
function tools() {

  //工具栏添加
  // $("#tool").insertAfter("p:last");
  // $("#tool").insertBefore("h1:eq(0)");
  // $("#tool").css("display", "inline");


  $("#tool_filling").insertBefore("h1:eq(0)");

  // 宽度过小时，隐藏控制键文字
  hideToolText();
  $(window).resize(function () {
    hideToolText();
  });

  // 书签展开时时固定工具栏到屏幕底部
  // bookmarkSpreadEvent();

  // 页面滚动时固定工具栏到屏幕底部
  // pageScrollEvent();

  // 返回顶部
  $("#backTop").click(function () {
    $("html,body").animate({
      scrollTop: 0
    }, 500);
  });
  // 折叠全部
  $("#fold").click(function () {
    $("dl>dt>dl").hide();
  });
  // 展开全部
  $("#spread").click(function () {
    $("dl>dt>dl").show();
  });
  //  搜索链接
  $(document).on("click", "#search", function () {
    $(".tool_item").toggle();
  });

  // 书签搜索
  bookmarkSearch();

}

// 书签展开时时固定工具栏到屏幕底部
function bookmarkSpreadEvent() {

  $(document).on("click", "body>dl:eq(0)>dd:eq(0)>dl:eq(0)>dt>h3", function () {


    console.log($(this).next("dl"));
    console.log($(this).next("dl").css("display"));
    // if($(this).css("display")=="none")
  });
}

// 页面滚动时固定工具栏到屏幕底部
function pageScrollEvent() {
  $(window).scroll(function () {
  
  });
}

// 宽度过小时，隐藏控制键文字
function hideToolText() {
  if ($(window).width() < 400) {
    $("button p").hide();
  }else{
    $("button p").show();
  }
}

// 书签搜索

function bookmarkSearch() {
  // 搜索
  $(document).on("input propertychange", "#bookmarkSearch_input", function () {
    var searchContent = $("#bookmarkSearch_input").val();
    // console.log(searchContent);
    $("dl>dt>dl").hide();
    $("dl>dt>a").hide();
    $("dl>dt>dl:contains(" + searchContent + ")").show();
    $("dl>dt>a:contains(" + searchContent + ")").show();
  });

  // 重置
  $(document).on("click", "button#reset", function () {
    $("dl>dt>dl").hide();
    $("dl>dt>a").show();
    $(".tool_item").toggle();
  });
}


//随机生成RGB颜色
function randomRgbColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}



// 获取所有元素ADD_DATE属性的值
function listNum() {
  var listNumAllAraay = new Array();
  var listNumOnlyAraay = new Array();
  $("*").each(function () {
    listNumAllAraay.push($(this).attr("ADD_DATE"));
  });
  for (var i in listNumAllAraay) {
    if (listNumOnlyAraay.indexOf(listNumAllAraay[i]) == -1 && listNumAllAraay[i] != undefined) {
      listNumOnlyAraay.push(listNumAllAraay[i]);
    }
  }
  return listNumOnlyAraay;
}









//页面未加载完前，添加遮挡内容
// $("canvas").css("display", "inline");
// if (document.readyState == "complete") {
//   $("canvas").css("display", "none");
// }
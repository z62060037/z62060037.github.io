


$(function () {
  // 添加顶栏工具
  addHeaderContent();

  // 移动端自适应
  mobileAdaptation();

  // 创建新样式
  createNewType();

  // 工具栏创建
  tools();

  // 自动展开
  autoExpand();

  // 18R设置
  hideSet();

  // 111 书签图标
  addIcon();
});


// 根据书签网页的图标数据生成图标
function addIcon() {

  $("body>dl:eq(0) a").each(function (index) {
    var iconData = $(this).attr("ICON");
    if (iconData) {
      $(this).before(`
        <img class="icon" src="${iconData}" alt="">
      `);
    }
  });

}


// 移动端自适应
function mobileAdaptation() {
  if (navigator.userAgent.match(/(Windows)/i)) {
  } else {
    $("body").addClass("mobilePhone");
  }
}


// 添加顶栏工具
function addHeaderContent() {


  $("h1").eq(0).before(`
  <div id="header">
  <div id="tool_filling"></div>

  <div id="tool" class="tool">
      <div class="tool_item">
          <button id='backTop'>
              <i></i>
              <span>返回顶部</span>
          </button>
          <button id='fold'>
              <i></i>
              <span>折叠全部</span>
          </button>
          <button id='search'>
              <i></i>
              <span>搜索链接</span>
          </button>
          <button id='spread'>
              <i></i>
              <span>展开全部</span>
          </button>
      </div>
      <div class="tool_item">
          <div id="bookmarkSearch">
              <input id="bookmarkSearch_input" type="text" placeholder="输入内容开始搜索">
          </div>
          <button id='reset'>
              <i></i>
              <span>重置</span>
          </button>
      </div>
  </div>
  </div>
  
  
  `)



}


// 创建新样式
function createNewType() {
  // 删除无用内容
  $("dl:eq(0)>dd:eq(0)").remove();

  // 收藏夹手风琴效果
  $("dl>dt>dl").hide();
  $(document).on("click", "dl>dt>h3", function () {
    $(this).next("dl").slideToggle("fast");
  });

  //给书签列表项添加属性

  $("body>dl:eq(0)>dt").each(function (index) {
    // let num = "a" + (index + 1);
    // $(this).attr("id", num);
    $(this).attr("listOrder", "1");
    $(this).children("h3:eq(0)").addClass("color1");
  });


  $("body>dl:eq(0)>dt>dl>dt").each(function (index) {
    $(this).attr("listOrder", "2");
    $(this).children("h3:eq(0)").addClass("color2");
  });

  $("body>dl:eq(0)>dt>dl>dt>dl>dt").each(function (index) {
    $(this).attr("listOrder", "3");
    $(this).children("dl>dt>h3:eq(0)").addClass("color3");
  });

  $("body>dl:eq(0)>dt>dl>dt>dl>dt>dl>dt").each(function (index) {
    $(this).attr("listOrder", "4");
    $(this).children("dl>dt>h3:eq(0)").addClass("color4");
  });




  //给所有a元素添加属性
  $("a").each(function (index) {
    $(this).css("color", getRandomRgbColor.getColor());
    $(this).attr("target", "_blank");
    $(this).attr("title", $(this).text());
  });



  $("title").text("个人书签");
  $("h1:eq(0)").text("个人书签");
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


// 宽度过小时，隐藏控制键文字
function hideToolText() {
  if ($(window).width() < 560) {
    $(".tool_item>button>span").hide();
  } else {
    $(".tool_item>button>span").show();
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

var getRandomRgbColor = new randomRgbColor();
//创建颜色库
getRandomRgbColor.colors();

//随机返回RGB颜色
function randomRgbColor() {
  //创建颜色库
  this.colors = function () {
    window.colorsArray = [];
    for (var i = 0; i < 100; i++) {
      colorsArray.push(getRandomRgbColor.randomRgbColor());
    }
    // console.log(colorsArray);
  };


  //随机返回RGB颜色
  this.randomRgbColor = function () {
    var r = getRandomRgbColor.randomRgbColorNum();
    var g = getRandomRgbColor.randomRgbColorNum();
    var b = getRandomRgbColor.randomRgbColorNum();
    return `rgb(${r},${g},${b})`;
  }
  // 返回颜色数值
  this.randomRgbColorNum = function () {
    var num = Math.floor(Math.random() * 256)
    if (num >= 210) {
      return getRandomRgbColor.randomRgbColorNum();
    } else {
      // 不返回浅色
      return num;
    }
  }

  this.getColorOrder = 0;
  // 按顺序返回颜色库中的颜色
  this.getColor = function () {
    var order = getRandomRgbColor.getColorOrder;
    if (order <= 50) {
      getRandomRgbColor.getColorOrder++;
      return colorsArray[order];
    } else {
      getRandomRgbColor.getColorOrder = 0;
      return colorsArray[order];
    }
  }
}




// 18R设置
function hideSet() {
  $("h3:contains('里番'),h3:contains('真人'),h3:contains('H漫')").hide();
  // $("").hide();
  // $("").hide();
  window.clickNum = 0;
  $(document).on("click", ".tool_item>button", function () {
    clickNum++;
    if (clickNum > 4) {
      $("h3:contains('里番'),h3:contains('真人'),h3:contains('H漫')").show();
    }
  });
}


/*

// 书签展开时时固定工具栏到屏幕底部
function bookmarkSpreadEvent() {
  $(document).on("click", "body>dl:eq(0)>dt:eq(0)>dl:eq(0)>dt>h3", function () {
    console.log($(this).next("dl"));
    console.log($(this).next("dl").css("display"));
    // if($(this).css("display")=="none")
  });
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


// 页面未加载完前，添加遮挡内容
$("canvas").css("display", "inline");
if (document.readyState == "complete") {
  $("canvas").css("display", "none");
}
*/
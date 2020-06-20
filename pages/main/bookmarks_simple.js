


$(function () {

  var para = {};

  // 页面创建
  pageCreate(para);

  // 页面按钮
  pageButton(para);


});

function pageCreate(para) {

  // 修改样式
  modifyType(para);

  // 添加工具栏
  addTools(para);

  // 移动端自适应
  mobileAdapt(para);

  // 跳转后菜单展开
  autoExpand(para);

}

function pageButton() {


  // 返回顶部
  $(document).on("click", "backTop", function () {
    $("html,body").animate({
      scrollTop: 0
    }, 500);
  });
  // 折叠全部
  $(document).on("click", "#fold", function () {
    $("dl>dt>dl").hide();
  });

  $(document).on("click", "#spread", function () {
    $("dl>dt>dl").show();
  });

  //  搜索链接
  $(document).on("click", "#search", function () {
    $(".tool_item").toggle();
  });

  // 书签搜索
  // 搜索
  $(document).on("input propertychange", "#bookmarkSearch_input", function () {
    var searchVal = $("#bookmarkSearch_input").val();
    // console.log(searchContent);
    if (searchVal) {
      $("dl>dt>dl").hide();
      $("dl>dt>a").hide();
      $("dl>dt>dl:contains(" + searchVal + ")").show();
      $("dl>dt>a:contains(" + searchVal + ")").show();

      if (searchVal == "1115") {
        $("h3:contains('里番'),h3:contains('真人'),h3:contains('H漫')").show();
      }
    }

  });

  // 重置
  $(document).on("click", "button#reset", function () {
    $("dl>dt>dl").hide();
    $("dl>dt>a").show();
    $(".tool_item").toggle();
  });


}



// 移动端自适应
function mobileAdapt() {
  if (navigator.userAgent.match(/(Windows)/i)) {
  } else {
    $("body").addClass("mobilePhone");
  }
}


// 工具栏添加
function addTools() {


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


// 修改样式
function modifyType(para) {
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

  //创建颜色库
  var randomColor = new randomColorFun();
  para.colors = randomColor.createColors(randomColor);


  //给所有a元素添加属性
  para.colors_order = 0;
  $("a").each(function (index) {
    $(this).css("color", getRandomColor(para));
    $(this).attr("target", "_blank");
    $(this).attr("title", $(this).text());
  });

  $("title").text("个人书签");
  $("h1:eq(0)").text("个人书签");

  // 根据书签网页的图标数据生成图标
  $("body>dl:eq(0) a").each(function (index) {
    var iconData = $(this).attr("ICON");
    if (iconData) {
      $(this).before(`
        <img class="icon" src="${iconData}" alt="">
      `);
    }
  });


  // 18R设置
  $("h3:contains('里番'),h3:contains('真人'),h3:contains('H漫')").hide();
}

// 跳转后菜单展开
function autoExpand() {
  //  根据navigation.html页面携带的参数，打开相应菜单。
  var url = window.document.location.href.toString();
  var urlPara = getUrlPara(url, "anchor");
  if (urlPara.length > 0) {
    // 将参数转换为中文
    anchorText = decodeURI(decodeURI(urlPara));
    console.log("anchorText:"+anchorText);
    if(anchorText=="导航页侧边栏书签"){
      $("body").addClass("sidebar");
    }else{
      $("h3:contains(" + anchorText + ")").click();
    }

    
  }
}



// 获取url参数
function getUrlPara(url, key) {
  if (url.indexOf("bookmarks_simple.html") > -1) {
    var paras = (url.split("?")[1]).split("&");
    for (var i = 0; i < paras.length; i++) {
      var urlParaKey = paras[i].split("=");
      if (urlParaKey[0] == key) {
        return urlParaKey[1];
      }
    }
    return "";
  } else {
    return "";
  }
}







//随机返回RGB颜色
function randomColorFun() {
  //创建颜色库
  this.createColors = function (obj) {
    var colorsArray = [];
    for (var i = 0; i < 100; i++) {
      colorsArray.push(this.randomRgbColor(obj));
    }
    return colorsArray;
  };


  //随机返回RGB颜色
  this.randomRgbColor = function (obj) {
    var r = this.randomRgbColorNum(obj);
    var g = this.randomRgbColorNum(obj);
    var b = this.randomRgbColorNum(obj);
    return `rgb(${r},${g},${b})`;
  }

  // 返回颜色数值
  this.randomRgbColorNum = function (obj) {
    var num = Math.floor(Math.random() * 256)
    if (num >= 210) {
      return this.randomRgbColorNum(obj);
    } else {
      // 不返回浅色
      return num;
    }
  }

}

// 获取随机颜色
function getRandomColor(para) {


  // 按顺序返回颜色库中的颜色
  if (para.order <= 50) {
    para.order++;
    return para.colors[para.order];
  } else {
    para.order = 0;
    return para.colors[para.order];
  }

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
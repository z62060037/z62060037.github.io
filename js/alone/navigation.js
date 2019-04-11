// seach标签外边距
var seachMargin;


$(function () {

  // 搜索框
  searchEvent()

  // 主内容区内容获取
  navigationDataGet();

  // 时钟
  myClock();
  setInterval("myClock()", 60000);

  // 底部书签超链接生成
  bookmarksHyperlink();

  //  底部书签超链接验证
  bookmarksHyperlinkVerify();

  // 移动端自适应
  mobileAdaptation();
});



// 搜索框
function searchEvent() {
  // 搜索框内容同步
  $("#seach input").on('input propertychange', function () {
    $("#b_ipt,#g_ipt").val($(this).val());
  });


  //  切换搜索引擎
  $("#bd_logo").click(function () {
    $("#baiduSeach").css("display", "none");
    $("#googleSeach").css("display", "inline-block");
  });
  $("#google_logo").click(function () {
    $("#googleSeach").css("display", "none");
    $("#baiduSeach").css("display", "inline-block");
  });

  // 调整搜索框外边距
  $(window).resize(function () {
    adjustmentMargin();
  });
}

// 调整搜索框外边距
function adjustmentMargin() {
  seachMargin = ($(window).height() - $("#collect").height() - (160)) / 2;
  if (seachMargin > 30) {
    $("#seach").css({
      "margin-top": "" + seachMargin + "px",
      "margin-bottom": "" + seachMargin + "px"
    });
  }
}

// 主内容区内容获取
function navigationDataGet() {
  $.ajax({
    url: "../../src/data/alone/navData.json",
    // url: ajaxUrlPrefix + ajaxUrlSuffix,
    type: "get",
    // data: ajaxData,
    dataType: "json",
    async: true,
    success: function (data) {
      navigationContentCreate(data.navConetntData);

      // 调整seach标签外边距
      adjustmentMargin();
    },
    error: function (data) {
      console.log("数据获取失败" + data);
    }
  });
}

// 主内容区a标签生成
function navigationContentCreate(navData) {

  var bulk = " ";
  for (var i = 0; i < navData.length; i++) {
    var row = " ";
    for (var j = 0; j < navData[i].groupContent.length; j++) {
      var single = " ";
      single = "<div mark='" + i + "" + j + "' class='nav-group-unit'><a title='" + navData[i].groupContent[j].internetSiteName + "' href='" + navData[i].groupContent[j].internetSite + "' target='_blank'><div class='del-icon'><i class='' alt='" + navData[i].groupContent[j].internetSiteName + "' class='nav-icon'></i></div><div class='nav-text'>" + navData[i].groupContent[j].internetSiteName + "</div></a></div>";
      row += single;
    }

    bulk += "<div class='nav-group'><div class='nav-group-name'><div class='nav-group-name-text'>" + navData[i].groupName + "</div></div><div class='nav-group-content'>" + row + "</div></div>";
  }

  $("#collect").append(bulk);

  // 检测到有图标url时添加url
  for (var k = 0; k < navData.length; k++) {
    for (var l = 0; l < navData[k].groupContent.length; l++) {
      var remoteIconUrl = navData[k].groupContent[l].remoteIconUrl;
      var localIconUrl = navData[k].groupContent[l].localIconUrl;
      // var iconBackgroundPosition = navData[k].groupContent[l].iconBackgroundPosition;
      // console.log(remoteIconUrl);
      if (localIconUrl) {
        $("[mark='" + k + "" + l + "'] i").css({
          "background-image": "url(" + localIconUrl + ")",
          "background-size": "100% 100%"
        });
      } else if (remoteIconUrl) {
        $("[mark='" + k + "" + l + "'] i").css({
          "background-image": "url(" + remoteIconUrl + ")",
          "background-size": "100% 100%"
        });
      }
      /*
        else if (iconBackgroundPosition) {
          $("[mark='" + k + "" + l + "'] i").css({
            "background-position": "" + iconBackgroundPosition + ""
          });
        }
      */

    }
  }
}


// 给url添加反斜杠
function addBackslash(pendingString) {
  pendingString = pendingString.replace(/\//g, "\\/");
  return pendingString;
}


// 时钟
function myClock() {
  var mymonth = new Date().getMonth() + 1;
  var weekday = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var myweekday = new Date().getDay();
  var myday = new Date().getDate();
  var time = new Date();
  var hour = "00" + time.getHours();
  var minute = "00" + time.getMinutes();
  var attime =
    hour.substring(hour.length - 2, hour.length) +
    ":" +
    minute.substring(minute.length - 2, minute.length);
  $("#clock").text(
    "" + mymonth + "月" + myday + "日 " + weekday[myweekday] + " " + attime + ""
  );
}


// 底部书签超链接生成
function bookmarksHyperlink() {
  $.ajax({
    url: "../../src/data/alone/navData.json",
    // url: ajaxUrlPrefix + ajaxUrlSuffix,
    type: "get",
    // data: ajaxData,
    dataType: "json",
    async: true,
    success: function (data) {
      var bookmarkData = data.navFooterData;
      for (var i = 0; i < bookmarkData.length; i++) {
        // $("#bookmarks").append("<div class='bookmarks-item'><a title='" + bookmarkData[i] + "' href='bookmarks.html?anchor=" + bookmarkData[i] + "'   target='_blank'>" + bookmarkData[i] + "</a></div>");
        $("#bookmarks").append("<div class='bookmarks-item' hyperlink='bookmarks.html?anchor=" + bookmarkData[i] + "' couldClick='no'><a title='" + bookmarkData[i] + "'   target='_blank'>" + bookmarkData[i] + "</a></div>");
      }
    },
    error: function (data) {
      console.log("数据获取失败" + data);
    }
  });
}

// 111 底部书签超链接验证
function bookmarksHyperlinkVerify() {

  var accessVerify = [];



  $(document).on("click", "#bookmarks>.bookmarks-item", function (e) {
    if ($(this).attr("couldClick") == "yes") {
      var hyperlink = $(this).attr("hyperlink");
      window.open(hyperlink);

    } else if ($(this).attr("couldClick") == "no") {
      var thisOrder = $(this).index();
      var reverseOrder = $("#bookmarks>.bookmarks-item").length - thisOrder;
      accessVerify.push(reverseOrder);
      console.log(accessVerify)

      if (accessVerify.indexOf(1) > -1 && accessVerify.indexOf(2) > -1 && accessVerify.indexOf(3) > -1) {
        $("#bookmarks>.bookmarks-item").attr("couldClick", "yes");
      }

      // layer.msg('无权限', { icon: 2, time: 1000 });
    }
  });


}



//页面上下滚动出现下拉标志
// $(".arrow").hide();
// $(window).scroll(function() {
//   if ($(this).scrollTop() > 20) {
//   $(".arrow").show();
//   }else{
//     $(".arrow").hide();
//   }
// });

/*
//底部加载新页面
$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  var scrollHeight = $(document).height();
  var windowHeight = $(this).height();
  if (scrollTop + windowHeight == scrollHeight) {
    window.location.href = "bookmark.html";
    // window.open("bookmark.html");
    // $(".bookmarks_css").load("bookmark.html");
  }
});*/



// 移动端自适应
function mobileAdaptation() {
  // alert(navigator.userAgent);
  // 检测userAgent
  if (navigator.userAgent.match(/(Windows)/i)) {
    // Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0
    // Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36
  } else {
    $("#navigation").addClass("mobilePhone");
  }
}
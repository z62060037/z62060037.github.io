//搜狗 181228

$(function () {
  // 创建新样式
  createNewType()

  // 工具栏创建
  tools()
});


// 创建新样式
function createNewType() {
  // 收藏夹手风琴效果
  $("dl>dt>dl").hide();
  $("dl>dt>h3").click(function () {
    $(this)
      .next("dl")
      .slideToggle("fast");
  });

  //添加锚点
  for (var mub = 0; mub < listNum()[0].length; mub++) {
    $("h3[ADD_DATE='" + listNum()[0] + "']:eq('" + mub + "')").attr(
      "id",
      "a" + (mub + 1)
    );
  }


  //为h3元素字体添加样式
  $("h3[ADD_DATE='" + listNum()[0] + "']").addClass("color1");
  $("h3[ADD_DATE='" + listNum()[1] + "']").addClass("color2");
  $("h3[ADD_DATE='" + listNum()[2] + "']").addClass("color3");
  $("h3[ADD_DATE='" + listNum()[3] + "']").addClass("color4");

  //赋予所有a元素字体随机颜色
  var needGiveColorNum = $("a").length;
  //颜色库,减少随机生成函数的调用
  var colorBank = new Array(needGiveColorNum);
  for (var i = 0; i < needGiveColorNum; i++) {
    colorBank[i] = randomRgbColor();
  }
  for (var j = 0; j < needGiveColorNum; j++) {
    $("a:eq('" + j + "')").css("color", colorBank[j]);
  }

  // 给a元素添加target属性
  $("a").attr("target", "_blank");

  // 给a元素添加title
  $("a").each(function () {
    $(this).attr("title", $(this).text());
  });

  $("h3:contains('欲')").hide();
  //$("h3:contains('图片')").hide();

}




// 工具栏创建
function tools() {

  //工具栏添加
  $("#tool").insertAfter("p:last");
  $("#tool").css("display", "inline");

  // 宽度过小时，隐藏控制键文字
  hideToolText();
  $(window).resize(function () {
    hideToolText();
  });

  // 页面高度过高时固定工具栏到屏幕底部
  var pageHeight = $(window).height();
  $(window).scroll(function () {
    if ($(window).height() > pageHeight) {
      $("#tool").addClass("dixedElement");
      $("#tool").removeClass("tool");
    } else {
      $("#tool").addClass("tool");
      $("#tool").removeClass("dixedElement");
    }
  });

  // 返回顶部
  $("#backTop").click(function () {
    $("html,body").animate({
      scrollTop: 0
    }, 500);
  });
  $("#fold").click(function () {
    $("dl>dt>dl").hide();
  });
  $("#spread").click(function () {
    $("dl>dt>dl").show();
  });
  // $("#search").trigger((jQuery.Event("keydown").keyCode = 70));


  // 搜索
  $(document).on("click", "#search", function () {

    layer.open({
      id: "searchResult",
      type: 2,
      title: "搜索",
      maxmin: true,
      shadeClose: false, //点击边缘遮罩关闭层
      area: ['80%', '80%'],
      content: '../pages/searchResult.html',
      btn: ['关闭'],
      yes: function (index, layero) {
        layer.close(index);
      },
      success: function (layero, index) {
        var body = parent.layer.getChildFrame('body', index);
        var iframeId = layero.find('iframe')[0]['name'];
        var $iframeNodeSearchMainInput = body.find("#searchMain_input");
        var iframeNode = parent.document.getElementById(iframeId).contentWindow.document;

        $(iframeNode).on("input propertychange", $iframeNodeSearchMainInput, function () {
          body.find("#searchResult>a").empty();

          var searchContent = $iframeNodeSearchMainInput.val();
          console.log(searchContent.length);
          if (searchContent.length > 0 && searchContent != " ") {

            // $("a").not("a:contains(" + searchContent + ")").hide();
            // var searchResult = $("a:contains(" + searchContent + ")");
            $("a").each(function () {
              console.log($(this).text().index(searchContent));
              console.log($(this).attr("href").index(searchContent));
              if ($(this).text().index(searchContent) || $(this).attr("href").index(searchContent)) {
                body.find("#searchResult").append($(this));
              }
            })



            // console.log(searchResult);
            // body.find("#searchResult").append(searchResult);
            // $().show();*/
          }

        });
      }








    });

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




function hideToolText() {
  if ($(window).width() < 400) {
    $("button p").hide();
  }
}


//   var listNum=["70545000485","70544935202","70544869918","70544804635","70544739351"];
//   var listNum1 = document.getElementsByTagName("H3")[0].getAttributeNode("ADD_DATE").value;
//   var listNum1 = $("h3:eq(0)").attr("ADD_DATE");
//   var colorBank=["#d0e964","#f6c86a","#afdd61","#46c4e2","#46e2a2","#8e7bff","#ffd543","#29c4b7","#2972c4","#d0e964","#f6c86a", "#46c9ff", "#0c73ff"]



//页面未加载完前，添加遮挡内容
// $("canvas").css("display", "inline");
// if (document.readyState == "complete") {
//   $("canvas").css("display", "none");
// }
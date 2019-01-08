


// ======================js插件========================

//ztree
function ztree() {


    // 查找 id = 1 的节点数据
    var treeObj = $.fn.zTree.getZTreeObj("tree");
    var node = treeObj.getNodeByParam("id", 1, null);

}

//====================jqGrid 表格====================
function jqGrid() {


    var fileListThData = {};
    fileListThData.colNames = ["文件名称"];
    // jqGrid colModel 参数
    // align 	string 	left, center, right.
    // index 	string 	索引。其和后台交互的参数为sidx
    // name 	string 	表格列的名称
    // width 	number 	默认列的宽度，只能是像素值，不能是百分比
    // hidden 	boolean 在初始化表格时是否要隐藏此列
    // cellattr function 返回table th的标签属性
    fileListThData.colModel = [
        { "name": "fileName", "index": "fileName", "width": 100, "align": "left", "hidden": true, cellattr: fileListTdAddClass }
    ];

    // jqgrid使用Bootstrap样式
    $.jgrid.defaults.styleUI = "Bootstrap";

    $(jqGridTableId).jqGrid(
        {

            url: "",
            // url: "../../data/doc/workAreaTableList.json",
            // jqGrid表格插件获取json文件的路径是根据引用js的html文件的位置决定的
            // postData: { "fileId": selectedRowId },
            datatype: "json",//请求数据返回的类型。可选json,xml,txt
            colNames: tableThData.colNames,
            colModel: tableThData.colModel,
            // width: ($(tableWidthId).width()),
            width: ($(tableParentDivId).width()),
            // height:  ($(tableParentDivId).height()),
            height: tableHeight,
            rowNum: 9999,//一页显示多少条
            // rowList: [10, 20, 50, 100],//可供用户选择一页显示多少条
            // sortname: 'id',//初始化的时候排序的字段
            sortorder: "asc",//排序方式,可选desc,asc
            // mtype: "get",//向后台请求数据的ajax的类型。可选post,get
            viewrecords: true,
            caption: "",//表格的标题名字
            rownumbers: true, //设置列表显示序号,需要注意在colModel中不能使用rn作为index   
            rownumWidth: 40, //设置显示序号的宽度，默认为25  
            multiselect: true, //多选框   
            multiboxonly: true, //在点击表格row时只支持单选，只有当点击checkbox时才多选，需要multiselect=true是有效
            prmNames: { //如当前查询实体为ware，这些可以在查询对象的superObject中设定   
                page: "pageNum",
                rows: "pageSize"
            },
            jsonReader: { //server返回Json解析设定   
                root: "root", //对于json中数据列表   
                page: "page",
                total: "total",
                records: "records",
                repeatitems: false,
            },
            sortable: true, // 列可拖拽
            shrinkToFit: false,//水平滚动条
            autoScroll: true,//水平滚动条
            resizeStop: function (newwidth, index) {
                // console.log("" + newwidth + " " + index + " ");
                // console.log(index + " " + listDate[index].fieldName);
                /*
                $.ajax({
                    url: ajaxUrlPrefix + "/system/table/resizeColumnWidth",
                    data: { "tableName": ajaxDataTableName, "fieldName": listDate[(index - 2)].fieldName, "width": newwidth },
                    type: "post",
                    dataType: "json",
                    async: true
                });*/
            },
            // 当选择行时触发此事件
            onSelectRow: function (rowid, status) {
                // 控制上传按钮遮挡div的显示
                uploadOcclusionFunction(rowid, status);
            },
            //从服务器返回响应时执行
            loadComplete: function (xhr) {
                // console.log(xhr);
                /*  指定td标签修改样式 */
                if (jqGridTableId == "#fileList") {
                    fileListTdStyleChange(xhr.root);
                }
            }

        }
    );



    // 文档列表表格 给文件名列指定td标签添加class标签
    function fileListTdAddClass() {
        return "class='operationRecordTableTd'";
    }


    // 变更操作列表表格 指定td标签修改样式 
    function fileListTdStyleChange(tableData) {

        // 添加属性
        for (i in tableData) {
            // 是否借用：isBorrow，1为借用，0不是借用
            // console.log(tableData[i].id);
            $("#fileList tr[id=" + tableData[i].id + "]>td.operationRecordTableTd").attr("isBorrow", tableData[i].isBorrow);

        }


        // 添加图标
        /*
        $("td.fileName[isBorrow=0][areaType=0]").each(function () {
            fileNameOriginalText = $(this).text();
            $(this).text("");
            $(this).append("<i class='fa fa-file-text-o'></i><span>" + fileNameOriginalText + "</span>");
        });
    */
    }
























    // 获取已单选的id
    var selectedRowId = $(jqGridTableId).jqGrid("getGridParam", "selrow");
    // 获取已选择的id（删除指定行时，selectedRowIds也会自动删除相应行。）
    var selectedRowIds = $(jqGridTableId).jqGrid("getGridParam", "selarrrow");
    // 获取表格所有行的id
    var allRowIds = $(jqGridTableId).jqGrid("getDataIDs");
    //刷新表格数据
    $(jqGridTableId).trigger("reloadGrid");
    //根据左侧栏文件夹id过滤
    $(jqGridTableId).jqGrid('setGridParam', {
        page: 1, postData: { "dirId": dirId, "relationGroups": "" }
    }).trigger("reloadGrid");
    //返回指定行的数据
    var rowData = $(jqGridTableId).jqGrid("getRowData", selectedRowId);
    // 选择或反选指定行
    $(jqGridTableId).jqGrid('setSelection', selectedId);
    // 删除指定行
    $(jqGridTableId).jqGrid("delRowData", selectedRowIds[0]);


    // 修改表格数据
    if (JSON.stringify(rowData) !== '{}') {
        $(jqGridTableId).jqGrid("setRowData", jqGridTableRowId, {
            "fileName": originalData.fileName
        });
    } else {
        $(jqGridTableId).jqGrid("addRowData", jqGridTableRowId, {
            "fileName": originalData.fileName
        }, "last");
    }



    // 模糊搜索
    $(jqGridTableId).jqGrid('setGridParam', {
        page: 1, postData: {
            "relationGroups": JSON.stringify([
                {
                    "andOr": "and", "relations": [
                        { "andOr": "or", "field": field, "symbol": "7", "value": value }
                    ]
                }
            ])
        }
    }).trigger("reloadGrid");






}


//====================layer 弹窗====================

function layer() {



    // 多次判断
    layer.confirm("第一次判断？", {
        btn: ['是', '否'] //按钮
    }, function (index) {
        layer.confirm("第一次选是后再次判断？", {
            btn: ['是', '否'] //按钮
        }, function (index) {

        }, function (index) {

        }
        );
    });

    // 提示
    parent.layer.msg('请选择', { icon: 2, time: 1000 });




    // 调整弹出层高度
    function iframeAuto() {
        var index = parent.layer.getFrameIndex(window.name);
        // 页面高度自适应
        parent.layer.iframeAuto(index);
    }








    // 修改layer弹出层页面的标签属性
    var body = parent.layer.getChildFrame('body', index);
    body.find("#aaa").attr("aaa", "aaa");

    // 调用layer弹出层页面iframe页的函数
    var iframeId = layero.find('iframe')[0]['name'];
    parent.document.getElementById(iframeId).contentWindow.functionName(dirId);

    // 获取layer弹出层页面iframe页的document
    var iframeNode = parent.document.getElementById(iframeId).contentWindow.document;

    // 打印
    window.print(); // 整页打印


    printdiv("#layerFormContent")   // 打印局部div
    function printdiv(printId) {
        var headhtml = "<html><head><title></title></head><body>";
        var foothtml = "</body>";
        // 获取div中的html内容
        // var newhtml = document.all.item(printpage).innerHTML;
        var newhtml = $(printId).html();
        // 获取原来的窗口界面body的html内容，并保存起来
        var oldhtml = document.body.innerHTML;
        // 给窗口界面重新赋值，赋自己拼接起来的html内容
        document.body.innerHTML = headhtml + newhtml + foothtml;
        // 调用window.print方法打印新窗口
        window.print();
        // 将原来窗口body的html值回填展示
        document.body.innerHTML = oldhtml;
        return false;
    }



    // 弹出层窗口缩放
    $("[type=iframe]").css({ "transform": "scale(" + scale + ", " + scale + ")" });


    // 弹出层页面使用

    // layer弹出层确定后
    $.ajax({
        url: url,
        type: "post",
        data: ajaxPostData,
        dataType: "json",
        success: function (data) {
            if (data.errcode != 200) {
                parent.layer.msg(data.errmsg, { icon: 2, time: 1500 });
            } else if (data.errcode = 200) {
                parent.$("[name='" + pageName + "']").contents().find("#pageStoringData").attr("reworkStatus", "success");
                parent.layer.msg("XX成功", { icon: 1, time: 1500 });
                // 该页面的index
                var index = parent.layer.getFrameIndex(window.name);
                // 关闭该页面
                parent.layer.close(index);
            }
        }
    });


    // 弹出层的弹出层回填
    var parentBody = parent.layer.getChildFrame('body', parentIndex);
    parentBody.find("input[name='inputName']").val(inputVal);



}


// ====================validate 表单验证====================
// 表单必填验证
var validateRules = {};
var validateMessages = {};

$("#form").validate({
    rules: validateRules,
    messages: validateMessages,
    agree: "required",
    //当表单获得焦点时清除错误信息
    focusCleanup: true,
    errorClass: "error",
    //插入的包裹错误信息的标签
    errorElement: "div",
});

$('#form').submit(function () {
    return false;
    //禁止页面表单提交
});

//弹出层 自带按钮 确定
function define() {
    // 给输入框添加验证
    $("#form>input").each(function () {
        var key = $(this).attr("name");
        if (key) {
            validateRules[key] = "required";
            validateMessages[key] = "这是必填字段";
        }
    });
    // console.log(validateRules);

    if ($('#kanBanModifyForm').valid()) {
        // 验证后发起主请求
        console.log("通过发起请求");
    }

}



//====================WebUploader 上传====================
function WebUploader() {



    // 如果页面初始化按钮为display:none样式时，重新渲染WebUploader添加按钮
    uploader.refresh();














}

//====================colpick 颜色选择====================

function selectColorEvent() {
    var selectColorInputIds = '#inputId';
    // var colpickDivElement;
    var defaultColor;
    $(selectColorInputIds).colpick({
        onBeforeShow: function (event) {
            // colpickDivElement=event;
            // console.log(colpickDivElement);
        },
        color: defaultColor,
        onSubmit: function () {
            var colpickDivId = $(this).selector[0].offsetParent.id;
            var selectColor = "#" + $("#" + colpickDivId + " .colpick_hex_field>input").val();
            var selectColorInputId = $(this)[0].el;
            selectColorInputId.setAttribute("value", selectColor);
            $(".colpick").hide();
        }
    });
    $(document).on("mouseover", selectColorInputIds, function () {
        defaultColor = $(this).val()
    });
}









//====================项目常用====================
function item() {
    // 表格单选
    $(document).on('click', '#buttonId', function () {
        var selectedRowIds = $(tableId).jqGrid("getGridParam", "selarrrow");
        var selectedRowIdsLength = selectedRowIds.length;
        if (selectedRowIdsLength == 0) {
            layer.msg('请选择要修改的行', { icon: 2, time: 1000 });
            return;
        } else if (selectedRowIdsLength > 1) {
            layer.msg('请单选要修改的行', { icon: 2, time: 1000 });
            return;
        } else if (selectedRowIdsLength == 1) {
            parent.layer.open({
                id: "modify",
                type: 2,
                title: '同意',
                maxmin: false,
                shadeClose: false, //点击边缘遮罩关闭层
                resize: false, //禁止拖动改变大小
                // move: false, //禁止移动
                area: ['550px', '300px'],
                content: 'pages/esop/modify.html',
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    // 调用另一页面的函数
                    var iframeId = layero.find('iframe')[0]['name'];
                    parent.document.getElementById(iframeId).contentWindow.layerPageFunctionName();
                },
                success: function (layero, index) {

                    //改变按钮样式
                    layero.find('.layui-layer-btn2').css({ "float": "left", "color": "#fff", "border-color": "#1E9FFF", "background-color": "#1E9FFF" });

                    var body = parent.layer.getChildFrame('body', index);
                    body.find("#layerPageStoringData").attr("selectedRowId", selectedRowId);

                    // 将该页面的index传输到弹出层（间接传递）
                    var parentIndex = parent.layer.getFrameIndex(window.name);
                    body.find("#layerPageStoringData").attr("parentIndex", parentIndex);

                    // 设置弹出层页面大小
                    adjustLayerFromSize(layero, index);

                    // 页面高度自适应
                    parent.layer.iframeAuto(index);
                },
                full: function (layero) {
                    // console.log("最大化");
                    adjustLayerFromSize(layero);
                },
                restore: function (layero) {
                    // console.log("还原");
                    adjustLayerFromSize(layero);
                },
                end: function () {
                    var sendStatus = $(pageStoringDataId).attr("modify");
                    console.log(sendStatus);
                    if (sendStatus) {
                        // 刷新
                        $(tableId).trigger("reloadGrid");
                        // 清空重命名状况
                        $(pageStoringDataId).removeAttr("modify");
                    }
                }
            });
        }

        // 设置弹出层页面大小
        function adjustLayerFromSize(layero, index) {
            layerBody.find("#layerForm").height((layero.height() - 83));
            layerBody.find("#layerForm").width((layero.width()));
        }

    });
    //  layer弹窗插件的content路径是根据当前访问页面的html文件的位置决定的。比如访问了index.html页面，在index.html页面中的iframe打开了layer弹窗，那么iframe的页面中layer弹窗插件的content路径是根据index.html文件的位置决定，而不是iframe文件的位置。

    //表格多选
    $(document).on('click', '#buttonId', function () {
        var selectedRowIds = $(tableId).jqGrid("getGridParam", "selarrrow");
        var selectedRowIdsLength = selectedRowIds.length;
        if (selectedRowIdsLength == 0) {
            layer.msg('请选择要删除的行', { icon: 2, time: 1000 });
            return;
        } else {
            layer.confirm("是否删除？", {
                btn: ['是', '否'] //按钮
            }, function (index) {
                $.ajax({
                    url: ajaxUrlPrefix + ajaxUrlSuffix,
                    data: { "ids": selectedRowIds },
                    type: "post",
                    dataType: "json",
                    async: true,
                    success: function (data) {
                        if (data.errcode != 200) {
                            parent.layer.msg(data.errmsg, { icon: 2, time: 1500 });
                        } else if (data.errcode = 200) {
                            parent.layer.msg("删除成功", { icon: 1, time: 1500 });
                            layer.close(index);
                        }
                        //刷新表格数据
                        $(tableId).trigger("reloadGrid");
                    }
                });

            });
        }
    });

}











//条形码 JsBarcode
// <img class="aaa" style="height:100px"/>
$(".aaa").JsBarcode("aaaaaaaaa");

//二维码 qrcode
// <div class="aaa" id="qrcode" style="width:100px; height:100px">
var aaa = $(".aaa");
var qrcode = new QRCode(aaa[0], { width: 80, height: 80 });
qrcode.makeCode(rowDatas[i][key]);
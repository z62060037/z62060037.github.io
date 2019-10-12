# 清除bookmarks.html文件中的图标内容
import os
import re
import lxml
import datetime
from bs4 import BeautifulSoup
from lxml import etree

def read():
    # 读取
    with open('./pages/alone/bookmarks.html', 'r', encoding='utf8') as f:
        content=f.read()
        # print(content)
        content=process(content)
        # 保存
        with open('./pages/alone/bookmarks_simple.html', 'w',encoding='utf-8') as f:
            f.write(content)

def process(content):
    # pageData = BeautifulSoup(content, 'lxml')
    pageData = BeautifulSoup(content, 'html5lib')
    aNode_array = pageData.select('a[icon]')
    #修改属性值   
    for aNode in aNode_array:
        aNode["icon"]=""

    titleNode=pageData.select('title')[0]

    date=str(datetime.datetime.now().year)+str(datetime.datetime.now().month)+str(datetime.datetime.now().day)

    # 节点后插入内容
    insertContent='<!--个人_'+str(date)+'--><meta charset="utf-8"><link rel="shortcut icon" href="http://54lxb.com/src/img/colourstar.ico" /><link rel="stylesheet" href="../../css/alone/bookmark.css"><link rel="stylesheet" href="../../css/alone/bookmark_mobile.css"><script src="../../plugin/jquery-3.3.1/jquery-3.3.1.min.js"></script><script src="../../js/alone/bookmark.js"></script>'
    insertContent= BeautifulSoup(insertContent, 'html5lib')
    
    titleNode.insert_after(insertContent)
    # pageData= BeautifulSoup(pageData, 'html5lib')
    newContent=str(pageData)
    return newContent


if __name__ == '__main__':
    read()
    
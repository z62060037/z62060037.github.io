import os,stat
import urllib.request
import json
import re

# 读取json文件
with open('../../../data/alone/navData.json', 'r', encoding='utf8') as f:
    jsonData=json.load(f)
    navConetntData=jsonData["navConetntData"]
    for index,value in enumerate(navConetntData):
        groupContent=value["groupContent"]
        # print(groupContent)
        for groupContentIndex,groupContentValue in enumerate(groupContent):
            # 获取图片地址
            
            # print(groupContentValue["remoteIconUrl"])
            try:
                # 网站地址
                internetSite=groupContentValue["internetSite"]
                # 网站图标地址
                remoteIconUrl=groupContentValue["remoteIconUrl"]
                imgName=getImgName(internetSite)
                print("图片名："+imgName)
                print("地址："+remoteIconUrl)
            except:
                print("跳过")
    
# 从url提取图片名
def getImgName(internetSite):
     
    






    
def downLoadImg(imgName,imgUrl):
    img_url="http://ditu.amap.com/favicon.ico"
    file_path='./'
    file_name ="aaa"
    
    try:
        #是否有这个路径
        if not os.path.exists(file_path):
            #创建路径
            os.makedirs(file_path)
        #获得图片后缀
        file_suffix = os.path.splitext(img_url)[1]
        # print(file_suffix)
        #拼接图片名（包含路径）
        filename = '{}{}{}{}'.format(file_path,os.sep,file_name,file_suffix)
        print("图片名:",filename)
        #下载图片，并保存到文件夹中
        urllib.request.urlretrieve(img_url,filename=filename)
    
    except IOError as e:
        print("IOError")
    except Exception as e:
        print("Exception")




   

#字典转成json,字典转换成字符串 加上ensure_ascii=False以后，可以识别中文， indent=4是间隔4个空格显示
# jsonData=json.dumps(jsonData,ensure_ascii=False,indent=4)

'''
for line in f.readlines():
    # strip()移除空格
    lineStripData=line.strip()
    # print("行数据：",lineStripData)
    try:
        lineIndex=lineStripData.index("remoteIconUrl")
        # print("索引：",lineIndex)
        if(lineIndex>=0)
    except:
        # print("跳过")
'''







 
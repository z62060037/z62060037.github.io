import os,stat
import urllib.request
import json
import re

# 从url提取图片名
def getImgName(internetSite):
    #internetSite='https://c.runoob.com/'
    reg='\.\w*\.'
    # 获取匹配的结果
    searchResult=re.search(reg,internetSite) 
    # 获取匹配的内容
    content= searchResult.group()  
    content= content[1:(len(content)-1)]
    return content
    
# 根据url和文件名下载文件
def downLoadImg(imgName,imgUrl):
    # file_name ="aaa"
    # img_url="http://ditu.amap.com/favicon.ico"
    file_path='./'
    
    try:
        #是否有这个路径
        if not os.path.exists(file_path):
            #创建路径
            os.makedirs(file_path)
        #获得图片后缀
        file_suffix = os.path.splitext(imgUrl)[1]
        # print(file_suffix)
        #拼接图片名（包含路径）
        filename = '{}{}{}{}'.format(file_path,os.sep,imgName,file_suffix)
        print("图片名:",filename)
        #下载图片，并保存到文件夹中
        urllib.request.urlretrieve(imgUrl,filename=filename)
    except IOError as e:
        print("读写操作错误")
    except Exception as e:
        print("意外错误")



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
                print("地址："+remoteIconUrl)
                imgName=getImgName(internetSite)
                print("图片名："+imgName)
                if(remoteIconUrl and imgName):
                    downLoadImg(imgName,remoteIconUrl)
            except:
                print("跳过")
            
    

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







 
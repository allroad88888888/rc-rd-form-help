
一个简单的基础react-redux 辅助开发表单，请求，查询的公共辅助方法


表单辅助
表单的数据结构为:


<pre><code>
{
    form:{
        "key1":{
            filds:{
                subKey1:{
                    name:"subKey1", 
                    isStar:true/false, //是否必填
                    errorMessage:false,//错误信息  可传 可不传
                    vaMethod:function(value){},//校验方法
                    vaDoneMethod:function(value){},//校验成功回调方法  
                }                
            },
            vaResult:false,//表单所有字段都校验正确  这里变为true
            values:{
                subKey1:value
            }//表单保存的值      
        },
        "key2":{
            filds:{
                subKey1:{
                    name:"subKey1", 
                    isStar:true/false, //是否必填
                    errorMessage:false,//错误信息  可传 可不传
                    vaMethod:function(value){},//校验方法
                    vaDoneMethod:function(value){},//校验成功回调方法  
                }                
            },
            vaResult:false,//表单所有字段都校验正确  这里变为true
            values:{
                subKey1:value
            }
        }
    }
}
</code></pre>


## 表单初始化formInit(key,filds)
## 表单设置值formSetValue(key,subKey,value)
## 表单设置其它属性formSetOthers(key,subKey,othersKey,value)
## 表单清除 formClean(key)

## 表单增加字段formAdd(key,filds)
## 表单删除字段formRemove(key,subKey)



fetch请求辅助
fetchPosts(key, url, param, type = "GET",headers={},repType="json")
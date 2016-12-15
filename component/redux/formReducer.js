
import {FORM_SET_PARAM,FORM_INIT,FORM_SET_VALUE,FORM_SET_OHERS,FORM_CLEAN,FORM_ADD,FORM_REMOVE} from "./formAction";

//import * as _ from "lodash";

import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import each from "lodash/each";
import isObject from "lodash/isObject";
import cloneDeep from "lodash/cloneDeep";
import assignIn from "lodash/assignIn";

/*校验 表单  通用事件  */
function formVaSub(value, currentObj,others,status) {

    let errorMessage = false;
    //调用vaMethod方法校验 结果是否符合标准 //isEmpty  || !value
    if ((value === "" || isEmpty(isNumber(value)?value.toString():value) || value.length === 0 ) && currentObj.isStar) {

        errorMessage = status?false:"不能为空";
        //console.info("不能为空 ：", currentObj);
        return errorMessage;
    }
    if(status){
        return true;
    }
    //调用vaMethod方法校验 结果是否符合标准 //isEmpty
    errorMessage = currentObj.vaMethod && currentObj.vaMethod(value, others) || true;
    return errorMessage
}

/*校验单个表单 */
/*
    status:是否为第一次,只进行初步校验
 */
function formVaForm(formFilds,status) {

    console.info("校验 表单是否填写正确");
    var vaResult = true;
    each(formFilds, function(currentObj, key) {
        let errorMessage = currentObj.errorMessage;
        if (isString(errorMessage)) {
            vaResult = false;
            //return false;
        }else if (!errorMessage) {
            formFilds[key].errorMessage= currentObj.errorMessage = errorMessage = formVaSub(currentObj.value, currentObj, formFilds,status);
            if(isString(errorMessage)||errorMessage===false){
                vaResult  = false;
            }
            //return vaResult;
        }
    })
    return vaResult;
}


function vaAndDoMethod(action,fild, formFilds,formValues={}) {
    var temp,
        otherPropsArray     = {},
        newFilds            = {},
        values              = {},
        newState            = {};
    var currentObj          = fild;
    currentObj.errorMessage = formVaSub(action.value, currentObj, formFilds);

    //vaMethod完之后 调用 vaDonMethod
    if (!isString(currentObj.errorMessage) && currentObj.vaDoneMethod) {

        console.log("--------------------------------")
        temp = currentObj.vaDoneMethod(action.value, formFilds,action);
        if (isObject(temp)) {
            otherPropsArray = temp;
            //otherPropsArray.push(temp)
        }/* else if (isArguments(temp)) {
            otherPropsArray = temp
        }*/ else {
            alert("拉出去枪毙 五分钟!!!乱返回vaDoneMethod参数" + JSON.stringify(temp));
            return false;
        }

    }

    newFilds[action.subKey] = currentObj;

   /* if (otherPropsArray.length > 0) {
        otherPropsArray.map(function(obj, index) {
            let key = obj.key ? obj.key : obj.name;
            newFilds[key] = assignIn(formFilds[key], obj);
        })
    }*/
     if (!isEmpty(otherPropsArray)) {
       /* each(otherPropsArray,function(obj,key){
            newFilds[key] = assignIn(newFilds[key], obj);
        })*/
        /*otherPropsArray.map(function(obj, index) {
            let key = obj.key ? obj.key : obj.name;
            newFilds[key] = assignIn(formFilds[key], obj);
        })*/
        newFilds = assignIn(newFilds,otherPropsArray);
    }
    currentObj.value = currentObj.errorMessage ? action.value : currentObj.value;
    formValues[action.subKey] = currentObj.errorMessage ? action.value : currentObj.value;
    //formValues




    ////console.info("设置值为 ：", fild);
    //console.info("设置值和联动值为 ：", newFilds);
    var filds     = assignIn({},formFilds,newFilds);

    newState.vaResult = currentObj.errorMessage ? formVaForm(filds, true) : false;
    newState.filds = filds;
    newState.values=  formValues;
    return newState;
}

export function formDo(state = {vaResult:false,values:{}} , action) {
    switch (action.type) {
        case FORM_SET_PARAM:
            //console.error("公共的  FORM_SET_PARAM",action.key)
            return assignIn({},state,{
                 formValue:assignIn({},state.formParam,{
                    [action.subKey]:action.value
                 })
            })
        case FORM_INIT:
            //console.error("表单初始化",action)
            var formFilds = cloneDeep(action.filds);

            var values = {};
            each(formFilds,function(one,key){
                if(one.defaultValue!==undefined&&one.defaultValue!==""){
                    values[key] = one.defaultValue;
                    formFilds[key].errorMessage = true;
                }
            })

            var vaResult = formVaForm(formFilds,true);

            return assignIn({}, {vaResult:false}, {
                 filds:formFilds,
                 vaResult:vaResult,
                 values
            });
        case FORM_SET_VALUE:
            ////console.log("readucer 设置值为",action)
            var fild      = assignIn({},state.filds[action.subKey]);
            //fild.value    = action.value;
            let tempState = vaAndDoMethod(action,fild,state.filds,assignIn({},state.values));
            //console.log("校验值：",tempState);
            // /vaAndDoMethod
            //var filds     = assignIn({},state.filds,tempState.filds);
            var newState  = assignIn({},state,tempState);
            return newState;
        case FORM_SET_OHERS:
            //console.error("readucer 设置值为",action)
            var fild      = assignIn({},state.filds[action.subKey]);
            fild[action.othersKey]    = action.value;
            var filds     = assignIn({},state.filds,{[action.subKey]:fild});

            var values = assignIn({},state.values);
            if(action.othersKey==="defaultValue"&&one.defaultValue!==""){
                values[action.subKey] = action.value;
            }
            var newState  = assignIn({},state,{filds:filds},{values:values});
            return newState;
        case FORM_ADD:
            var filds = assignIn({},action.filds);
            var values = assignIn(state.values);
            each(filds, function(one, key) {
                if (one.defaultValue !== undefined&&one.defaultValue!=="") {
                    values[key] = one.defaultValue;
                    filds[key].errorMessage = true;
                }
            });
            let newState = assignIn({},state,{filds:assignIn({},state.filds,filds)},{values:values});
            return  newState;
        case FORM_REMOVE:
            var newFilds = assignIn({}, state.filds);
            var values = assignIn({}, state.values);
            if(action.subKey){
                let keys = action.subKey.split(",");
                each(keys,function(one,index){
                    delete newFilds[one];
                    values[one]&&delete values[one];
                    //newFilds[one] = action.data;
                });
            }else{
                newFilds = {};
            }
            var vaResult = formVaForm(newFilds,true);
            return assignIn({},state,{filds:newFilds},vaResult);
        default:
            return state
    }
}




export function form(state = {}, action) {
  switch (action.type) {
    case FORM_SET_PARAM:
    case FORM_INIT:
    case FORM_SET_OHERS:
    case FORM_SET_VALUE:
    case FORM_ADD:
    case FORM_REMOVE:
        return assignIn({}, state, {
            [action.key]: formDo(state[action.key], action)
         });
    case FORM_CLEAN:
         var newState = assignIn({}, state);
            if(action.key){
                let keys = action.key.split(",");
                each(keys,function(one,index){
                    delete newState[one];
                    //newState[one] = action.data;
                });
            }else{
                newState = {};
            }
            return newState;
    default:
      return state
  }
}




'use strict'

import assignIn from "lodash/assignIn";

export const SEARCH_SET_PARAM = "SEARCH_SET_PARAM";
export const SEARCH_INIT      = "SEARCH_INIT";
export const SEARCH_SET_VALUE = "SEARCH_SET_VALUE";
export const SEARCH_SET_OHERS = "SEARCH_SET_OHERS";

export const SEARCH_CLEAN = "SEARCH_CLEAN";

export const SEARCH_BY_PAGE = "SEARCH_BY_PAGE";







export function searchClean(key,filds){
    /*let formFilds = _.cloneDeep(filds);
    let vaResult = formVaForm(formFilds,true);*/
    //console.log("初始化 formFilds",filds)
    return {
        type:SEARCH_CLEAN,
        key,
        filds
    }
}


export function searchSetParam(key,subKey,value){
	return {
		type:SEARCH_SET_PARAM,
		key,
		subKey,
		value
	}
}

export function searchInit(key,filds){
	return {
		type:SEARCH_INIT,
		key,
		filds
	}
}

export function searchSetValue(key,subKey,value){
	//console.log("key",key,subKey)
	return {
		type:SEARCH_SET_VALUE,
		key,
		subKey,
		value
	}
}

export function searchSetOthers(key,subKey,othersKey,value){
	return {
		type:SEARCH_SET_OHERS,
		key,
		subKey,
		othersKey,
		value
	}
}

export function searchByPage(key, url, param, type = "GET",headers,repType="json"){

	return (dispatch,getState) => {
        if(type.toLocaleUpperCase()==="GET"&&size(param)>0){
           url +="?"+toExcString(param)
        }
        headers = headers?headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                };
        //console.log("-------------------------------",headers);
        //cookie
        headers = assignIn(headers,{"X_FREEY_SERVICE":getState().cookie["X_FREEY_SERVICE"]});

        dispatch(fetchRequest(key));
        return fetch(url, {
                method: type == "GET" ? 'GET' : "POST",
                headers: headers,
                credentials: 'same-origin',
                body: type.toLocaleUpperCase()==="GET"?undefined:(repType=="json"?JSON.stringify(param):param)
            })
            .then((res) => {
                console.log(res.status);
                return res.json()
            })
            .then((data) => {
                console.log('收到data', data)
                return dispatch(fetchSuccess(key, data));
            })
           /* .catch((e) => {
                console.error(e.message)
            })*/
    }
}

var toExcString = function(array,type={":":"=",",":"&"}){

    let result ="";
    for(var temp in array){
        result+= temp+'='+array[temp]+"&"
    }

    return result.substring(-1,result.length-1);
}
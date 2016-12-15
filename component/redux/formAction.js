
export const FORM_INIT      = "FORM_INIT";
export const FORM_SET_VALUE = "FORM_SET_VALUE";
export const FORM_SET_OHERS = "FORM_SET_OHERS";

export const FORM_CLEAN= "FORM_CLEAN";
export const FORM_REMOVE= "FORM_REMOVE";

export const FORM_ADD= "FORM_ADD";

export function formAdd(key,filds){
	return {
		type:FORM_ADD,
		key,
		filds
	}
}
export function formRemove(key,subKey){
	return {
		type:FORM_REMOVE,
		key,
		subKey
	}
}

export function formInit(key,filds){
	console.log("初始化 formFilds",filds)
	return {
		type:FORM_INIT,
		key,
		filds
	}
}
export function formClean(key){
	return {
		type:FORM_CLEAN,
		key
	}
}


export function formSetValue(key,subKey,value){
	return {
		type:FORM_SET_VALUE,
		key,
		subKey,
		value
	}
}

export function formSetOthers(key,subKey,othersKey,value){
	return {
		type:FORM_SET_OHERS,
		key,
		subKey,
		othersKey,
		value
	}
}


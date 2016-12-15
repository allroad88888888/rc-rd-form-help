
import cloneDeep from "lodash/cloneDeep";
import assignIn from "lodash/assignIn";
import {SEARCH_SET_PARAM,SEARCH_INIT,SEARCH_SET_VALUE,SEARCH_SET_OHERS,SEARCH_BY_PAGE,SEARCH_CLEAN} from "./searchAction";

const initList = {
    searchParam:{},
    filds:{}
}



export function searchDo(state = initList , action) {
    switch (action.type) {
        case SEARCH_SET_PARAM:
            //console.info("公共的  SEARCH_SET_PARAM",action.key)
            return assignIn({},state,{
                 searchParam:assignIn({},state.searchParam,{
                    [action.subKey]:action.value
                 })
            })
        case SEARCH_INIT:
            return assignIn({}, initList, {
                 filds:cloneDeep(action.filds)
            })
        case SEARCH_SET_VALUE:
            ////console.log("readucer 设置值为",action)
            // var newState = assignIn({}, state);
            var fild      = assignIn({},state.filds[action.subKey]);
            fild.value    = action.value;
            var filds     = assignIn({},state.filds,{[action.subKey]:fild});
            var newState  = assignIn({},state,{filds:filds});
            /*var newState  = assignIn({},state,{filds:filds},{
                 searchParam:assignIn({},state.searchParam,{[action.subKey]:action.value})
            });*/
            return newState;
        case SEARCH_SET_OHERS:

            //console.log("readucer 设置值为",action)
            var fild      = assignIn({},state.filds[action.subKey]);
            fild[action.othersKey]    = action.value;
            var filds     = assignIn({},state.filds,{[action.subKey]:fild});
            var newState  = assignIn({},state,{filds:filds});
            return newState;
        case SEARCH_BY_PAGE:
            /*var data = assignIn({},state.data[action.subKey]);
            if(action.page===1){
                var data = assignIn({},state.data[action.subKey]);
            }else{

            }*/
            return state;
        default:
            return state
    }
}




export function search(state = {}, action) {
  switch (action.type) {
    case SEARCH_SET_PARAM:
    case SEARCH_INIT:
    case SEARCH_SET_OHERS:
    case SEARCH_SET_VALUE:
        return assignIn({}, state, {
            [action.key]: searchDo(state[action.key], action)
         });
    case SEARCH_CLEAN:
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



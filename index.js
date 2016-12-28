'use strict';

if(process&&process.env&&process.env.NODE_ENV ==='development'){
	module.exports = require('./build/react-redux-help');
}else{
	module.exports = require('./build/react-redux-help.min');
}
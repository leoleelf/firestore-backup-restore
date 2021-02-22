"use strict";var __createBinding=(this&&this.__createBinding)||(Object.create?(function(o,m,k,k2){if(k2===undefined)k2=k;Object.defineProperty(o,k2,{enumerable:true,get:function(){return m[k];}});}):(function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];}));var __setModuleDefault=(this&&this.__setModuleDefault)||(Object.create?(function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v});}):function(o,v){o["default"]=v;});var __importStar=(this&&this.__importStar)||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod)if(k!=="default"&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);__setModuleDefault(result,mod);return result;};Object.defineProperty(exports,"__esModule",{value:true});exports.parseAndConvertDates=exports.traverseObjects=exports.getPath=exports.makeTime=exports.makeGeoPoint=void 0;var admin=__importStar(require("firebase-admin"));var makeGeoPoint=function(geoValues){if(!geoValues._latitude||!geoValues._longitude){return null;}
return new admin.firestore.GeoPoint(geoValues._latitude,geoValues._longitude);};exports.makeGeoPoint=makeGeoPoint;var makeTime=function(firebaseTimestamp){if(!firebaseTimestamp||!firebaseTimestamp._seconds){return null;}
return new Date(firebaseTimestamp._seconds*1000);};exports.makeTime=makeTime;var getPath=function(obj){if(obj&&typeof obj.path==='string'){return obj.path;}
return obj;};exports.getPath=getPath;var isObject=function(test){return(test===null||test===void 0?void 0:test.constructor)===Object;};var isArray=function(test){return Array.isArray(test);};var traverseObjects=function(data,callback){var _a;for(var _i=0,_b=Object.entries(data);_i<_b.length;_i++){var _c=_b[_i],key=_c[0],value=_c[1];if(!isObject(value)&&!isArray(value)&&((_a=value.constructor)===null||_a===void 0?void 0:_a.name)!=='DocumentReference'){continue;}
var checkResult=callback(value);if(checkResult){data[key]=checkResult;continue;}
exports.traverseObjects(data[key],callback);}};exports.traverseObjects=traverseObjects;var parseAndConvertDates=function(data){exports.traverseObjects(data,function(value){var isTimeStamp=typeof value==='object'&&value.hasOwnProperty('_seconds')&&value.hasOwnProperty('_nanoseconds');if(isTimeStamp){return exports.makeTime(value);}
return null;});};exports.parseAndConvertDates=parseAndConvertDates;
function leftPad(r,t){return r.length>=t?r:new Array(t-r.length+1).join("0")+r}function binary2hex(r){for(var t="",n=0;n<r.length/8;n++)t+=leftPad(parseInt(r.substr(8*n,8),2).toString(16),2);return t}function hex2binary(r){for(var t="",n=0;n<r.length/2;n++)t+=leftPad(parseInt(r.substr(2*n,2),16).toString(2),8);return t}function str2binary(r){for(var t="",n=0,o=r.length;n<o;n++){var e=r.codePointAt(n);if(e<=127)t+=leftPad(e.toString(2),8);else if(e<=2047)t+=leftPad((192|e>>>6).toString(2),8),t+=leftPad((128|63&e).toString(2),8);else if(e<=55295||57344<=e&&e<=65535)t+=leftPad((224|e>>>12).toString(2),8),t+=leftPad((128|e>>>6&63).toString(2),8),t+=leftPad((128|63&e).toString(2),8);else{if(!(65536<=e&&e<=1114111))throw t+=leftPad(e.toString(2),8),new Error("input is not supported");n++,t+=leftPad((240|e>>>18&28).toString(2),8),t+=leftPad((128|e>>>12&63).toString(2),8),t+=leftPad((128|e>>>6&63).toString(2),8),t+=leftPad((128|63&e).toString(2),8)}}return t}function array2binary(r){return r.reduce(function(r,t){return r+leftPad(t.toString(2),8)},"")}function rol(r,t){return r.substring(t%r.length)+r.substr(0,t%r.length)}function binaryCal(r,t,n){for(var o,e=r||"",a=t||"",u=[],i=e.length-1;0<=i;i--)o=n(e[i],a[i],o),u[i]=o[0];return u.join("")}function xor(r,t){return binaryCal(r,t,function(r,t){return[r===t?"0":"1"]})}function and(r,t){return binaryCal(r,t,function(r,t){return["1"===r&&"1"===t?"1":"0"]})}function or(r,t){return binaryCal(r,t,function(r,t){return["1"===r||"1"===t?"1":"0"]})}function add(r,t){return binaryCal(r,t,function(r,t,n){n=n?n[1]:"0";return r!==t?["0"===n?"1":"0",n]:[n,r]})}function not(r){return binaryCal(r,void 0,function(r){return["1"===r?"0":"1"]})}function calMulti(o){return function(){for(var r=arguments.length,t=new Array(r),n=0;n<r;n++)t[n]=arguments[n];return t.reduce(function(r,t){return o(r,t)})}}function P0(r){return calMulti(xor)(r,rol(r,9),rol(r,17))}function P1(r){return calMulti(xor)(r,rol(r,15),rol(r,23))}function FF(r,t,n,o){return 0<=o&&o<=15?calMulti(xor)(r,t,n):calMulti(or)(and(r,t),and(r,n),and(t,n))}function GG(r,t,n,o){return 0<=o&&o<=15?calMulti(xor)(r,t,n):or(and(r,t),and(not(r),n))}function T(r){return hex2binary(0<=r&&r<=15?"79cc4519":"7a879d8a")}function CF(r,t){for(var n=[],o=[],e=0;e<16;e++)n.push(t.substr(32*e,32));for(var a=16;a<68;a++)n.push(calMulti(xor)(P1(calMulti(xor)(n[a-16],n[a-9],rol(n[a-3],15))),rol(n[a-13],7),n[a-6]));for(var u=0;u<64;u++)o.push(xor(n[u],n[u+4]));for(var i=[],l=0;l<8;l++)i.push(r.substr(32*l,32));for(var f,s,c=i[0],y=i[1],d=i[2],b=i[3],p=i[4],h=i[5],g=i[6],S=i[7],C=0;C<64;C++)f=xor(s=rol(calMulti(add)(rol(c,12),p,rol(T(C),C)),7),rol(c,12)),f=calMulti(add)(FF(c,y,d,C),b,f,o[C]),s=calMulti(add)(GG(p,h,g,C),S,s,n[C]),b=d,d=rol(y,9),y=c,c=f,S=g,g=rol(h,19),h=p,p=P0(s);return xor([c,y,d,b,p,h,g,S].join(""),r)}function sm3(r){for(var t=("string"==typeof r?str2binary:array2binary)(r),n=t.length,r=448<=(r=n%512)?512-r%448-1:448-r-1,o="".concat(t,"1").concat(leftPad("",r)).concat(leftPad(n.toString(2),64)).toString(),e=(n+r+65)/512,a=hex2binary("7380166f4914b2b9172442d7da8a0600a96f30bc163138aae38dee4db0fb0e4e"),u=0;u<=e-1;u++)a=CF(a,o.substr(512*u,512));return binary2hex(a).toUpperCase()}function _toConsumableArray(r){return _arrayWithoutHoles(r)||_iterableToArray(r)||_unsupportedIterableToArray(r)||_nonIterableSpread()}function _arrayWithoutHoles(r){if(Array.isArray(r))return _arrayLikeToArray(r)}function _iterableToArray(r){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(r))return Array.from(r)}function _unsupportedIterableToArray(r,t){if(r){if("string"==typeof r)return _arrayLikeToArray(r,t);var n=Object.prototype.toString.call(r).slice(8,-1);return"Map"===(n="Object"===n&&r.constructor?r.constructor.name:n)||"Set"===n?Array.from(r):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(r,t):void 0}}function _arrayLikeToArray(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=r[n];return o}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var DECRYPT=0,ROUND=32,BLOCK=16,Sbox=[214,144,233,254,204,225,61,183,22,182,20,194,40,251,44,5,43,103,154,118,42,190,4,195,170,68,19,38,73,134,6,153,156,66,80,244,145,239,152,122,51,84,11,67,237,207,172,98,228,179,28,169,201,8,232,149,128,223,148,250,117,143,63,166,71,7,167,252,243,115,23,186,131,89,60,25,230,133,79,168,104,107,129,178,113,100,218,139,248,235,15,75,112,86,157,53,30,36,14,94,99,88,209,162,37,34,124,59,1,33,120,135,212,0,70,87,159,211,39,82,76,54,2,231,160,196,200,158,234,191,138,210,64,199,56,181,163,247,242,206,249,97,21,161,224,174,93,164,155,52,26,85,173,147,50,48,245,140,177,227,29,246,226,46,130,102,202,96,192,41,35,171,13,83,78,111,213,219,55,69,222,253,142,47,3,255,106,114,109,108,91,81,141,27,175,146,187,221,188,127,17,217,92,65,31,16,90,216,10,193,49,136,165,205,123,189,45,116,208,18,184,229,180,176,137,105,151,74,12,150,119,126,101,185,241,9,197,110,198,132,24,240,125,236,58,220,77,32,121,238,95,62,215,203,57,72],CK=[462357,472066609,943670861,1415275113,1886879365,2358483617,2830087869,3301692121,3773296373,4228057617,404694573,876298825,1347903077,1819507329,2291111581,2762715833,3234320085,3705924337,4177462797,337322537,808926789,1280531041,1752135293,2223739545,2695343797,3166948049,3638552301,4110090761,269950501,741554753,1213159005,1684763257];function hexToArray(r){for(var t=[],n=0,o=r.length;n<o;n+=2)t.push(parseInt(r.substr(n,2),16));return t}function strToHexCharCode(r){if(""===r)return"";for(var t=[],n=0;n<r.length;n++)t.push(r.charCodeAt(n).toString(16));return t.join("")}function ArrayToHex(r){return r.map(function(r){return 1===(r=r.toString(16)).length?"0"+r:r}).join("")}function utf8ToArray(r){for(var t=[],n=0,o=r.length;n<o;n++){var e=r.codePointAt(n);if(e<=127)t.push(e);else if(e<=2047)t.push(192|e>>>6),t.push(128|63&e);else if(e<=55295||57344<=e&&e<=65535)t.push(224|e>>>12),t.push(128|e>>>6&63),t.push(128|63&e);else{if(!(65536<=e&&e<=1114111))throw t.push(e),new Error("input is not supported");n++,t.push(240|e>>>18&28),t.push(128|e>>>12&63),t.push(128|e>>>6&63),t.push(128|63&e)}}return t}function arrayToUtf8(r){for(var t=[],n=0,o=r.length;n<o;n++)240<=r[n]&&r[n]<=247?(t.push(String.fromCodePoint(((7&r[n])<<18)+((63&r[n+1])<<12)+((63&r[n+2])<<6)+(63&r[n+3]))),n+=3):224<=r[n]&&r[n]<=239?(t.push(String.fromCodePoint(((15&r[n])<<12)+((63&r[n+1])<<6)+(63&r[n+2]))),n+=2):192<=r[n]&&r[n]<=223?(t.push(String.fromCodePoint(((31&r[n])<<6)+(63&r[n+1]))),n++):t.push(String.fromCodePoint(r[n]));return t.join("")}function rotl(r,t){return r<<t|r>>>32-t}function byteSub(r){return(255&Sbox[r>>>24&255])<<24|(255&Sbox[r>>>16&255])<<16|(255&Sbox[r>>>8&255])<<8|255&Sbox[255&r]}function l1(r){return r^rotl(r,2)^rotl(r,10)^rotl(r,18)^rotl(r,24)}function l2(r){return r^rotl(r,13)^rotl(r,23)}function sms4Crypt(r,t,n){for(var o=new Array(4),e=new Array(4),a=0;a<4;a++)e[0]=255&r[0+4*a],e[1]=255&r[1+4*a],e[2]=255&r[2+4*a],e[3]=255&r[3+4*a],o[a]=e[0]<<24|e[1]<<16|e[2]<<8|e[3];for(var u,i=0;i<32;i+=4)u=o[1]^o[2]^o[3]^n[i+0],o[0]^=l1(byteSub(u)),u=o[2]^o[3]^o[0]^n[i+1],o[1]^=l1(byteSub(u)),u=o[3]^o[0]^o[1]^n[i+2],o[2]^=l1(byteSub(u)),u=o[0]^o[1]^o[2]^n[i+3],o[3]^=l1(byteSub(u));for(var l=0;l<16;l+=4)t[l]=o[3-l/4]>>>24&255,t[l+1]=o[3-l/4]>>>16&255,t[l+2]=o[3-l/4]>>>8&255,t[l+3]=255&o[3-l/4]}function sms4KeyExt(r,t,n){for(var o=new Array(4),e=new Array(4),a=0;a<4;a++)e[0]=255&r[0+4*a],e[1]=255&r[1+4*a],e[2]=255&r[2+4*a],e[3]=255&r[3+4*a],o[a]=e[0]<<24|e[1]<<16|e[2]<<8|e[3];o[0]^=2746333894,o[1]^=1453994832,o[2]^=1736282519,o[3]^=2993693404;for(var u,i=0;i<32;i+=4)u=o[1]^o[2]^o[3]^CK[i+0],t[i+0]=o[0]^=l2(byteSub(u)),u=o[2]^o[3]^o[0]^CK[i+1],t[i+1]=o[1]^=l2(byteSub(u)),u=o[3]^o[0]^o[1]^CK[i+2],t[i+2]=o[2]^=l2(byteSub(u)),u=o[0]^o[1]^o[2]^CK[i+3],t[i+3]=o[3]^=l2(byteSub(u));if(n===DECRYPT)for(var l,f=0;f<16;f++)l=t[f],t[f]=t[31-f],t[31-f]=l}function sm4(r,t,n){var o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},e=o.padding,e=void 0===e?"pkcs#5":e;o.mode;o=o.output,o=void 0===o?"string":o;if(16!==(t="string"==typeof t?hexToArray(t=strToHexCharCode(t).toUpperCase().substr(0,32)):t).length)throw new Error("key is invalid");if(r="string"==typeof r?n!==DECRYPT?(console.log("加密"),utf8ToArray(r)):(console.log("解密"),hexToArray(r)):_toConsumableArray(r),console.log("inArray = "+r),"pkcs#5"===e&&n!==DECRYPT)for(var a=BLOCK-r.length%BLOCK,u=0;u<a;u++)r.push(a);var i=new Array(ROUND);sms4KeyExt(t,i,n);for(var l=[],f=r.length,s=0;BLOCK<=f;){var c=r.slice(s,s+16),y=new Array(16);sms4Crypt(c,y,i);for(var d=0;d<BLOCK;d++)l[s+d]=y[d];f-=BLOCK,s+=BLOCK}return console.log("outArray => ",l),"pkcs#5"===e&&n===DECRYPT&&(e=l[l.length-1],l.splice(l.length-e,e)),"array"!==o?(n!==DECRYPT?ArrayToHex:arrayToUtf8)(l):l}function encrypt(r,t){return sm4(r,t,1)}function decrypt(r,t){return sm4(r,t,0)}var index=Object.freeze({__proto__:null,encrypt:encrypt,decrypt:decrypt});export{sm3 as sm3,index as sm4};

!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,o){n[e]=o},e.parcelRequired7c6=t);var r=t("h6c0i");const s=document.querySelector("form");let a=0,i=0,l=0;function u(e,o){return Math.random()>.3?Promise.resolve({position:e,delay:o}):Promise.reject({position:e,delay:o})}s.addEventListener("submit",(function(e){e.preventDefault(),o=Array.from(e.target.elements),o.forEach((e=>{switch(e.name){case"amount":a=Number.parseInt(e.value);break;case"delay":i=Number.parseInt(e.value);break;case"step":l=Number.parseInt(e.value)}})),function(){for(let e=0;e<a;e++){const o=e+1,n=i;setTimeout((function(){u(o,n).then((({position:e,delay:o})=>{message=`✅ Fulfilled promise ${e} in ${o}ms`,r.Notify.success(message),console.log(message)})).catch((({position:e,delay:o})=>{message=`❌ Rejected promise ${e} in ${o}ms`,r.Notify.failure(message),console.log(message)}))}),n),i+=l}}();var o}))}();
//# sourceMappingURL=03-promises.6b16e1d3.js.map

!function(){const t={startBtnEl:document.querySelector("[data-start]"),stopBtnEl:document.querySelector("[data-stop]")};let e=!1,n=null;function o(){const n=Object.values(t);e||n.reverse(),n[0].setAttribute("disabled",""),n[1].removeAttribute("disabled")}function r(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}o(),t.startBtnEl.addEventListener("click",(function(){if(e)return;e=!0,o(),r(),n=setInterval(r,1e3)})),t.stopBtnEl.addEventListener("click",(function(){e=!1,o(),clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.de482ecd.js.map
!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null,o=function(){document.querySelector("body").style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))};t.addEventListener("click",(function(){n=setInterval(o,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.3908f60b.js.map
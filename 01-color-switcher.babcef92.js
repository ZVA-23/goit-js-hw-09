const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let d=null;const o=()=>{document.querySelector("body").style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`};t.addEventListener("click",(()=>{d=setInterval(o,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(()=>{clearInterval(d),t.disabled=!1,e.disabled=!0}));
//# sourceMappingURL=01-color-switcher.babcef92.js.map

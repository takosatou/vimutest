(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[57],{8845:function(e,n,t){Promise.resolve().then(t.bind(t,311))},311:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});var r=t(7437),l=t(2265);function u(){let e=(0,l.useRef)(!1),n=(0,l.useRef)(!1),[t,u]=(0,l.useState)(!1),[c,i]=(0,l.useState)(!1),o=(0,l.useRef)([]),a=(0,l.useRef)(null),s=(0,l.useRef)(null),d=e=>{var t;if(!n.current||null==s.current||(null===(t=e.acceleration)||void 0===t?void 0:t.y)==null)return;let r={inter:Number(e.interval),value:Number(e.acceleration.y)};o.current.push(r),o.current.length>=1e3&&o.current.shift();let l=s.current.getContext("2d");if(null==l)return;let u=s.current.getBoundingClientRect(),c=s.current.width=Math.floor(u.width),i=s.current.height=Math.floor(u.height);l.clearRect(0,0,c,i);let a=o.current.length-c;a<0&&(a=0),l.strokeStyle="black",l.lineWidth=1,l.beginPath(),l.moveTo(0,i/2+20*o.current[a].value);for(let e=0;e<c;e++)l.lineTo(e,i/2+20*o.current[a+e].value);l.stroke()},f=()=>{window.addEventListener("devicemotion",d),e.current=!0,n.current=!0,u(!0)},m=()=>{n.current=!1,u(!1)},h=()=>{o.current.length=0,n.current=!0,u(!0)};return(0,l.useEffect)(()=>()=>{e.current&&(window.removeEventListener("devicemotion",d),e.current=!1)},[]),(0,r.jsx)("main",{className:"container",children:c?(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("canvas",{ref:s,className:"w-full h-32"}),(0,r.jsxs)("div",{className:"flex flex-row",children:[(0,r.jsx)("button",{className:"bg-gray-200 rounded-full p-4 m-8",onClick:()=>{t?m():h()},children:t?"Stop":"Restart"}),(0,r.jsx)("button",{className:"bg-gray-200 rounded-full p-4 m-8",onClick:()=>{if(null==a.current)return;a.current.value=o.current.map(e=>"".concat(e.inter,",").concat(e.value.toFixed(5))).join("\r\n"),n.current=!1,u(!1);let e=document.getSelection();if(null==e)return;e.removeAllRanges();let t=document.createRange();null!=t&&(t.selectNode(a.current),e.addRange(t),document.execCommand("copy"))},children:"Copy"})]}),(0,r.jsx)("div",{className:"m-4",children:(0,r.jsx)("textarea",{ref:a,className:"w-full h-32 bg-gray-200"})})]}):(0,r.jsx)("button",{className:"bg-gray-200 rounded-full p-8 m-8",onClick:()=>{e.current||(i(!0),"function"==typeof DeviceMotionEvent.requestPermission?DeviceMotionEvent.requestPermission().then(e=>{"granted"===e&&f()}):f())},children:"Start"})})}}},function(e){e.O(0,[971,117,744],function(){return e(e.s=8845)}),_N_E=e.O()}]);
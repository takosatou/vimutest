(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[934],{9633:function(e,r,t){Promise.resolve().then(t.bind(t,6511))},6511:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return i}});var n=t(7437),u=t(2265);class s{reset(){this.prevY=0,this.prevV=0,this.prevT=void 0}get(e,r,t){if(null==this.prevT)return this.prevY=e,this.prevV=r,this.prevT=t,e;let n=this.prevV,u=this.prevV+1*n/2,s=this.prevV+1*u/2,i=this.prevY+1*(n+2*(u+s)+r)/6;return this.prevY=e,this.prevV=r,this.prevT=t,i}constructor(){this.prevY=0,this.prevV=0,this.prevT=void 0}}function i(){let e=(0,u.useRef)(!1),r=(0,u.useRef)(0),t=(0,u.useRef)(0),[i,c]=(0,u.useState)(!1),l=(0,u.useRef)(null),o=(0,u.useRef)(null),v=(0,u.useRef)(null),a=(0,u.useRef)(new s),d=(0,u.useRef)(new s),h=e=>{var n;if(null==l.current||null==o.current||null==v.current||(null===(n=e.acceleration)||void 0===n?void 0:n.x)==null)return;let u=e.acceleration.x;r.current=a.current.get(r.current,u,e.interval),t.current=d.current.get(t.current,r.current,e.interval),l.current.value=u.toFixed(2),o.current.value=r.current.toFixed(2),v.current.value=t.current.toFixed(2)},p=()=>{window.addEventListener("devicemotion",h),e.current=!0};return(0,u.useEffect)(()=>()=>{e.current&&(window.removeEventListener("devicemotion",h),e.current=!1)},[]),(0,n.jsx)("main",{className:"container",children:i?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:"m-4",children:["Motion:",(0,n.jsxs)("div",{children:["AX: ",(0,n.jsx)("input",{type:"text",className:"w-12",ref:l})]}),(0,n.jsxs)("div",{children:["VX: ",(0,n.jsx)("input",{type:"text",className:"w-12",ref:o})]}),(0,n.jsxs)("div",{children:["X: ",(0,n.jsx)("input",{type:"text",className:"w-12",ref:v})]})]}),(0,n.jsx)("button",{className:"bg-gray-200 rounded-full p-4 m-8",onClick:()=>{null!=o.current&&null!=v.current&&(r.current=0,t.current=0,o.current.value=r.current.toFixed(2),v.current.value=t.current.toFixed(2),a.current.reset(),d.current.reset())},children:"Reset"})]}):(0,n.jsx)("button",{className:"bg-gray-200 rounded-full p-8 m-8",onClick:()=>{e.current||(c(!0),"function"==typeof DeviceMotionEvent.requestPermission?DeviceMotionEvent.requestPermission().then(e=>{"granted"===e&&p()}):p())},children:"Start"})})}}},function(e){e.O(0,[971,117,744],function(){return e(e.s=9633)}),_N_E=e.O()}]);
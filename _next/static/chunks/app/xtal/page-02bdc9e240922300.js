(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[987],{9281:function(e,n,t){Promise.resolve().then(t.bind(t,279))},279:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return d}});var r=t(7437),o=t(2265),s=t(4725),i=t(5417),c=t(3126),a=t(8478),u=t(7283),l=t(1448);let f=Math.PI/180;function h(e){let{color:n,position:t}=e,s=(0,o.useRef)(null),i=(0,o.useRef)(0);return(0,a.F)(()=>{null!=s.current&&(s.current.rotation.set(0,i.current*f,0),s.current.position.y=-1+.3*Math.sin(i.current*f),i.current=(i.current+1)%360)}),(0,r.jsxs)("mesh",{ref:s,position:new l.Vector3(...t),children:[(0,r.jsx)("octahedronGeometry",{args:[.2,Math.floor(3*Math.random())]}),(0,r.jsx)("meshPhysicalMaterial",{color:new l.Color(n).convertSRGBToLinear(),roughness:0,clearcoat:1,clearcoatRoughness:0,transmission:1,thickness:.5,opacity:.8,ior:1.5})]})}function d(){let e=(0,o.useRef)(!1),[n,t]=(0,o.useState)(!1),a=(0,o.useRef)(null),l=e=>{null!=a.current&&null!=e.alpha&&null!=e.beta&&a.current.rotateTo(e.alpha*f,e.beta*f,!1)},d=()=>{window.addEventListener("deviceorientation",l),e.current=!0};return(0,o.useEffect)(()=>()=>{e.current&&(window.removeEventListener("deviceorientation",l),e.current=!1)},[]),(0,r.jsx)("main",{className:"w-screen h-screen",children:n?(0,r.jsxs)(u.Xz,{className:"w-full h-full border border-gray-300",children:[(0,r.jsx)(s.c,{makeDefault:!0,fov:45,position:[0,.1,0]}),(0,r.jsx)(i.B,{makeDefault:!0,ref:a,maxPolarAngle:Math.PI/2}),(0,r.jsx)(h,{position:[1,-1,0],color:"#80FF80"}),(0,r.jsx)(h,{position:[.7,-1,.7],color:"#FF80FF"}),(0,r.jsx)(h,{position:[0,-1,1],color:"#CCFFFF"}),(0,r.jsx)(h,{position:[.7,-1,-.7],color:"#80FFFF"}),(0,r.jsx)(h,{position:[-1,-1,0],color:"#FFFF80"}),(0,r.jsx)(h,{position:[-.7,-1,.7],color:"#8080FF"}),(0,r.jsx)(h,{position:[0,-1,-1],color:"#FF8080"}),(0,r.jsx)(h,{position:[-.7,-1,-.7],color:"#CCCCCC"}),(0,r.jsx)(c.qA,{preset:"sunset",backgroundBlurriness:0,background:!0}),(0,r.jsx)("ambientLight",{args:[4294967295],intensity:.2}),(0,r.jsx)("directionalLight",{position:[1,.5,0],intensity:.8})]}):(0,r.jsx)("button",{className:"bg-gray-200 rounded-full p-8 m-8",onClick:()=>{e.current||(t(!0),"function"==typeof DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission().then(e=>{"granted"===e&&d()}):d())},children:"Start"})})}}},function(e){e.O(0,[689,131,739,971,117,744],function(){return e(e.s=9281)}),_N_E=e.O()}]);
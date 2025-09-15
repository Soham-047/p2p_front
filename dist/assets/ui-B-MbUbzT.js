import{r as oe,g as Wt,a as ie}from"./react-gH-7aFTg.js";function re(t,e){for(var n=0;n<e.length;n++){const o=e[n];if(typeof o!="string"&&!Array.isArray(o)){for(const i in o)if(i!=="default"&&!(i in t)){const r=Object.getOwnPropertyDescriptor(o,i);r&&Object.defineProperty(t,i,r.get?r:{enumerable:!0,get:()=>o[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var gt={exports:{}},nt={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ot;function se(){if(Ot)return nt;Ot=1;var t=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(o,i,r){var s=null;if(r!==void 0&&(s=""+r),i.key!==void 0&&(s=""+i.key),"key"in i){r={};for(var c in i)c!=="key"&&(r[c]=i[c])}else r=i;return i=r.ref,{$$typeof:t,type:o,key:s,ref:i!==void 0?i:null,props:r}}return nt.Fragment=e,nt.jsx=n,nt.jsxs=n,nt}var St;function ce(){return St||(St=1,gt.exports=se()),gt.exports}var Gn=ce(),R=oe();const le=Wt(R),Zn=re({__proto__:null,default:le},[R]);var Bt=ie();const Qn=Wt(Bt);function qt(t){var e,n,o="";if(typeof t=="string"||typeof t=="number")o+=t;else if(typeof t=="object")if(Array.isArray(t)){var i=t.length;for(e=0;e<i;e++)t[e]&&(n=qt(t[e]))&&(o&&(o+=" "),o+=n)}else for(n in t)t[n]&&(o&&(o+=" "),o+=n);return o}function Kn(){for(var t,e,n=0,o="",i=arguments.length;n<i;n++)(t=arguments[n])&&(e=qt(t))&&(o&&(o+=" "),o+=e);return o}/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),fe=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,o)=>o?o.toUpperCase():n.toLowerCase()),Et=t=>{const e=fe(t);return e.charAt(0).toUpperCase()+e.slice(1)},It=(...t)=>t.filter((e,n,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===n).join(" ").trim(),ue=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var de={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=R.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:i="",children:r,iconNode:s,...c},f)=>R.createElement("svg",{ref:f,...de,width:e,height:e,stroke:t,strokeWidth:o?Number(n)*24/Number(e):n,className:It("lucide",i),...!r&&!ue(c)&&{"aria-hidden":"true"},...c},[...s.map(([a,l])=>R.createElement(a,l)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(t,e)=>{const n=R.forwardRef(({className:o,...i},r)=>R.createElement(he,{ref:r,iconNode:e,className:It(`lucide-${ae(Et(t))}`,`lucide-${t}`,o),...i}));return n.displayName=Et(t),n};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],to=k("arrow-left",me);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],eo=k("award",pe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],no=k("briefcase",ge);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],oo=k("calendar",ye);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],io=k("check",xe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],ro=k("chevron-down",we);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],so=k("chevron-up",ve);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]],co=k("ellipsis-vertical",be);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],lo=k("ellipsis",ke);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],ao=k("external-link",Ae);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],fo=k("funnel",Re);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],uo=k("github",_e);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],ho=k("globe",Ce);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],mo=k("graduation-cap",Me);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],po=k("heart",Oe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]],go=k("instagram",Se);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],yo=k("linkedin",Ee);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],xo=k("map-pin",Le);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],wo=k("message-circle",$e);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],vo=k("mic",Pe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",key:"1miecu"}]],bo=k("paperclip",Te);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],ko=k("pen-line",Ne);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],Ao=k("pencil",De);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Ro=k("plus",Fe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}],["path",{d:"m9 17-5-5 5-5",key:"nvlc11"}]],_o=k("reply",je);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Co=k("search",ze);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],Mo=k("send",He);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],Oo=k("share-2",Ve);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],So=k("smile",We);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]],Eo=k("thumbs-up",Be);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Lo=k("trash-2",qe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]],$o=k("twitter",Ie);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Po=k("x",Xe),Ye=["top","right","bottom","left"],J=Math.min,N=Math.max,lt=Math.round,st=Math.floor,B=t=>({x:t,y:t}),Ue={left:"right",right:"left",bottom:"top",top:"bottom"},Je={start:"end",end:"start"};function wt(t,e,n){return N(t,J(e,n))}function X(t,e){return typeof t=="function"?t(e):t}function Y(t){return t.split("-")[0]}function tt(t){return t.split("-")[1]}function kt(t){return t==="x"?"y":"x"}function At(t){return t==="y"?"height":"width"}const Ge=new Set(["top","bottom"]);function W(t){return Ge.has(Y(t))?"y":"x"}function Rt(t){return kt(W(t))}function Ze(t,e,n){n===void 0&&(n=!1);const o=tt(t),i=Rt(t),r=At(i);let s=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=at(s)),[s,at(s)]}function Qe(t){const e=at(t);return[vt(t),e,vt(e)]}function vt(t){return t.replace(/start|end/g,e=>Je[e])}const Lt=["left","right"],$t=["right","left"],Ke=["top","bottom"],tn=["bottom","top"];function en(t,e,n){switch(t){case"top":case"bottom":return n?e?$t:Lt:e?Lt:$t;case"left":case"right":return e?Ke:tn;default:return[]}}function nn(t,e,n,o){const i=tt(t);let r=en(Y(t),n==="start",o);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(vt)))),r}function at(t){return t.replace(/left|right|bottom|top/g,e=>Ue[e])}function on(t){return{top:0,right:0,bottom:0,left:0,...t}}function Xt(t){return typeof t!="number"?on(t):{top:t,right:t,bottom:t,left:t}}function ft(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function Pt(t,e,n){let{reference:o,floating:i}=t;const r=W(e),s=Rt(e),c=At(s),f=Y(e),a=r==="y",l=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,h=o[c]/2-i[c]/2;let d;switch(f){case"top":d={x:l,y:o.y-i.height};break;case"bottom":d={x:l,y:o.y+o.height};break;case"right":d={x:o.x+o.width,y:u};break;case"left":d={x:o.x-i.width,y:u};break;default:d={x:o.x,y:o.y}}switch(tt(e)){case"start":d[s]-=h*(n&&a?-1:1);break;case"end":d[s]+=h*(n&&a?-1:1);break}return d}const rn=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:s}=n,c=r.filter(Boolean),f=await(s.isRTL==null?void 0:s.isRTL(e));let a=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:l,y:u}=Pt(a,o,f),h=o,d={},m=0;for(let p=0;p<c.length;p++){const{name:g,fn:y}=c[p],{x,y:v,data:b,reset:w}=await y({x:l,y:u,initialPlacement:o,placement:h,strategy:i,middlewareData:d,rects:a,platform:s,elements:{reference:t,floating:e}});l=x??l,u=v??u,d={...d,[g]:{...d[g],...b}},w&&m<=50&&(m++,typeof w=="object"&&(w.placement&&(h=w.placement),w.rects&&(a=w.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):w.rects),{x:l,y:u}=Pt(a,h,f)),p=-1)}return{x:l,y:u,placement:h,strategy:i,middlewareData:d}};async function ot(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:r,rects:s,elements:c,strategy:f}=t,{boundary:a="clippingAncestors",rootBoundary:l="viewport",elementContext:u="floating",altBoundary:h=!1,padding:d=0}=X(e,t),m=Xt(d),g=c[h?u==="floating"?"reference":"floating":u],y=ft(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(g)))==null||n?g:g.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:a,rootBoundary:l,strategy:f})),x=u==="floating"?{x:o,y:i,width:s.floating.width,height:s.floating.height}:s.reference,v=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),b=await(r.isElement==null?void 0:r.isElement(v))?await(r.getScale==null?void 0:r.getScale(v))||{x:1,y:1}:{x:1,y:1},w=ft(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:x,offsetParent:v,strategy:f}):x);return{top:(y.top-w.top+m.top)/b.y,bottom:(w.bottom-y.bottom+m.bottom)/b.y,left:(y.left-w.left+m.left)/b.x,right:(w.right-y.right+m.right)/b.x}}const sn=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:i,rects:r,platform:s,elements:c,middlewareData:f}=e,{element:a,padding:l=0}=X(t,e)||{};if(a==null)return{};const u=Xt(l),h={x:n,y:o},d=Rt(i),m=At(d),p=await s.getDimensions(a),g=d==="y",y=g?"top":"left",x=g?"bottom":"right",v=g?"clientHeight":"clientWidth",b=r.reference[m]+r.reference[d]-h[d]-r.floating[m],w=h[d]-r.reference[d],C=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a));let _=C?C[v]:0;(!_||!await(s.isElement==null?void 0:s.isElement(C)))&&(_=c.floating[v]||r.floating[m]);const E=b/2-w/2,F=_/2-p[m]/2-1,S=J(u[y],F),j=J(u[x],F),P=S,L=_-p[m]-j,M=_/2-p[m]/2+E,V=wt(P,M,L),O=!f.arrow&&tt(i)!=null&&M!==V&&r.reference[m]/2-(M<P?S:j)-p[m]/2<0,$=O?M<P?M-P:M-L:0;return{[d]:h[d]+$,data:{[d]:V,centerOffset:M-V-$,...O&&{alignmentOffset:$}},reset:O}}}),cn=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:r,rects:s,initialPlacement:c,platform:f,elements:a}=e,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:h,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:p=!0,...g}=X(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};const y=Y(i),x=W(c),v=Y(c)===c,b=await(f.isRTL==null?void 0:f.isRTL(a.floating)),w=h||(v||!p?[at(c)]:Qe(c)),C=m!=="none";!h&&C&&w.push(...nn(c,p,m,b));const _=[c,...w],E=await ot(e,g),F=[];let S=((o=r.flip)==null?void 0:o.overflows)||[];if(l&&F.push(E[y]),u){const M=Ze(i,s,b);F.push(E[M[0]],E[M[1]])}if(S=[...S,{placement:i,overflows:F}],!F.every(M=>M<=0)){var j,P;const M=(((j=r.flip)==null?void 0:j.index)||0)+1,V=_[M];if(V&&(!(u==="alignment"?x!==W(V):!1)||S.every(A=>W(A.placement)===x?A.overflows[0]>0:!0)))return{data:{index:M,overflows:S},reset:{placement:V}};let O=(P=S.filter($=>$.overflows[0]<=0).sort(($,A)=>$.overflows[1]-A.overflows[1])[0])==null?void 0:P.placement;if(!O)switch(d){case"bestFit":{var L;const $=(L=S.filter(A=>{if(C){const T=W(A.placement);return T===x||T==="y"}return!0}).map(A=>[A.placement,A.overflows.filter(T=>T>0).reduce((T,U)=>T+U,0)]).sort((A,T)=>A[1]-T[1])[0])==null?void 0:L[0];$&&(O=$);break}case"initialPlacement":O=c;break}if(i!==O)return{reset:{placement:O}}}return{}}}};function Tt(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Nt(t){return Ye.some(e=>t[e]>=0)}const ln=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:o="referenceHidden",...i}=X(t,e);switch(o){case"referenceHidden":{const r=await ot(e,{...i,elementContext:"reference"}),s=Tt(r,n.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:Nt(s)}}}case"escaped":{const r=await ot(e,{...i,altBoundary:!0}),s=Tt(r,n.floating);return{data:{escapedOffsets:s,escaped:Nt(s)}}}default:return{}}}}},Yt=new Set(["left","top"]);async function an(t,e){const{placement:n,platform:o,elements:i}=t,r=await(o.isRTL==null?void 0:o.isRTL(i.floating)),s=Y(n),c=tt(n),f=W(n)==="y",a=Yt.has(s)?-1:1,l=r&&f?-1:1,u=X(e,t);let{mainAxis:h,crossAxis:d,alignmentAxis:m}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return c&&typeof m=="number"&&(d=c==="end"?m*-1:m),f?{x:d*l,y:h*a}:{x:h*a,y:d*l}}const fn=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:r,placement:s,middlewareData:c}=e,f=await an(e,t);return s===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:i+f.x,y:r+f.y,data:{...f,placement:s}}}}},un=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:c={fn:g=>{let{x:y,y:x}=g;return{x:y,y:x}}},...f}=X(t,e),a={x:n,y:o},l=await ot(e,f),u=W(Y(i)),h=kt(u);let d=a[h],m=a[u];if(r){const g=h==="y"?"top":"left",y=h==="y"?"bottom":"right",x=d+l[g],v=d-l[y];d=wt(x,d,v)}if(s){const g=u==="y"?"top":"left",y=u==="y"?"bottom":"right",x=m+l[g],v=m-l[y];m=wt(x,m,v)}const p=c.fn({...e,[h]:d,[u]:m});return{...p,data:{x:p.x-n,y:p.y-o,enabled:{[h]:r,[u]:s}}}}}},dn=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:n,y:o,placement:i,rects:r,middlewareData:s}=e,{offset:c=0,mainAxis:f=!0,crossAxis:a=!0}=X(t,e),l={x:n,y:o},u=W(i),h=kt(u);let d=l[h],m=l[u];const p=X(c,e),g=typeof p=="number"?{mainAxis:p,crossAxis:0}:{mainAxis:0,crossAxis:0,...p};if(f){const v=h==="y"?"height":"width",b=r.reference[h]-r.floating[v]+g.mainAxis,w=r.reference[h]+r.reference[v]-g.mainAxis;d<b?d=b:d>w&&(d=w)}if(a){var y,x;const v=h==="y"?"width":"height",b=Yt.has(Y(i)),w=r.reference[u]-r.floating[v]+(b&&((y=s.offset)==null?void 0:y[u])||0)+(b?0:g.crossAxis),C=r.reference[u]+r.reference[v]+(b?0:((x=s.offset)==null?void 0:x[u])||0)-(b?g.crossAxis:0);m<w?m=w:m>C&&(m=C)}return{[h]:d,[u]:m}}}},hn=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:i,rects:r,platform:s,elements:c}=e,{apply:f=()=>{},...a}=X(t,e),l=await ot(e,a),u=Y(i),h=tt(i),d=W(i)==="y",{width:m,height:p}=r.floating;let g,y;u==="top"||u==="bottom"?(g=u,y=h===(await(s.isRTL==null?void 0:s.isRTL(c.floating))?"start":"end")?"left":"right"):(y=u,g=h==="end"?"top":"bottom");const x=p-l.top-l.bottom,v=m-l.left-l.right,b=J(p-l[g],x),w=J(m-l[y],v),C=!e.middlewareData.shift;let _=b,E=w;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&(E=v),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(_=x),C&&!h){const S=N(l.left,0),j=N(l.right,0),P=N(l.top,0),L=N(l.bottom,0);d?E=m-2*(S!==0||j!==0?S+j:N(l.left,l.right)):_=p-2*(P!==0||L!==0?P+L:N(l.top,l.bottom))}await f({...e,availableWidth:E,availableHeight:_});const F=await s.getDimensions(c.floating);return m!==F.width||p!==F.height?{reset:{rects:!0}}:{}}}};function dt(){return typeof window<"u"}function et(t){return Ut(t)?(t.nodeName||"").toLowerCase():"#document"}function D(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function I(t){var e;return(e=(Ut(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ut(t){return dt()?t instanceof Node||t instanceof D(t).Node:!1}function z(t){return dt()?t instanceof Element||t instanceof D(t).Element:!1}function q(t){return dt()?t instanceof HTMLElement||t instanceof D(t).HTMLElement:!1}function Dt(t){return!dt()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof D(t).ShadowRoot}const mn=new Set(["inline","contents"]);function rt(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=H(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!mn.has(i)}const pn=new Set(["table","td","th"]);function gn(t){return pn.has(et(t))}const yn=[":popover-open",":modal"];function ht(t){return yn.some(e=>{try{return t.matches(e)}catch{return!1}})}const xn=["transform","translate","scale","rotate","perspective"],wn=["transform","translate","scale","rotate","perspective","filter"],vn=["paint","layout","strict","content"];function _t(t){const e=Ct(),n=z(t)?H(t):t;return xn.some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||wn.some(o=>(n.willChange||"").includes(o))||vn.some(o=>(n.contain||"").includes(o))}function bn(t){let e=G(t);for(;q(e)&&!K(e);){if(_t(e))return e;if(ht(e))return null;e=G(e)}return null}function Ct(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const kn=new Set(["html","body","#document"]);function K(t){return kn.has(et(t))}function H(t){return D(t).getComputedStyle(t)}function mt(t){return z(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function G(t){if(et(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Dt(t)&&t.host||I(t);return Dt(e)?e.host:e}function Jt(t){const e=G(t);return K(e)?t.ownerDocument?t.ownerDocument.body:t.body:q(e)&&rt(e)?e:Jt(e)}function it(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const i=Jt(t),r=i===((o=t.ownerDocument)==null?void 0:o.body),s=D(i);if(r){const c=bt(s);return e.concat(s,s.visualViewport||[],rt(i)?i:[],c&&n?it(c):[])}return e.concat(i,it(i,[],n))}function bt(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Gt(t){const e=H(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=q(t),r=i?t.offsetWidth:n,s=i?t.offsetHeight:o,c=lt(n)!==r||lt(o)!==s;return c&&(n=r,o=s),{width:n,height:o,$:c}}function Mt(t){return z(t)?t:t.contextElement}function Q(t){const e=Mt(t);if(!q(e))return B(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:r}=Gt(e);let s=(r?lt(n.width):n.width)/o,c=(r?lt(n.height):n.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const An=B(0);function Zt(t){const e=D(t);return!Ct()||!e.visualViewport?An:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Rn(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==D(t)?!1:e}function Z(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),r=Mt(t);let s=B(1);e&&(o?z(o)&&(s=Q(o)):s=Q(t));const c=Rn(r,n,o)?Zt(r):B(0);let f=(i.left+c.x)/s.x,a=(i.top+c.y)/s.y,l=i.width/s.x,u=i.height/s.y;if(r){const h=D(r),d=o&&z(o)?D(o):o;let m=h,p=bt(m);for(;p&&o&&d!==m;){const g=Q(p),y=p.getBoundingClientRect(),x=H(p),v=y.left+(p.clientLeft+parseFloat(x.paddingLeft))*g.x,b=y.top+(p.clientTop+parseFloat(x.paddingTop))*g.y;f*=g.x,a*=g.y,l*=g.x,u*=g.y,f+=v,a+=b,m=D(p),p=bt(m)}}return ft({width:l,height:u,x:f,y:a})}function pt(t,e){const n=mt(t).scrollLeft;return e?e.left+n:Z(I(t)).left+n}function Qt(t,e){const n=t.getBoundingClientRect(),o=n.left+e.scrollLeft-pt(t,n),i=n.top+e.scrollTop;return{x:o,y:i}}function _n(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const r=i==="fixed",s=I(o),c=e?ht(e.floating):!1;if(o===s||c&&r)return n;let f={scrollLeft:0,scrollTop:0},a=B(1);const l=B(0),u=q(o);if((u||!u&&!r)&&((et(o)!=="body"||rt(s))&&(f=mt(o)),q(o))){const d=Z(o);a=Q(o),l.x=d.x+o.clientLeft,l.y=d.y+o.clientTop}const h=s&&!u&&!r?Qt(s,f):B(0);return{width:n.width*a.x,height:n.height*a.y,x:n.x*a.x-f.scrollLeft*a.x+l.x+h.x,y:n.y*a.y-f.scrollTop*a.y+l.y+h.y}}function Cn(t){return Array.from(t.getClientRects())}function Mn(t){const e=I(t),n=mt(t),o=t.ownerDocument.body,i=N(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=N(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+pt(t);const c=-n.scrollTop;return H(o).direction==="rtl"&&(s+=N(e.clientWidth,o.clientWidth)-i),{width:i,height:r,x:s,y:c}}const Ft=25;function On(t,e){const n=D(t),o=I(t),i=n.visualViewport;let r=o.clientWidth,s=o.clientHeight,c=0,f=0;if(i){r=i.width,s=i.height;const l=Ct();(!l||l&&e==="fixed")&&(c=i.offsetLeft,f=i.offsetTop)}const a=pt(o);if(a<=0){const l=o.ownerDocument,u=l.body,h=getComputedStyle(u),d=l.compatMode==="CSS1Compat"&&parseFloat(h.marginLeft)+parseFloat(h.marginRight)||0,m=Math.abs(o.clientWidth-u.clientWidth-d);m<=Ft&&(r-=m)}else a<=Ft&&(r+=a);return{width:r,height:s,x:c,y:f}}const Sn=new Set(["absolute","fixed"]);function En(t,e){const n=Z(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=q(t)?Q(t):B(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,f=i*r.x,a=o*r.y;return{width:s,height:c,x:f,y:a}}function jt(t,e,n){let o;if(e==="viewport")o=On(t,n);else if(e==="document")o=Mn(I(t));else if(z(e))o=En(e,n);else{const i=Zt(t);o={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return ft(o)}function Kt(t,e){const n=G(t);return n===e||!z(n)||K(n)?!1:H(n).position==="fixed"||Kt(n,e)}function Ln(t,e){const n=e.get(t);if(n)return n;let o=it(t,[],!1).filter(c=>z(c)&&et(c)!=="body"),i=null;const r=H(t).position==="fixed";let s=r?G(t):t;for(;z(s)&&!K(s);){const c=H(s),f=_t(s);!f&&c.position==="fixed"&&(i=null),(r?!f&&!i:!f&&c.position==="static"&&!!i&&Sn.has(i.position)||rt(s)&&!f&&Kt(t,s))?o=o.filter(l=>l!==s):i=c,s=G(s)}return e.set(t,o),o}function $n(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const s=[...n==="clippingAncestors"?ht(e)?[]:Ln(e,this._c):[].concat(n),o],c=s[0],f=s.reduce((a,l)=>{const u=jt(e,l,i);return a.top=N(u.top,a.top),a.right=J(u.right,a.right),a.bottom=J(u.bottom,a.bottom),a.left=N(u.left,a.left),a},jt(e,c,i));return{width:f.right-f.left,height:f.bottom-f.top,x:f.left,y:f.top}}function Pn(t){const{width:e,height:n}=Gt(t);return{width:e,height:n}}function Tn(t,e,n){const o=q(e),i=I(e),r=n==="fixed",s=Z(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const f=B(0);function a(){f.x=pt(i)}if(o||!o&&!r)if((et(e)!=="body"||rt(i))&&(c=mt(e)),o){const d=Z(e,!0,r,e);f.x=d.x+e.clientLeft,f.y=d.y+e.clientTop}else i&&a();r&&!o&&i&&a();const l=i&&!o&&!r?Qt(i,c):B(0),u=s.left+c.scrollLeft-f.x-l.x,h=s.top+c.scrollTop-f.y-l.y;return{x:u,y:h,width:s.width,height:s.height}}function yt(t){return H(t).position==="static"}function zt(t,e){if(!q(t)||H(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return I(t)===n&&(n=n.ownerDocument.body),n}function te(t,e){const n=D(t);if(ht(t))return n;if(!q(t)){let i=G(t);for(;i&&!K(i);){if(z(i)&&!yt(i))return i;i=G(i)}return n}let o=zt(t,e);for(;o&&gn(o)&&yt(o);)o=zt(o,e);return o&&K(o)&&yt(o)&&!_t(o)?n:o||bn(t)||n}const Nn=async function(t){const e=this.getOffsetParent||te,n=this.getDimensions,o=await n(t.floating);return{reference:Tn(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Dn(t){return H(t).direction==="rtl"}const Fn={convertOffsetParentRelativeRectToViewportRelativeRect:_n,getDocumentElement:I,getClippingRect:$n,getOffsetParent:te,getElementRects:Nn,getClientRects:Cn,getDimensions:Pn,getScale:Q,isElement:z,isRTL:Dn};function ee(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function jn(t,e){let n=null,o;const i=I(t);function r(){var c;clearTimeout(o),(c=n)==null||c.disconnect(),n=null}function s(c,f){c===void 0&&(c=!1),f===void 0&&(f=1),r();const a=t.getBoundingClientRect(),{left:l,top:u,width:h,height:d}=a;if(c||e(),!h||!d)return;const m=st(u),p=st(i.clientWidth-(l+h)),g=st(i.clientHeight-(u+d)),y=st(l),v={rootMargin:-m+"px "+-p+"px "+-g+"px "+-y+"px",threshold:N(0,J(1,f))||1};let b=!0;function w(C){const _=C[0].intersectionRatio;if(_!==f){if(!b)return s();_?s(!1,_):o=setTimeout(()=>{s(!1,1e-7)},1e3)}_===1&&!ee(a,t.getBoundingClientRect())&&s(),b=!1}try{n=new IntersectionObserver(w,{...v,root:i.ownerDocument})}catch{n=new IntersectionObserver(w,v)}n.observe(t)}return s(!0),r}function To(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:f=!1}=o,a=Mt(t),l=i||r?[...a?it(a):[],...it(e)]:[];l.forEach(y=>{i&&y.addEventListener("scroll",n,{passive:!0}),r&&y.addEventListener("resize",n)});const u=a&&c?jn(a,n):null;let h=-1,d=null;s&&(d=new ResizeObserver(y=>{let[x]=y;x&&x.target===a&&d&&(d.unobserve(e),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var v;(v=d)==null||v.observe(e)})),n()}),a&&!f&&d.observe(a),d.observe(e));let m,p=f?Z(t):null;f&&g();function g(){const y=Z(t);p&&!ee(p,y)&&n(),p=y,m=requestAnimationFrame(g)}return n(),()=>{var y;l.forEach(x=>{i&&x.removeEventListener("scroll",n),r&&x.removeEventListener("resize",n)}),u?.(),(y=d)==null||y.disconnect(),d=null,f&&cancelAnimationFrame(m)}}const zn=fn,Hn=un,Vn=cn,Wn=hn,Bn=ln,Ht=sn,qn=dn,In=(t,e,n)=>{const o=new Map,i={platform:Fn,...n},r={...i.platform,_c:o};return rn(t,e,{...i,platform:r})};var Xn=typeof document<"u",Yn=function(){},ct=Xn?R.useLayoutEffect:Yn;function ut(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(typeof t=="function"&&t.toString()===e.toString())return!0;let n,o,i;if(t&&e&&typeof t=="object"){if(Array.isArray(t)){if(n=t.length,n!==e.length)return!1;for(o=n;o--!==0;)if(!ut(t[o],e[o]))return!1;return!0}if(i=Object.keys(t),n=i.length,n!==Object.keys(e).length)return!1;for(o=n;o--!==0;)if(!{}.hasOwnProperty.call(e,i[o]))return!1;for(o=n;o--!==0;){const r=i[o];if(!(r==="_owner"&&t.$$typeof)&&!ut(t[r],e[r]))return!1}return!0}return t!==t&&e!==e}function ne(t){return typeof window>"u"?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function Vt(t,e){const n=ne(t);return Math.round(e*n)/n}function xt(t){const e=R.useRef(t);return ct(()=>{e.current=t}),e}function No(t){t===void 0&&(t={});const{placement:e="bottom",strategy:n="absolute",middleware:o=[],platform:i,elements:{reference:r,floating:s}={},transform:c=!0,whileElementsMounted:f,open:a}=t,[l,u]=R.useState({x:0,y:0,strategy:n,placement:e,middlewareData:{},isPositioned:!1}),[h,d]=R.useState(o);ut(h,o)||d(o);const[m,p]=R.useState(null),[g,y]=R.useState(null),x=R.useCallback(A=>{A!==C.current&&(C.current=A,p(A))},[]),v=R.useCallback(A=>{A!==_.current&&(_.current=A,y(A))},[]),b=r||m,w=s||g,C=R.useRef(null),_=R.useRef(null),E=R.useRef(l),F=f!=null,S=xt(f),j=xt(i),P=xt(a),L=R.useCallback(()=>{if(!C.current||!_.current)return;const A={placement:e,strategy:n,middleware:h};j.current&&(A.platform=j.current),In(C.current,_.current,A).then(T=>{const U={...T,isPositioned:P.current!==!1};M.current&&!ut(E.current,U)&&(E.current=U,Bt.flushSync(()=>{u(U)}))})},[h,e,n,j,P]);ct(()=>{a===!1&&E.current.isPositioned&&(E.current.isPositioned=!1,u(A=>({...A,isPositioned:!1})))},[a]);const M=R.useRef(!1);ct(()=>(M.current=!0,()=>{M.current=!1}),[]),ct(()=>{if(b&&(C.current=b),w&&(_.current=w),b&&w){if(S.current)return S.current(b,w,L);L()}},[b,w,L,S,F]);const V=R.useMemo(()=>({reference:C,floating:_,setReference:x,setFloating:v}),[x,v]),O=R.useMemo(()=>({reference:b,floating:w}),[b,w]),$=R.useMemo(()=>{const A={position:n,left:0,top:0};if(!O.floating)return A;const T=Vt(O.floating,l.x),U=Vt(O.floating,l.y);return c?{...A,transform:"translate("+T+"px, "+U+"px)",...ne(O.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:T,top:U}},[n,c,O.floating,l.x,l.y]);return R.useMemo(()=>({...l,update:L,refs:V,elements:O,floatingStyles:$}),[l,L,V,O,$])}const Un=t=>{function e(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:t,fn(n){const{element:o,padding:i}=typeof t=="function"?t(n):t;return o&&e(o)?o.current!=null?Ht({element:o.current,padding:i}).fn(n):{}:o?Ht({element:o,padding:i}).fn(n):{}}}},Do=(t,e)=>({...zn(t),options:[t,e]}),Fo=(t,e)=>({...Hn(t),options:[t,e]}),jo=(t,e)=>({...qn(t),options:[t,e]}),zo=(t,e)=>({...Vn(t),options:[t,e]}),Ho=(t,e)=>({...Wn(t),options:[t,e]}),Vo=(t,e)=>({...Bn(t),options:[t,e]}),Wo=(t,e)=>({...Un(t),options:[t,e]});export{eo as A,no as B,oo as C,Ro as D,lo as E,fo as F,mo as G,po as H,Ao as I,uo as J,ho as K,yo as L,wo as M,go as N,$o as O,ko as P,vo as Q,le as R,Oo as S,Lo as T,So as U,to as V,Po as X,Bt as a,Mo as b,Kn as c,Eo as d,_o as e,Zn as f,Qn as g,xo as h,ao as i,Gn as j,zo as k,Ho as l,Wo as m,Vo as n,Do as o,jo as p,To as q,R as r,Fo as s,Co as t,No as u,co as v,bo as w,ro as x,io as y,so as z};

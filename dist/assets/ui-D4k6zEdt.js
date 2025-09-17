import{r as oe,g as Wt,a as ie}from"./react-gH-7aFTg.js";function re(t,e){for(var n=0;n<e.length;n++){const o=e[n];if(typeof o!="string"&&!Array.isArray(o)){for(const i in o)if(i!=="default"&&!(i in t)){const r=Object.getOwnPropertyDescriptor(o,i);r&&Object.defineProperty(t,i,r.get?r:{enumerable:!0,get:()=>o[i]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var yt={exports:{}},nt={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ot;function se(){if(Ot)return nt;Ot=1;var t=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function n(o,i,r){var s=null;if(r!==void 0&&(s=""+r),i.key!==void 0&&(s=""+i.key),"key"in i){r={};for(var c in i)c!=="key"&&(r[c]=i[c])}else r=i;return i=r.ref,{$$typeof:t,type:o,key:s,ref:i!==void 0?i:null,props:r}}return nt.Fragment=e,nt.jsx=n,nt.jsxs=n,nt}var St;function ce(){return St||(St=1,yt.exports=se()),yt.exports}var ro=ce(),A=oe();const ae=Wt(A),so=re({__proto__:null,default:ae},[A]);var qt=ie();const co=Wt(qt);function Bt(t){var e,n,o="";if(typeof t=="string"||typeof t=="number")o+=t;else if(typeof t=="object")if(Array.isArray(t)){var i=t.length;for(e=0;e<i;e++)t[e]&&(n=Bt(t[e]))&&(o&&(o+=" "),o+=n)}else for(n in t)t[n]&&(o&&(o+=" "),o+=n);return o}function ao(){for(var t,e,n=0,o="",i=arguments.length;n<i;n++)(t=arguments[n])&&(e=Bt(t))&&(o&&(o+=" "),o+=e);return o}/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),fe=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,o)=>o?o.toUpperCase():n.toLowerCase()),$t=t=>{const e=fe(t);return e.charAt(0).toUpperCase()+e.slice(1)},It=(...t)=>t.filter((e,n,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===n).join(" ").trim(),ue=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var de={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=A.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:i="",children:r,iconNode:s,...c},f)=>A.createElement("svg",{ref:f,...de,width:e,height:e,stroke:t,strokeWidth:o?Number(n)*24/Number(e):n,className:It("lucide",i),...!r&&!ue(c)&&{"aria-hidden":"true"},...c},[...s.map(([l,a])=>A.createElement(l,a)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(t,e)=>{const n=A.forwardRef(({className:o,...i},r)=>A.createElement(he,{ref:r,iconNode:e,className:It(`lucide-${le($t(t))}`,`lucide-${t}`,o),...i}));return n.displayName=$t(t),n};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],lo=y("arrow-left",me);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],fo=y("arrow-right",pe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],uo=y("award",ye);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],ho=y("briefcase",ge);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],mo=y("calendar",xe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],po=y("check",we);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],yo=y("chevron-down",ve);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],go=y("chevron-left",ke);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],xo=y("chevron-right",be);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],wo=y("chevron-up",_e);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]],vo=y("ellipsis-vertical",Ae);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],ko=y("ellipsis",Re);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"m15 15 6 6",key:"1s409w"}],["path",{d:"m15 9 6-6",key:"ko1vev"}],["path",{d:"M21 16v5h-5",key:"1ck2sf"}],["path",{d:"M21 8V3h-5",key:"1qoq8a"}],["path",{d:"M3 16v5h5",key:"1t08am"}],["path",{d:"m3 21 6-6",key:"wwnumi"}],["path",{d:"M3 8V3h5",key:"1ln10m"}],["path",{d:"M9 9 3 3",key:"v551iv"}]],bo=y("expand",Me);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],_o=y("external-link",Ce);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],Ao=y("github",Oe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Ro=y("globe",Se);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]],Mo=y("graduation-cap",$e);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],Co=y("heart",Le);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],Oo=y("image",Ee);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]],So=y("instagram",Ne);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]],$o=y("linkedin",Pe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Lo=y("map-pin",Te);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],Eo=y("message-circle",De);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],No=y("mic",je);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=[["path",{d:"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",key:"1miecu"}]],Po=y("paperclip",Fe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],To=y("pause",ze);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],Do=y("pen-line",Ve);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]],jo=y("pencil",He);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Fo=y("play",We);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],zo=y("plus",qe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}],["path",{d:"m9 17-5-5 5-5",key:"nvlc11"}]],Vo=y("reply",Be);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Ho=y("search",Ie);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],Wo=y("send",Xe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],qo=y("share-2",Ye);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],Bo=y("smile",Ue);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]],Io=y("thumbs-up",Je);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Xo=y("trash-2",Ge);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]],Yo=y("twitter",Ze);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]],Uo=y("video",Qe);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],Jo=y("volume-2",Ke);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tn=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],Go=y("volume-x",tn);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const en=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Zo=y("x",en),nn=["top","right","bottom","left"],J=Math.min,T=Math.max,at=Math.round,st=Math.floor,q=t=>({x:t,y:t}),on={left:"right",right:"left",bottom:"top",top:"bottom"},rn={start:"end",end:"start"};function wt(t,e,n){return T(t,J(e,n))}function X(t,e){return typeof t=="function"?t(e):t}function Y(t){return t.split("-")[0]}function tt(t){return t.split("-")[1]}function bt(t){return t==="x"?"y":"x"}function _t(t){return t==="y"?"height":"width"}const sn=new Set(["top","bottom"]);function W(t){return sn.has(Y(t))?"y":"x"}function At(t){return bt(W(t))}function cn(t,e,n){n===void 0&&(n=!1);const o=tt(t),i=At(t),r=_t(i);let s=i==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(s=lt(s)),[s,lt(s)]}function an(t){const e=lt(t);return[vt(t),e,vt(e)]}function vt(t){return t.replace(/start|end/g,e=>rn[e])}const Lt=["left","right"],Et=["right","left"],ln=["top","bottom"],fn=["bottom","top"];function un(t,e,n){switch(t){case"top":case"bottom":return n?e?Et:Lt:e?Lt:Et;case"left":case"right":return e?ln:fn;default:return[]}}function dn(t,e,n,o){const i=tt(t);let r=un(Y(t),n==="start",o);return i&&(r=r.map(s=>s+"-"+i),e&&(r=r.concat(r.map(vt)))),r}function lt(t){return t.replace(/left|right|bottom|top/g,e=>on[e])}function hn(t){return{top:0,right:0,bottom:0,left:0,...t}}function Xt(t){return typeof t!="number"?hn(t):{top:t,right:t,bottom:t,left:t}}function ft(t){const{x:e,y:n,width:o,height:i}=t;return{width:o,height:i,top:n,left:e,right:e+o,bottom:n+i,x:e,y:n}}function Nt(t,e,n){let{reference:o,floating:i}=t;const r=W(e),s=At(e),c=_t(s),f=Y(e),l=r==="y",a=o.x+o.width/2-i.width/2,u=o.y+o.height/2-i.height/2,h=o[c]/2-i[c]/2;let d;switch(f){case"top":d={x:a,y:o.y-i.height};break;case"bottom":d={x:a,y:o.y+o.height};break;case"right":d={x:o.x+o.width,y:u};break;case"left":d={x:o.x-i.width,y:u};break;default:d={x:o.x,y:o.y}}switch(tt(e)){case"start":d[s]-=h*(n&&l?-1:1);break;case"end":d[s]+=h*(n&&l?-1:1);break}return d}const mn=async(t,e,n)=>{const{placement:o="bottom",strategy:i="absolute",middleware:r=[],platform:s}=n,c=r.filter(Boolean),f=await(s.isRTL==null?void 0:s.isRTL(e));let l=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:a,y:u}=Nt(l,o,f),h=o,d={},m=0;for(let p=0;p<c.length;p++){const{name:g,fn:x}=c[p],{x:w,y:k,data:b,reset:v}=await x({x:a,y:u,initialPlacement:o,placement:h,strategy:i,middlewareData:d,rects:l,platform:s,elements:{reference:t,floating:e}});a=w??a,u=k??u,d={...d,[g]:{...d[g],...b}},v&&m<=50&&(m++,typeof v=="object"&&(v.placement&&(h=v.placement),v.rects&&(l=v.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):v.rects),{x:a,y:u}=Nt(l,h,f)),p=-1)}return{x:a,y:u,placement:h,strategy:i,middlewareData:d}};async function ot(t,e){var n;e===void 0&&(e={});const{x:o,y:i,platform:r,rects:s,elements:c,strategy:f}=t,{boundary:l="clippingAncestors",rootBoundary:a="viewport",elementContext:u="floating",altBoundary:h=!1,padding:d=0}=X(e,t),m=Xt(d),g=c[h?u==="floating"?"reference":"floating":u],x=ft(await r.getClippingRect({element:(n=await(r.isElement==null?void 0:r.isElement(g)))==null||n?g:g.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(c.floating)),boundary:l,rootBoundary:a,strategy:f})),w=u==="floating"?{x:o,y:i,width:s.floating.width,height:s.floating.height}:s.reference,k=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c.floating)),b=await(r.isElement==null?void 0:r.isElement(k))?await(r.getScale==null?void 0:r.getScale(k))||{x:1,y:1}:{x:1,y:1},v=ft(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:c,rect:w,offsetParent:k,strategy:f}):w);return{top:(x.top-v.top+m.top)/b.y,bottom:(v.bottom-x.bottom+m.bottom)/b.y,left:(x.left-v.left+m.left)/b.x,right:(v.right-x.right+m.right)/b.x}}const pn=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:o,placement:i,rects:r,platform:s,elements:c,middlewareData:f}=e,{element:l,padding:a=0}=X(t,e)||{};if(l==null)return{};const u=Xt(a),h={x:n,y:o},d=At(i),m=_t(d),p=await s.getDimensions(l),g=d==="y",x=g?"top":"left",w=g?"bottom":"right",k=g?"clientHeight":"clientWidth",b=r.reference[m]+r.reference[d]-h[d]-r.floating[m],v=h[d]-r.reference[d],M=await(s.getOffsetParent==null?void 0:s.getOffsetParent(l));let R=M?M[k]:0;(!R||!await(s.isElement==null?void 0:s.isElement(M)))&&(R=c.floating[k]||r.floating[m]);const $=b/2-v/2,j=R/2-p[m]/2-1,S=J(u[x],j),F=J(u[w],j),N=S,L=R-p[m]-F,C=R/2-p[m]/2+$,H=wt(N,C,L),O=!f.arrow&&tt(i)!=null&&C!==H&&r.reference[m]/2-(C<N?S:F)-p[m]/2<0,E=O?C<N?C-N:C-L:0;return{[d]:h[d]+E,data:{[d]:H,centerOffset:C-H-E,...O&&{alignmentOffset:E}},reset:O}}}),yn=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n,o;const{placement:i,middlewareData:r,rects:s,initialPlacement:c,platform:f,elements:l}=e,{mainAxis:a=!0,crossAxis:u=!0,fallbackPlacements:h,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:p=!0,...g}=X(t,e);if((n=r.arrow)!=null&&n.alignmentOffset)return{};const x=Y(i),w=W(c),k=Y(c)===c,b=await(f.isRTL==null?void 0:f.isRTL(l.floating)),v=h||(k||!p?[lt(c)]:an(c)),M=m!=="none";!h&&M&&v.push(...dn(c,p,m,b));const R=[c,...v],$=await ot(e,g),j=[];let S=((o=r.flip)==null?void 0:o.overflows)||[];if(a&&j.push($[x]),u){const C=cn(i,s,b);j.push($[C[0]],$[C[1]])}if(S=[...S,{placement:i,overflows:j}],!j.every(C=>C<=0)){var F,N;const C=(((F=r.flip)==null?void 0:F.index)||0)+1,H=R[C];if(H&&(!(u==="alignment"?w!==W(H):!1)||S.every(_=>W(_.placement)===w?_.overflows[0]>0:!0)))return{data:{index:C,overflows:S},reset:{placement:H}};let O=(N=S.filter(E=>E.overflows[0]<=0).sort((E,_)=>E.overflows[1]-_.overflows[1])[0])==null?void 0:N.placement;if(!O)switch(d){case"bestFit":{var L;const E=(L=S.filter(_=>{if(M){const P=W(_.placement);return P===w||P==="y"}return!0}).map(_=>[_.placement,_.overflows.filter(P=>P>0).reduce((P,U)=>P+U,0)]).sort((_,P)=>_[1]-P[1])[0])==null?void 0:L[0];E&&(O=E);break}case"initialPlacement":O=c;break}if(i!==O)return{reset:{placement:O}}}return{}}}};function Pt(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function Tt(t){return nn.some(e=>t[e]>=0)}const gn=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:o="referenceHidden",...i}=X(t,e);switch(o){case"referenceHidden":{const r=await ot(e,{...i,elementContext:"reference"}),s=Pt(r,n.reference);return{data:{referenceHiddenOffsets:s,referenceHidden:Tt(s)}}}case"escaped":{const r=await ot(e,{...i,altBoundary:!0}),s=Pt(r,n.floating);return{data:{escapedOffsets:s,escaped:Tt(s)}}}default:return{}}}}},Yt=new Set(["left","top"]);async function xn(t,e){const{placement:n,platform:o,elements:i}=t,r=await(o.isRTL==null?void 0:o.isRTL(i.floating)),s=Y(n),c=tt(n),f=W(n)==="y",l=Yt.has(s)?-1:1,a=r&&f?-1:1,u=X(e,t);let{mainAxis:h,crossAxis:d,alignmentAxis:m}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return c&&typeof m=="number"&&(d=c==="end"?m*-1:m),f?{x:d*a,y:h*l}:{x:h*l,y:d*a}}const wn=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var n,o;const{x:i,y:r,placement:s,middlewareData:c}=e,f=await xn(e,t);return s===((n=c.offset)==null?void 0:n.placement)&&(o=c.arrow)!=null&&o.alignmentOffset?{}:{x:i+f.x,y:r+f.y,data:{...f,placement:s}}}}},vn=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:o,placement:i}=e,{mainAxis:r=!0,crossAxis:s=!1,limiter:c={fn:g=>{let{x,y:w}=g;return{x,y:w}}},...f}=X(t,e),l={x:n,y:o},a=await ot(e,f),u=W(Y(i)),h=bt(u);let d=l[h],m=l[u];if(r){const g=h==="y"?"top":"left",x=h==="y"?"bottom":"right",w=d+a[g],k=d-a[x];d=wt(w,d,k)}if(s){const g=u==="y"?"top":"left",x=u==="y"?"bottom":"right",w=m+a[g],k=m-a[x];m=wt(w,m,k)}const p=c.fn({...e,[h]:d,[u]:m});return{...p,data:{x:p.x-n,y:p.y-o,enabled:{[h]:r,[u]:s}}}}}},kn=function(t){return t===void 0&&(t={}),{options:t,fn(e){const{x:n,y:o,placement:i,rects:r,middlewareData:s}=e,{offset:c=0,mainAxis:f=!0,crossAxis:l=!0}=X(t,e),a={x:n,y:o},u=W(i),h=bt(u);let d=a[h],m=a[u];const p=X(c,e),g=typeof p=="number"?{mainAxis:p,crossAxis:0}:{mainAxis:0,crossAxis:0,...p};if(f){const k=h==="y"?"height":"width",b=r.reference[h]-r.floating[k]+g.mainAxis,v=r.reference[h]+r.reference[k]-g.mainAxis;d<b?d=b:d>v&&(d=v)}if(l){var x,w;const k=h==="y"?"width":"height",b=Yt.has(Y(i)),v=r.reference[u]-r.floating[k]+(b&&((x=s.offset)==null?void 0:x[u])||0)+(b?0:g.crossAxis),M=r.reference[u]+r.reference[k]+(b?0:((w=s.offset)==null?void 0:w[u])||0)-(b?g.crossAxis:0);m<v?m=v:m>M&&(m=M)}return{[h]:d,[u]:m}}}},bn=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var n,o;const{placement:i,rects:r,platform:s,elements:c}=e,{apply:f=()=>{},...l}=X(t,e),a=await ot(e,l),u=Y(i),h=tt(i),d=W(i)==="y",{width:m,height:p}=r.floating;let g,x;u==="top"||u==="bottom"?(g=u,x=h===(await(s.isRTL==null?void 0:s.isRTL(c.floating))?"start":"end")?"left":"right"):(x=u,g=h==="end"?"top":"bottom");const w=p-a.top-a.bottom,k=m-a.left-a.right,b=J(p-a[g],w),v=J(m-a[x],k),M=!e.middlewareData.shift;let R=b,$=v;if((n=e.middlewareData.shift)!=null&&n.enabled.x&&($=k),(o=e.middlewareData.shift)!=null&&o.enabled.y&&(R=w),M&&!h){const S=T(a.left,0),F=T(a.right,0),N=T(a.top,0),L=T(a.bottom,0);d?$=m-2*(S!==0||F!==0?S+F:T(a.left,a.right)):R=p-2*(N!==0||L!==0?N+L:T(a.top,a.bottom))}await f({...e,availableWidth:$,availableHeight:R});const j=await s.getDimensions(c.floating);return m!==j.width||p!==j.height?{reset:{rects:!0}}:{}}}};function dt(){return typeof window<"u"}function et(t){return Ut(t)?(t.nodeName||"").toLowerCase():"#document"}function D(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function I(t){var e;return(e=(Ut(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ut(t){return dt()?t instanceof Node||t instanceof D(t).Node:!1}function z(t){return dt()?t instanceof Element||t instanceof D(t).Element:!1}function B(t){return dt()?t instanceof HTMLElement||t instanceof D(t).HTMLElement:!1}function Dt(t){return!dt()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof D(t).ShadowRoot}const _n=new Set(["inline","contents"]);function rt(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=V(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!_n.has(i)}const An=new Set(["table","td","th"]);function Rn(t){return An.has(et(t))}const Mn=[":popover-open",":modal"];function ht(t){return Mn.some(e=>{try{return t.matches(e)}catch{return!1}})}const Cn=["transform","translate","scale","rotate","perspective"],On=["transform","translate","scale","rotate","perspective","filter"],Sn=["paint","layout","strict","content"];function Rt(t){const e=Mt(),n=z(t)?V(t):t;return Cn.some(o=>n[o]?n[o]!=="none":!1)||(n.containerType?n.containerType!=="normal":!1)||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||On.some(o=>(n.willChange||"").includes(o))||Sn.some(o=>(n.contain||"").includes(o))}function $n(t){let e=G(t);for(;B(e)&&!K(e);){if(Rt(e))return e;if(ht(e))return null;e=G(e)}return null}function Mt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const Ln=new Set(["html","body","#document"]);function K(t){return Ln.has(et(t))}function V(t){return D(t).getComputedStyle(t)}function mt(t){return z(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function G(t){if(et(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Dt(t)&&t.host||I(t);return Dt(e)?e.host:e}function Jt(t){const e=G(t);return K(e)?t.ownerDocument?t.ownerDocument.body:t.body:B(e)&&rt(e)?e:Jt(e)}function it(t,e,n){var o;e===void 0&&(e=[]),n===void 0&&(n=!0);const i=Jt(t),r=i===((o=t.ownerDocument)==null?void 0:o.body),s=D(i);if(r){const c=kt(s);return e.concat(s,s.visualViewport||[],rt(i)?i:[],c&&n?it(c):[])}return e.concat(i,it(i,[],n))}function kt(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function Gt(t){const e=V(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const i=B(t),r=i?t.offsetWidth:n,s=i?t.offsetHeight:o,c=at(n)!==r||at(o)!==s;return c&&(n=r,o=s),{width:n,height:o,$:c}}function Ct(t){return z(t)?t:t.contextElement}function Q(t){const e=Ct(t);if(!B(e))return q(1);const n=e.getBoundingClientRect(),{width:o,height:i,$:r}=Gt(e);let s=(r?at(n.width):n.width)/o,c=(r?at(n.height):n.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!c||!Number.isFinite(c))&&(c=1),{x:s,y:c}}const En=q(0);function Zt(t){const e=D(t);return!Mt()||!e.visualViewport?En:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Nn(t,e,n){return e===void 0&&(e=!1),!n||e&&n!==D(t)?!1:e}function Z(t,e,n,o){e===void 0&&(e=!1),n===void 0&&(n=!1);const i=t.getBoundingClientRect(),r=Ct(t);let s=q(1);e&&(o?z(o)&&(s=Q(o)):s=Q(t));const c=Nn(r,n,o)?Zt(r):q(0);let f=(i.left+c.x)/s.x,l=(i.top+c.y)/s.y,a=i.width/s.x,u=i.height/s.y;if(r){const h=D(r),d=o&&z(o)?D(o):o;let m=h,p=kt(m);for(;p&&o&&d!==m;){const g=Q(p),x=p.getBoundingClientRect(),w=V(p),k=x.left+(p.clientLeft+parseFloat(w.paddingLeft))*g.x,b=x.top+(p.clientTop+parseFloat(w.paddingTop))*g.y;f*=g.x,l*=g.y,a*=g.x,u*=g.y,f+=k,l+=b,m=D(p),p=kt(m)}}return ft({width:a,height:u,x:f,y:l})}function pt(t,e){const n=mt(t).scrollLeft;return e?e.left+n:Z(I(t)).left+n}function Qt(t,e){const n=t.getBoundingClientRect(),o=n.left+e.scrollLeft-pt(t,n),i=n.top+e.scrollTop;return{x:o,y:i}}function Pn(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const r=i==="fixed",s=I(o),c=e?ht(e.floating):!1;if(o===s||c&&r)return n;let f={scrollLeft:0,scrollTop:0},l=q(1);const a=q(0),u=B(o);if((u||!u&&!r)&&((et(o)!=="body"||rt(s))&&(f=mt(o)),B(o))){const d=Z(o);l=Q(o),a.x=d.x+o.clientLeft,a.y=d.y+o.clientTop}const h=s&&!u&&!r?Qt(s,f):q(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-f.scrollLeft*l.x+a.x+h.x,y:n.y*l.y-f.scrollTop*l.y+a.y+h.y}}function Tn(t){return Array.from(t.getClientRects())}function Dn(t){const e=I(t),n=mt(t),o=t.ownerDocument.body,i=T(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),r=T(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+pt(t);const c=-n.scrollTop;return V(o).direction==="rtl"&&(s+=T(e.clientWidth,o.clientWidth)-i),{width:i,height:r,x:s,y:c}}const jt=25;function jn(t,e){const n=D(t),o=I(t),i=n.visualViewport;let r=o.clientWidth,s=o.clientHeight,c=0,f=0;if(i){r=i.width,s=i.height;const a=Mt();(!a||a&&e==="fixed")&&(c=i.offsetLeft,f=i.offsetTop)}const l=pt(o);if(l<=0){const a=o.ownerDocument,u=a.body,h=getComputedStyle(u),d=a.compatMode==="CSS1Compat"&&parseFloat(h.marginLeft)+parseFloat(h.marginRight)||0,m=Math.abs(o.clientWidth-u.clientWidth-d);m<=jt&&(r-=m)}else l<=jt&&(r+=l);return{width:r,height:s,x:c,y:f}}const Fn=new Set(["absolute","fixed"]);function zn(t,e){const n=Z(t,!0,e==="fixed"),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=B(t)?Q(t):q(1),s=t.clientWidth*r.x,c=t.clientHeight*r.y,f=i*r.x,l=o*r.y;return{width:s,height:c,x:f,y:l}}function Ft(t,e,n){let o;if(e==="viewport")o=jn(t,n);else if(e==="document")o=Dn(I(t));else if(z(e))o=zn(e,n);else{const i=Zt(t);o={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return ft(o)}function Kt(t,e){const n=G(t);return n===e||!z(n)||K(n)?!1:V(n).position==="fixed"||Kt(n,e)}function Vn(t,e){const n=e.get(t);if(n)return n;let o=it(t,[],!1).filter(c=>z(c)&&et(c)!=="body"),i=null;const r=V(t).position==="fixed";let s=r?G(t):t;for(;z(s)&&!K(s);){const c=V(s),f=Rt(s);!f&&c.position==="fixed"&&(i=null),(r?!f&&!i:!f&&c.position==="static"&&!!i&&Fn.has(i.position)||rt(s)&&!f&&Kt(t,s))?o=o.filter(a=>a!==s):i=c,s=G(s)}return e.set(t,o),o}function Hn(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const s=[...n==="clippingAncestors"?ht(e)?[]:Vn(e,this._c):[].concat(n),o],c=s[0],f=s.reduce((l,a)=>{const u=Ft(e,a,i);return l.top=T(u.top,l.top),l.right=J(u.right,l.right),l.bottom=J(u.bottom,l.bottom),l.left=T(u.left,l.left),l},Ft(e,c,i));return{width:f.right-f.left,height:f.bottom-f.top,x:f.left,y:f.top}}function Wn(t){const{width:e,height:n}=Gt(t);return{width:e,height:n}}function qn(t,e,n){const o=B(e),i=I(e),r=n==="fixed",s=Z(t,!0,r,e);let c={scrollLeft:0,scrollTop:0};const f=q(0);function l(){f.x=pt(i)}if(o||!o&&!r)if((et(e)!=="body"||rt(i))&&(c=mt(e)),o){const d=Z(e,!0,r,e);f.x=d.x+e.clientLeft,f.y=d.y+e.clientTop}else i&&l();r&&!o&&i&&l();const a=i&&!o&&!r?Qt(i,c):q(0),u=s.left+c.scrollLeft-f.x-a.x,h=s.top+c.scrollTop-f.y-a.y;return{x:u,y:h,width:s.width,height:s.height}}function gt(t){return V(t).position==="static"}function zt(t,e){if(!B(t)||V(t).position==="fixed")return null;if(e)return e(t);let n=t.offsetParent;return I(t)===n&&(n=n.ownerDocument.body),n}function te(t,e){const n=D(t);if(ht(t))return n;if(!B(t)){let i=G(t);for(;i&&!K(i);){if(z(i)&&!gt(i))return i;i=G(i)}return n}let o=zt(t,e);for(;o&&Rn(o)&&gt(o);)o=zt(o,e);return o&&K(o)&&gt(o)&&!Rt(o)?n:o||$n(t)||n}const Bn=async function(t){const e=this.getOffsetParent||te,n=this.getDimensions,o=await n(t.floating);return{reference:qn(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function In(t){return V(t).direction==="rtl"}const Xn={convertOffsetParentRelativeRectToViewportRelativeRect:Pn,getDocumentElement:I,getClippingRect:Hn,getOffsetParent:te,getElementRects:Bn,getClientRects:Tn,getDimensions:Wn,getScale:Q,isElement:z,isRTL:In};function ee(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Yn(t,e){let n=null,o;const i=I(t);function r(){var c;clearTimeout(o),(c=n)==null||c.disconnect(),n=null}function s(c,f){c===void 0&&(c=!1),f===void 0&&(f=1),r();const l=t.getBoundingClientRect(),{left:a,top:u,width:h,height:d}=l;if(c||e(),!h||!d)return;const m=st(u),p=st(i.clientWidth-(a+h)),g=st(i.clientHeight-(u+d)),x=st(a),k={rootMargin:-m+"px "+-p+"px "+-g+"px "+-x+"px",threshold:T(0,J(1,f))||1};let b=!0;function v(M){const R=M[0].intersectionRatio;if(R!==f){if(!b)return s();R?s(!1,R):o=setTimeout(()=>{s(!1,1e-7)},1e3)}R===1&&!ee(l,t.getBoundingClientRect())&&s(),b=!1}try{n=new IntersectionObserver(v,{...k,root:i.ownerDocument})}catch{n=new IntersectionObserver(v,k)}n.observe(t)}return s(!0),r}function Qo(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:c=typeof IntersectionObserver=="function",animationFrame:f=!1}=o,l=Ct(t),a=i||r?[...l?it(l):[],...it(e)]:[];a.forEach(x=>{i&&x.addEventListener("scroll",n,{passive:!0}),r&&x.addEventListener("resize",n)});const u=l&&c?Yn(l,n):null;let h=-1,d=null;s&&(d=new ResizeObserver(x=>{let[w]=x;w&&w.target===l&&d&&(d.unobserve(e),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var k;(k=d)==null||k.observe(e)})),n()}),l&&!f&&d.observe(l),d.observe(e));let m,p=f?Z(t):null;f&&g();function g(){const x=Z(t);p&&!ee(p,x)&&n(),p=x,m=requestAnimationFrame(g)}return n(),()=>{var x;a.forEach(w=>{i&&w.removeEventListener("scroll",n),r&&w.removeEventListener("resize",n)}),u?.(),(x=d)==null||x.disconnect(),d=null,f&&cancelAnimationFrame(m)}}const Un=wn,Jn=vn,Gn=yn,Zn=bn,Qn=gn,Vt=pn,Kn=kn,to=(t,e,n)=>{const o=new Map,i={platform:Xn,...n},r={...i.platform,_c:o};return mn(t,e,{...i,platform:r})};var eo=typeof document<"u",no=function(){},ct=eo?A.useLayoutEffect:no;function ut(t,e){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(typeof t=="function"&&t.toString()===e.toString())return!0;let n,o,i;if(t&&e&&typeof t=="object"){if(Array.isArray(t)){if(n=t.length,n!==e.length)return!1;for(o=n;o--!==0;)if(!ut(t[o],e[o]))return!1;return!0}if(i=Object.keys(t),n=i.length,n!==Object.keys(e).length)return!1;for(o=n;o--!==0;)if(!{}.hasOwnProperty.call(e,i[o]))return!1;for(o=n;o--!==0;){const r=i[o];if(!(r==="_owner"&&t.$$typeof)&&!ut(t[r],e[r]))return!1}return!0}return t!==t&&e!==e}function ne(t){return typeof window>"u"?1:(t.ownerDocument.defaultView||window).devicePixelRatio||1}function Ht(t,e){const n=ne(t);return Math.round(e*n)/n}function xt(t){const e=A.useRef(t);return ct(()=>{e.current=t}),e}function Ko(t){t===void 0&&(t={});const{placement:e="bottom",strategy:n="absolute",middleware:o=[],platform:i,elements:{reference:r,floating:s}={},transform:c=!0,whileElementsMounted:f,open:l}=t,[a,u]=A.useState({x:0,y:0,strategy:n,placement:e,middlewareData:{},isPositioned:!1}),[h,d]=A.useState(o);ut(h,o)||d(o);const[m,p]=A.useState(null),[g,x]=A.useState(null),w=A.useCallback(_=>{_!==M.current&&(M.current=_,p(_))},[]),k=A.useCallback(_=>{_!==R.current&&(R.current=_,x(_))},[]),b=r||m,v=s||g,M=A.useRef(null),R=A.useRef(null),$=A.useRef(a),j=f!=null,S=xt(f),F=xt(i),N=xt(l),L=A.useCallback(()=>{if(!M.current||!R.current)return;const _={placement:e,strategy:n,middleware:h};F.current&&(_.platform=F.current),to(M.current,R.current,_).then(P=>{const U={...P,isPositioned:N.current!==!1};C.current&&!ut($.current,U)&&($.current=U,qt.flushSync(()=>{u(U)}))})},[h,e,n,F,N]);ct(()=>{l===!1&&$.current.isPositioned&&($.current.isPositioned=!1,u(_=>({..._,isPositioned:!1})))},[l]);const C=A.useRef(!1);ct(()=>(C.current=!0,()=>{C.current=!1}),[]),ct(()=>{if(b&&(M.current=b),v&&(R.current=v),b&&v){if(S.current)return S.current(b,v,L);L()}},[b,v,L,S,j]);const H=A.useMemo(()=>({reference:M,floating:R,setReference:w,setFloating:k}),[w,k]),O=A.useMemo(()=>({reference:b,floating:v}),[b,v]),E=A.useMemo(()=>{const _={position:n,left:0,top:0};if(!O.floating)return _;const P=Ht(O.floating,a.x),U=Ht(O.floating,a.y);return c?{..._,transform:"translate("+P+"px, "+U+"px)",...ne(O.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:P,top:U}},[n,c,O.floating,a.x,a.y]);return A.useMemo(()=>({...a,update:L,refs:H,elements:O,floatingStyles:E}),[a,L,H,O,E])}const oo=t=>{function e(n){return{}.hasOwnProperty.call(n,"current")}return{name:"arrow",options:t,fn(n){const{element:o,padding:i}=typeof t=="function"?t(n):t;return o&&e(o)?o.current!=null?Vt({element:o.current,padding:i}).fn(n):{}:o?Vt({element:o,padding:i}).fn(n):{}}}},ti=(t,e)=>({...Un(t),options:[t,e]}),ei=(t,e)=>({...Jn(t),options:[t,e]}),ni=(t,e)=>({...Kn(t),options:[t,e]}),oi=(t,e)=>({...Gn(t),options:[t,e]}),ii=(t,e)=>({...Zn(t),options:[t,e]}),ri=(t,e)=>({...Qn(t),options:[t,e]}),si=(t,e)=>({...oo(t),options:[t,e]});export{Yo as $,uo as A,ho as B,mo as C,Qo as D,_o as E,Ho as F,Mo as G,Co as H,vo as I,Oo as J,Uo as K,yo as L,Lo as M,po as N,wo as O,Po as P,zo as Q,ae as R,qo as S,Xo as T,jo as U,Go as V,Ao as W,Zo as X,$o as Y,Ro as Z,So as _,qt as a,fo as a0,No as a1,Bo as a2,lo as a3,so as b,ao as c,co as d,ko as e,Eo as f,Wo as g,bo as h,go as i,ro as j,xo as k,Fo as l,Do as m,Io as n,Vo as o,To as p,Jo as q,A as r,ti as s,ei as t,Ko as u,oi as v,ii as w,si as x,ri as y,ni as z};

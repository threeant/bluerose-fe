"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6867],{26385:(e,t,s)=>{s.d(t,{Z:()=>o});s(72791);var n=s(78983),a=s(96188),l=s(24846),r=s(80184);const c=(e,t,s,c)=>(0,r.jsxs)(n.Tk,{alignment:"center",visible:e,onClose:t,"aria-labelledby":"VerticallyCenteredExample",children:[(0,r.jsx)(n.p0,{children:(0,r.jsx)(n.fl,{id:"VerticallyCenteredExample",children:(0,r.jsx)(l.Z,{icon:a.$})})}),(0,r.jsx)(n.sD,{children:s}),(0,r.jsxs)(n.Ym,{children:[(0,r.jsx)(n.u5,{color:"secondary",onClick:t,children:"\ucde8\uc18c"}),(0,r.jsx)(n.u5,{color:"primary",onClick:c,children:"\ud655\uc778"})]})]}),i=(e,t,s,c)=>{const i=()=>{t(),c&&c()};return(0,r.jsxs)(n.Tk,{alignment:"center",visible:e,onClose:i,"aria-labelledby":"VerticallyCenteredExample",children:[(0,r.jsx)(n.p0,{children:(0,r.jsx)(n.fl,{id:"VerticallyCenteredExample",children:(0,r.jsx)(l.Z,{icon:a.$})})}),(0,r.jsx)(n.sD,{children:s}),(0,r.jsx)(n.Ym,{children:(0,r.jsx)(n.u5,{color:"secondary",onClick:i,children:"\ud655\uc778"})})]})},o=e=>{let{type:t,visible:s,onClose:n,alertText:a,onAccpet:l,aftFunc:r}=e;return"confirm"==t?c(s,n,a,l):"alert"==t?i(s,n,a,r):void 0}},81837:(e,t,s)=>{s.d(t,{Z:()=>l});s(72791);var n=s(78983),a=s(80184);const l=e=>{let{totalPages:t,currentPage:s,onPageChange:l}=e;return(0,a.jsxs)(n.E7,{"aria-label":"Page navigation example",children:[(0,a.jsx)(n.tn,{"aria-label":"Previous",disabled:1===s,onClick:()=>l(s-1),children:(0,a.jsx)("span",{"aria-hidden":"true",children:"\xab"})}),(()=>{const e=[],r=Math.floor(2.5);let c=Math.max(1,s-r),i=Math.min(t,c+5-1);s<=r?(c=1,i=Math.min(t,5)):s>=t-r&&(c=Math.max(1,t-5+1),i=t);for(let t=c;t<=i;t++)e.push((0,a.jsx)(n.tn,{active:t===s,onClick:()=>l(t),children:t},t));return e})(),(0,a.jsx)(n.tn,{"aria-label":"Next",disabled:s===t,onClick:()=>l(s+1),children:(0,a.jsx)("span",{"aria-hidden":"true",children:"\xbb"})})]})}},56867:(e,t,s)=>{s.r(t),s.d(t,{default:()=>g});var n=s(72791),a=s(59513),l=s.n(a),r=(s(68639),s(24846)),c=s(57689),i=s(12620),o=s(81837),d=s(15614),x=s(78983),h=s(26385),m=s(49909),j=s(80184);const g=()=>{const e=(0,c.s0)(),[t,s]=(0,n.useState)(null),[a,g]=(0,n.useState)(null),[u,p]=(0,n.useState)(1),[b,y]=(0,n.useState)(0),[f,v]=(0,n.useState)(""),[N,D]=(0,n.useState)(!1),[C,S]=(0,n.useState)(""),[k,w]=(0,n.useState)(""),[T,_]=(0,n.useState)({startDate:"",endDate:"",page:1,size:15}),P=e=>{console.log(e),s(e);const t=new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString().slice(0,10);console.log(t),_((e=>({...e,startDate:t})))},I=e=>{g(e);const t=new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString().slice(0,10);_((e=>({...e,endDate:t})))};(0,n.useEffect)((()=>{const e=new Date,t=new Date(e.getTime()-6048e5);P(t),I(e)}),[]);const[M,Z]=(0,n.useState)({contents:[]}),E=async t=>{if(console.log(T),t>-1&&(_((e=>({...e,page:t}))),T.page=t),console.log(T),!T.startDate||!T.endDate)return s="\ub4f1\ub85d\uc77c \uae30\uac04\uc744 \uc815\ud655\ud788 \uc785\ub825\ud574\uc8fc\uc138\uc694.",v("alert"),S(s),void D(!0);var s;try{const e=(await i.Z.get("/api/song-request/history",{params:T,headers:{"Content-Type":"application/json"}})).data;Z(e),console.log(e),console.log(e),y(e.totalPages)}catch(n){console.log(n),(0,d._y)(n,e)}};return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(h.Z,{type:f,visible:N,onClose:()=>{D(!1)},alertText:C,onAccpet:()=>{D(!1),w("")}}),(0,j.jsx)(x.rb,{children:(0,j.jsx)(x.b7,{children:(0,j.jsxs)(x.xH,{className:"mb-4",children:[(0,j.jsx)(x.bn,{children:(0,j.jsx)("strong",{children:"\uc2e0\uccad\uace1 \ud788\uc2a4\ud1a0\ub9ac \uac80\uc0c9"})}),(0,j.jsxs)(x.sl,{children:[(0,j.jsxs)(x.lx,{className:"row",onSubmit:E,children:[(0,j.jsxs)(x.rb,{className:"mb-3",children:[(0,j.jsx)(x.b7,{md:1,children:(0,j.jsx)(x.L8,{htmlFor:"inputEmail3",className:"col-form-label",children:"\uac80\uc0c9\uc77c"})}),(0,j.jsx)(x.b7,{md:5,children:(0,j.jsxs)("div",{style:{display:"flex"},children:[(0,j.jsx)("div",{style:{display:"grid",placeItems:"center",marginRight:5},children:(0,j.jsx)(r.Z,{className:"text-secondary",icon:m.J,size:"lg"})}),(0,j.jsx)("div",{children:(0,j.jsx)(l(),{selected:t,onChange:P,dateFormat:"yyyy-MM-dd",shouldCloseOnSelect:!0,minDate:new Date("2000-01-01"),maxDate:new Date,className:"DatePicker",value:T.startDate})}),(0,j.jsx)("div",{style:{whiteSpace:"pre-wrap",display:"grid",placeItems:"center"},children:(0,j.jsx)("span",{children:" ~ "})}),(0,j.jsx)("div",{style:{display:"grid",placeItems:"center",marginRight:5},children:(0,j.jsx)(r.Z,{className:"text-secondary",icon:m.J,size:"lg"})}),(0,j.jsx)("div",{children:(0,j.jsx)(l(),{selected:a,onChange:I,dateFormat:"yyyy-MM-dd",shouldCloseOnSelect:!0,minDate:new Date("2000-01-01"),maxDate:new Date,className:"DatePicker",value:T.endDate})})]})})]}),(0,j.jsx)("div",{className:"d-grid gap-2",children:(0,j.jsx)(x.rb,{className:"justify-content-between",children:(0,j.jsx)(x.b7,{xs:12,children:(0,j.jsxs)("div",{className:"d-grid gap-2 d-md-flex justify-content-md-end",children:[(0,j.jsx)(x.u5,{component:"input",type:"reset",color:"light",value:"\ucd08\uae30\ud654",onClick:e=>{_({startDate:"",endDate:"",page:1,size:1});const t=new Date,s=new Date(t.getTime()-6048e5);P(s),I(t)}}),(0,j.jsx)(x.u5,{component:"input",color:"primary",type:"submit",value:"\uc870\ud68c\ud558\uae30"})]})})})})]}),(0,j.jsx)("br",{}),(0,j.jsxs)(x.Sx,{align:"middle",className:"mb-0 border",hover:!0,responsive:!0,children:[(0,j.jsx)(x.V,{color:"light",children:(0,j.jsxs)(x.T6,{children:[(0,j.jsx)(x.is,{className:"text-center",children:"No"}),(0,j.jsx)(x.is,{className:"text-center",children:"\ub0a0\uc9dc"}),(0,j.jsx)(x.is,{className:"text-center",children:"\uc2e0\uccad\uace1\uc218"})]})}),(0,j.jsx)(x.NR,{children:M.contents&&M.contents.length>0?M.contents.map(((t,s)=>(0,j.jsxs)(x.T6,{"v-for":"item in tableItems",children:[(0,j.jsx)(x.NN,{className:"text-center",children:(0,j.jsx)("strong",{children:s+1})}),(0,j.jsx)(x.NN,{className:"text-center",children:(0,j.jsx)("a",{href:"/",onClick:s=>((t,s)=>{t.preventDefault(),console.log("goInfoClick : "+s),e("/music/musicReqHisInfo",{state:{dateStr:s}})})(s,t.date),children:t.date})}),(0,j.jsx)(x.NN,{className:"text-center",children:t.numberOfSongRequested})]},s))):(0,j.jsx)(x.T6,{"v-for":"item in tableItems",children:(0,j.jsx)(x.NN,{className:"text-center",colSpan:6,children:"\uc870\ud68c\ub41c \ub370\uc774\ud130\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."},0)})})]}),(0,j.jsx)("br",{}),M.contents&&M.contents.length>0?(0,j.jsxs)(x.rb,{children:[(0,j.jsx)(x.b7,{md:{span:6,offset:5},children:(0,j.jsx)(o.Z,{totalPages:b,currentPage:u,onPageChange:e=>{p(e),E(e)}})}),(0,j.jsxs)(x.b7,{md:1,children:["\ucd1d ",M.totalCount,"\uac74"]})]}):""]})]})})})]})}}}]);
//# sourceMappingURL=6867.2d65219c.chunk.js.map
"use strict";(self.webpackChunk_coreui_coreui_free_react_admin_template=self.webpackChunk_coreui_coreui_free_react_admin_template||[]).push([[6867],{56867:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var n=t(72791),a=t(59513),l=t.n(a),c=(t(68639),t(24846)),i=t(57689),r=t(12620),d=t(15614),o=t(78983),x=t(49909),h=t(80184);const m=()=>{const e=(0,i.s0)(),[s,t]=(0,n.useState)(null),[a,m]=(0,n.useState)(null),[j,g]=(0,n.useState)({startDate:"",endDate:"",page:1,size:15}),p=e=>{console.log(e),t(e);const s=new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString().slice(0,10);console.log(s),g((e=>({...e,startDate:s})))},u=e=>{m(e);const s=new Date(e.getTime()-6e4*e.getTimezoneOffset()).toISOString().slice(0,10);g((e=>({...e,endDate:s})))};(0,n.useEffect)((()=>{const e=new Date,s=new Date(e.getTime()-6048e5);p(s),u(e)}),[]);const[b,N]=(0,n.useState)({contents:[]}),f=(e,s)=>{e.preventDefault(),j.page=s,y(),console.log("===page =  : "+s)},y=async s=>{s.preventDefault(),console.log(j);try{const e=(await r.Z.get("/api/song-request/history",{params:j,headers:{"Content-Type":"application/json"}})).data;N(e),console.log(e)}catch(t){console.log(t),(0,d._y)(t,e)}};return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(o.rb,{children:(0,h.jsx)(o.b7,{children:(0,h.jsxs)(o.xH,{className:"mb-4",children:[(0,h.jsx)(o.bn,{children:(0,h.jsx)("strong",{children:"\uc2e0\uccad\uace1 \ud788\uc2a4\ud1a0\ub9ac \uac80\uc0c9"})}),(0,h.jsxs)(o.sl,{children:[(0,h.jsxs)(o.lx,{className:"row",onSubmit:y,children:[(0,h.jsxs)(o.rb,{className:"mb-3",children:[(0,h.jsx)(o.b7,{md:1,children:(0,h.jsx)(o.L8,{htmlFor:"inputEmail3",className:"col-form-label",children:"\uac80\uc0c9\uc77c"})}),(0,h.jsx)(o.b7,{md:5,children:(0,h.jsxs)("div",{style:{display:"flex"},children:[(0,h.jsx)("div",{style:{display:"grid",placeItems:"center",marginRight:5},children:(0,h.jsx)(c.Z,{className:"text-secondary",icon:x.J,size:"lg"})}),(0,h.jsx)("div",{children:(0,h.jsx)(l(),{selected:s,onChange:p,dateFormat:"yyyy-MM-dd",shouldCloseOnSelect:!0,minDate:new Date("2000-01-01"),maxDate:new Date,className:"DatePicker",value:j.startDate})}),(0,h.jsx)("div",{style:{whiteSpace:"pre-wrap",display:"grid",placeItems:"center"},children:(0,h.jsx)("span",{children:" ~ "})}),(0,h.jsx)("div",{style:{display:"grid",placeItems:"center",marginRight:5},children:(0,h.jsx)(c.Z,{className:"text-secondary",icon:x.J,size:"lg"})}),(0,h.jsx)("div",{children:(0,h.jsx)(l(),{selected:a,onChange:u,dateFormat:"yyyy-MM-dd",shouldCloseOnSelect:!0,minDate:new Date("2000-01-01"),maxDate:new Date,className:"DatePicker",value:j.endDate})})]})})]}),(0,h.jsx)("div",{className:"d-grid gap-2",children:(0,h.jsx)(o.rb,{className:"justify-content-between",children:(0,h.jsx)(o.b7,{xs:12,children:(0,h.jsxs)("div",{className:"d-grid gap-2 d-md-flex justify-content-md-end",children:[(0,h.jsx)(o.u5,{component:"input",type:"reset",color:"light",value:"\ucd08\uae30\ud654",onClick:e=>{g({startDate:"",endDate:"",page:1,size:1});const s=new Date,t=new Date(s.getTime()-6048e5);p(t),u(s)}}),(0,h.jsx)(o.u5,{component:"input",color:"primary",type:"submit",value:"\uc870\ud68c\ud558\uae30"})]})})})})]}),(0,h.jsx)("br",{}),(0,h.jsxs)(o.Sx,{align:"middle",className:"mb-0 border",hover:!0,responsive:!0,children:[(0,h.jsx)(o.V,{color:"light",children:(0,h.jsxs)(o.T6,{children:[(0,h.jsx)(o.is,{className:"text-center",children:"No"}),(0,h.jsx)(o.is,{className:"text-center",children:"\ub0a0\uc9dc"}),(0,h.jsx)(o.is,{className:"text-center",children:"\uc2e0\uccad\uace1\uc218"})]})}),(0,h.jsx)(o.NR,{children:b.contents&&b.contents.length>0?b.contents.map(((s,t)=>(0,h.jsxs)(o.T6,{"v-for":"item in tableItems",children:[(0,h.jsx)(o.NN,{className:"text-center",children:(0,h.jsx)("strong",{children:t+1})}),(0,h.jsx)(o.NN,{className:"text-center",children:(0,h.jsx)("a",{href:"/",onClick:t=>((s,t)=>{s.preventDefault(),console.log("goInfoClick : "+t),e("/music/musicReqHisInfo",{state:{dateStr:t}})})(t,s.date),children:s.date})}),(0,h.jsx)(o.NN,{className:"text-center",children:s.numberOfSongRequested})]},t))):(0,h.jsx)(o.T6,{"v-for":"item in tableItems",children:(0,h.jsx)(o.NN,{className:"text-center",colSpan:6,children:"\uc870\ud68c\ub41c \ub370\uc774\ud130\uac00 \uc5c6\uc2b5\ub2c8\ub2e4."},0)})})]}),(0,h.jsx)("br",{}),b.contents&&b.contents.length>0?(0,h.jsxs)(o.rb,{children:[(0,h.jsx)(o.b7,{md:{span:6,offset:5},children:(0,h.jsxs)(o.E7,{"aria-label":"Page navigation example",children:[(0,h.jsx)(o.tn,{"aria-label":"Previous",disabled:!b.first,onClick:e=>f(e,1),children:(0,h.jsx)("span",{"aria-hidden":"true",children:"\xab"})}),Array.from({length:b.totalPages},((e,s)=>(0,h.jsx)(o.tn,{active:!0,onClick:e=>f(e,s+1),children:s+1},s))),(0,h.jsx)(o.tn,{"aria-label":"Next",disabled:!b.last,children:(0,h.jsx)("span",{"aria-hidden":"true",children:"\xbb"})})]})}),(0,h.jsxs)(o.b7,{md:1,children:["\ucd1d ",b.totalCount,"\uac74"]})]}):""]})]})})})})}}}]);
//# sourceMappingURL=6867.70357e58.chunk.js.map
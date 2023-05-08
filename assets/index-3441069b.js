import{e as P,_ as de,g as re,P as ne,a as ue,u as se,D as _e,F as L}from"./chart-270f9fd1.js";import{d as z,u as ae,c as T,r as k,o as s,a as p,b as o,e as h,w as d,f as c,g as $,h as M,i as w,j as I,k as Y,l as Q,m as O,n as W,C as le,p as ce,t as K,q as U,s as Z,v as ee,_ as q,x as G,F as j,y as me,z as pe,E as te,A as oe}from"./index-412d0f2d.js";const he={class:"topbar"},fe={class:"logo",title:"charts"},ve=o("img",{src:de,alt:"charts"},null,-1),ye={class:"right"},we=o("i",{class:"iconfont icon-jia"},null,-1),ge=o("i",{class:"iconfont icon-jia"},null,-1),Ce=o("i",{class:"iconfont icon-search-2-copy"},null,-1),ke=z({__name:"topbar",setup(e){const a=ae(),n=T(()=>a.params.type),l=T(()=>n.value==="folder"),t=k(""),r=()=>{P.emit("createFolder","")},f=()=>{P.emit("createChart","")};return(g,v)=>{const b=w("router-link"),x=w("el-button"),u=w("el-input");return s(),p("div",he,[o("h1",fe,[h(b,{tag:"a",to:{name:"home"}},{default:d(()=>[ve,I(" Charts ")]),_:1})]),o("div",ye,[h(x,{size:"large",onClick:f},{default:d(()=>[we,I("新建图表 ")]),_:1}),c(l)?M("",!0):(s(),$(x,{key:0,size:"large",onClick:r},{default:d(()=>[ge,I("新建文件夹 ")]),_:1})),h(u,{modelValue:t.value,"onUpdate:modelValue":v[0]||(v[0]=y=>t.value=y),size:"large",class:"search",placeholder:"在当前页面搜索"},{prefix:d(()=>[Ce]),_:1},8,["modelValue"])])])}}});const X=e=>(Z("data-v-0fc7734e"),e=e(),ee(),e),be={class:"folder-box"},xe=["onClick"],Ie=["src"],Te=X(()=>o("div",{class:"operation"},[o("i",{class:"iconfont icon-gengduo"})],-1)),$e=X(()=>o("i",{class:"iconfont icon-weibiaoti520"},null,-1)),Se=X(()=>o("i",{class:"iconfont icon-shanchu"},null,-1)),De={class:"name"},Fe=X(()=>o("i",{class:"iconfont icon-weibiaoti520"},null,-1)),Be=z({__name:"folder",props:{folder:{type:Object,default:()=>({})},editId:{type:Number,default:null}},emits:["change","del"],setup(e,{emit:a}){const n=e,l=Y(),t=k("未命名文件夹"),r=k(""),f=k(!1),g=k(null),v=()=>{f.value=!0,b()},b=()=>{U(()=>{var _;(_=g.value)==null||_.select()})},x=()=>{l.push({name:"home",params:{type:"folder",id:n.folder.id}})},u=()=>{t.value||(t.value=r.value),f.value=!1,a("change",{...n.folder,name:t.value})},y=()=>{u()},S=_=>{_==="del"&&a("del",n.folder),_==="edit"&&U(()=>{v()})},B=()=>{u()};return Q(()=>{t.value=n.folder.name,r.value=n.folder.name,n.folder.id===n.editId&&v()}),(_,m)=>{const D=w("el-dropdown-item"),N=w("el-dropdown-menu"),A=w("el-dropdown"),E=w("el-input");return s(),p("div",be,[o("div",{class:"content",onClick:O(x,["stop"])},[o("img",{src:c(re)("folder-big.svg")},null,8,Ie),h(A,{teleported:!1,onCommand:S},{dropdown:d(()=>[h(N,null,{default:d(()=>[h(D,{command:"edit",onClick:m[0]||(m[0]=O(()=>{},["stop"]))},{default:d(()=>[$e,I(" 编辑 ")]),_:1}),h(D,{command:"del",onClick:m[1]||(m[1]=O(()=>{},["stop"]))},{default:d(()=>[Se,I(" 删除 ")]),_:1})]),_:1})]),default:d(()=>[Te]),_:1})],8,xe),o("div",De,[f.value?W((s(),$(E,{key:0,ref_key:"inputRef",ref:g,modelValue:t.value,"onUpdate:modelValue":m[2]||(m[2]=V=>t.value=V),modelModifiers:{trim:!0},onKeydown:ce(y,["enter"])},null,8,["modelValue","onKeydown"])),[[c(le),B]]):(s(),p("div",{key:1,class:"text",onClick:v},[I(K(t.value)+" ",1),Fe]))])])}}});const Ne=q(Be,[["__scopeId","data-v-0fc7734e"]]),J=e=>(Z("data-v-f79a72ce"),e=e(),ee(),e),Ae={class:"chart-box"},Ee=J(()=>o("div",{class:"operation"},[o("i",{class:"iconfont icon-gengduo"})],-1)),Ve=J(()=>o("i",{class:"iconfont icon-weibiaoti520"},null,-1)),Re=J(()=>o("i",{class:"iconfont icon-shanchu"},null,-1)),Me={class:"name"},Oe=J(()=>o("i",{class:"iconfont icon-weibiaoti520"},null,-1)),je=z({__name:"chartItem",props:{chart:{type:Object,default:()=>({})},editId:{type:Number,default:null}},emits:["change","del"],setup(e,{emit:a}){const n=e,l=Y(),t=k(""),r=k(""),f=k(!1),g=k(null),v=()=>{f.value=!0,b()},b=()=>{U(()=>{var _;(_=g.value)==null||_.select()})},x=()=>{l.push({name:"chart",params:{id:n.chart.id}})},u=()=>{t.value||(t.value=r.value),f.value=!1,a("change",{...n.chart,name:t.value})},y=()=>{u()},S=_=>{_==="del"&&a("del",n.chart),_==="edit"&&U(()=>{v()})},B=()=>{u()};return Q(()=>{t.value=n.chart.name}),(_,m)=>{const D=w("el-dropdown-item"),N=w("el-dropdown-menu"),A=w("el-dropdown"),E=w("el-input");return s(),p("div",Ae,[o("div",{class:"content",onClick:x},[h(c(ne),{chart:e.chart},null,8,["chart"]),h(A,{teleported:!1,onCommand:S},{dropdown:d(()=>[h(N,null,{default:d(()=>[h(D,{command:"edit",onClick:m[0]||(m[0]=O(()=>{},["stop"]))},{default:d(()=>[Ve,I(" 编辑 ")]),_:1}),h(D,{command:"del",onClick:m[1]||(m[1]=O(()=>{},["stop"]))},{default:d(()=>[Re,I(" 删除 ")]),_:1})]),_:1})]),default:d(()=>[Ee]),_:1})]),o("div",Me,[f.value?W((s(),$(E,{key:0,ref_key:"inputRef",ref:g,modelValue:t.value,"onUpdate:modelValue":m[2]||(m[2]=V=>t.value=V),modelModifiers:{trim:!0},onKeydown:ce(y,["enter"])},null,8,["modelValue","onKeydown"])),[[c(le),B]]):(s(),p("div",{key:1,class:"text",onClick:v},[o("span",null,K(t.value),1),I(),Oe]))])])}}});const Ke=q(je,[["__scopeId","data-v-f79a72ce"]]),ze=[["","Ford","Volvo","Toyota","Honda"],["2016",100,11,12,13],["2017",140,11,14,160],["2018",300,120,12,140]],Le=[["","xxx","aaa","bb","Honda"],["2016",10,11,12,13],["2017",200,11,14,13],["2020",30,15,12,13]],He=[["年份","衣","食","住","行"],["2006","1026.9","5249","1435.7","2332.8"],["2007","1330.1","5725.5","1212.1","3453.7"],["2008","1520.6","7108.6","1646.2","3373.2"],["2009","1593.1","7344.8","2213.2","3498.7"],["2010","1794.1","7277","2166.2","4076.5"],["2011","2053.8","8906","2425.7","3808.4"],["2012","2111.2","9655.6","1790.5","4563.8"]],Pe=[["受教育水平","占比（%）"],["大学本科","63"],["大学专科","16.9"],["硕士","12.8"],["高中及以下","5.5"],["博士及以上","1.8"]],Ue=[["年份","衣","食","住","行"],["2006","1026.9","5249","1435.7","2332.8"],["2007","1330.1","5725.5","1212.1","3453.7"],["2008","1520.6","7108.6","1646.2","3373.2"],["2009","1593.1","7344.8","2213.2","3498.7"],["2010","1794.1","7277","2166.2","4076.5"],["2011","2053.8","8906","2425.7","3808.4"],["2012","2111.2","9655.6","1790.5","4563.8"]],Ge=[["受教育水平","占比（%）"],["大学本科","63"],["大学专科","16.9"],["硕士","12.8"],["高中及以下","5.5"],["博士及以上","1.8"]],Ye={DYNAMIC_LINE_BAR_MIX:ze,DYNAMIC_RANKING_BAR:Le,LINE_BASICS:He,PIE_BASICS:Pe,BAR_BASICS:Ue,RING_BASICS:Ge};function qe(e){const a=e.label,n=e.value,l=Ye[n];return{title:a,data:l,animation:{intervalTime:1,moveTime:.5,startDelayTime:0,endDelayTime:1}}}const Xe={class:"container"},Je={class:"chart-wrapper"},Qe=["onClick"],We={class:"preview"},Ze={class:"name-box"},et=z({__name:"chartTemplate",emits:["close"],setup(e,{emit:a}){const n=Y(),l=k(ue()),t=se(),r=()=>{a("close")},f=async g=>{const v={name:g.label,createdTime:new Date().getTime(),updatedTime:new Date().getTime(),type:g.value,config:qe(g)},b=await t.set(v);n.push({name:"chart",params:{id:b}}),r()};return(g,v)=>{const b=w("el-divider"),x=w("el-dialog");return s(),$(x,{fullscreen:!0,"model-value":!0,title:"图表模版","before-close":r},{default:d(()=>[o("div",Xe,[(s(!0),p(j,null,G(l.value,u=>(s(),p("div",{key:u.value},[h(b,{"content-position":"left"},{default:d(()=>[I(K(u.label),1)]),_:2},1024),o("div",Je,[(s(!0),p(j,null,G(u.children,y=>(s(),p("div",{key:y.value,class:"chart-block",onClick:S=>f(y)},[o("div",We,[h(c(ne),{chart:y},null,8,["chart"])]),o("div",Ze,K(y.label),1)],8,Qe))),128))])]))),128))])]),_:1})}}});const tt=q(et,[["__scopeId","data-v-1a288ab1"]]),H=_e(),ot=me("Folder",{state:()=>({list:[]}),actions:{async update(){const e=await(await H).getAllFromIndex(L,"id");this.list=(e||[]).sort((a,n)=>n.updatedTime-a.updatedTime)},async get(e){return await(await H).get(L,e)},async set(e){const a=(await H).transaction(L,"readwrite");if(e.id){const n=a.store.index("id");for await(const l of n.iterate(e.id)){const t=Object.assign(l.value,e);l.update(t)}return await a.done,e.id}else{const n=await a.store.add(e);return this.update(),await a.done,n}},async del(e){await(await H).delete(L,e),this.update()}}}),nt=e=>(Z("data-v-142c4a35"),e=e(),ee(),e),st={class:"home"},at={class:"wrapper"},lt=nt(()=>o("i",{class:"iconfont icon-fanhui"},null,-1)),ct={class:"container"},it=z({__name:"home",setup(e){const a=ae(),n=Y(),l=ot(),t=se(),r=T(()=>l.list),f=T(()=>t.list),g=T(()=>a.params.type),v=T(()=>+a.params.id),b=T(()=>g.value==="folder"),x=k(!0),u=k(null),y=k(!1),S=T(()=>r.value.find(i=>i.id===v.value)),B=async()=>{const i={name:"未命名文件夹",createdTime:new Date().getTime(),updatedTime:new Date().getTime()},C=await l.set(i);u.value=C,setTimeout(()=>{u.value=""},100)},_=()=>{n.push({name:"home"})},m=i=>{const C=r.value.find(R=>R.id===i.id);C.name=i.name,C.updatedTime=new Date().getTime(),l.set(C)},D=i=>{const C=r.value.find(R=>R.id===i.id);C.name=i.name,C.updatedTime=new Date().getTime(),t.set(C)},N=i=>{te.confirm("确定要删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{l.del(i.id),oe({type:"success",message:"删除成功"})})},A=i=>{te.confirm("确定要删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{t.del(i.id),oe({type:"success",message:"删除成功"})})},E=()=>{y.value=!0};P.on("createFolder",()=>{B()}),P.on("createChart",()=>{E()});const V=()=>{const i=new BroadcastChannel("chart");i.onmessage=async C=>{await l.update(),await t.update()}};return Q(async()=>{await l.update(),await t.update(),x.value=!1,V()}),(i,C)=>{const R=w("el-empty"),ie=pe("loading");return s(),p("div",st,[h(c(ke)),W((s(),p("div",at,[c(b)&&c(S)?(s(),p("div",{key:0,class:"back",onClick:_},[lt,I(" "+K(c(S).name),1)])):M("",!0),o("div",ct,[c(b)?M("",!0):(s(),p(j,{key:0},[(s(!0),p(j,null,G(c(r),F=>(s(),$(c(Ne),{key:F.id,editId:u.value,folder:F,onChange:m,onDel:N},null,8,["editId","folder"]))),128)),(s(!0),p(j,null,G(c(f),F=>(s(),$(c(Ke),{key:F.id,chart:F,onChange:D,onDel:A},null,8,["chart"]))),128))],64))]),!c(r).length&&!c(f).length&&!x.value?(s(),$(R,{key:1,description:"当前内容为空","image-size":200})):M("",!0),y.value?(s(),$(c(tt),{key:2,onClose:C[0]||(C[0]=F=>y.value=!1)})):M("",!0)])),[[ie,x.value]])])}}});const ut=q(it,[["__scopeId","data-v-142c4a35"]]);export{ut as default};
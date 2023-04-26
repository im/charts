import{d as D,c as $,r as y,o as c,a as p,b as a,e as h,w as m,u as i,f as A,g as O,h as f,i as k,j as ne,k as J,l as Q,C as ae,m as ce,t as V,n as P,p as W,q as Z,s as U,_ as j,v as X,F as L,x as pe,y as he,E as ee,z as te}from"./index-5a5c4e60.js";import{u as le,D as fe,F as Y}from"./chart-53a06d68.js";const ve="/charts/logo.svg";function ge(e){return{all:e=e||new Map,on:function(s,t){var n=e.get(s);n?n.push(t):e.set(s,[t])},off:function(s,t){var n=e.get(s);n&&(t?n.splice(n.indexOf(t)>>>0,1):e.set(s,[]))},emit:function(s,t){var n=e.get(s);n&&n.slice().map(function(o){o(t)}),(n=e.get("*"))&&n.slice().map(function(o){o(s,t)})}}}const z=ge(),we={class:"topbar"},ye={class:"logo",title:"charts"},Ce=a("img",{src:ve,alt:"charts"},null,-1),Ie={class:"right"},be=a("i",{class:"iconfont icon-jia"},null,-1),ke=a("i",{class:"iconfont icon-jia"},null,-1),xe=a("i",{class:"iconfont icon-search-2-copy"},null,-1),Te=D({__name:"topbar",setup(e){const s=ne(),t=$(()=>s.params.type),n=$(()=>t.value==="folder"),o=y(""),d=()=>{z.emit("createFolder","")},w=()=>{z.emit("createChart","")};return(C,v)=>{const I=f("router-link"),g=f("el-button"),r=f("el-input");return c(),p("div",we,[a("h1",ye,[h(I,{tag:"a",to:{name:"home"}},{default:m(()=>[Ce,k(" Charts ")]),_:1})]),a("div",Ie,[h(g,{size:"large",onClick:w},{default:m(()=>[be,k("新建图表 ")]),_:1}),i(n)?O("",!0):(c(),A(g,{key:0,size:"large",onClick:d},{default:m(()=>[ke,k("新建文件夹 ")]),_:1})),h(r,{modelValue:o.value,"onUpdate:modelValue":v[0]||(v[0]=u=>o.value=u),size:"large",class:"search",placeholder:"在当前页面搜索"},{prefix:m(()=>[xe]),_:1},8,["modelValue"])])])}}});const ie="/charts/assets/DYNAMIC_LINE_BAR_MIX-a5981d26.gif",de="/charts/assets/DYNAMIC_RANKING_BAR-097dd3db.gif",re="/charts/assets/LINE_BASICS-35682591.gif",Ne="/charts/assets/folder-big-144a6fca.svg",$e="/charts/assets/plus-6fef50b3.svg",Ae=e=>new URL(Object.assign({"../assets/images/charts/DYNAMIC_LINE_BAR_MIX.gif":ie,"../assets/images/charts/DYNAMIC_RANKING_BAR.gif":de,"../assets/images/charts/LINE_BASICS.gif":re,"../assets/images/folder-big.svg":Ne,"../assets/images/plus.svg":$e})[`../assets/images/${e}`],self.location).href,Re=e=>new URL(Object.assign({"../assets/images/charts/DYNAMIC_LINE_BAR_MIX.gif":ie,"../assets/images/charts/DYNAMIC_RANKING_BAR.gif":de,"../assets/images/charts/LINE_BASICS.gif":re})[`../assets/images/charts/${e}`],self.location).href,G=e=>(W("data-v-a1d9559d"),e=e(),Z(),e),Ee={class:"folder-box"},De=["src"],Se=G(()=>a("div",{class:"operation"},[a("i",{class:"iconfont icon-gengduo"})],-1)),Be=G(()=>a("i",{class:"iconfont icon-weibiaoti520"},null,-1)),Fe=G(()=>a("i",{class:"iconfont icon-shanchu"},null,-1)),Me={class:"name"},Oe=G(()=>a("i",{class:"iconfont icon-weibiaoti520"},null,-1)),Le=D({__name:"folder",props:{folder:{type:Object,default:()=>({})},editId:{type:Number,default:null}},emits:["change","del"],setup(e,{emit:s}){const t=e,n=U(),o=y("未命名文件夹"),d=y(""),w=y(!1),C=y(null),v=()=>{w.value=!0,I()},I=()=>{P(()=>{var _;(_=C.value)==null||_.select()})},g=()=>{n.push({name:"home",params:{type:"folder",id:t.folder.id}})},r=()=>{o.value||(o.value=d.value),w.value=!1,s("change",{...t.folder,name:o.value})},u=()=>{r()},x=_=>{_==="del"&&s("del",t.folder),_==="edit"&&P(()=>{v()})},S=()=>{r()};return J(()=>{o.value=t.folder.name,d.value=t.folder.name,t.folder.id===t.editId&&v()}),(_,T)=>{const N=f("el-dropdown-item"),R=f("el-dropdown-menu"),B=f("el-dropdown"),F=f("el-input");return c(),p("div",Ee,[a("div",{class:"content",onClick:g},[a("img",{src:i(Ae)("folder-big.svg")},null,8,De),h(B,{teleported:!1,onCommand:x},{dropdown:m(()=>[h(R,null,{default:m(()=>[h(N,{command:"edit"},{default:m(()=>[Be,k(" 编辑 ")]),_:1}),h(N,{command:"del"},{default:m(()=>[Fe,k(" 删除 ")]),_:1})]),_:1})]),default:m(()=>[Se]),_:1})]),a("div",Me,[w.value?Q((c(),A(F,{key:0,ref_key:"inputRef",ref:C,modelValue:o.value,"onUpdate:modelValue":T[0]||(T[0]=l=>o.value=l),modelModifiers:{trim:!0},onKeydown:ce(u,["enter"])},null,8,["modelValue","onKeydown"])),[[i(ae),S]]):(c(),p("div",{key:1,class:"text",onClick:v},[k(V(o.value)+" ",1),Oe]))])])}}});const Ve=j(Le,[["__scopeId","data-v-a1d9559d"]]),je=D({__name:"previewImage",props:{chart:{type:Object,default:()=>({})}},setup(e){const s=e,t=$(()=>Re((s.chart.value||s.chart.type)+".gif"));return(n,o)=>{const d=f("el-image");return c(),A(d,{src:i(t),fit:"cover"},null,8,["src"])}}});const _e=j(je,[["__scopeId","data-v-a7a00566"]]),H=e=>(W("data-v-74ad42a0"),e=e(),Z(),e),Ye={class:"chart-box"},Ke=H(()=>a("div",{class:"operation"},[a("i",{class:"iconfont icon-gengduo"})],-1)),Pe=H(()=>a("i",{class:"iconfont icon-weibiaoti520"},null,-1)),Xe=H(()=>a("i",{class:"iconfont icon-shanchu"},null,-1)),ze={class:"name"},Ue=H(()=>a("i",{class:"iconfont icon-weibiaoti520"},null,-1)),Ge=D({__name:"chartItem",props:{chart:{type:Object,default:()=>({})},editId:{type:Number,default:null}},emits:["change","del"],setup(e,{emit:s}){const t=e,n=U(),o=y(""),d=y(""),w=y(!1),C=y(null),v=()=>{w.value=!0,I()},I=()=>{P(()=>{var _;(_=C.value)==null||_.select()})},g=()=>{const{href:_}=n.resolve({name:"chart",params:{id:t.chart.id}}),{origin:T,pathname:N}=window.location,R=T+N+_;window.open(R,"_blank")},r=()=>{o.value||(o.value=d.value),w.value=!1,s("change",{...t.chart,name:o.value})},u=()=>{r()},x=_=>{_==="del"&&s("del",t.chart),_==="edit"&&P(()=>{v()})},S=()=>{r()};return J(()=>{o.value=t.chart.name}),(_,T)=>{const N=f("el-dropdown-item"),R=f("el-dropdown-menu"),B=f("el-dropdown"),F=f("el-input");return c(),p("div",Ye,[a("div",{class:"content",onClick:g},[h(i(_e),{chart:e.chart},null,8,["chart"]),h(B,{teleported:!1,onCommand:x},{dropdown:m(()=>[h(R,null,{default:m(()=>[h(N,{command:"edit"},{default:m(()=>[Pe,k(" 编辑 ")]),_:1}),h(N,{command:"del"},{default:m(()=>[Xe,k(" 删除 ")]),_:1})]),_:1})]),default:m(()=>[Ke]),_:1})]),a("div",ze,[w.value?Q((c(),A(F,{key:0,ref_key:"inputRef",ref:C,modelValue:o.value,"onUpdate:modelValue":T[0]||(T[0]=l=>o.value=l),modelModifiers:{trim:!0},onKeydown:ce(u,["enter"])},null,8,["modelValue","onKeydown"])),[[i(ae),S]]):(c(),p("div",{key:1,class:"text",onClick:v},[a("span",null,V(o.value),1),k(),Ue]))])])}}});const He=j(Ge,[["__scopeId","data-v-74ad42a0"]]),q="DYNAMIC",ue="LINE",se={[q]:"动态图表",[ue]:"线形图"},oe={[q+"_RANKING_BAR"]:"动态排名变化图",[q+"_LINE_BAR_MIX"]:"动态折线条形混合图",[ue+"_BASICS"]:"基础折线图"},qe=Object.keys(oe).map(e=>({label:oe[e],value:e})),Je=()=>Object.keys(se).map(e=>({label:se[e],value:e,children:qe.filter(s=>{const t=s.value.indexOf(e);return~t&&t===0})})),Qe={class:"container"},We={class:"chart-wrapper"},Ze=["onClick"],et={class:"preview"},tt={class:"name-box"},st=D({__name:"chartTemplate",emits:["close"],setup(e,{emit:s}){const t=U(),n=y(Je()),o=le(),d=()=>{s("close")},w=async C=>{const v={name:C.label,createdTime:new Date().getTime(),updatedTime:new Date().getTime(),type:C.value},I=await o.set(v),{href:g}=t.resolve({name:"chart",params:{id:I}}),{origin:r,pathname:u}=window.location,x=r+u+g;window.open(x,"_blank"),d()};return(C,v)=>{const I=f("el-divider"),g=f("el-dialog");return c(),A(g,{fullscreen:!0,"model-value":!0,title:"图表模版","before-close":d},{default:m(()=>[a("div",Qe,[(c(!0),p(L,null,X(n.value,r=>(c(),p("div",{key:r.value},[h(I,{"content-position":"left"},{default:m(()=>[k(V(r.label),1)]),_:2},1024),a("div",We,[(c(!0),p(L,null,X(r.children,u=>(c(),p("div",{key:u.value,class:"chart-block",onClick:x=>w(u)},[a("div",et,[h(i(_e),{chart:u},null,8,["chart"])]),a("div",tt,V(u.label),1)],8,Ze))),128))])]))),128))])]),_:1})}}});const ot=j(st,[["__scopeId","data-v-8e9d9ed8"]]),K=fe(),nt=pe("Folder",{state:()=>({list:[]}),actions:{async update(){const e=await(await K).getAllFromIndex(Y,"id");this.list=(e||[]).sort((s,t)=>t.updatedTime-s.updatedTime)},async get(e){return await(await K).get(Y,e)},async set(e){const s=(await K).transaction(Y,"readwrite");if(e.id){const t=s.store.index("id");for await(const n of t.iterate(e.id)){const o=Object.assign(n.value,e);n.update(o)}return await s.done,e.id}else{const t=await s.store.add(e);return this.update(),await s.done,t}},async del(e){await(await K).delete(Y,e),this.update()}}}),at=e=>(W("data-v-eb6655d1"),e=e(),Z(),e),ct={class:"home"},lt={class:"wrapper"},it=at(()=>a("i",{class:"iconfont icon-fanhui"},null,-1)),dt={class:"container"},rt=D({__name:"home",setup(e){const s=ne(),t=U(),n=nt(),o=le(),d=$(()=>n.list),w=$(()=>o.list),C=$(()=>s.params.type),v=$(()=>+s.params.id),I=$(()=>C.value==="folder"),g=y(!0),r=y(null),u=y(!1),x=$(()=>d.value.find(l=>l.id===v.value)),S=async()=>{const l={name:"未命名文件夹",createdTime:new Date().getTime(),updatedTime:new Date().getTime()},b=await n.set(l);r.value=b,setTimeout(()=>{r.value=""},100)},_=()=>{t.push({name:"home"})},T=l=>{const b=d.value.find(M=>M.id===l.id);b.name=l.name,b.updatedTime=new Date().getTime(),n.set(b)},N=l=>{const b=d.value.find(M=>M.id===l.id);b.name=l.name,b.updatedTime=new Date().getTime(),o.set(b)},R=l=>{ee.confirm("确定要删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{n.del(l.id),te({type:"success",message:"删除成功"})})},B=l=>{ee.confirm("确定要删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{o.del(l.id),te({type:"success",message:"删除成功"})})},F=()=>{u.value=!0};return z.on("createFolder",()=>{S()}),z.on("createChart",()=>{F()}),J(async()=>{await n.update(),await o.update(),g.value=!1}),(l,b)=>{const M=f("el-empty"),me=he("loading");return c(),p("div",ct,[h(i(Te)),Q((c(),p("div",lt,[i(I)&&i(x)?(c(),p("div",{key:0,class:"back",onClick:_},[it,k(" "+V(i(x).name),1)])):O("",!0),a("div",dt,[i(I)?O("",!0):(c(),p(L,{key:0},[(c(!0),p(L,null,X(i(d),E=>(c(),A(i(Ve),{key:E.id,editId:r.value,folder:E,onChange:T,onDel:R},null,8,["editId","folder"]))),128)),(c(!0),p(L,null,X(i(w),E=>(c(),A(i(He),{key:E.id,chart:E,onChange:N,onDel:B},null,8,["chart"]))),128))],64))]),!i(d).length&&!g.value?(c(),A(M,{key:1,description:"当前内容为空","image-size":200})):O("",!0),u.value?(c(),A(i(ot),{key:2,onClose:b[0]||(b[0]=E=>u.value=!1)})):O("",!0)])),[[me,g.value]])])}}});const mt=j(rt,[["__scopeId","data-v-eb6655d1"]]);export{mt as default};

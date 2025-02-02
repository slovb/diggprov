var q=Object.defineProperty;var J=(t,e,n)=>e in t?q(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var b=(t,e,n)=>J(t,typeof e!="symbol"?e+"":e,n);import{d as R,r as w,c as _,a as I,o as h,b as g,e as r,w as E,v as N,f as k,g as H,h as K,t as A,u as x,i as Q,F as T,j as G,n as F,k as S}from"./index-mCq-IgYV.js";class B{constructor(e,n,d,i,u){b(this,"name");b(this,"address");b(this,"email");b(this,"telephone");b(this,"uuid");this.name=e,this.address=n,this.email=d,this.telephone=i,this.uuid=u}}function X(t,e){return t.name<e.name?-1:t.name>e.name?1:t.address<e.address?-1:t.address>e.address?1:0}const $=new URL("/digg/user/",window.location.origin);function W(t){return new B(t.name??"",t.address??"",t.email??"",t.telephone??"",t.uuid??"")}async function Y(){const e=await fetch($);if(e.status!==200)throw new Error("Unable to get users");const n=await e.json(),d=[];if(Array.isArray(n))for(const i in n)d.push(W(n[i]));else throw new Error("Unexpected format");return d}async function z(t){const e=new URL(t,$),n=await fetch(e);if(n.status===404)return;if(n.status!==200)throw new Error("Unable to get user: "+t);const d=await n.json();return W(d)}async function Z(t,e,n,d){const u=await fetch($,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:t,address:e,email:n,telephone:d})});if(u.status==201){const c=u.headers.get("Location"),a=c==null?void 0:c.split("/"),f=a==null?void 0:a.pop();if(f===void 0)throw new Error("Got empty UUID from backend");return f}else throw u.status==400?new Error("Bad request, did you forget a parameter?"):u.status==403?new Error("User already exists"):new Error("Unknown cause")}async function ee(t){const e=new URL(t.uuid,$);if((await fetch(e,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}})).status!==200)throw new Error("Unable to delete")}async function te(t){const e=new URL(t.uuid,$);if((await fetch(e,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:t.name,address:t.address,email:t.email,telephone:t.telephone})})).status!==200)throw new Error("Unable to update")}var C=(t=>(t.ERROR="Error",t.INFO="Info",t.WARNING="Warning",t.DEBUG="Debug",t))(C||{});class ne{constructor(e,n){b(this,"text");b(this,"level");this.text=e,this.level=n}}const V=R("message",()=>{const t=w([]);function e(a,f){t.value.push(new ne(a,f)),f===C.ERROR&&alert(f.toString()+": "+a)}function n(a){e(a,C.DEBUG)}function d(a){e(a,C.INFO)}function i(a){e(a,C.WARNING)}function u(a){e(a,C.ERROR)}function c(a){if(a instanceof Error)console.error(a),u(a.message);else throw a}return{addMessage:e,addDebug:n,addInfo:d,addWarning:i,addError:u,handleError:c}}),se=V(),j=R("user",()=>{const t=w([]),e=_(()=>t.value.concat().sort(X)),n=w(0),d=_(()=>n.value===0);function i(){n.value+=1}function u(){n.value=Math.min(n.value-1,0)}function c(s){t.value.push(s)}function a(s){const v=t.value.findIndex(y=>y.uuid==s.uuid);if(v!==-1){const y=t.value[v];y.name=s.name,y.address=s.address,y.email=s.email,y.telephone=s.telephone}}function f(s){const v=t.value.findIndex(y=>y.uuid==s.uuid);v!==-1&&t.value.splice(v,1)}async function p(){i();try{t.value=await Y()}catch(s){if(s instanceof Error)console.error(s),se.addError(s.message);else throw s}u()}return p(),{users:e,loading:d,addUser:c,updateUser:a,removeUser:f,startLoading:i,stopLoading:u}}),P=j(),O=R("page",()=>{const t=w(0),e=_(()=>t.value),n=w(20),d=_(()=>Math.ceil(P.users.length/n.value)),i=_(()=>Math.max(0,Math.min(e.value,d.value))),u=_(()=>Math.max(0,Math.min(d.value-e.value-1,d.value))),c=_(()=>{const p=e.value*n.value,s=p+n.value;return P.users.slice(p,s)});function a(p){const s=P.users.findIndex(v=>v.uuid===p.uuid);if(s!==-1)return Math.floor(s/n.value)}function f(p){t.value=p}return{page:c,pageNumber:e,pageSize:n,pagesAfter:u,pagesBefore:i,pagesTotal:d,findPageOfUser:a,setPageNumber:f}}),D=O(),L=R("selectedUser",()=>{const t=w(void 0),e=_(()=>t.value),n=_(()=>t.value!==void 0);function d(u){t.value=u;const c=D.findPageOfUser(u);c!==void 0&&D.setPageNumber(c)}function i(){t.value=void 0}return{isSelected:n,user:e,selectUser:d,unselectUser:i}}),re={class:"form-widget"},ae={class:"input-grid"},oe={class:"button-group"},le=I({__name:"CreateUser",setup(t){const e=j(),n=L(),d=V(),i=w(""),u=w(""),c=w(""),a=w("");async function f(){e.startLoading();try{const p=await Z(i.value,u.value,c.value,a.value),s=await z(p);s!==void 0?(e.addUser(s),n.selectUser(s),i.value="",u.value="",c.value="",a.value=""):d.addError("Created user was not found on server, very confusing")}catch(p){d.handleError(p)}e.stopLoading()}return(p,s)=>(h(),g("div",re,[s[8]||(s[8]=r("h2",{class:"title"},"Create user",-1)),r("div",ae,[s[4]||(s[4]=r("label",{for:"new-name"},"Name:",-1)),E(r("input",{id:"new-name","onUpdate:modelValue":s[0]||(s[0]=v=>i.value=v),placeholder:"Name"},null,512),[[N,i.value]]),s[5]||(s[5]=r("label",{for:"new-address"},"Address:",-1)),E(r("input",{id:"new-address","onUpdate:modelValue":s[1]||(s[1]=v=>u.value=v),placeholder:"Address"},null,512),[[N,u.value]]),s[6]||(s[6]=r("label",{for:"new-email"},"Email:",-1)),E(r("input",{id:"new-email","onUpdate:modelValue":s[2]||(s[2]=v=>c.value=v),placeholder:"Email"},null,512),[[N,c.value]]),s[7]||(s[7]=r("label",{for:"new-telephone"},"Telephone:",-1)),E(r("input",{id:"new-telephone","onUpdate:modelValue":s[3]||(s[3]=v=>a.value=v),placeholder:"Telephone"},null,512),[[N,a.value]])]),r("div",oe,[r("button",{onClick:k(f,["prevent"])},"Create")])]))}}),ue={class:"form-widget"},ie={class:"input-grid"},de=["disabled"],ce=["disabled"],pe=["disabled"],fe=["disabled"],me={class:"button-group"},ve=["disabled"],he=["disabled"],ge=["disabled"],we=I({__name:"EditUser",setup(t){const e=j(),n=L(),d=V(),i=w(""),u=w(""),c=w(""),a=w(""),f=w(""),p=_(()=>f.value===void 0||f.value==="");function s(l){l===void 0?(i.value="",u.value="",c.value="",a.value="",f.value=""):(i.value=l.name,u.value=l.address,c.value=l.email,a.value=l.telephone,f.value=l.uuid)}H(()=>n.user,l=>{s(l)});async function v(){const l=new B(i.value,u.value,c.value,a.value,f.value);try{await te(l);const o=await z(l.uuid);o!==void 0&&(e.updateUser(o),s(o))}catch(o){d.handleError(o)}}async function y(){const l=n.user;if(l!==void 0)try{await ee(l),m(),e.removeUser(l)}catch(o){d.handleError(o)}}function m(){n.unselectUser()}return(l,o)=>(h(),g("div",ue,[o[8]||(o[8]=r("h2",{class:"title"},"Edit user",-1)),r("div",ie,[o[4]||(o[4]=r("label",{for:"edit-name"},"Name:",-1)),E(r("input",{id:"edit-name","onUpdate:modelValue":o[0]||(o[0]=U=>i.value=U),placeholder:"Name",disabled:p.value},null,8,de),[[N,i.value]]),o[5]||(o[5]=r("label",{for:"edit-address"},"Address:",-1)),E(r("input",{id:"edit-address","onUpdate:modelValue":o[1]||(o[1]=U=>u.value=U),placeholder:"Address",disabled:p.value},null,8,ce),[[N,u.value]]),o[6]||(o[6]=r("label",{for:"edit-email"},"Email:",-1)),E(r("input",{id:"edit-email","onUpdate:modelValue":o[2]||(o[2]=U=>c.value=U),placeholder:"Email",disabled:p.value},null,8,pe),[[N,c.value]]),o[7]||(o[7]=r("label",{for:"edit-telephone"},"Telephone:",-1)),E(r("input",{id:"edit-telephone","onUpdate:modelValue":o[3]||(o[3]=U=>a.value=U),placeholder:"Telephone",disabled:p.value},null,8,fe),[[N,a.value]])]),r("div",me,[r("button",{onClick:k(m,["prevent"]),disabled:p.value},"Cancel",8,ve),r("button",{onClick:k(y,["prevent"]),disabled:p.value},"Delete",8,he),r("button",{onClick:k(v,["prevent"]),disabled:p.value},"Save",8,ge)])]))}}),Ue={key:0,class:"green"},be=I({__name:"UserListRow",props:{user:{type:B,required:!0}},setup(t){const n=K(t.user),d=L();function i(){d.selectUser(n)}return(u,c)=>(h(),g(T,null,[r("td",null,A(n.name),1),r("td",null,A(n.address),1),r("td",null,A(n.email),1),r("td",null,A(n.telephone),1),r("td",null,[r("button",{onClick:k(i,["prevent"])},"Edit"),n===x(d).user?(h(),g("span",Ue," ✎")):Q("",!0)])],64))}}),_e={key:0},ye={key:1},Ee=I({__name:"UserList",setup(t){const e=O(),n=L();return(d,i)=>x(e).page.length?(h(),g("table",_e,[i[0]||(i[0]=r("thead",null,[r("tr",null,[r("th",null,"Name"),r("th",null,"Address"),r("th",null,"Email"),r("th",null,"Telephone"),r("th")])],-1)),r("tbody",null,[(h(!0),g(T,null,G(x(e).page,u=>(h(),g("tr",{key:u.uuid,class:F({selected:u===x(n).user})},[S(be,{user:u},null,8,["user"])],2))),128))])])):(h(),g("p",ye,"No users found here"))}}),Ne={class:"pager"},ke={key:1},xe=["onClick"],Se={key:1},Ce={key:1},Ae=7,M=I({__name:"UserListPager",setup(t){const e=O();function n(){e.setPageNumber(e.pageNumber-1)}function d(){e.setPageNumber(e.pageNumber+1)}function i(m){return String(m+1)}let u=0;class c{constructor(l,o){b(this,"text");b(this,"pageNumber");b(this,"isLink");b(this,"active",!1);b(this,"id");this.text=l,this.pageNumber=o,this.isLink=o!==void 0,this.id=u++}}class a extends c{constructor(l){super(i(l),l)}}class f extends c{constructor(){super("…")}}class p extends c{constructor(){super(i(e.pageNumber)),this.active=!0}}const s=_(()=>{const m=[];for(let l=0;l<e.pagesTotal;l++)l!=e.pageNumber?m.push(new a(l)):m.push(new p);return m}),v=_(()=>{const m=[],l=[],o=[];if(e.pagesBefore>1&&(m.push(new a(0)),e.pagesBefore>3?m.push(new f):e.pagesBefore==3&&m.push(new a(1))),e.pagesAfter>1&&(o.push(new a(e.pagesTotal-1)),e.pagesAfter>3?o.push(new f):e.pagesAfter==3&&o.push(new a(e.pagesTotal-2)),o.reverse()),e.pagesBefore>0&&l.push(new a(e.pageNumber-1)),l.push(new p),e.pagesAfter>0&&l.push(new a(e.pageNumber+1)),m.length<2){let U=e.pageNumber+2;for(;m.length+l.length<5;)l.push(new a(U)),U++}if(o.length<2){let U=e.pageNumber-2;for(;o.length+l.length<5;)l.unshift(new a(U)),U--}return m.concat(l).concat(o)}),y=_(()=>e.pagesTotal>Ae?v.value:s.value);return(m,l)=>(h(),g("ul",Ne,[r("li",null,[x(e).pagesBefore>0?(h(),g("a",{key:0,href:"#",onClick:k(n,["prevent"])},"<")):(h(),g("span",ke,"<"))]),(h(!0),g(T,null,G(y.value,o=>(h(),g("li",{key:o.id,class:F({active:o.active})},[o.isLink?(h(),g("a",{key:0,href:"#",onClick:k(U=>x(e).setPageNumber(o.pageNumber),["prevent"])},A(o.text),9,xe)):(h(),g("span",Se,A(o.text),1))],2))),128)),r("li",null,[x(e).pagesAfter>0?(h(),g("a",{key:0,href:"#",onClick:k(d,["prevent"])},">")):(h(),g("span",Ce,">"))])]))}}),Ie={class:"main"},Te=I({__name:"UserView",setup(t){return(e,n)=>(h(),g(T,null,[n[0]||(n[0]=r("header",null,[r("h1",null,"Users")],-1)),r("main",Ie,[r("div",null,[S(M),S(Ee),S(M)]),r("div",null,[S(le),S(we)])])],64))}});export{Te as default};

(this["webpackJsonpreact-start"]=this["webpackJsonpreact-start"]||[]).push([[0],{13:function(e,t){t.getToken=function(){return localStorage.token?localStorage.token:sessionStorage.token}},56:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(31),r=n.n(s),o=n(7),i=n(2),l=n(4),j=n.n(l),d=n(10),u=n(5),b=n(11),h=n.n(b),O=(n(56),n(15)),p=n(16),x=n(0);function m(){var e=Object(c.useContext)(k),t=Object(u.a)(e,2),n=(t[0],t[1]),a=Object(c.useState)(""),s=Object(u.a)(a,2),r=s[0],o=s[1];function i(){return(i=Object(d.a)(j.a.mark((function e(t){var c,a,s,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.preventDefault(),c=Object.values(t.target).reduce((function(e,t){return t.name?Object(p.a)(Object(p.a)({},e),{},Object(O.a)({},t.name,"checkbox"==t.type?t.checked:t.value)):e}),{}),e.next=5,h.a.post("http://localhost:4000/login",{email:c.email,password:c.password});case 5:a=e.sent,sessionStorage.token=a.data.token,c.stayConnected&&(localStorage.token=a.data.token),n(a.data),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),o((null===(s=e.t0.response)||void 0===s||null===(r=s.data)||void 0===r?void 0:r.error)||e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))).apply(this,arguments)}return Object(x.jsx)("div",{children:Object(x.jsxs)("form",{id:"login",className:"Login",onSubmit:function(e){return function(e){return i.apply(this,arguments)}(e)},children:[Object(x.jsx)("div",{children:r}),Object(x.jsx)("label",{htmlFor:"email",children:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc"}),Object(x.jsx)("input",{id:"email",type:"text",name:"email",placeholder:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc",required:!0,minLength:"8",maxLength:"40"}),Object(x.jsx)("label",{htmlFor:"password",children:"\u05e1\u05d9\u05e1\u05de\u05d0"}),Object(x.jsx)("input",{id:"password",type:"password",name:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d0",required:!0}),Object(x.jsxs)("div",{children:[Object(x.jsx)("input",{id:"stayConnected",type:"checkbox",name:"stayConnected"}),Object(x.jsx)("label",{htmlFor:"stayConnected",children:"\u05d4\u05e9\u05d0\u05e8 \u05de\u05d7\u05d5\u05d1\u05e8"})]}),Object(x.jsx)("input",{type:"submit",value:"\u05d4\u05ea\u05d7\u05d1\u05e8"})]})})}function v(e){var t=e.toConnect,n=Object(c.useContext)(k),a=Object(u.a)(n,2),s=(a[0],a[1]),r=Object(c.useState)(!1),o=Object(u.a)(r,2),l=o[0],b=o[1],m=Object(c.useState)(""),v=Object(u.a)(m,2),f=v[0],g=v[1],y=(Object(i.f)(),Object(u.a)(t,2)),w=(y[0],y[1]);function N(){return(N=Object(d.a)(j.a.mark((function e(t){var n,c,a,r,o,i,l;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.preventDefault(),(n=Object.values(t.target).reduce((function(e,t){return t.name?Object(p.a)(Object(p.a)({},e),{},Object(O.a)({},t.name,"checkbox"==t.type?t.checked:t.value)):e}),{})).password==n.verifyPassword){e.next=5;break}throw"\u05d4\u05e1\u05d9\u05e1\u05de\u05d0 \u05dc\u05d0 \u05ea\u05d5\u05d0\u05de\u05ea \u05dc\u05d5\u05d9\u05d3\u05d5\u05d0 \u05e1\u05d9\u05e1\u05de\u05d0";case 5:return c={first:n.firstName,last:n.lastName},e.next=8,h.a.put("http://localhost:4000/register",{name:c,email:n.email,password:n.password});case 8:a=e.sent,console.log(a.data),n.conntectNow?(sessionStorage.token=a.data.token,n.stayConnected&&(localStorage.token=a.data.token),s(a.data)):b(!0),e.next=18;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0.response),(null===(r=e.t0.response)||void 0===r||null===(o=r.data)||void 0===o?void 0:o.error.includes("user validation failed: email"))&&(e.t0.response.data.error="\u05db\u05ea\u05d5\u05d1\u05ea \u05d0\u05d9\u05de\u05d9\u05d9\u05dc \u05dc\u05d0 \u05d7\u05d5\u05e7\u05d9\u05ea"),g((null===(i=e.t0.response)||void 0===i||null===(l=i.data)||void 0===l?void 0:l.error)||e.t0.message||e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}return Object(x.jsx)(x.Fragment,{children:l?Object(x.jsxs)("div",{className:"Login",children:[Object(x.jsx)("h2",{children:"\u05d4\u05d4\u05e8\u05e9\u05de\u05d4 \u05d4\u05e6\u05dc\u05d9\u05d7\u05d4!"}),Object(x.jsx)("button",{onClick:function(){return w(!1)},children:"\u05d4\u05ea\u05d7\u05d1\u05e8 \u05e2\u05db\u05e9\u05d9\u05d5"})]}):Object(x.jsxs)("form",{id:"register",className:"Login",onSubmit:function(e){return function(e){return N.apply(this,arguments)}(e)},children:[Object(x.jsx)("div",{children:f}),Object(x.jsx)("label",{htmlFor:"firstName",children:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9"}),Object(x.jsx)("input",{id:"firstName",type:"text",name:"firstName",placeholder:"\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9",required:!0,minLength:"2",maxLength:"12"}),Object(x.jsx)("label",{htmlFor:"lastName",children:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4"}),Object(x.jsx)("input",{id:"lastName",type:"text",name:"lastName",placeholder:"\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4",required:!0,minLength:"2",maxLength:"12"}),Object(x.jsx)("label",{htmlFor:"email",children:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc"}),Object(x.jsx)("input",{id:"email",type:"email",name:"email",placeholder:"\u05d0\u05d9\u05de\u05d9\u05d9\u05dc",required:!0}),Object(x.jsx)("label",{htmlFor:"password",children:"\u05e1\u05d9\u05e1\u05de\u05d0"}),Object(x.jsx)("input",{id:"password",type:"password",name:"password",placeholder:"\u05e1\u05d9\u05e1\u05de\u05d0",required:!0,minLength:"8",maxLength:"40"}),Object(x.jsx)("label",{htmlFor:"verifyPassword",children:"\u05d5\u05d5\u05d9\u05d3\u05d5\u05d0 \u05e1\u05d9\u05e1\u05de\u05d0"}),Object(x.jsx)("input",{id:"verifyPassword",type:"password",name:"verifyPassword",placeholder:"\u05d5\u05d9\u05d3\u05d5\u05d0 \u05e1\u05d9\u05e1\u05de\u05d0",required:!0,minLength:"8",maxLength:"40"}),Object(x.jsxs)("div",{children:[Object(x.jsx)("input",{id:"conntectNow",type:"checkbox",name:"conntectNow",defaultChecked:!0}),Object(x.jsx)("label",{htmlFor:"conntectNow",children:"\u05d7\u05d1\u05e8 \u05d0\u05d5\u05ea\u05d9 \u05e2\u05db\u05e9\u05d9\u05d5"})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)("input",{id:"stayConnected",type:"checkbox",name:"stayConnected"}),Object(x.jsx)("label",{htmlFor:"stayConnected",children:"\u05d4\u05e9\u05d0\u05e8 \u05d0\u05d5\u05ea\u05d9 \u05de\u05d7\u05d5\u05d1\u05e8"})]}),Object(x.jsx)("input",{type:"submit",value:"\u05d4\u05d9\u05e8\u05e9\u05dd"})]})})}n(63);function f(){return Object(x.jsxs)("div",{className:"LodingContainer",children:[Object(x.jsxs)("div",{className:"lds-roller",children:[Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{}),Object(x.jsx)("div",{})]}),"\u05d1\u05e8\u05d5\u05da \u05d4\u05d1\u05d0!"]})}var g=n(13),k=Object(c.createContext)();function y(e){var t=e.children,n=Object(c.useState)("gust"),a=Object(u.a)(n,2),s=a[0],r=a[1],o=Object(c.useState)(!1),i=Object(u.a)(o,2),l=i[0],b=i[1];function O(e){b(e)}return Object(c.useEffect)((function(){function e(){return(e=Object(d.a)(j.a.mark((function e(){var t,n,c,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!localStorage.token&&!sessionStorage.token){e.next=10;break}return t=Object(g.getToken)(),e.next=5,h.a.post("http://localhost:4000/locaSLogin",{},{headers:{authorization:t}});case 5:n=e.sent,console.log("In Entrance page, responce: ".concat(n.data)),r(n.data),e.next=11;break;case 10:r();case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log("In Entrance page, error: ".concat((null===(c=e.t0.response)||void 0===c||null===(a=c.data)||void 0===a?void 0:a.error)||erroe.message||e.t0));case 16:case"end":return e.stop()}}),e,null,[[0,13]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(x.jsx)(k.Provider,{value:[s,r],children:s?"gust"===s?Object(x.jsx)(f,{}):t:Object(x.jsxs)("div",{className:"LoginRegisterContainer",children:[Object(x.jsxs)("div",{children:[Object(x.jsx)("button",{onClick:function(){return O(!1)},children:" \u05d4\u05d9\u05db\u05e0\u05e1"}),Object(x.jsx)("button",{onClick:function(){return O(!0)},children:" \u05d4\u05d9\u05e8\u05e9\u05dd"})]}),l?Object(x.jsx)(v,{toConnect:[l,b]}):Object(x.jsx)(m,{})]})})}n(64),n(65);function w(){var e=Object(c.useContext)(k);Object(i.f)();return Object(x.jsx)("div",{children:Object(x.jsxs)("div",{className:"userContainer",children:[Object(x.jsx)("span",{className:"logout",onClick:function(){localStorage.removeItem("token"),sessionStorage.removeItem("token"),history.go(0)},children:"\u05d4\u05ea\u05e0\u05ea\u05e7"}),Object(x.jsx)("div",{className:"HeaderImg",style:{backgroundImage:"url(".concat((null===e||void 0===e?void 0:e.profilePicture)||"https://hook.finance/sites/default/files/user.png",")")}})]})})}function N(){return Object(x.jsx)("div",{className:"headerContainer",children:Object(x.jsxs)("header",{className:"header",children:[Object(x.jsx)(o.b,{to:"/",children:Object(x.jsx)("div",{className:"logoContainer"})}),Object(x.jsxs)("div",{className:"linksContainer",children:[Object(x.jsx)(o.c,{activeClassName:"Linkactive",className:"Link",to:"/",exact:!0,children:"\u05de\u05d1\u05d7\u05e0\u05d9\u05dd \u05e9\u05d9\u05e6\u05e8\u05ea\u05d9"}),Object(x.jsx)(o.c,{activeClassName:"Linkactive",className:"Link",to:"/my-tests",children:"\u05de\u05d1\u05d7\u05e0\u05d9\u05dd"}),Object(x.jsx)(o.c,{activeClassName:"Linkactive",className:"Link",to:"/about",children:"\u05de\u05d9 \u05d0\u05e0\u05d7\u05e0\u05d5"})]}),Object(x.jsx)(w,{})]})})}n(66),n(67);function C(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1];function s(){return(s=Object(d.a)(j.a.mark((function e(){var t,n,c,s,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=Object(g.getToken)(),e.next=4,h.a.post("http://localhost:4000/my_created",{},{headers:{authorization:t}});case 4:n=e.sent,c=n.data,console.log(c),a(c),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log((null===(s=e.t0.response)||void 0===s||null===(r=s.data)||void 0===r?void 0:r.error)||e.t0.message||e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}return Object(c.useEffect)((function(){!function(){s.apply(this,arguments)}()}),[]),Object(x.jsx)("div",{children:Object(x.jsx)("table",{children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"\u05e9\u05dd \u05de\u05d1\u05d7\u05df"}),Object(x.jsx)("th",{children:"\u05e1\u05d8\u05d8\u05d5\u05e1"}),Object(x.jsx)("th",{children:"\u05e1\u05d5\u05d2"}),Object(x.jsx)("th",{children:"\u05ea\u05d0\u05e8\u05d9\u05da \u05d9\u05e6\u05d9\u05e8\u05d4"})]}),n.map((function(e){var t=e.name,n=e.status,c=e.created,a=e.typeForm,s=e._id;return Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:t},s+"name"),Object(x.jsx)("td",{children:n},s+"status"),Object(x.jsx)("td",{children:a},s+"typeForm"),Object(x.jsx)("td",{children:c},s+"created")]},s)}))]})})})}function L(){return Object(x.jsx)("div",{children:Object(x.jsx)(C,{})})}n(68),n(69);function S(e){var t=e.test;return Object(x.jsxs)("div",{className:"testContainer",children:[Object(x.jsx)("h4",{children:t.name}),Object(x.jsx)("h4",{children:t.state}),Object(x.jsxs)("h4",{children:["\u05d6\u05de\u05df: ",t.timeForTest]}),Object(x.jsxs)("h4",{children:["\u05de\u05d9 \u05d4\u05d1\u05d5\u05d7\u05df - ",t.creator_name]})]})}function F(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1];function s(){return(s=Object(d.a)(j.a.mark((function e(){var t,n,c,s,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=Object(g.getToken)(),e.next=4,h.a.post("http://localhost:4000/my_tests",{},{headers:{authorization:t}});case 4:n=e.sent,c=n.data,console.log(c),a(c),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log((null===(s=e.t0.response)||void 0===s||null===(r=s.data)||void 0===r?void 0:r.error)||e.t0.message||e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}return Object(c.useEffect)((function(){!function(){s.apply(this,arguments)}()}),[]),Object(x.jsx)("div",{className:"TestsContainer",children:n.map((function(e){return Object(x.jsx)(o.b,{className:"Link",to:"/test/".concat(e._id),children:Object(x.jsx)(S,{test:e},e._id)},e._id)}))})}n(70);function I(){var e=Object(c.useState)(function(){return a.apply(this,arguments)}()),t=Object(u.a)(e,2),n=t[0];t[1];function a(){return(a=Object(d.a)(j.a.mark((function e(){var t,n,c,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(g.getToken)(),n=Object(i.g)(),c=n.testId,e.next=4,h.a.get("http://localhost:4000/get_test?id=".concat(c),{headers:{authorization:t}});case 4:return a=e.sent,console.log(a.data),e.abrupt("return",a.data);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(x.jsx)("div",{children:n.name})}n(71);function T(){return Object(x.jsx)("div",{children:"TestForm"})}n(72);var _=function(){return Object(x.jsx)("div",{className:"App",children:Object(x.jsxs)(y,{children:[Object(x.jsx)(N,{}),Object(x.jsxs)(i.c,{children:[Object(x.jsx)(i.a,{path:"/",component:L,exact:!0})," ",Object(x.jsx)(i.a,{path:"/my-tests",component:F}),Object(x.jsx)(i.a,{path:"/test/:testId?",component:I}),Object(x.jsx)(i.a,{path:"/test-form/:testId?",component:T})]})]})})};n(73);r.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(o.a,{children:Object(x.jsx)(_,{})})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.3cc1b068.chunk.js.map
(function(t){function i(i){for(var n,o,r=i[0],u=i[1],l=i[2],d=0,m=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&m.push(s[o][0]),s[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);c&&c(i);while(m.length)m.shift()();return a.push.apply(a,l||[]),e()}function e(){for(var t,i=0;i<a.length;i++){for(var e=a[i],n=!0,r=1;r<e.length;r++){var u=e[r];0!==s[u]&&(n=!1)}n&&(a.splice(i--,1),t=o(o.s=e[0]))}return t}var n={},s={app:0},a=[];function o(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=n,o.d=function(t,i,e){o.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,i){if(1&i&&(t=o(t)),8&i)return t;if(4&i&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)o.d(e,n,function(i){return t[i]}.bind(null,n));return e},o.n=function(t){var i=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(i,"a",i),i},o.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},o.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],u=r.push.bind(r);r.push=i,r=r.slice();for(var l=0;l<r.length;l++)i(r[l]);var c=u;a.push([0,"chunk-vendors"]),e()})({0:function(t,i,e){t.exports=e("56d7")},"0cb1":function(t,i,e){"use strict";e("b9c9")},"2ce5":function(t,i,e){},"56d7":function(t,i,e){"use strict";e.r(i);e("e260"),e("e6cf"),e("cca6"),e("a79d");var n=e("2b0e"),s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"app"}},[e("v-app",[e("div",{staticClass:"ma-4",staticStyle:{display:"flex"}},[e("div",{staticClass:"mr-2",staticStyle:{width:"200px"}},[e("settings",{ref:"settings"}),e("v-layout",{staticClass:"justify-lg-space-between"},[e("v-btn",{on:{click:t.onCreate}},[t._v("Create")]),e("v-btn",{on:{click:t.onReset}},[t._v("Reset")])],1)],1),e("div",{staticClass:"checker-board",staticStyle:{flex:"1 1 0"}},[e("window-manager",{ref:"WindowManager",attrs:{width:"100%",height:500,dark:""}})],1)])])],1)},a=[],o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("v-layout",[e("v-row",{attrs:{"no-gutters":""}},[e("div",{staticClass:"pa-1",staticStyle:{width:"50%"}},[e("v-text-field",{attrs:{label:"width"},model:{value:t.width,callback:function(i){t.width=i},expression:"width"}})],1),e("div",{staticClass:"pa-1",staticStyle:{width:"50%"}},[e("v-text-field",{attrs:{label:"height"},model:{value:t.height,callback:function(i){t.height=i},expression:"height"}})],1)])],1),e("v-layout",[e("v-row",{attrs:{"no-gutters":""}},[e("div",{staticClass:"pa-1",staticStyle:{width:"50%"}},[e("v-text-field",{attrs:{label:"init-x"},model:{value:t.initX,callback:function(i){t.initX=i},expression:"initX"}})],1),e("div",{staticClass:"pa-1",staticStyle:{width:"50%"}},[e("v-text-field",{attrs:{label:"init-y"},model:{value:t.initY,callback:function(i){t.initY=i},expression:"initY"}})],1)])],1),e("v-layout",[e("v-text-field",{attrs:{label:"Window Title"},model:{value:t.title,callback:function(i){t.title=i},expression:"title"}})],1)],1)},r=[],u={data:function(){return{title:"Lorem ipsum",width:200,height:200,initX:40,initY:40}},methods:{getSettings:function(){return{title:this.title,width:parseInt(this.width),height:parseInt(this.height),initX:parseInt(this.initX),initY:parseInt(this.initY)}}}},l=u,c=e("2877"),d=e("6544"),m=e.n(d),f=e("a722"),p=e("0fd9"),h=e("8654"),v=Object(c["a"])(l,o,r,!1,null,null,null),g=v.exports;m()(v,{VLayout:f["a"],VRow:p["a"],VTextField:h["a"]});var w=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticStyle:{color:"white"}},[t._v(" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu quam ultricies, varius quam malesuada, eleifend magna. Sed suscipit vitae nulla in tempor. Curabitur dictum dolor interdum, vestibulum ex non, posuere magna. Donec quis ex lacinia, blandit diam eu, tempor augue. Proin viverra tempor odio feugiat gravida. Donec eu enim quis odio condimentum semper. Phasellus eu mi diam. Aenean sed ornare odio. Curabitur sapien nibh, rhoncus in egestas malesuada, tincidunt convallis purus. Nullam a sagittis sapien. Suspendisse efficitur arcu vel tellus consequat, a tristique tellus finibus. Sed maximus posuere purus, ut rhoncus ipsum. Duis vitae ante sed sem lacinia bibendum. Nulla vel turpis vehicula quam tincidunt fermentum et quis turpis. Vestibulum bibendum maximus consectetur. Proin nec velit consequat, tristique dolor nec, accumsan erat. Vestibulum condimentum dui vitae odio aliquam, sit amet porttitor mauris semper. Aenean euismod eros eget pharetra auctor. Mauris blandit sem lacus, vitae bibendum eros pellentesque vitae. Phasellus a risus tellus. Quisque viverra lectus quis elit tempor cursus. Aenean tincidunt enim vel tellus laoreet euismod. Nullam ullamcorper neque ut mauris scelerisque ornare. Curabitur in dignissim purus, et venenatis nisi. Aliquam in lorem risus. Aliquam venenatis ante in porta mattis. Suspendisse id lorem a libero euismod faucibus. Nunc maximus fermentum sagittis. Vestibulum aliquet sit amet risus in ullamcorper. Nam neque erat, porttitor ut orci a, condimentum sodales arcu. Sed nec dolor et quam rutrum convallis id non mauris. Fusce enim massa, ultrices non sapien quis, finibus egestas urna. Suspendisse dapibus diam nisl, vel cursus sapien suscipit ut. Nullam sed erat ante. Praesent pellentesque, odio a tempor imperdiet, nisi enim aliquam risus, nec imperdiet ipsum libero sed lectus. Aenean sed magna non augue efficitur blandit. Sed facilisis rutrum ligula, eu tincidunt arcu pretium non. Praesent blandit eros vel pellentesque aliquam. Nunc massa mauris, elementum vel nibh sit amet, ultricies tempus tortor. Nullam lectus nisl, mollis sit amet egestas sed, ornare sit amet dui. Cras tincidunt consectetur massa, et tincidunt tortor facilisis in. Quisque quis sem est. Nunc augue mauris, dignissim et lorem at, finibus varius justo. Nam scelerisque tincidunt suscipit. Etiam dictum maximus elit a auctor. Morbi consectetur rhoncus libero vitae iaculis. Aliquam erat volutpat. Quisque sed ultrices ex. Sed malesuada non lacus vitae commodo. Nullam feugiat velit sit amet nisl dictum, porttitor hendrerit est laoreet. Donec dignissim interdum elit laoreet viverra. Donec porta ligula pretium dolor facilisis pharetra. Maecenas vehicula nec nulla sed congue. Cras iaculis et nisl non varius. Etiam fringilla consequat nunc et dictum. Vestibulum consequat dictum turpis sagittis gravida. Proin efficitur fringilla gravida. Quisque elementum vel nisi blandit lobortis. Duis ultrices sem sit amet elementum condimentum. Praesent aliquet enim quis tempor aliquam. Nunc id felis id dui fermentum ultricies vel eu ipsum. Vestibulum varius rhoncus nisi viverra feugiat. Integer interdum elit eu lacinia efficitur. Suspendisse lobortis varius vulputate. Morbi eu viverra ante, vel sagittis odio. ")])},b=[],y={"mdi-options":{mode:"fit-content",collapsable:!1,draggable:!0,initPos:{x:10,y:1}}},x=y,_=Object(c["a"])(x,w,b,!1,null,null,null),q=_.exports,C=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticStyle:{color:"white"}},[t._v(" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu quam ultricies, varius quam malesuada, eleifend magna. Sed suscipit vitae nulla in tempor. Curabitur dictum dolor interdum, vestibulum ex non, posuere magna. Donec quis ex lacinia, blandit diam eu, tempor augue. Proin viverra tempor odio feugiat gravida. Donec eu enim quis odio condimentum semper. Phasellus eu mi diam. Aenean sed ornare odio. Curabitur sapien nibh, rhoncus in egestas malesuada, tincidunt convallis purus. Nullam a sagittis sapien. Suspendisse efficitur arcu vel tellus consequat, a tristique tellus finibus. Sed maximus posuere purus, ut rhoncus ipsum. Duis vitae ante sed sem lacinia bibendum. Nulla vel turpis vehicula quam tincidunt fermentum et quis turpis. Vestibulum bibendum maximus consectetur. Proin nec velit consequat, tristique dolor nec, accumsan erat. Vestibulum condimentum dui vitae odio aliquam, sit amet porttitor mauris semper. Aenean euismod eros eget pharetra auctor. Mauris blandit sem lacus, vitae bibendum eros pellentesque vitae. Phasellus a risus tellus. Quisque viverra lectus quis elit tempor cursus. Aenean tincidunt enim vel tellus laoreet euismod. Nullam ullamcorper neque ut mauris scelerisque ornare. Curabitur in dignissim purus, et venenatis nisi. Aliquam in lorem risus. Aliquam venenatis ante in porta mattis. Suspendisse id lorem a libero euismod faucibus. Nunc maximus fermentum sagittis. Vestibulum aliquet sit amet risus in ullamcorper. Nam neque erat, porttitor ut orci a, condimentum sodales arcu. Sed nec dolor et quam rutrum convallis id non mauris. Fusce enim massa, ultrices non sapien quis, finibus egestas urna. Suspendisse dapibus diam nisl, vel cursus sapien suscipit ut. Nullam sed erat ante. Praesent pellentesque, odio a tempor imperdiet, nisi enim aliquam risus, nec imperdiet ipsum libero sed lectus. Aenean sed magna non augue efficitur blandit. Sed facilisis rutrum ligula, eu tincidunt arcu pretium non. Praesent blandit eros vel pellentesque aliquam. Nunc massa mauris, elementum vel nibh sit amet, ultricies tempus tortor. Nullam lectus nisl, mollis sit amet egestas sed, ornare sit amet dui. Cras tincidunt consectetur massa, et tincidunt tortor facilisis in. Quisque quis sem est. Nunc augue mauris, dignissim et lorem at, finibus varius justo. Nam scelerisque tincidunt suscipit. Etiam dictum maximus elit a auctor. Morbi consectetur rhoncus libero vitae iaculis. Aliquam erat volutpat. Quisque sed ultrices ex. Sed malesuada non lacus vitae commodo. Nullam feugiat velit sit amet nisl dictum, porttitor hendrerit est laoreet. Donec dignissim interdum elit laoreet viverra. Donec porta ligula pretium dolor facilisis pharetra. Maecenas vehicula nec nulla sed congue. Cras iaculis et nisl non varius. Etiam fringilla consequat nunc et dictum. Vestibulum consequat dictum turpis sagittis gravida. Proin efficitur fringilla gravida. Quisque elementum vel nisi blandit lobortis. Duis ultrices sem sit amet elementum condimentum. Praesent aliquet enim quis tempor aliquam. Nunc id felis id dui fermentum ultricies vel eu ipsum. Vestibulum varius rhoncus nisi viverra feugiat. Integer interdum elit eu lacinia efficitur. Suspendisse lobortis varius vulputate. Morbi eu viverra ante, vel sagittis odio. ")])},z=[],S={"mdi-options":{mode:"resizable",labels:{title:"HELLO"},collapsable:!1,draggable:!0,initPos:{x:1,y:100}}},$=S,k=Object(c["a"])($,C,z,!1,null,null,null),O=(k.exports,{name:"App",components:{Settings:g},mounted:function(){},methods:{onCreate:function(){var t=this.$refs.settings.getSettings(),i=Object.assign({},q["mdi-options"],{mode:"resizable",labels:{title:t.title},initPos:{x:t.initX,y:t.initY},initSize:{w:t.width,h:t.height}}),e=Object.assign({},q,{"mdi-options":i});this.$refs.WindowManager.createNewWindow(e)},onReset:function(){this.$refs.WindowManager.reset()}}}),M=O,N=(e("5c0b"),e("7496")),j=e("8336"),A=Object(c["a"])(M,s,a,!1,null,null,null),P=A.exports;m()(A,{VApp:N["a"],VBtn:j["a"],VLayout:f["a"]});var E=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"tg-window-manager__root js-window-manager_root"},[e("v-layout",{staticClass:"tg-window-manager__tab-wrapper"},t._l(t.tabs,(function(i,n){return e("div",{key:n,staticClass:"tg-window-manager__tab-container elevation-24"},[e("v-layout",{staticClass:"fill-height align-center pl-3 pr-2"},[e("div",{staticClass:"pr-3"},[e("span",[t._v(t._s(i.title))])]),e("div",{staticClass:"tg-window-manager__zoom",on:{click:function(e){return t.onMaximize(i.uuid)}}},[e("a",{staticClass:"tg-window-manager__zoombutton",attrs:{href:"#"}})])])],1)})),0),e("v-layout",{staticClass:"tg-window-manager__window-container"},t._l(t.windowBootstraps,(function(i){void 0===i&&(i=t.bootstrap);var n=i.uuid,s=i.initPos,a=i.zIndex,o=i.component,r=i.options;return e("div",{key:n,style:"transform: translate("+s.x+"px, "+s.y+"px); z-index: "+a,attrs:{id:n},on:{mousedown:function(i){return t.onFocus(n,i)}}},[e("child-window",{ref:"TgWindows",refInFor:!0,attrs:{windowOptions:r,windowEventBus:t.windowEventBus,"data-window-id":n},on:{minimize:function(i){return t.onMinimize(n,i)}}},[e(o,{tag:"div",attrs:{eventBus:t.windowEventBus}})],1)],1)})),0)],1)])},F=[],D=(e("8ba4"),e("a9e3"),e("c740"),e("4de4"),e("159b"),e("a434"),e("c64e")),W=e.n(D),B=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"tg-window__root",staticStyle:{width:"1px",height:"1px"}},[e("div",{staticClass:"tg-window__stem"},[e("window-header",{attrs:{title:t.title},on:{onMinimize:t.minimize}}),e("transition",{attrs:{name:"slide-fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.flags.collapse,expression:"!flags.collapse"}],staticClass:"truegaze-window__body elevation-24",staticStyle:{position:"relative"}},[e("span",[this.flags.showConfirmDialog?e("div",{staticClass:"tg-window__confirm-dialog justify-center align-center"},[e("div",[e("p",[t._v(t._s(t.confirmDialogMsg))]),e("tg-button",{staticClass:"confirm",on:{click:t.onClickConfirm}},[t._v("Confirm")]),e("tg-button",{on:{click:function(i){t.flags.showConfirmDialog=!1}}},[t._v("Deny")])],1)]):t._e(),e("div",{staticClass:"tg-window__focus-curtain"}),t._t("default")],2)])])],1)])},V=[],I=(e("5377"),e("d4ec")),T=e("bee2"),H={light:{windowHeader:"red",windowBody:"green"},dark:{windowHeader:"red",windowBody:"#5a5a5a"}},L=function(){function t(){Object(I["a"])(this,t),this.style="light"}return Object(T["a"])(t,[{key:"change",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"light";this.style=t}},{key:"getWindowBodyColor",value:function(){return H[this.style].windowBody}}]),t}(),R=new L,Q=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-layout",{staticClass:"tg-window__header"},[e("span",{staticClass:"text--ellipsis pl-2"},[t.infoMsg?e("span",{staticClass:"tg-window__notify-info-text"},[t._v(t._s(t.infoMsg))]):e("span",{staticClass:"tg-window__header-text"},[t._v(t._s(t.title))])]),e("v-spacer"),e("header-buttons",{on:{minimize:t.minimize}})],1)},Y=[],X=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"buttons",staticStyle:{"margin-right":"10px"}},[t.showFlags.close?e("div",{staticClass:"close",on:{click:t.onClose}},[e("a",{staticClass:"closebutton",attrs:{href:"#"}})]):t._e(),t.showFlags.minimize?e("div",{staticClass:"minimize",on:{click:t.onMinimize}},[e("a",{staticClass:"minimizebutton",attrs:{href:"#"}})]):t._e(),t.showFlags.maximize?e("div",{staticClass:"zoom",on:{click:t.onMaximize}},[e("a",{staticClass:"zoombutton",attrs:{href:"#"}})]):t._e()])},Z=[],J={created:function(){this.$listeners.close&&(this.showFlags.close=!0),this.$listeners.minimize&&(this.showFlags.minimize=!0),this.$listeners.maximize&&(this.showFlags.maximize=!0)},data:function(){return{showFlags:{close:!1,minimize:!1,maximize:!1}}},methods:{onClose:function(){this.$emit("close")},onMinimize:function(t){this.$emit("minimize",t)},onMaximize:function(){this.$emit("maximize")}}},G=J,K=(e("0cb1"),Object(c["a"])(G,X,Z,!1,null,"c3a2daae",null)),U=K.exports,tt={props:{title:String},components:{HeaderButtons:U},data:function(){return{infoMsg:void 0}},methods:{minimize:function(t){this.$emit("onMinimize",t)}}},it=tt,et=e("2fa4"),nt=Object(c["a"])(it,Q,Y,!1,null,null,null),st=nt.exports;m()(nt,{VLayout:f["a"],VSpacer:et["a"]});var at=e("fb3a"),ot=e.n(at),rt="tg-window-manager__window-container";function ut(t,i,e){var n=e.minWidth,s=e.minHeight;ot()(i).styleCursor(!0).resizable({edges:{left:!0,right:!0,bottom:!0,top:!1},restrictEdges:{outer:".".concat(rt),endOnly:!0},restrictSize:{min:{width:n,height:s}},allowFrom:".truegaze-window__body"}).on("resizemove",(function(t){var e=parseFloat(i.getAttribute("data-x"))||0,n=parseFloat(i.getAttribute("data-y"))||0;i.style.width=t.rect.width+"px",i.style.height=t.rect.height+"px",e+=t.deltaRect.left,n+=t.deltaRect.top,i.style.webkitTransform=i.style.transform="translate("+e+"px,"+n+"px)",i.setAttribute("data-x",e),i.setAttribute("data-y",n)}))}function lt(t,i){ot()(i).draggable({restrict:{restriction:".".concat(rt),endOnly:!0,elementRect:{top:0,left:0,bottom:1,right:1}},allowFrom:".tg-window__header",autoScroll:!1,onmove:function(t){var e=(parseFloat(i.getAttribute("data-x"))||0)+t.dx,n=(parseFloat(i.getAttribute("data-y"))||0)+t.dy;i.style.webkitTransform=i.style.transform="translate("+e+"px, "+n+"px)",i.setAttribute("data-x",e),i.setAttribute("data-y",n)},onend:function(t){}})}e("d3b7"),e("3ca3"),e("ddb0"),e("2b3d");function ct(t,i){t.style.width="".concat(i,"px")}function dt(t,i){t.style.height="".concat(i,"px")}function mt(t,i){for(var e in i)t.style[e]=i[e]}var ft={initSize:{w:400,h:400},minSize:{w:100,h:100}},pt={components:{WindowHeader:st},props:{windowEventBus:Object,terminateAction:Function,windowOptions:{type:Object,default:function(){return{}}}},data:function(){return{beforeMinimizeHeight:void 0,flags:{collapse:!1,showConfirmDialog:!1},options:{minimizable:!1},title:void 0,confirmDialogMsg:void 0}},mounted:function(){this.bindComponent(),mt(this.$el.querySelector(".truegaze-window__body"),{background:R.getWindowBodyColor()})},methods:{bindComponent:function(t){var i=this.windowOptions.labels,e=void 0===i?{}:i;this.title=e.title;var n=this.windowOptions||{},s=n.mode,a=void 0===s?"static":s,o=n.draggable,r=void 0===o||o,u=n.minimizable,l=void 0!==u&&u,c=n.initSize,d=void 0===c?{}:c,m=n.minSize,f=void 0===m?{}:m,p=this.$el.querySelector(".tg-window__stem"),h=this.$el.querySelector(".tg-window__header"),v=this.$el.querySelector(".truegaze-window__body");if("static"===a);else if("fit-content"===a)v.style.width="fit-content",v.style.height="fit-content";else{if("resizable"!==a)throw new Error("You should declare 'mode' property for create window. mode=[".concat(a,"]"));var g=d.w||ft.initSize.w,w=d.h||ft.initSize.h;ht(p,{initWidth:g,initHeight:w});var b=f.w||ft.minSize.w,y=f.h||ft.minSize.h;ut(v,p,{minWidth:b,minHeight:y})}r&&lt(h,p),this.options.minimizable=!1!==l},enableCurtain:function(t){var i=this.$el.querySelector(".tg-window__focus-curtain");i.style.display=t?"block":"none"},setFocus:function(t){var i=this.$el.querySelector(".tg-window__focus-curtain");i.style.display=t?"none":"block"},toggle:function(){this.flags.collapse=!this.flags.collapse},minimize:function(t){this.$emit("minimize",this.title)},onNotifyInfo:function(t){var i=this;this.infoMsg=t,setTimeout((function(){i.infoMsg=void 0}),1e3)},onNotifyConfirm:function(t,i){this.flags.showConfirmDialog=!0,this.confirmDialogMsg=t,this.$options.confirmCallback=i},onClickConfirm:function(){var t=this.$options.confirmCallback;this.flags.showConfirmDialog=!1,t()}}};function ht(t,i){var e=i.initWidth,n=i.initHeight;ct(t,e||ft.width),dt(t,n||ft.height)}var vt=pt,gt=(e("f416"),Object(c["a"])(vt,B,V,!1,null,"29416afa",null)),wt=gt.exports,bt={methods:{hasAttribute:function(t){var i=this.$attrs[t];return""===i||!0===i||"true"===i},parseAttr:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=this.$attrs[t];return void 0===e?i.default:""===e||!0===e||"true"===e},hasEvent:function(t){return!!this.$listeners[t]},parseVOnAttr:function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return void 0===this.$listeners[t]?i.default:!!this.$listeners[t]}}};function yt(){return"tg-"+W()().substring(0,8)}var xt=function(t){return Number.isInteger(t)?"".concat(t,"px"):t},_t={props:{windowEventBus:Object},mixins:[bt],components:{ChildWindow:wt},mounted:function(){var t=this.$attrs,i=t.width,e=t.height,n=this.$el.querySelector(".js-window-manager_root");mt(n,{width:xt(i),height:xt(e)}),this.hasAttribute("light")?R.change("light"):this.hasAttribute("dark")&&R.change("dark")},data:function(){return{tabs:[],windowBootstraps:[],currentZIndex:0}},methods:{createNewWindow:function(t){this.currentZIndex++;var i=t["mdi-options"]||{},e=i.initPos,n=void 0===e?{}:e,s=(i.labels,i.mode,i.collapsable,i.draggable,yt()),a={uuid:s,zIndex:this.currentZIndex,initPos:{x:n.x||20*this.windowBootstraps.length,y:n.y||100*this.windowBootstraps.length},options:i,component:t};return this.windowBootstraps.push(a),s},reset:function(){this.windowBootstraps=[]},_findChildWindowRef:function(t){if(this.$refs.TgWindows){var i=this.$refs.TgWindows.findIndex((function(i){return i.$attrs["data-window-id"]===t}));return-1===i?null:this.$refs.TgWindows[i]}},onFocus:function(t,i){var e=this.windowBootstraps.filter((function(i){return i.uuid===t}))[0];this.currentZIndex++,e.zIndex=this.currentZIndex,this.$refs.TgWindows.forEach((function(t){t.enableCurtain(!0)}));var n=this._findChildWindowRef(t);n.enableCurtain(!1)},onMinimize:function(t,i){var e=this.$el.querySelector("#".concat(t));e.style.display="none",this.tabs.push({title:i,uuid:t})},onMaximize:function(t){var i=this.$el.querySelector("#".concat(t));i.style.display="block";var e=this.tabs.filter((function(i){return i.uuid===t}))[0],n=this.tabs.indexOf(e);this.tabs.splice(n,1),this.onFocus(t)}},watch:{currentZIndex:function(t){999===t&&alert("out of window memory")}}},qt=_t,Ct=(e("a97d"),Object(c["a"])(qt,E,F,!1,null,"e41034da",null)),zt=Ct.exports;m()(Ct,{VLayout:f["a"]});var St=e("f309");n["a"].use(St["a"]);var $t=new St["a"]({icons:{iconfont:"fa"}});e("d5e8"),e("15f5");n["a"].component("window-manager",zt),n["a"].config.productionTip=!1,new n["a"]({vuetify:$t,render:function(t){return t(P)}}).$mount("#app")},"5c0b":function(t,i,e){"use strict";e("9c0c")},"7dce":function(t,i,e){},"9c0c":function(t,i,e){},a97d:function(t,i,e){"use strict";e("2ce5")},b9c9:function(t,i,e){},f416:function(t,i,e){"use strict";e("7dce")}});
//# sourceMappingURL=app.63aeb139.js.map
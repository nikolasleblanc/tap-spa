(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,a){e.exports=a(35)},29:function(e,t,a){},30:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),s=a(16),u=a.n(s),l=(a(29),a(30),a(6)),r=a(5),o=a(17),c=a(18),m=a(22),p=a(19),d=a(9),b=a(23),h=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).sendPageView=a.sendPageView.bind(Object(d.a)(a)),a.initialize=a.initialize.bind(Object(d.a)(a)),a.initialize(e.id),a}return Object(b.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.sendPageView(this.props.location),this.props.history.listen(this.sendPageView)}},{key:"initialize",value:function(){this.props.id?(console.log("setup"),console.log("we see you baby, routing that path")):console.error("[taplytics] Tracking ID is required.")}},{key:"sendPageView",value:function(e){if(window.Taplytics&&(!this.props.trackPathnameOnly||e.pathname!==this.lastPathname)){this.lastPathname=e.pathname;var t=this.props.basename?"".concat(this.props.basename).concat(e.pathname):e.pathname;console.log("we see you baby, routing that path",t),this.props.debug&&console.info("[taplytics] Page view: ".concat(t))}}},{key:"render",value:function(){return this.props.children}}]),t}(n.a.Component);h.defaultProps={debug:!1};var g=Object(r.e)(h),f=window.Taplytics,v=window.pere,E=function(){console.log("hey here we are");var e=Object(i.useRef)(null),t=Object(i.useRef)(null);return Object(i.useEffect)(function(){console.log(e.current);var a=[];v.record(e.current,function(e){console.log(a),a.push(e)}),console.log("edits",a),setTimeout(function(){v.playback(t,a)},5e3)},[]),n.a.createElement("div",null,n.a.createElement("div",{ref:t}),n.a.createElement("div",{ref:e},n.a.createElement("h1",{className:"header"},"About"),f&&f.featureFlagEnabled("showKitten")?n.a.createElement("img",{alt:"",src:"//placekitten.com/250/300"}):n.a.createElement("img",{alt:"",src:"//placebear.com/250/300"}),n.a.createElement("p",null,"Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sagittis aliquam libero. Aenean eu vehicula nisi. Phasellus ut enim ac quam tempus lobortis non tristique ante. Suspendisse eget lobortis leo. Sed nec ante ac metus blandit dapibus non ut massa. Curabitur in nibh fermentum, lobortis ligula non, laoreet ante. Fusce varius varius velit, fringilla dapibus diam finibus quis. Pellentesque eget finibus nunc. Curabitur mattis efficitur posuere. Cras sed venenatis lorem. Curabitur vestibulum molestie elit eget dignissim. Mauris dapibus volutpat massa quis euismod. In hac habitasse platea dictumst. Integer iaculis leo neque, in tristique nisi iaculis ut.")))};var w=function(){return n.a.createElement(l.a,{basename:"/tap-spa"},n.a.createElement(g,{id:"UA-123456789-0"},n.a.createElement("div",null,n.a.createElement("nav",null,n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement(l.b,{to:"/"},"Home")),n.a.createElement("li",null,n.a.createElement(l.b,{to:"/about/"},"About")),n.a.createElement("li",null,n.a.createElement(l.b,{to:"/users/"},"Users")))),n.a.createElement(r.a,{path:"/",exact:!0,component:function(){return n.a.createElement("div",null,n.a.createElement("h1",null,"Home"),f&&f.featureFlagEnabled("showKitten")?n.a.createElement("img",{alt:"",src:"//via.placeholder.com/468x468/0000FF/FFFFFF?text=From+Feature+Flag"}):n.a.createElement("img",{alt:"",src:"//placebear.com/200/300"}),n.a.createElement("p",null,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur lorem risus, porta sed neque quis, egestas pharetra nisl. Proin scelerisque massa et magna vulputate laoreet. Praesent tempus consectetur venenatis. Cras tristique nisi sit amet ex pretium, eu semper quam mollis. Vestibulum nisl nunc, vulputate vitae eros a, mollis blandit tellus. Fusce augue ipsum, rhoncus id magna eu, laoreet pretium arcu. Phasellus ornare ut elit ut malesuada. In ac neque ut diam suscipit rhoncus. Pellentesque hendrerit nisi justo, eu iaculis massa ultricies eu. Integer feugiat congue ipsum quis elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec a rhoncus neque."))}}),n.a.createElement(r.a,{path:"/about/",component:E}),n.a.createElement(r.a,{path:"/users/",component:function(){return n.a.createElement("div",null,n.a.createElement("h1",null,"Users"),f&&f.featureFlagEnabled("showKitten")?n.a.createElement("img",{alt:"",src:"//placekitten.com/150/300"}):n.a.createElement("img",{alt:"",src:"//placebear.com/150/300"}),n.a.createElement("p",null,"Donec a enim quam. Mauris id ex molestie, eleifend nulla ac, eleifend diam. Fusce quis ipsum ut ante rhoncus tincidunt non in mi. Cras pulvinar velit id sollicitudin sollicitudin. Integer interdum turpis nisl, non posuere massa malesuada quis. Nam et aliquam odio. Integer vehicula consequat dignissim. Nam iaculis dictum lacus, sit amet facilisis diam posuere at. Fusce interdum tristique leo sit amet interdum. Etiam eget sem neque. In sem nibh, dapibus sed posuere a, laoreet eget nisl. Donec quis facilisis nisl. Nulla malesuada, neque in semper blandit, nulla velit dictum neque, nec molestie nunc sapien sit amet justo."))}}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(n.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.577722b2.chunk.js.map
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("Vue"),require("axios")):"function"==typeof define&&define.amd?define(["Vue","axios"],t):"object"==typeof exports?exports.VueChimera=t(require("Vue"),require("axios")):e.VueChimera=t(e.Vue,e.axios)}(global,function(e,t){return function(e){var t={};function r(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r.w={},r(r.s=2)}([function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){"use strict";r.r(t);var s=r(1),i=r.n(s),a=r(0),o=r.n(a);function n(e){return"[object Object]"===Object.prototype.toString(e)}function c(e,t,r,s){var i,a=0;return"boolean"!=typeof t&&(s=r,r=t,t=void 0),function(){var o=this,n=Number(new Date)-a,c=arguments;function h(){a=Number(new Date),r.apply(o,c)}s&&!i&&h(),i&&clearTimeout(i),void 0===s&&n>e?h():!0!==t&&(i=setTimeout(s?function(){i=void 0}:h,void 0===s?e-n:e))}}var h=function(e){return{beforeCreate(){const t=this.$options;let r;if(!t.chimera||t._chimera)return;t.chimera instanceof x?r=t.chimera:n(t.chimera)&&(r=new x(t.chimera,this)),this._chimeraWatcher=r.watch(),r.subscribe(this),t.computed=t.computed||{},t.watch=t.watch||{};for(let o in r._reactiveResources)t.computed["__"+o]=r._reactiveResources[o],t.watch["__"+o]=(()=>{s=e.debounce||200,i=!0,void 0===(a=r.updateReactiveResource(o))?c(s,i,!1):c(s,a,!1!==i)});var s,i,a;const o=process.server&&this.$ssrContext?this.$ssrContext.nuxt:"undefined"!=typeof window?window.__NUXT__:null;if(r&&o&&o.chimera&&this.$router){let e=this.$router.match(this.$router.currentRoute.fullPath);(e?e.matched:[]).forEach((e,t)=>{let s=o.chimera[t];s&&Object.keys(r.resources).forEach(e=>{let t=r.resources[e],i=s[e];t&&i&&i._data&&(r.resources[e]._data=s[e]._data,r.resources[e].ssrPrefetched=s[e].ssrPrefetched)})})}this.$chimera=r.resources,this._chimera=r},mounted(){if(this._chimera){this._chimera.updateReactiveResources();for(let e in this._chimera._resources){let t=this._chimera._resources[e];t.prefetch&&!t.ssrPrefetched&&t.reload()}}},beforeDestroy(){this._chimera&&(this._chimera.unsubscribe(this),this._chimeraWatcher&&(this._chimeraWatcher(),delete this._chimeraWatcher),this._chimera=null)}}};class u{constructor(e){if("undefined"==typeof window||!window.localStorage)throw"LocalStorageCache: Local storage is not available.";this.storage=window.localStorage,this.defaultExpiration=e}setItem(e,t,r){this.storage.setItem(e,JSON.stringify({expiration:Date.now()+(r||this.defaultExpiration),value:t}))}getItem(e){let t=this.storage.getItem(e);return(t=JSON.parse(t))&&t.value&&Date.now()<=t.expiration?t.value:(this.removeItem(e),null)}removeItem(e){this.storage.removeItem(e)}keys(){return Object.keys(this.storage)}all(){return this.keys().reduce((e,t)=>(e[t]=this.storage.getItem(t),e),{})}length(){return this.keys().length}clearCache(){this.storage.clear()}}class l{constructor(){}setItem(e,t,r){}getItem(e){return null}removeItem(e){}keys(){return[]}all(){return{}}length(){return 0}clearCache(){}}const f="success",d="error",m="loading";class p{static from(e){if(e instanceof p)return e;if("string"==typeof e)return new p(e,"GET");if(n(e)){let t=p.axios;e.axios&&(t=n(e.axios)?i.a.create(e.axios):e.axios);let r=new p(e.url,e.method,{params:e.params,headers:e.headers,client:t,cache:e.cache,prefetch:e.prefetch});return e.interval&&r.setInterval(e.interval),"function"==typeof e.transformer&&r.setTransformer(e.transformer),"object"==typeof e.transformer&&(r.setResponseTransformer(e.transformer.response),r.setErrorTransformer(e.transformer.error)),r}}constructor(e,t,r){if(r=r||{},(t=t?t.toLowerCase():"get")&&-1===["get","post","put","patch","delete"].indexOf(t))throw"Bad Method requested: "+t;this.requestConfig={url:e,method:t?t.toUpperCase():"GET",headers:r.headers||{}},this.requestConfig["GET"===this.requestConfig.method?"params":"data"]=r.params,this.client=r.client||i.a,this._loading=!1,this._status=null,this._data=null,this._error=null,this._lastLoaded=null,this._eventListeners={},this.prefetch=void 0===r.prefetch||Boolean(r.prefetch),this.ssrPrefetched=!1,this.cache=this.getCache(r),this.errorTransformer=(e=>e),this.responseTransformer=(e=>e)}setResponseTransformer(e){this.responseTransformer=e}setErrorTransformer(e){this.errorTransformer=e}setTransformer(e){this.responseTransformer=e,this.errorTransformer=e}setInterval(e){this._interval=e,this._interval_id&&clearInterval(this._interval_id),this._interval_id=setInterval(()=>this.reload(!0),e)}on(e,t){let r=this._eventListeners[e]||[];return r.push(t),this._eventListeners[e]=r,this}emit(e){(this._eventListeners[e]||[]).forEach(e=>{e(this)})}reload(e){return new Promise((t,r)=>{let s=e=>{this._error=null,this._loading=!1,e&&(this._status=e.status,this._data=this.responseTransformer(e.data),this._lastLoaded=new Date)};if(this.cache&&!e){let e=this.cache.getItem(this.getCacheKey());if(e)return s(e),void t()}this._loading=!0,this.emit(m),this.client.request(this.requestConfig).then(e=>{s(e),this.setCache(e),this.emit(f),t(e)}).catch(e=>{let t=e.response;this._data=null,this._loading=!1,t&&(this._status=t.status,this._error=this.errorTransformer(t.data)),this.emit(d),r(e)})})}execute(){return this.reload(!0)}send(){return this.reload(!0)}getCache(e){let t=e.cache||p.cache,r={"no-cache":()=>new l,localStorage:()=>new u(e.cacheExpiration||1e4)};return r[t]?r[t]():null}getCacheKey(){return("undefined"!=typeof btoa?btoa:e=>e)(this.requestConfig.url+this.requestConfig.params+this.requestConfig.data+this.requestConfig.method)}setCache(e){this.cache&&this.cache.setItem(this.getCacheKey(),e)}get loading(){return this._loading}get status(){return this._status}get data(){return this._data}get error(){return this._error}get lastLoaded(){return this._lastLoaded}}var _=p;class g extends _{reload(e){return null}get loading(){return!1}get status(){return 0}get data(){return null}get error(){return null}get lastLoaded(){return null}}var v=function({beforeNuxtRender:e,isDev:t}){e&&e(async function({Components:e,nuxtState:r}){r.chimera=r.chimera||{};for(let s=0,i=e.length;s<i;s++){const i=e[s].options;if(!i.chimera)continue;let a={};for(let e in i.chimera.resources){if(e&&"$"===e.charAt(0))continue;let r=i.chimera.resources[e];if((!r.requestConfig||r.requestConfig.url)&&r&&"function"!=typeof r&&r.prefetch){r=r&&r._data?r:_.from(r);try{t&&console.log("  Prefetching: "+r.requestConfig.url);let e=await r.execute();r._data=e.data}catch(e){}r.ssrPrefetched=!0,i.chimera.resources[e]=a[e]=r}}r.chimera[s]=a}})};r.d(t,"VueChimera",function(){return x}),r.d(t,"NuxtPlugin",function(){return v}),o.a.config.silent=!0,o.a.config.productionTip=!1,o.a.config.devtools=!1;class x{static install(e,t={}){_.cache=t.cache||"no-cache",_.axios=t.axios instanceof i.a?t.axios:i.a.create(t.axios||{}),e.mixin(h(t))}constructor(e={},t){this._vm=null,this._listeners=[],this._context=t,this._reactiveResources={};const r=e.resources;for(let e in r){let s=r[e];"function"==typeof s?(r[e]=new g,this._reactiveResources[e]=s.bind(t)):r[e]=_.from(s)}this._initVM(r),this._resources=r}_initVM(e){this._vm=new o.a({data:e,computed:{$loading(){for(let e in this.$data)if(this.$data[e].loading)return!0;return!1}}}),e.$loading=(()=>this._vm.$loading),e.$client=(()=>this._axios)}watch(){return this._vm.$watch("$data",()=>{let e=this._listeners.length;for(;e--;){let t=this._listeners[e];t&&t.$nextTick(()=>t.$forceUpdate())}},{deep:!0})}subscribe(e){this._listeners.push(e)}unsubscribe(e){!function(e,t){if(e.length){const r=e.indexOf(t);if(r>-1)e.splice(r,1)}}(this._listeners,e)}updateReactiveResources(){for(let e in this._reactiveResources)this.updateReactiveResource(e)}updateReactiveResource(e){let t=this._resources[e]=_.from(this._reactiveResources[e](),this._axios);t.prefetch&&t.reload()}get resources(){return this._resources}}let w=null;"undefined"!=typeof window?w=window.Vue:"undefined"!=typeof global&&(w=global.Vue),w&&w.use(x.install);t.default=x.install}]).default});
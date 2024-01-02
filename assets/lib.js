// Relapse v0.7.0 https://panoply.github.io/relapse

var{isArray:$,from:H}=Array,m=new Map,g=(e,t=Object.create(null))=>e?Object.assign(t,e):t,E=class extends Array{constructor(){super(...arguments);this.ref=g();this.get=i=>{let a=typeof i;if(a==="number")return this[i];if(a==="string"){if(i in this.ref)return this[this.ref[i]];console.error(`Relapse: Unknown fold id: ${i}`);}return this};}};function L(e,t){let i=e.getAttribute(t.schema);if((i===null||i==="")&&(i=e.hasAttribute("id")?e.id:`R${m.size}`,e.setAttribute(t.schema,i)),m.has(i)){if(m.get(i).options.unique===!1)return;throw new Error(`Relapse: Instance already exists with id: ${i} `)}let a=A(t,e.attributes),o=new E,r=m.set(i,{id:i,semantic:e.firstElementChild.nodeName==="DETAILS",openCount:0,status:1,active:NaN,events:g(),get folds(){return o},get options(){return a},get element(){return e}}).get(i);e.ariaMultiSelectable=`${r.options.multiple}`;let u=P(r.events),p=e.children.length,b=r.semantic?1:2,{classes:h}=r.options,c=0;do{let d=g({index:r.folds.length,locked:!1}),s=!1,n,l,f;if(r.semantic){if(f=e.children[c],f.nodeName!=="DETAILS")throw new Error(`Relapse: Invalid markup on "${r.id}", expected: <details>`);n=f.firstElementChild,l=n.nextElementSibling,s=f.hasAttribute("open");}else n=e.children[c],l=f=e.children[c+1],l.hasAttribute("hidden")?l.removeAttribute("hidden"):l.firstElementChild.hasAttribute("hidden")&&l.firstElementChild.removeAttribute("hidden");f.setAttribute("role","region");let y=n.classList.contains(h.disabled),v=n.classList.contains(h.opened),w=l.classList.contains(h.expanded);n.ariaExpanded==="true"||s||v?(n.ariaExpanded!=="true"&&(n.ariaExpanded="true"),!v&&!y&&n.classList.add(h.opened),w||l.classList.add(h.expanded),(y||n.ariaDisabled==="true")&&(n.classList.add(h.disabled),n.ariaDisabled="true",d.disabled=!0,d.locked=!0),d.expanded=!0):n.ariaDisabled==="true"||y?(n.ariaDisabled!=="true"&&(n.ariaDisabled="true"),y||n.classList.add(h.disabled),v&&n.classList.remove(h.opened),d.expanded=(w||s)===!0,d.disabled=!0,d.locked=!0,n.ariaExpanded=String(d.expanded)):(d.expanded=!1,d.disabled=!1,n.ariaExpanded="false",n.ariaDisabled="false"),d.id=`${r.id}-fold-${d.index}`,n.hasAttribute("id")||(n.id=`${r.id}-button-${d.index}`),l.hasAttribute("id")||(l.id=`${r.id}-content-${d.index}`),n.tabIndex=d.index,n.setAttribute("aria-controls",l.id),l.setAttribute("aria-labelledby",n.id),d.expanded?(r.openCount=r.openCount+1,r.options.multiple===!1&&r.openCount===2&&console.warn(`Relapse: More than 1 fold is expanded but "multiple" is set to false on: ${r.id}`),r.semantic?(d.height=n.offsetHeight+l.offsetHeight,f.style.setProperty("height","auto")):(d.height=l.scrollHeight,f.style.setProperty("max-height","inherit"))):r.semantic?(d.height=n.offsetHeight,f.style.setProperty("height","auto")):(d.height=0,l.style.setProperty("max-height","0"),l.style.setProperty("overflow","hidden")),d.button=n,d.wrapper=f,d.element=l,N(d,r,u),c=c+b;}while(c<p);r.on=u.on,r.off=u.off,r.collapse=(d=r.active)=>{isNaN(d)||o.get(d).close(d);},r.expand=(d=r.active)=>{isNaN(d)||o.get(d).open(d);},r.destroy=()=>{o.forEach(d=>d.destroy()),u.emit("destroy",r),m.delete(i);};}function P(e){let t=g();return t.on=(i,a,o)=>(e[i]||(e[i]=[]),e[i].push(o?a.bind(o):a)-1),t.off=(i,a)=>{let o=e[i],r=`Relapse: Removed ${i} event listener`;if(o&&typeof a=="number")o.splice(a,1),console.warn(`${r} (id: ${a})`),o.length===0&&delete o[i];else {let u=[];if(o&&typeof a=="function")for(let p=0,b=o.length;p<b;p++)o[p]!==a?u.push(o[p]):console.warn(`${r} (id: ${p})`);u.length>0?o[i]=u:delete o[i];}},t.emit=(i,a,o)=>{let r=e[i]||[],u=null;for(let p=0,b=r.length;p<b;p++){let h=r[p].call(a,o);u===null&&h===!1&&(u=!0);}return u},t}function N(e,t,i){let a=t.options.classes,o=t.options.fade,r=g({easing:o.easing,duration:o.duration*2}),u=s=>{if(typeof s!="number")return t.active!==e.index&&(t.active=e.index),e;if(t.folds.get(s))return t.active=e.index,t.folds.get(s);throw new Error(`Relapse: No fold exists using id: "${s}"`)},p=()=>t.folds.filter(({expanded:s})=>s).length,b=(s,n,l)=>{s.style.setProperty("will-change","opacity,visibility");let f=s.animate({opacity:n,visibility:l},n[0]==="1"?r:o);f.onfinish=()=>{s.style.setProperty("opacity",n[1]),s.style.setProperty("visibility",l[1]),s.style.removeProperty("will-change");};},h=(s,n,l)=>{t.status=2;let f=s.animate(t.semantic?{height:n}:{maxHeight:n},t.options.fold);f.onfinish=l;},c=s=>{if(s.disabled)return;let n=s.button,l=s.wrapper,f=s.element;l.style.setProperty("overflow","hidden"),t.semantic?(s.height=n.offsetHeight,l.style.setProperty("will-change","height")):(s.height=0,l.style.setProperty("will-change","max-height")),b(f,["1","0"],["visible","hidden"]),h(l,[`${l.offsetHeight}px`,`${s.height}px`],()=>{t.semantic?(l.style.setProperty("height",`${s.height}px`),l.removeAttribute("open")):f.style.setProperty("max-height","0"),s.expanded=!1,n.ariaDisabled="false",n.ariaExpanded="false",n.classList.remove(a.opened),l.classList.remove(a.expanded),l.style.removeProperty("will-change"),t.openCount=p(),t.status=1,i.emit("collapse",t,s);});},d=s=>n=>{s.close();let l=s.button,f=s.wrapper,y=s.element;l.ariaDisabled="true",l.ariaExpanded="true";let v;t.semantic?(f.setAttribute("open",""),f.style.setProperty("will-change","height"),f.style.setProperty("overflow","hidden"),s.height=l.offsetHeight+y.offsetHeight,v=`${l.offsetHeight}px`):(f.style.setProperty("will-change","max-height"),s.height=y.scrollHeight,v="0px"),l.classList.add(a.opened),b(y,["0","1"],["hidden","visible"]),h(f,[v,`${s.height}px`],()=>{t.semantic?f.style.setProperty("height","auto"):y.style.setProperty("max-height","inherit"),f.style.removeProperty("overflow"),f.style.removeProperty("will-change"),y.classList.add(a.expanded),s.expanded=!0,t.openCount=p(),t.status=1,t.options.persist&&t.openCount>1&&s.disable(),i.emit("expand",t,s);});};e.close=s=>{let n=u(s);if(t.options.multiple)(t.options.persist===!0&&t.openCount>1||t.options.persist===!1&&n.expanded===!0)&&c(n);else for(let l of t.folds)if(l.expanded===!0&&l.locked===!1){if(t.options.persist&&l.index===n.index)break;c(l),n=l;break}n.enable(),t.openCount=p();},e.focus=()=>{t.active=e.index,e.button.focus({preventScroll:!0}),i.emit("focus",t,e);},e.enable=s=>{let n=u(s);n.disabled&&n.locked===!1&&(n.disabled=!1,n.button.ariaDisabled="false",n.button.classList.remove(a.disabled));},e.disable=s=>{let n=u(s);n.disabled||(n.expanded?t.options.persist&&(n.disabled=!0,n.button.ariaDisabled="true"):(n.close(),n.disabled=!0,n.button.ariaDisabled="true",n.button.classList.add(a.disabled)));},e.open=s=>{let n=u(s);t.status===2||n.expanded||requestAnimationFrame(d(n));},e.toggle=s=>{if(t.semantic&&s.preventDefault(),!(t.status===2||i.emit("toggle",t,e)===!1))return e.expanded?e.close():e.open()},e.destroy=()=>{e.button.removeEventListener("click",e.toggle),e.button.removeEventListener("focus",e.focus),e.button.removeEventListener("blur",e.blur);},e.button.addEventListener("click",e.toggle),e.button.addEventListener("focus",e.focus),t.folds.push(e),t.folds.ref[e.element.id]=t.folds.length-1;}function T(e){return typeof e=="object"&&"schema"in e?e.schema:"[data-relapse]"}function R(e){let t=g({persist:!1,unique:!1,multiple:!1,schema:"data-relapse",fold:g({duration:200,easing:"ease-in-out"}),fade:g({duration:120,easing:"linear"}),classes:g({opened:"opened",disabled:"disabled",expanded:"expanded"})});if(typeof e=="object"){for(let i in e)if(i==="classes"||i==="fade"||i==="fold")for(let a in e[i])t[i][a]=e[i][a];else t[i]=e[i];"fade"in e&&"duration"in e.fade&&e.fade.duration!==t.fade.duration||t.fold.duration!==200&&(t.fade.duration=t.fold.duration-t.fold.duration/2.5);}return t}function A(e,t){let i=e.schema.length+1,a=g({fold:g(),fade:g(),classes:g()});for(let{nodeName:o,nodeValue:r}of t){if(!o.startsWith(e.schema))continue;let u=o.slice(i);if(u==="schema"){console.warn('Relapse: The "schema" option cannot be defined via attribute');continue}let p=r.trim(),b=`Invalid ${o} attribute value.`;if(u==="persist"||u==="multiple"||u==="unique")if(p==="true"||p==="false")a[u]=p==="true";else throw new TypeError(`Relapse: ${b}. Boolean expected, received: ${p}`);else if(u==="fold-duration"||u==="fade-duration"){if(isNaN(+p))throw new TypeError(`Relapse: ${b}. Number expected, received: ${p}`);{let[h,c]=u.split("-");a[h][c]=+p;}}else if(u.startsWith("class-")||u==="fold-easing"||u==="fade-easing"){let[h,c]=u.split("-");a[h][c]=p;}}!("fade"in a&&"duration"in a.fade&&a.fade.duration!==e.fade.duration)&&"fold"in a&&"duration"in a.fold&&a.fold.duration!==e.fold.duration&&(a.fade.duration=a.fold.duration-a.fold.duration/2.5);for(let o in a)if(o==="fold"||o==="classes"||o==="fade")for(let r in a[o])e[o][r]=a[o][r];else e[o]=a[o];return e}var x=function e(t,i){if(document.readyState==="loading"){addEventListener("DOMContentLoaded",()=>e(t,i));return}let a=typeof t=="object"&&"tagName"in t;if(a&&t instanceof NodeList)throw TypeError("Relapse: Invalid NodeList selector. Provide string or HTMLElement");if(a){let r=typeof t=="string"?document.body.querySelector(t):t;r!==null&&L(r,R(i));}else document.body.querySelectorAll(T(t)).forEach(r=>L(r,R(t)));let o=H(m.values());return a?o[o.length-1]:o};x.version="0.7.0";x.each=e=>m.forEach(e);x.has=e=>$(e)?e:[e].every(m.has);x.get=e=>typeof e=="string"?m.has(e)?m.get(e):null:$(e)?e.filter(t=>m.has(t)).map(t=>m.get(t)):H(m.values());window.relapse||Object.defineProperty(window,"relapse",{get(){return x}});var M=x;

export { M as default };

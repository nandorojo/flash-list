"use strict";(self.webpackChunkflash_list=self.webpackChunkflash_list||[]).push([[767],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),d=r,h=p["".concat(s,".").concat(d)]||p[d]||m[d]||i;return n?a.createElement(h,o(o({ref:t},u),{},{components:n})):a.createElement(h,o({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9959:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return p}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={},s=void 0,c={unversionedId:"fundamentals/metrics",id:"fundamentals/metrics",title:"metrics",description:"id: metrics",source:"@site/docs/fundamentals/metrics.md",sourceDirName:"fundamentals",slug:"/fundamentals/metrics",permalink:"/docs/fundamentals/metrics",editUrl:"https://github.com/shopify/flash-list/edit/main/docusaurus/docs/fundamentals/metrics.md",tags:[],version:"current",lastUpdatedBy:"Talha Naqvi",lastUpdatedAt:1653499911,formattedLastUpdatedAt:"5/25/2022",frontMatter:{},sidebar:"autoSidebar",previous:{title:"Estimated Item Size Prop",permalink:"/docs/estimated-item-size"},next:{title:"Writing performant components",permalink:"/docs/fundamentals/performant-components"}},u=[{value:"Metrics",id:"metrics",children:[{value:"Visible blank area",id:"visible-blank-area",children:[],level:3},{value:"Load time",id:"load-time",children:[],level:3},{value:"Sampling",id:"sampling",children:[],level:3}],level:2}],m={toc:u};function p(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"id: metrics\ntitle: Metrics\nslug: /metrics\nsidebar_position: 1"),(0,i.kt)("hr",null),(0,i.kt)("h2",{id:"metrics"},"Metrics"),(0,i.kt)("p",null,"FlashList enables you to track metrics in production that can give you more insight into how your app is doing in terms of performance. We recommend that you track the following in production:"),(0,i.kt)("h3",{id:"visible-blank-area"},"Visible blank area"),(0,i.kt)("p",null,"FlashList comes with a hook that can track cumulative and maximum blank space that the user experienced while scrolling the list. The cost of tracking this metric is minimal and you can implement it in the following way:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},"const MyComponent = () => {\n  // `any` is the type of data. You can mention the type of data that you're using with your FlashList implementation.\n  const ref = useRef<FlashList<any>>(null);\n\n  // The tracking will happen for the entire lifecycle of the list and the result object will always have the latest values.\n  // You can make a call when to ingest this data. We recommend that you ingest when the list unmounts.\n  const [blankAreaTrackerResult, onBlankArea] = useBlankAreaTracker(ref);\n  useEffect(() => {\n    return () => {\n      // When component is being cleaned up, you can ingest the result into your analytics system.\n      // blankAreaTrackerResult has two fields - `cumulativeBlankArea` and `maxBlankArea`. `cumulativeBlankArea` is the total blank area that the user has seen while scrolling the list.\n      // maxBlankArea is the maximum blank area that the user has seen while scrolling the list.\n      ingestData(blankAreaTrackerResult);\n    };\n  }, []);\n\n  // pass the listener returned by the hook to FlashList\n  return <FlashList {...props} ref={ref} onBlankArea={onBlankArea} />;\n};\n")),(0,i.kt)("p",null,"You can rest assured when you see close to zero blank space in production. If you're not happy with the numbers, please refer to our ",(0,i.kt)("a",{parentName:"p",href:"/docs/performance-troubleshooting"},"performance troubleshooting guide")," which can help you optimize your list's performance."),(0,i.kt)("h3",{id:"load-time"},"Load time"),(0,i.kt)("p",null,"FlashList has a built in ",(0,i.kt)("inlineCode",{parentName:"p"},"onLoad")," event that you can use to track the time taken to load the list. This tracks elapsed time from the point the list was created to the time when it's children are visible to the user."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},'const MyComponent = () => {\n    const onLoadListener = useCallback(({ elapsedTimeInMs } ) => {\n        ingestData("Sample List load time", elapsedTimeInMs);\n    }, []);\n    return <FlashList {...props} onLoad={onLoadListener} />;\n')),(0,i.kt)("h3",{id:"sampling"},"Sampling"),(0,i.kt)("p",null,"Please note that you can always sample data collected by your implementation. It's possible to get an accurate picture of how your app is performing by collecting data from a subset of users. This is important incase you want to limit how much data you collect."))}p.isMDXComponent=!0}}]);
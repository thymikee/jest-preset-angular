"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2274],{8070:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>d,default:()=>p,frontMatter:()=>i,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"getting-started/presets","title":"Presets","description":"The presets","source":"@site/versioned_docs/version-8.x/getting-started/presets.md","sourceDirName":"getting-started","slug":"/getting-started/presets","permalink":"/jest-preset-angular/docs/8.x/getting-started/presets","draft":false,"unlisted":false,"editUrl":"https://github.com/thymikee/jest-preset-angular/edit/main/website/versioned_docs/version-8.x/getting-started/presets.md","tags":[],"version":"8.x","lastUpdatedBy":"ahnpnl","lastUpdatedAt":1733231842000,"frontMatter":{"id":"presets","title":"Presets"},"sidebar":"docs","previous":{"title":"Installation","permalink":"/jest-preset-angular/docs/8.x/getting-started/installation"},"next":{"title":"Options","permalink":"/jest-preset-angular/docs/8.x/getting-started/options"}}');var r=s(4848),o=s(8453);const i={id:"presets",title:"Presets"},d=void 0,a={},c=[{value:"The presets",id:"the-presets",level:3},{value:"Basic usage",id:"basic-usage",level:3},{value:"Advanced",id:"advanced",level:3}];function l(e){const t={admonition:"admonition",code:"code",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h3,{id:"the-presets",children:"The presets"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.code,{children:"jest-preset-angular"})," comes with a preset, covering most of the project's base configuration:"]}),"\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"Preset name"}),(0,r.jsx)(t.th,{children:"Description"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:"jest-preset-angular"})}),(0,r.jsxs)(t.td,{children:["TypeScript, JavaScript and HTML files (",(0,r.jsx)(t.code,{children:"js"}),", ",(0,r.jsx)(t.code,{children:".ts"}),", ",(0,r.jsx)(t.code,{children:".html"}),") will be transformed by ",(0,r.jsx)(t.code,{children:"ts-jest"})," to ",(0,r.jsx)(t.strong,{children:"CommonJS"})," syntax."]})]})})]}),"\n",(0,r.jsx)(t.h3,{id:"basic-usage",children:"Basic usage"}),"\n",(0,r.jsxs)(t.p,{children:["In most cases, simply setting the ",(0,r.jsx)(t.code,{children:"preset"})," key to the desired preset name in your Jest config should be enough to start\nusing TypeScript with Jest (assuming you added ",(0,r.jsx)(t.code,{children:"jest-preset-angular"})," to your ",(0,r.jsx)(t.code,{children:"devDependencies"})," of course):"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"// jest.config.js\nmodule.exports = {\n  // [...]\n  preset: 'jest-preset-angular',\n};\n"})}),"\n",(0,r.jsx)(t.h3,{id:"advanced",children:"Advanced"}),"\n",(0,r.jsxs)(t.p,{children:["All presets come with default ",(0,r.jsx)(t.code,{children:"ts-jest"})," config options.\nIf you want to override any of the options, you'll need to use the JavaScript version of Jest config,\ncopy the original options and override the options you need:"]}),"\n",(0,r.jsx)(t.admonition,{type:"important",children:(0,r.jsxs)(t.p,{children:["If you choose to override ",(0,r.jsx)(t.code,{children:"globals"})," in order to point at a specific tsconfig, you will need to make sure that original ",(0,r.jsx)(t.code,{children:"ts-jest"}),"\noptions provided through the default preset are defined to the ",(0,r.jsx)(t.code,{children:"globals.ts-jest"})," section too, otherwise you will get\nerrors."]})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"// jest.config.js\nconst { defaults: jestNgPreset } = require('jest-preset-angular');\n\nmodule.exports = {\n  // [...]\n  globals: {\n    'ts-jest': {\n      ...jestNgPreset.globals['ts-jest'],\n      // [...your overriden options]\n    },\n  },\n};\n"})})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>i,x:()=>d});var n=s(6540);const r={},o=n.createContext(r);function i(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9829],{5104:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>g,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var t=s(4848),r=s(8453),a=s(9489),o=s(7227);const i={id:"angular-13+",title:"Angular >=13"},l=void 0,u={id:"guides/angular-13+",title:"Angular >=13",description:"Angular 13 introduces ESM package format for Angular packages. jest-preset-angular",source:"@site/versioned_docs/version-13.0/guides/angular-13+.md",sourceDirName:"guides",slug:"/guides/angular-13+",permalink:"/jest-preset-angular/docs/13.0/guides/angular-13+",draft:!1,unlisted:!1,editUrl:"https://github.com/thymikee/jest-preset-angular/edit/main/website/versioned_docs/version-13.0/guides/angular-13+.md",tags:[],version:"13.0",lastUpdatedBy:"renovate[bot]",lastUpdatedAt:1729578451e3,frontMatter:{id:"angular-13+",title:"Angular >=13"},sidebar:"docs",previous:{title:"Angular Ivy",permalink:"/jest-preset-angular/docs/13.0/guides/angular-ivy"},next:{title:"ESM Support",permalink:"/jest-preset-angular/docs/13.0/guides/esm-support"}},c={},d=[{value:"Migration steps from Angular &lt; 13",id:"migration-steps-from-angular--13",level:2},{value:"Using ES Modules",id:"using-es-modules",level:3},{value:"Potential issues with Angular 13 ESM package format and workaround",id:"potential-issues-with-angular-13-esm-package-format-and-workaround",level:2},{value:"<code>Cannot find modules</code> error when importing any deep paths from Angular ESM format packages",id:"cannot-find-modules-error-when-importing-any-deep-paths-from-angular-esm-format-packages",level:3},{value:"Usage with Angular libraries which are built with Angular CLI 13",id:"usage-with-angular-libraries-which-are-built-with-angular-cli-13",level:3},{value:"Usage with Ionic 6 or 7",id:"usage-with-ionic-6-or-7",level:3}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Angular 13"})," introduces ESM package format for Angular packages. ",(0,t.jsx)(n.code,{children:"jest-preset-angular"}),"\ncurrently supports testing with Jest in ",(0,t.jsx)(n.code,{children:"CommonJS"})," mode with ",(0,t.jsx)(n.strong,{children:"Angular 13"})," using ",(0,t.jsx)(n.a,{href:"/jest-preset-angular/docs/13.0/getting-started/presets",children:"default preset"}),"."]}),"\n",(0,t.jsx)(n.admonition,{type:"important",children:(0,t.jsxs)(n.p,{children:["With Jest 28 and ",(0,t.jsx)(n.code,{children:"jest-preset-angular"})," ",(0,t.jsx)(n.strong,{children:"v12.0.0"}),", ",(0,t.jsx)(n.code,{children:"ng-jest-resolver"})," is no longer required to have in Jest config. This\nresolver is also excluded from our default and default ESM presets."]})}),"\n",(0,t.jsxs)(n.p,{children:["Starting from ",(0,t.jsx)(n.strong,{children:"v11.0.0"}),", ",(0,t.jsx)(n.code,{children:"jest-preset-angular"})," introduces a few extra changes to be able to run Jest with ",(0,t.jsx)(n.strong,{children:"Angular 13"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"moduleFileExtensions"})," is updated to include ",(0,t.jsx)(n.code,{children:"mjs"})," files as accepted module format."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"transformIgnorePatterns"})," is added to inform Jest to transform ",(0,t.jsx)(n.code,{children:".mjs"})," files."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"transform"})," is updated to include ",(0,t.jsx)(n.code,{children:".mjs"})," extension to transform to ",(0,t.jsx)(n.code,{children:"CommonJS"})," codes."]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"migration-steps-from-angular--13",children:"Migration steps from Angular < 13"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Upgrade the project to ",(0,t.jsx)(n.strong,{children:"Angular 13"})," following ",(0,t.jsx)(n.a,{href:"https://update.angular.io/",children:"guide"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"If one is using the default preset as following:"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(a.A,{groupId:"code-examples",children:[(0,t.jsx)(o.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:"tab",children:"// jest.config.js\nmodule.exports = {\n  preset: 'jest-preset-angular',\n};\n"})})}),(0,t.jsx)(o.A,{value:"ts",label:"TypeScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:"tab",children:"// jest.config.ts\nimport type { Config } from 'jest';\n\nconst jestConfig: Config = {\n  preset: 'jest-preset-angular',\n};\n\nexport default jestConfig;\n"})})})]}),"\n",(0,t.jsx)(n.p,{children:"there are no migration steps required"}),"\n",(0,t.jsx)(n.h3,{id:"using-es-modules",children:"Using ES Modules"}),"\n",(0,t.jsxs)(n.p,{children:["ES Modules support is new and may encounter issues. See ",(0,t.jsx)(n.a,{href:"https://github.com/thymikee/jest-preset-angular/tree/main/examples/example-app-v13",children:"example-app-v13"})," for an example with tests that run using ESM, and using ESM + isolated."]}),"\n",(0,t.jsxs)(n.p,{children:["Your ",(0,t.jsx)(n.code,{children:"jest.config.js"})," should be changed to something like:"]}),"\n",(0,t.jsxs)(a.A,{groupId:"code-examples",children:[(0,t.jsx)(o.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:"tab",children:"// jest.config.js\nconst { pathsToModuleNameMapper } = require('ts-jest/utils');\nconst { paths } = require('./tsconfig.json').compilerOptions;\n\n/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */\nmodule.exports = {\n  preset: 'jest-preset-angular/presets/defaults-esm',\n  transform: {\n    '^.+\\\\.(ts|js|html|svg)$': [\n      'jest-preset-angular',\n      {\n        tsconfig: '<rootDir>/tsconfig-esm.spec.json',\n        stringifyContentPathRegex: '\\\\.(html|svg)$',\n        isolatedModules: true,\n        useESM: true,\n      },\n    ],\n  },\n  moduleNameMapper: {\n    ...pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),\n    tslib: 'tslib/tslib.es6.js',\n  },\n  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],\n};\n"})})}),(0,t.jsx)(o.A,{value:"ts",label:"TypeScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:"tab",children:"// jest.config.ts\nimport type { Config } from 'jest';\nimport { pathsToModuleNameMapper } from 'ts-jest';\nimport { compilerOptions } from './tsconfig.json';\n\nconst jestConfig: Config = {\n  preset: 'jest-preset-angular/presets/defaults-esm',\n  transform: {\n    '^.+\\\\.(ts|js|html|svg)$': [\n      'jest-preset-angular',\n      {\n        tsconfig: '<rootDir>/tsconfig-esm.spec.json',\n        stringifyContentPathRegex: '\\\\.(html|svg)$',\n        isolatedModules: true,\n        useESM: true,\n      },\n    ],\n  },\n  moduleNameMapper: {\n    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),\n    tslib: 'tslib/tslib.es6.js',\n  },\n  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],\n};\n\nexport default jestConfig;\n"})})})]}),"\n",(0,t.jsxs)(n.p,{children:["Before upgrading to ng13 and switching to ES Modules, your ",(0,t.jsx)(n.code,{children:"setup-jest.ts"})," file most likely uses the preset ",(0,t.jsx)(n.code,{children:"setup-jest"}),", like the following:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"// setup-jest.ts\nimport 'jest-preset-angular/setup-jest';\n"})}),"\n",(0,t.jsx)(n.p,{children:"or for ESM mode"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"// setup-jest.ts\nimport 'jest-preset-angular/setup-jest.mjs';\n"})}),"\n",(0,t.jsx)(n.h2,{id:"potential-issues-with-angular-13-esm-package-format-and-workaround",children:"Potential issues with Angular 13 ESM package format and workaround"}),"\n",(0,t.jsxs)(n.h3,{id:"cannot-find-modules-error-when-importing-any-deep-paths-from-angular-esm-format-packages",children:[(0,t.jsx)(n.code,{children:"Cannot find modules"})," error when importing any deep paths from Angular ESM format packages"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"Cannot find module '@angular/common/locales/xx' from 'src/app/app.component.spec.ts'\n"})}),"\n",(0,t.jsxs)(n.p,{children:["To fix this issue, one needs to add ",(0,t.jsx)(n.code,{children:"mjs"})," to ",(0,t.jsx)(n.code,{children:"moduleFileExtensions"})," as following"]}),"\n",(0,t.jsxs)(a.A,{groupId:"code-examples",children:[(0,t.jsx)(o.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:"tab",children:"// jest.config.js\nmodule.exports = {\n  // ...other options\n  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],\n};\n"})})}),(0,t.jsx)(o.A,{value:"ts",label:"TypeScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:"tab",children:"// jest.config.ts\nimport type { Config } from 'jest';\n\nconst jestConfig: Config = {\n  // ...other options\n  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],\n};\n\nexport default jestConfig;\n"})})})]}),"\n",(0,t.jsx)(n.h3,{id:"usage-with-angular-libraries-which-are-built-with-angular-cli-13",children:"Usage with Angular libraries which are built with Angular CLI 13"}),"\n",(0,t.jsxs)(n.p,{children:["Besides, the changes in Angular packages themselves, ",(0,t.jsx)(n.strong,{children:"Angular"})," libraries which are built with ",(0,t.jsx)(n.strong,{children:"Angular CLI 13"})," also introduce\nESM package format. Similar to Angular packages, Jest doesn't understand ",(0,t.jsx)(n.code,{children:".mjs"})," files which are in these new format\nlibraries in Jest ",(0,t.jsx)(n.strong,{children:"CommonJS"})," mode."]}),"\n",(0,t.jsxs)(n.p,{children:["To fix this issue, one should modify ",(0,t.jsx)(n.code,{children:"transformIgnorePatterns"})," to be as following:"]}),"\n",(0,t.jsxs)(a.A,{groupId:"code-examples",children:[(0,t.jsx)(o.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:"tab",children:"// jest.config.js\nmodule.exports = {\n  // ...other options\n  transformIgnorePatterns: ['node_modules/(?!.*\\\\.mjs$)'],\n};\n"})})}),(0,t.jsx)(o.A,{value:"ts",label:"TypeScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:"tab",children:"// jest.config.ts\nimport type { Config } from 'jest';\n\nconst jestConfig: Config = {\n  // ...other options\n  transformIgnorePatterns: ['node_modules/(?!.*\\\\.mjs$)'],\n};\n\nexport default jestConfig;\n"})})})]}),"\n",(0,t.jsx)(n.h3,{id:"usage-with-ionic-6-or-7",children:"Usage with Ionic 6 or 7"}),"\n",(0,t.jsxs)(n.p,{children:["To support Ionic 6 or 7 you will need to modify ",(0,t.jsx)(n.code,{children:"transformIgnorePatterns"})," to be as following:"]}),"\n",(0,t.jsxs)(a.A,{groupId:"code-examples",children:[(0,t.jsx)(o.A,{value:"js",label:"JavaScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",metastring:"tab",children:"// jest.config.js\nmodule.exports = {\n  // ...other options\n  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@ionic/core|@ionic/angular|@stencil/core|.*\\\\.mjs$))'],\n};\n"})})}),(0,t.jsx)(o.A,{value:"ts",label:"TypeScript",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",metastring:"tab",children:"// jest.config.ts\nimport type { Config } from 'jest';\n\nconst jestConfig: Config = {\n  // ...other options\n  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@ionic/core|@ionic/angular|@stencil/core|.*\\\\.mjs$))'],\n};\n\nexport default jestConfig;\n"})})})]})]})}function g(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},7227:(e,n,s)=>{s.d(n,{A:()=>o});s(6540);var t=s(4164);const r={tabItem:"tabItem_Ymn6"};var a=s(4848);function o(e){let{children:n,hidden:s,className:o}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,t.A)(r.tabItem,o),hidden:s,children:n})}},9489:(e,n,s)=>{s.d(n,{A:()=>A});var t=s(6540),r=s(4164),a=s(4245),o=s(6347),i=s(6494),l=s(2814),u=s(5167),c=s(9900);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:s}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:s,attributes:t,default:r}}=e;return{value:n,label:s,attributes:t,default:r}}))}(s);return function(e){const n=(0,u.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,s])}function g(e){let{value:n,tabValues:s}=e;return s.some((e=>e.value===n))}function h(e){let{queryString:n=!1,groupId:s}=e;const r=(0,o.W6)(),a=function(e){let{queryString:n=!1,groupId:s}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!s)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return s??null}({queryString:n,groupId:s});return[(0,l.aZ)(a),(0,t.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(r.location.search);n.set(a,e),r.replace({...r.location,search:n.toString()})}),[a,r])]}function m(e){const{defaultValue:n,queryString:s=!1,groupId:r}=e,a=p(e),[o,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:s}=e;if(0===s.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!g({value:n,tabValues:s}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${s.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=s.find((e=>e.default))??s[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:a}))),[u,d]=h({queryString:s,groupId:r}),[m,j]=function(e){let{groupId:n}=e;const s=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,a]=(0,c.Dv)(s);return[r,(0,t.useCallback)((e=>{s&&a.set(e)}),[s,a])]}({groupId:r}),f=(()=>{const e=u??m;return g({value:e,tabValues:a})?e:null})();(0,i.A)((()=>{f&&l(f)}),[f]);return{selectedValue:o,selectValue:(0,t.useCallback)((e=>{if(!g({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),j(e)}),[d,j,a]),tabValues:a}}var j=s(1062);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=s(4848);function b(e){let{className:n,block:s,selectedValue:t,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:u}=(0,a.a_)(),c=e=>{const n=e.currentTarget,s=l.indexOf(n),r=i[s].value;r!==t&&(u(n),o(r))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const s=l.indexOf(e.currentTarget)+1;n=l[s]??l[0];break}case"ArrowLeft":{const s=l.indexOf(e.currentTarget)-1;n=l[s]??l[l.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":s},n),children:i.map((e=>{let{value:n,label:s,attributes:a}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>l.push(e),onKeyDown:d,onClick:c,...a,className:(0,r.A)("tabs__item",f.tabItem,a?.className,{"tabs__item--active":t===n}),children:s??n},n)}))})}function v(e){let{lazy:n,children:s,selectedValue:a}=e;const o=(Array.isArray(s)?s:[s]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===a));return e?(0,t.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function w(e){const n=m(e);return(0,x.jsxs)("div",{className:(0,r.A)("tabs-container",f.tabList),children:[(0,x.jsx)(b,{...n,...e}),(0,x.jsx)(v,{...n,...e})]})}function A(e){const n=(0,j.A)();return(0,x.jsx)(w,{...e,children:d(e.children)},String(n))}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>i});var t=s(6540);const r={},a=t.createContext(r);function o(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);
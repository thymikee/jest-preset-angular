"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3624],{3410:(e,s,t)=>{t.r(s),t.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var n=t(5893),o=t(1151);const r={id:"esm-support",title:"ESM Support"},i=void 0,a={id:"guides/esm-support",title:"ESM Support",description:"To use jest-preset-angular with ESM support, you'll first need to check ESM Jest documentation.",source:"@site/versioned_docs/version-11.1/guides/esm-support.md",sourceDirName:"guides",slug:"/guides/esm-support",permalink:"/jest-preset-angular/docs/11.1/guides/esm-support",draft:!1,unlisted:!1,editUrl:"https://github.com/thymikee/jest-preset-angular/edit/main/website/versioned_docs/version-11.1/guides/esm-support.md",tags:[],version:"11.1",lastUpdatedBy:"renovate[bot]",lastUpdatedAt:1715057094e3,frontMatter:{id:"esm-support",title:"ESM Support"},sidebar:"docs",previous:{title:"Angular >=13",permalink:"/jest-preset-angular/docs/11.1/guides/angular-13+"},next:{title:"Configure other JSDOM versions",permalink:"/jest-preset-angular/docs/11.1/guides/jsdom-version"}},l={},c=[{value:"Examples",id:"examples",level:3},{value:"Manual configuration",id:"manual-configuration",level:4},{value:"Use ESM presets",id:"use-esm-presets",level:4}];function d(e){const s={a:"a",admonition:"admonition",code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(s.p,{children:["To use ",(0,n.jsx)(s.code,{children:"jest-preset-angular"})," with ESM support, you'll first need to check ",(0,n.jsx)(s.a,{href:"https://jestjs.io/docs/en/ecmascript-modules",children:"ESM Jest documentation"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:[(0,n.jsx)(s.code,{children:"jest-preset-angular"})," supports ESM via a ",(0,n.jsx)(s.code,{children:"ts-jest"})," config option ",(0,n.jsx)(s.a,{href:"https://kulshekhar.github.io/ts-jest/docs/getting-started/options/useESM",children:"useESM"})," in combination with jest config option ",(0,n.jsx)(s.a,{href:"https://jestjs.io/docs/en/configuration#extensionstotreatasesm-arraystring",children:"extensionsToTreatAsEsm"}),"."]}),"\n",(0,n.jsxs)(s.p,{children:["There is also a ",(0,n.jsx)(s.a,{href:"/jest-preset-angular/docs/11.1/getting-started/presets",children:"preset"})," to work with ESM."]}),"\n",(0,n.jsx)(s.admonition,{type:"tip",children:(0,n.jsxs)(s.p,{children:["We have ",(0,n.jsx)(s.a,{href:"https://github.com/thymikee/jest-preset-angular/tree/main/examples",children:"example apps"})," which contains base ESM setup to work with Jest and Angular."]})}),"\n",(0,n.jsx)(s.h3,{id:"examples",children:"Examples"}),"\n",(0,n.jsx)(s.h4,{id:"manual-configuration",children:"Manual configuration"}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"// jest.config.js\nmodule.exports = {\n  // [...]\n  extensionsToTreatAsEsm: ['.ts'],\n  globals: {\n    'ts-jest': {\n      tsconfig: '<rootDir>/tsconfig.spec.json',\n      stringifyContentPathRegex: '\\\\.html$',\n      useESM: true,\n    },\n  },\n};\n"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-json",children:'// OR package.json\n{\n  // [...]\n  "jest": {\n    "extensionsToTreatAsEsm": [".ts"],\n    "globals": {\n      "ts-jest": {\n        "tsconfig": "<rootDir>/tsconfig.spec.json",\n        "stringifyContentPathRegex": "\\\\.html$",\n        "useESM": true\n      }\n    }\n  }\n}\n'})}),"\n",(0,n.jsx)(s.h4,{id:"use-esm-presets",children:"Use ESM presets"}),"\n",(0,n.jsxs)(s.admonition,{type:"tip",children:[(0,n.jsxs)(s.p,{children:["Jest will attempt to load ",(0,n.jsx)(s.strong,{children:"ESM"})," files from ",(0,n.jsx)(s.code,{children:"node_modules"})," with default ",(0,n.jsx)(s.code,{children:"jest-resolve"})," which usually works for most of the cases.\nHowever, there are cases like Angular libraries ",(0,n.jsx)(s.strong,{children:"ESM"})," built files or ",(0,n.jsx)(s.strong,{children:"ESM"})," files which are outside ",(0,n.jsx)(s.code,{children:"node_modules"})," might not be loaded\ncorrectly."]}),(0,n.jsxs)(s.p,{children:["To fix that, one can use ",(0,n.jsx)(s.code,{children:"moduleNameMapper"})," in jest config to instruct Jest to load the correct ",(0,n.jsx)(s.strong,{children:"ESM"})," files or create a\ncustom Jest ",(0,n.jsx)(s.a,{href:"https://jestjs.io/docs/configuration#resolver-string",children:"resolver"}),"."]})]}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-js",children:"// jest.config.js\nmodule.exports = {\n  // [...]\n  preset: 'jest-preset-angular/presets/defaults-esm',\n};\n"})}),"\n",(0,n.jsx)(s.pre,{children:(0,n.jsx)(s.code,{className:"language-json",children:'// OR package.json\n{\n  // [...]\n  "jest": {\n    "preset": "jest-preset-angular/presets/defaults-esm"\n  }\n}\n'})})]})}function u(e={}){const{wrapper:s}={...(0,o.a)(),...e.components};return s?(0,n.jsx)(s,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},1151:(e,s,t)=>{t.d(s,{Z:()=>a,a:()=>i});var n=t(7294);const o={},r=n.createContext(o);function i(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);
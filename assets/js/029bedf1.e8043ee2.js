"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7785],{4996:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var t=s(5893),i=s(1151);const o={id:"using-with-babel",title:"Using with Babel"},l=void 0,r={id:"guides/using-with-babel",title:"Using with Babel",description:"If you wish to use Babel, you need to say jest to transpile such files manually.",source:"@site/versioned_docs/version-11.1/guides/using-with-babel.md",sourceDirName:"guides",slug:"/guides/using-with-babel",permalink:"/jest-preset-angular/docs/11.1/guides/using-with-babel",draft:!1,unlisted:!1,editUrl:"https://github.com/thymikee/jest-preset-angular/edit/main/website/versioned_docs/version-11.1/guides/using-with-babel.md",tags:[],version:"11.1",lastUpdatedBy:"ahnpnl",lastUpdatedAt:1715673735e3,frontMatter:{id:"using-with-babel",title:"Using with Babel"},sidebar:"docs",previous:{title:"Configure other JSDOM versions",permalink:"/jest-preset-angular/docs/11.1/guides/jsdom-version"},next:{title:"Absolute Imports",permalink:"/jest-preset-angular/docs/11.1/guides/absolute-imports"}},a={},c=[];function d(e){const n={a:"a",code:"code",em:"em",li:"li",ol:"ol",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["If you wish to use ",(0,t.jsx)(n.code,{children:"Babel"}),", you need to say jest to transpile such files manually."]}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Install dependencies required by the official Jest documentation for ",(0,t.jsx)(n.a,{href:"https://jest-bot.github.io/jest/docs/babel.html",children:"Babel integration"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Install ",(0,t.jsx)(n.code,{children:"@babel/preset-env"})," and add ",(0,t.jsx)(n.code,{children:"babel.config.js"})," (or modify existing if needed) with the following content:"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"module.exports = function (api) {\n  api.cache(true);\n\n  const presets = ['@babel/preset-env'];\n  const plugins = [];\n\n  return {\n    presets,\n    plugins,\n  };\n};\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.em,{children:["Note: do not use a ",(0,t.jsx)(n.code,{children:".babelrc"})," file otherwise the packages that you specify in the next step will not be picked up. CF ",(0,t.jsx)(n.a,{href:"https://babeljs.io/docs/en/configuration#what-s-your-use-case",children:"Babel documentation"})," and the comment ",(0,t.jsx)(n.code,{children:"You want to compile node_modules? babel.config.js is for you!"})]}),"."]}),"\n",(0,t.jsxs)(n.ol,{start:"3",children:["\n",(0,t.jsx)(n.li,{children:"Update Jest configuration (by default TypeScript process untranspiled JS files which is source of the problem):"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:"module.exports = {\n  transform: {\n    '^.+\\\\.(ts|html)$': 'jest-preset-angular',\n    '^.+\\\\.js$': 'babel-jest',\n  },\n};\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>l});var t=s(7294);const i={},o=t.createContext(i);function l(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9631],{4807:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>d,default:()=>m,frontMatter:()=>c,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"getting-started/test-environment","title":"Test environment","description":"In Jest, a test environment defines the sandbox context in which your tests run.","source":"@site/docs/getting-started/test-environment.md","sourceDirName":"getting-started","slug":"/getting-started/test-environment","permalink":"/jest-preset-angular/docs/next/getting-started/test-environment","draft":false,"unlisted":false,"editUrl":"https://github.com/thymikee/jest-preset-angular/edit/main/website/docs/getting-started/test-environment.md","tags":[],"version":"current","lastUpdatedBy":"ahnpnl","lastUpdatedAt":1731669028000,"frontMatter":{"id":"test-environment","title":"Test environment"},"sidebar":"docs","previous":{"title":"Options","permalink":"/jest-preset-angular/docs/next/getting-started/options"},"next":{"title":"Angular Ivy","permalink":"/jest-preset-angular/docs/next/guides/angular-ivy"}}');var i=t(4848),r=t(8453),o=t(9489),l=t(7227),a=t(1574);const c={id:"test-environment",title:"Test environment"},d=void 0,p={},h=[{value:"Methods",id:"methods",level:2},{value:"<code>setupZoneTestEnv(options)</code>",id:"setupzonetestenvoptions",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Example:",id:"example",level:4},{value:"<code>setupZonelessTestEnv(options)</code>",id:"setupzonelesstestenvoptions",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Example:",id:"example-1",level:4}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"In Jest, a test environment defines the sandbox context in which your tests run.\nFor Angular projects, setting up the correct test environment is essential to ensure compatibility with the\nframework-specific features, such as dependency injection and change detection."}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"jest-preset-angular"})," provides utility functions to simplify setting up a Jest test environment tailored for Angular projects.\nThese functions support both ",(0,i.jsx)(n.strong,{children:"zone-based"})," and ",(0,i.jsx)(n.strong,{children:"zoneless"})," environments, catering to different testing needs."]}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n","\n",(0,i.jsx)(a.A,{toc:h.slice(1)}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"setupzonetestenvoptions",children:(0,i.jsx)(n.code,{children:"setupZoneTestEnv(options)"})}),"\n",(0,i.jsxs)(n.p,{children:["Configures a test environment that uses ",(0,i.jsx)(n.code,{children:"zone.js"}),", which is the mechanism for tracking asynchronous operations.\nIt is suitable for most Angular applications that rely on ",(0,i.jsx)(n.code,{children:"zone.js"})," for change detection and other framework features."]}),"\n",(0,i.jsx)(n.p,{children:"You can customize the environment by providing options as function arguments."}),"\n",(0,i.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"options"}),(0,i.jsx)(n.strong,{children:"(optional)"}),": An object follows ",(0,i.jsx)(n.a,{href:"https://github.com/angular/angular/blob/a55341b1ab8d2bc4285a4cce59df7fc0b23c0125/packages/core/testing/src/test_bed_common.ts#L95",children:"TestEnvironmentOptions interface"}),", which allows fine-tuning the environment."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"example",children:"Example:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Create a Jest setup file:"}),"\n"]}),"\n",(0,i.jsxs)(o.A,{groupId:"code-examples",children:[(0,i.jsx)(l.A,{value:"typescript-cjs",label:"TypeScript CJS",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'tab={"label": "TypeScript CJS"}',children:"// setup-jest.ts\nimport { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';\n\nsetupZoneTestEnv({\n  //...options\n});\n"})})}),(0,i.jsx)(l.A,{value:"typescript-esm",label:"TypeScript ESM",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'tab={"label": "TypeScript ESM"}',children:"// setup-jest.ts\nimport { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone/index.mjs';\n\nsetupZoneTestEnv({\n  //...options\n});\n"})})})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Update your Jest configuration:"}),"\n"]}),"\n",(0,i.jsxs)(o.A,{groupId:"code-examples",children:[(0,i.jsx)(l.A,{value:"typescript-cjs",label:"TypeScript CJS",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'tab={"label": "TypeScript CJS"}',children:"// jest.config.ts\nimport type { Config } from 'jest';\n\nconst jestConfig: Config = {\n  preset: 'jest-preset-angular',\n  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],\n};\n\nexport default jestConfig;\n"})})}),(0,i.jsx)(l.A,{value:"typescript-esm",label:"TypeScript ESM",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'tab={"label": "TypeScript ESM"}',children:"// jest.config.mts\nimport type { Config } from 'jest';\n\nconst jestConfig: Config = {\n  preset: 'jest-preset-angular',\n  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],\n};\n\nexport default jestConfig;\n"})})})]}),"\n",(0,i.jsx)(n.h3,{id:"setupzonelesstestenvoptions",children:(0,i.jsx)(n.code,{children:"setupZonelessTestEnv(options)"})}),"\n",(0,i.jsxs)(n.p,{children:["Configures a test environment that ",(0,i.jsx)(n.strong,{children:"DOESN'T"})," use ",(0,i.jsx)(n.code,{children:"zone.js"}),", as described in ",(0,i.jsx)(n.a,{href:"https://angular.dev/guide/experimental/zoneless",children:"Angular experimental zoneless guide"}),".\nIt is designed for projects that have disabled ",(0,i.jsx)(n.code,{children:"zone.js"}),", which can lead to improved performance and simplified testing."]}),"\n",(0,i.jsx)(n.admonition,{type:"important",children:(0,i.jsxs)(n.p,{children:["This function is only supported in Jest ",(0,i.jsx)(n.code,{children:"ESM"})," mode in ",(0,i.jsx)(n.a,{href:"https://github.com/jestjs/jest/issues/10962",children:"Jest 29"}),". Jest 30+ will support to use for ",(0,i.jsx)(n.code,{children:"CommonJS"})," mode."]})}),"\n",(0,i.jsx)(n.p,{children:"You can customize the environment by providing options as function arguments."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"options"}),(0,i.jsx)(n.strong,{children:"(optional)"}),": An object follows ",(0,i.jsx)(n.a,{href:"https://github.com/angular/angular/blob/a55341b1ab8d2bc4285a4cce59df7fc0b23c0125/packages/core/testing/src/test_bed_common.ts#L95",children:"TestEnvironmentOptions interface"}),", which allows fine-tuning the environment."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"example-1",children:"Example:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Create a Jest setup file:"}),"\n"]}),"\n",(0,i.jsx)(o.A,{groupId:"code-examples",children:(0,i.jsx)(l.A,{value:"typescript-esm",label:"TypeScript ESM",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'tab={"label": "TypeScript ESM"}',children:"// setup-jest.ts\nimport { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless/index.mjs';\n\nsetupZonelessTestEnv({\n  //...options\n});\n"})})})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Update your Jest configuration:"}),"\n"]}),"\n",(0,i.jsx)(o.A,{groupId:"code-examples",children:(0,i.jsx)(l.A,{value:"typescript-esm",label:"TypeScript ESM",children:(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",metastring:'tab={"label": "TypeScript ESM"}',children:"// jest.config.mts\nimport type { Config } from 'jest';\n\nconst jestConfig: Config = {\n  preset: 'jest-preset-angular',\n  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],\n};\n\nexport default jestConfig;\n"})})})})]})}function m(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}}}]);
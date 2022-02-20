/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-engines",
factory: function (require) {
var plugin=(()=>{var m=Object.create,i=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var u=Object.getPrototypeOf,g=Object.prototype.hasOwnProperty;var P=e=>i(e,"__esModule",{value:!0});var n=e=>{if(typeof require!="undefined")return require(e);throw new Error('Dynamic require of "'+e+'" is not supported')};var h=(e,o)=>{for(var r in o)i(e,r,{get:o[r],enumerable:!0})},k=(e,o,r)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of v(o))!g.call(e,s)&&s!=="default"&&i(e,s,{get:()=>o[s],enumerable:!(r=l(o,s))||r.enumerable});return e},t=e=>k(P(i(e!=null?m(u(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var N={};h(N,{default:()=>y});var a=t(n("@yarnpkg/core")),c=t(n("@yarnpkg/fslib")),p=t(n("fs")),d=t(n("path")),f=t(n("semver")),j={hooks:{validateProject:e=>{let o=(0,p.readFileSync)((0,d.resolve)(c.npath.fromPortablePath(e.cwd),"package.json"),"utf-8"),{engines:r={}}=JSON.parse(o);if(r.node!=null&&!(0,f.satisfies)(process.version,r.node))throw new a.ReportError(a.MessageName.UNNAMED,`The current node version ${process.version} does not satisfy the required version ${r.node}.`)},setupScriptEnvironment:async e=>{let o=(0,p.readFileSync)((0,d.resolve)(c.npath.fromPortablePath(e.cwd),"package.json"),"utf-8"),{engines:r={}}=JSON.parse(o);r.node!=null&&!(0,f.satisfies)(process.version,r.node)&&(console.error(`The current node version ${process.version} does not satisfy the required version ${r.node}.`),process.exit(1))}}},y=j;return N;})();
return plugin;
}
};

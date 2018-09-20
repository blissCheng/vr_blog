//使图片css可导入
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.less' {
  const content: {[className: string]: string};
  export = content;
}
declare module '*.css'
declare module 'jquery'
declare module 'marked'
declare module 'react-redux'


interface PageData {
  path: string;
  component: any;
  name: string;
}
interface Qs {
  [key: string]: any
}
interface ReducerIdentityFn {
  <T>(state: T, action: any): T
}

interface Action {
  text: string;
}
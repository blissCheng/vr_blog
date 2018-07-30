import { ReactChildren } from "react";

//使图片css可导入
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.less' {
  const content: {[className: string]: string};
  export = content;
}


interface PageData {
  path: string;
  component: ReactChildren;
  name: string;
}
interface Qs {
  [key: string]: any
}
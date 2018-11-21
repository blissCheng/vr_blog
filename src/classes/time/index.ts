//Time class
export class Time {
  
  constructor() {

  };
  //target 根据此字段进行划分 
  public divide(src: any[], target: string) {
    let arr = [ ...src ],
      results = {};
    arr.sort((a: any, b: any) => {
      return Date.parse(b[target]) - Date.parse(a[target]);//降序
    });
    arr.map((v: any) => {

      let year = new Date(Date.parse(v[target])).getFullYear();

      if (!results[year]) {
        results[year] = [];
      }

      results[year].push(v);
    });
    
    return results;
  }
}

export default new Time(); 
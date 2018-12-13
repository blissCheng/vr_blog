
export class Observers<Observer>{

  private observerList: Observer[];

  constructor() {
    this.observerList = [];
  }
  /**
   * 
   * @param obj observer实例
   */
  add(obj: Observer): number {
    return this.observerList.push(obj);
  }
  /**
   * observer数量
   */
  count(): number {
    return this.observerList.length;
  }
  /**
   * 
   * @param obj observer实例
   * @param index 插入位置
   */
  addTo(obj: Observer, index: number): number {
    //初始化index值
    let pointer: number = index < 0 ? 0 : index > this.count() ? this.count() : index;

    //插值
    if ( pointer === 0 ) {
      this.observerList.unshift(obj);
    } else if ( pointer === this.count() ) {
      this.observerList.push(obj);
    } else {
      
      let segregateArr: any[] = this.observerList.slice(pointer);

      this.observerList.splice(pointer, this.count() - (pointer + 1));

      this.observerList = [
        ...this.observerList,
        obj,
        ...segregateArr
      ]
    }
    return pointer;
  }
  /**
   * 
   * @param obj observer实例
   */
  indexOf(obj: Observer): number {
    return this.observerList.indexOf(obj);
  }
  
  //置空observer列表
  empty() {
    this.observerList = [];
  }
  /**
   * 获取observer实例
   * @param index 索引
   */
  get(index: number): void | Observer {
    if (index > -1 && index < this.count()) {
      return this.observerList[index];
    }
  }
  /**
   * 从指定位置删除一个observer
   * @param index 
   */
  removeAt(index: number) {
    if (index > -1 && index < this.count()) {
      this.observerList.splice(index, 1);
    }
  }
}
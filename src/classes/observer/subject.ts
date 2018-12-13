import { Observers } from './observerList';

interface Restrain {
  update: (context: any) => void;
}

export class Subject<T extends Restrain>{
  
  private observers: Observers<T>;

  constructor() {
    this.observers = new Observers<T>();
  }
  /**
   * 
   * @param observer 添加一个实例
   */
  addObserver(observer: T) {
    this.observers.add(observer);
  }
  //移除一个实例
  removeObserver(observer: T) {
    this.observers.removeAt(this.observers.indexOf(observer))
  }
  /**
   *  广播内容给observer
   * @param context //广播message
   */
  notify(context: any) {
    let observerCount: number = this.observers.count();

    for (let i = 0; i < observerCount; i++) {
      (this.observers.get(i) as T).update(context);
    }
  }
}
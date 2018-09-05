import $ from 'jquery';
export class AnimateFlow {
  
  public start() {
    const divs = $('.animate-flow');
    for (let i in divs) {
      if (Number(i).toString() !== 'NaN'){
        divs.animate({
          top: 0,
          opacity: 1
        }, ( i as any + 1 ) * 1000)
      }
    }
  }
}
export default new AnimateFlow();
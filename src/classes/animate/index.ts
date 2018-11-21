import $ from 'jquery';
export class AnimateFlow {
  
  public start() {
    const divs = $('.animate-flow');
    for (let i in divs) {
      if (Number(i).toString() !== 'NaN'){
        setTimeout(() => {
          $(divs[i]).animate({
            top: 0,
            opacity: 1
          }, 150, 'linear')
        }, i as any * 150)
      }
    }
  }
}
export default new AnimateFlow();
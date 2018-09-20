
export class AppAction{

  test = (text: string) => {
    return {
      type: 'TEST',
      text
    }
  }
}

export default new AppAction();
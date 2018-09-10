
export class Config {
  private coPage: any[]
  private tags: any[] = [
    {
      icon: 'home',
      name: 'Home',
      to: ''
    },
    {
      icon: 'gongnengguanli',
      name: 'Categories',
      to: ''
    },
    {
      icon: 'shijianzhou',
      name: 'Archives',
      to: ''
    },
    {
      icon: 'tags',
      name: 'Tags',
      to: ''
    },
    {
      icon: 'ren',
      name: 'About',
      to: ''
    },
    {
      icon: 'sousuo',
      name: 'Search',
      to: ''
    }
  ]
  constructor() {
  };

  setVal = (name: string, val: any) => {
    this[name] = val;
  };
  getTags = (): any => {
    return this.tags;
  };
  getCoPage = (): any => {
    return this.coPage;
  }
};
export default new Config();

class PageClass<PageData> {
  private pages: PageData[]
  public constructor(page: PageData) {
    this.pages.push(page);
  }
  public getPage(): PageData[] {
    return this.pages;
  }
};

export default PageClass;
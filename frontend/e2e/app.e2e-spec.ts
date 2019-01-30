import { AppPage } from './app.po';

describe('frontend App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title of app', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Secret Friend!');
  });
});

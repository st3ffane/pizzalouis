import { PizzaPage } from './app.po';

describe('pizza App', () => {
  let page: PizzaPage;

  beforeEach(() => {
    page = new PizzaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

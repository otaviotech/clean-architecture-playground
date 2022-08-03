export interface Presenter<From, To> {
  render(input: From): To;
}

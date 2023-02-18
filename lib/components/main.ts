class Editor extends HTMLElement {
  constructor() {
    super();
  }
}


export function j5Editor() {
  customElements.define("j5-editor", Editor);
}

class CollapsibleElement extends HTMLElement {
  constructor() {
    super();
    console.log('CollapsibleElement constructor');
  }
}

customElements.define('collapsible-element', CollapsibleElement);

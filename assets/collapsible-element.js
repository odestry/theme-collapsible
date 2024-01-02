class CollapsibleElement extends HTMLElement {
  constructor() {
    super();

    if (relapse)
      relapse(this, {
        persist: false,
        multiple: false,
      });
  }
}

customElements.define('collapsible-element', CollapsibleElement);

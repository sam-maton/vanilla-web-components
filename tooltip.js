class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "default text";
    this.attachShadow({
      mode: "open"
    });
    this.shadowRoot.innerHTML = `
    <style>
      div{
        font-weight: normal;
        background-color: black;
        color: white;
        position: absolute;
        z-index: 10;
        padding: 0.15rem;
        border-radius: 3px;
        box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        top: 1.5rem;
        left: 1rem;
      }

      :host{
        position: relative;
      }
      
      span{
        background-color: black;
        color: white;
        padding: 0.15rem 0.5rem;
        border-radius: 50%;
      }

      ::slotted(span){
        text-decoration: underline dashed red;
        text-underline-offset: 0.2rem;
      }

      :host(.important){
        color: var(--color-primary, red);
      }

      :host-context(p){
        font-weight: bold;
      }
    </style>
    <slot></slot>
    <span>?</span>
    `;
  }

  static observedAttributes = ["text"];

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} was changed from '${oldValue}' to '${newValue}'`);

    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("dev-tooltip", Tooltip);

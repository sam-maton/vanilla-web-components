class Tooltip extends HTMLElement {
  constructor() {
    super();
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
      
      .icon{
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
    <span class="icon">?</span>
    `;

    this._tooltipIcon = this.shadowRoot.querySelector(".icon");
    this._tooltipText = "default text";
    this._tooltipVisible = false;

    this._showTooltip = this._showTooltip.bind(this);
    this._hideTooltip = this._hideTooltip.bind(this);
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    this._tooltipIcon.addEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.addEventListener("mouseleave", this._hideTooltip);
  }

  static observedAttributes = ["text"];
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  disconnectedCallback() {
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
    console.log("finished removing listeners");
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector(".container");

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.classList.add("container");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("dev-tooltip", Tooltip);

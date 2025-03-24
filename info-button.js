class InfoButton extends HTMLElement {
  constructor() {
    super();

    this._info;
    this._visible = false;

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = `
      <style>
        p{
          display: none;
        }
      </style>
      <button>Toggle</button>
      <p id="info-box"><slot></slot></p>
    `;
  }

  connectedCallback() {
    this._info = this.shadowRoot.querySelector("p");
    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", this._toggleInfo.bind(this));
  }

  _toggleInfo() {
    if (!this._visible) {
      this._info.style.display = "block";
      this._visible = true;
    } else {
      this._info.style.display = "none";
      this._visible = false;
    }
  }
}

customElements.define("dev-info-button", InfoButton);

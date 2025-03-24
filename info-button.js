class InfoButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: "open"
    });

    this.shadowRoot.innerHTML = `
      <style>
        #info-box{
          display: none;
        }
      </style>
      <button>Toggle</button>
      <p id="info-box"><slot></slot></p>
    `;

    this._info = this.shadowRoot.querySelector("#info-box");
    this._visible = false;
    this._button = this.shadowRoot.querySelector("button");
    this._button.addEventListener("click", this._toggleInfo.bind(this));
  }

  connectedCallback() {
    console.log(this.getAttribute("is-visible"));
    if (
      this.hasAttribute("is-visible") &&
      this.getAttribute("is-visible") === "true"
    ) {
      this._visible = true;
      this._info.style.display = "block";
    }
  }

  _toggleInfo() {
    this._visible = !this._visible;
    if (this._visible) {
      this._info.style.display = "block";
    } else {
      this._info.style.display = "none";
    }
  }
}

customElements.define("dev-info-button", InfoButton);

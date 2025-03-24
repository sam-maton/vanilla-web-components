class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      console.log("clicked");
      if (!confirm("Do you really want to leave>")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("dev-confirm-link", ConfirmLink, { extends: "a" });

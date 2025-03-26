class Modal extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
      <style>

        :host([opened]) #modal, :host([opened]) #backdrop{
          opacity: 1;
          pointer-events: all;
        }

        :host([opened]) #modal{
          top: 15vh;
        }

        #backdrop{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.65);
          z-index: 100;
          opacity: 0;
          pointer-events: none;
        }

        #modal{
          position: fixed;
          z-index: 101;
          top: 10vh;
          left: 25%;
          width: 50%;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
          transition: top 0.31s ease-out;
        }

        header{
          border-bottom: 1px solid #ccc;
        }

        #main{
          text-align: start;
          padding: 1rem 1.5rem;
        }

        #actions{
          padding: 1.2rem 1rem;
          text-align: end;
          border-top: 1px solid #ccc
        }
      </style>  
      <div id="backdrop"></div>
      <div id="modal">
        <header>
          <slot name="header"></slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-btn">Cancel</button>
          <button id="confirm-btn">Confirm</button>
        </section>
      </div>
    `;

    this.close = this.close.bind(this);
    this._cancel = this._cancel.bind(this);
    this._confirm = this._confirm.bind(this);

    const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
    const confirmBtn = this.shadowRoot.querySelector('#confirm-btn');

    cancelBtn.addEventListener('click', this._cancel);
    confirmBtn.addEventListener('click', this._confirm);

    this._backdrop = this.shadowRoot.querySelector('#backdrop');
    this._backdrop.addEventListener('click', this._cancel);
  }

  open() {
    this.setAttribute('opened', '');
  }

  close() {
    this.removeAttribute('opened');
  }

  _cancel(event) {
    this.close();
    const cancelEvent = new Event('cancel');
    this.dispatchEvent(cancelEvent);
  }

  _confirm(event) {
    this.close();
    const confirmEvent = new Event('confirm', {
      bubbles: true,
      composed: true
    });
    event.target.dispatchEvent(confirmEvent);
  }
}

customElements.define('dev-modal', Modal);

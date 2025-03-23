class Tooltip extends HTMLElement{
  constructor(){
    super()
    console.log('this is working');
  }
}

customElements.define('dev-tooltip', Tooltip)
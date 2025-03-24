class Tooltip extends HTMLElement{
  constructor(){
    super()
    this.tooltipContainer;
  }

  connectedCallback(){
    const tooltipIcon = document.createElement('span')
    tooltipIcon.textContent = '(?)'
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
    this.appendChild(tooltipIcon);
  }

  _showTooltip(){
    console.log(this);
    this.tooltipContainer = document.createElement('div')
    this.tooltipContainer.textContent = 'This is the tooltip text'
    this.appendChild(this.tooltipContainer)
  }
  
  _hideTooltip(){
    this.removeChild(this.tooltipContainer)
  }
}

customElements.define('dev-tooltip', Tooltip)
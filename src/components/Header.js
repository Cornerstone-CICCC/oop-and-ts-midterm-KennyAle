import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement('div')
    header.innerHTML = `
      <h2>${this.props.siteName}</h2>
      <input type="text" placeholder="Search..." class="search-bar">
      <button class="open-cart-btn">
      Cart<span class="cart-count">0</span></button>
    `
    return header
  }
}
import { Component } from "../common/Component.js";
import toast, { Toaster } from 'react-hot-toast';


export class Header extends Component {
  render() {
    const notify = () => toast('Here is your toast.');
    const header = document.createElement('div')
    header.innerHTML = `
      <h2>${this.props.siteName}</h2>
      <input type="text" placeholder="Jackets, Backpacks, Raincoats..." class="search-bar">
      <button onClick=${notify} class="open-cart-btn">
      <Toaster />
      Cart<span class="cart-count">0</span></button>
    `
    return header
  }
}
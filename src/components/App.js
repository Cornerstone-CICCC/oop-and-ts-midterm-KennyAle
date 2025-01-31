import { Component } from "../common/Component.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";

export class App extends Component {
  render() {
    const appContainer = document.createElement('div')
    appContainer.className = "container"
    appContainer.innerHTML = `
      <header></header>
      <div class="wrapper">
        <main>
          <h1>Popular</h1>
        </main>
        <aside></aside>
      </div>
      <footer></footer>
    `

    const header = new Header({
      siteName: "My Website",
      firstName: "Kenny"
    }).render()
    const footer = new Footer({
      companyName: "My Website Company",
      year: 2025
    }).render()

    const cart = new CartList({
      cartContext: this.props.cartContext
    }).render()
    const productList = new ProductList({
      cartContext: this.props.cartContext
    })

    header.querySelector('.open-cart-btn').addEventListener('click', () => {
      appContainer.querySelector('aside').classList.toggle('active')
    })
    const cartCountSpan = header.querySelector(".cart-count");
    this.props.cartContext.subscribe(cart => {
      cartCountSpan.textContent = cart.length
    })

    appContainer.querySelector('header').appendChild(header)
    appContainer.querySelector('aside').appendChild(cart)
    appContainer.querySelector('footer').appendChild(footer)
    productList.mount(appContainer.querySelector('main'))
    
    const searchInput = header.querySelector(".search-bar");
    searchInput.addEventListener("input", (e) => {
      productList.filterProducts(e.target.value);
    });

    return appContainer
  }
}
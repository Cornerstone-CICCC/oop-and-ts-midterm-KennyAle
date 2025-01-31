import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";
import { CartModal } from "./CartModal.js";

export class CartList extends Component {
  constructor(props) {
    super(props)
    this.state = { cart: [] }
    this.updateCart = this.updateCart.bind(this)
    this.props.cartContext.subscribe(this.updateCart)
    
    this.cartModal = new CartModal({ cartContext: this.props.cartContext })
    this.productListElement = null
    this.totalElement = null
  }

  calculateTotal() {
    return this.state.cart.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0).toFixed(2)
  }

  updateCart(cart) {
    this.state.cart = cart

    this.productListElement.innerHTML = ``

    this.cartModal.render()

    this.state.cart.forEach(item => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext
      })
      this.productListElement.appendChild(cartItem.render())
    })

    if (this.totalElement) {
      this.totalElement.textContent = `${this.calculateTotal()}`
    }

    if (this.cartTitleElement) {
      this.cartTitleElement.textContent = `Your Cart (${this.state.cart.length})`
    }

    if (this.state.cart.length === 0) {
      this.emptyCartElement.style.display = 'block'
    } else {
      this.emptyCartElement.style.display = 'none'
    }
  }

  render() {
    const cartElement = document.createElement('div')
    cartElement.className = 'cart-container'
    cartElement.innerHTML = `
      <h3 class="cart-title">Your Cart (0)</h3>
      <div class="empty-cart">
        <img src="assets/illustration-empty-cart.svg" alt="Your cart is empty">
      </div>
      <ul class="cart-list"></ul>
      <p class="cart-total">Total: $<span class="total-amount">0.00</span></p>
      <button class="open-modal-btn">View Cart</button>
    `

    this.productListElement = cartElement.querySelector('.cart-list')
    this.totalElement = cartElement.querySelector('.total-amount')
    this.cartTitleElement = cartElement.querySelector('.cart-title')
    this.emptyCartElement = cartElement.querySelector('.empty-cart')

    cartElement.querySelector('.open-modal-btn').addEventListener('click', () => {
      const modalElement = this.cartModal.openModal()
      document.body.appendChild(modalElement) 
    })

    return cartElement
  }
}

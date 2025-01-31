import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartModal extends Component {
    constructor(props) {
        super(props)
        this.state = { isVisible: false }
        this.handleClose = this.handleClose.bind(this)
        this.handleCheckout = this.handleCheckout.bind(this)
    }

    calculateTotal() {
        return this.props.cartContext.getCart().reduce((total, item) => {
            return total + item.price * item.quantity
        }, 0).toFixed(2)
    }

    handleClose() {
        this.state.isVisible = false
        const modalElement = document.querySelector('.modal')
        if (modalElement) {
            modalElement.remove()
        }
    }

    handleCheckout() {
        alert("Redirecting to Checkout!")
    }

    openModal() {
        this.state.isVisible = true
        const cart = this.props.cartContext.getCart()
        const modalElement = this.render()

        if (this.modalTitleElement) {
            this.modalTitleElement.textContent = `Your Cart (${cart.length})`
        }

        if (cart.length === 0) {
            this.emptyCartElement.style.display = 'block' 
          } else {
            this.emptyCartElement.style.display = 'none'  
          }
          
        return modalElement
    }

    render() {
        if (!this.state.isVisible) {
            const emptyElement = document.createElement('div')
            emptyElement.classList.add('hidden-modal')
            return emptyElement
        }

        const modalElement = document.createElement('div')
        modalElement.classList.add('modal')
        modalElement.innerHTML = `
      <div class="modal-content">
        <h3 class="modal-title">Your Cart (0)</h3>
        <ul class="modal-cart-list">
            <li>
                <img class="empty-modal" src="assets/illustration-empty-cart.svg" alt="Your cart is empty">
            </li>
        </ul>
        <div class="modal-total">
          <strong>Total: $<span class="cart-total">${this.calculateTotal()}</span></strong>
        </div>
        <div class="modal-footer">
          <button class="close-btn">Close</button>
          <button class="checkout-btn">Checkout</button>
        </div>
      </div>
    `

        const cartListElement = modalElement.querySelector('.modal-cart-list')
        this.props.cartContext.getCart().forEach(item => {
            const cartItem = new CartItem({
                item,
                cartContext: this.props.cartContext,
                isModal: true
            })
            cartListElement.appendChild(cartItem.render())
        })
        this.modalTitleElement = modalElement.querySelector('.modal-title')
        this.emptyCartElement = modalElement.querySelector('.empty-modal')

        modalElement.querySelector('.close-btn').addEventListener('click', this.handleClose)
        modalElement.querySelector('.checkout-btn').addEventListener('click', this.handleCheckout)

        return modalElement
    }

}

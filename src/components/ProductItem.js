import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
  }

  handleAddToCart() {
    this.props.cartContext.addProduct(this.props.product)
  }

  handleUpdateQuantity() {
    this.props.cartContext.updateQuantity(this.props.product)
  }

  handleRemoveFromCart() {
    this.props.cartContext.removeProduct(this.props.product)
  }

  render() {
    const product = document.createElement('div')
    product.className = "product-item"
    product.innerHTML = `
      <img class="product-img" src=${this.props.product.image} />
      <button class="add-cart-btn">
        <img src="assets/icon-add-to-cart.svg" alt="">
        Add to Cart
      </button>
      <div class="product-data">
        <h4>${this.props.product.category}</h4>
        <h2>${this.props.product.title}</h2>
        <h3>$${parseFloat(this.props.product.price).toFixed(2)}</h3>
        </div>
        `
        // <button class="update-cart-btn">Remove</button>

    product.querySelector('.add-cart-btn').addEventListener('click', this.handleAddToCart)
    // product.querySelector('.update-cart-btn').addEventListener('click', this.handleUpdateQuantity)
    // product.querySelector('.update-cart-btn').addEventListener('click', this.handleRemoveFromCart)

    return product
  }
}
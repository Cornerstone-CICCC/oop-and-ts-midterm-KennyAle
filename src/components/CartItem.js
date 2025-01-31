import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props)

    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleAdd() {
    this.props.cartContext.addProduct(this.props.item)
  }

  handleRemove() {
    this.props.cartContext.updateQuantity(this.props.item)
  }

  handleDelete() {
    this.props.cartContext.removeProduct(this.props.item)
  }

  render() {
    const itemElement = document.createElement('li')
    itemElement.innerHTML = `
      <h2>${this.props.item.title}</h2>
      ${this.props.isModal ? `<img src="${this.props.item.image}" alt="${this.props.item.title}" class="item-thumbnail">` : ''}
      <div class="item-info">
        <span>X${this.props.item.quantity}</span>
        <span>@$${this.props.item.price.toFixed(2)}</span>
        <span>$${this.props.item.total.toFixed(2)}</span>
        <div class="item-btn"></div>
      </div>
    `

    if (!this.props.isModal) {
      const btnContainer = itemElement.querySelector('.item-btn')
      btnContainer.innerHTML = `
        <button class="decrease-btn">
          <img src="assets/icon-decrement-quantity.svg" alt="">
        </button>
        <button class="increase-btn">
          <img src="assets/icon-increment-quantity.svg" alt="">
        </button>
        <button class="delete-btn">
          🗑
        </button>
      `
      btnContainer.querySelector('.decrease-btn').addEventListener('click', this.handleRemove)
      btnContainer.querySelector('.increase-btn').addEventListener('click', this.handleAdd)
      btnContainer.querySelector('.delete-btn').addEventListener('click', this.handleDelete)
    }

    return itemElement
  }
}


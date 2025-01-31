import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement('div')
    footer.innerHTML = `
      <p>${this.props.year} Copyright - ${this.props.companyName}. All rights reserved.
    `
    return footer
  }
}
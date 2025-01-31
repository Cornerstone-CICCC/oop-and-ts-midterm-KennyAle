import { App } from "./components/App.js";
import { CartContext } from "./contexts/CartContext.js";

// Assign root element to variable
const root = document.querySelector('#app')

// Create App instance
const cartContext = new CartContext()
const app = new App({ cartContext })

// Mount App instance into the DOM
app.mount(root)
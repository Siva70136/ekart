import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import './App.css';

import Cart from './Components/Cart';
import AllProductsSection from './Components/Products';
import ProductItemDetails from './Components/ProductItem';
import Login from './Components/Login';
import Home from './Components/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import CartContext from './context/CartContext'
import Admin from './Components/Admin';


const App = () => {
  const [cartList, setCartList] = useState([]);
  

  const deleteCartItem = id => {
    console.log(cartList)

    const updateData = cartList.filter(each => each.id !== id)
    setCartList(updateData)
  }

  const addCartItem = product => {
    setCartList([...cartList, product])

  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const incrementCartItemQuantity = id => {
    const updatedData = cartList.map(each => {
      if (each.id === id) {
        const updateData = each.quantity + 1
        return { ...each, quantity: updateData }
      }
      return each;
    })
    setCartList(updatedData)

  }

  const decrementCartItemQuantity = id => {
    const { cartList } = this.state
    const updatedData = cartList.find(each => each.id === id)

    if (updatedData.quantity > 1) {
     const data=cartList.map(each => {
          if (each.id === id) {
            const updateData = each.quantity - 1
            return { ...each, quantity: updateData }
          }
          return each
        })
        setCartList(data);
    } else {
      deleteCartItem(id);
    }
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: addCartItem,
            deleteCartItem: deleteCartItem,
            removeAllCartItems: removeAllCartItems,
            incrementCartItemQuantity: incrementCartItemQuantity,
            decrementCartItemQuantity: decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={AllProductsSection} />
            <ProtectedRoute exact path="/products/:id" component={ProductItemDetails} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/admin" component={Admin} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;


/*import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'


import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            removeAllCartItems: this.removeAllCartItems,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
*/
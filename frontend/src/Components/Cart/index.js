import Header from '../Header'
import CartItem from '../CartItem'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => (
    <CartContext.Consumer>
        {value => {
            const { cartList,removeAllCartItems } = value
            const showEmptyView = cartList.length === 0;

            const removeAll = () => {
                removeAllCartItems()
            }
            let total=0;

            cartList.forEach(each => {
                total += each.price * each.quantity
              })
            return (
                <>
                    <Header />
                    <div className="cart-container">
                        {showEmptyView ? (
                            <div className="cart-empty-view-container">
                                <img
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                                    className="cart-empty-image"
                                    alt="cart empty"
                                />
                                <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

                                <Link to="/products">
                                    <button type="button" className="shop-now-btn">
                                        Shop Now
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="cart-content-container">
                                <h1 className="cart-heading">My Cart</h1>
                                <ul className="cart-list">
                                    <button
                                        type="button"
                                        className="button1 remove"
                                        onClick={removeAll}
                                        data-testid="remove"
                                    >
                                        Remove all
                                    </button>
                                    {cartList.map(eachCartItem => (
                                        <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
                                    ))}
                                </ul>
                                <div className="">
                                    <h1>Order Total &nbsp;{total}/-</h1>
                                    <p>{cartList.length}&nbsp;Items in cart</p>
                                    <button className="checkout button1" type="button">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )
        }}
    </CartContext.Consumer>
)
export default Cart

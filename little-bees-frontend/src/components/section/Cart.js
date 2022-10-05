import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import '../css/Details_pc.css'
import '../css/Cart.css'
import { MainTitle } from '../MainTitle'
import Axios from 'axios';

export class Cart extends Component {
    static contextType = DataContext;
     
    state = {
        loginStatus: false,
        user: {}
    };

    componentDidMount(){
        this.context.getTotal();
        Axios.get("http://localhost:3001/login").then((response) => {
            console.log(response);
            if (response.data.loggedIn === true) {
                this.setState({loginStatus: true, user: response.data.user[0]});
            }
        });
    }

    render() {
        const {theme, cart, increase, reduction, removeProduct, total} = this.context;
        
        if(cart.length === 0){
            return (
            <div>
                <MainTitle title="Cart" provider={theme}/>
                <h2 className={theme ? "theme-cart-main" : "cart-main"}>Your cart is empty</h2>
            </div>
            )
        }else{
            return (
                <>
                <MainTitle title="Cart" provider={theme}/>
                    {  
                        cart.map(item => (
                            <div className={theme ? "theme-cart" : "cart"} key={item._id}>
                                <Link to={`/pc/${item._id}`}>
                                    <img src={item.src} alt="" />
                                </Link>
                                <div className="game-title">
                                    <Link to={`/pc/${item._id}`}>{item.title}</Link>
                                </div>
                                <div className="amount">
                                    <button className="count" onClick={() => reduction(item._id)}> - </button>
                                    <span>{item.count}</span>
                                    <button className="count" onClick={() => increase(item._id)}> + </button>
                                </div>
                                <div className="box">
                                    <div className="pricee">
                                        <span>{(item.price * item.count).toFixed(2)}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    <div className="per-item">
                                        <p>Per item: </p>
                                        <span>{item.price}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    <div className="on-sale">
                                        {item.discount ?
                                            <div className="discountt">
                                                <span>{item.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {item.discount ?
                                            <div className="minus">
                                                <span>-{item.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                    </div>
                                </div>
                                <div className="delete" onClick={() => removeProduct(item._id)}>X</div>
                            </div>
                        ))
                    }
                    <div className={theme ? "theme-total" : "total"}>
                        <Link to="/checkout">Checkout</Link> {/*{this.state.loginStatus ? "/checkout" : "/login"}*/}
                        <div className="total-price">
                            <h3>Total: {total ? total.toFixed(2) : 0}</h3>
                            <p><sup>EUR</sup></p>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default Cart
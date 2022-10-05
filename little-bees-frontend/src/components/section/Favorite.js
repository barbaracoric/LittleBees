import React, {Component} from 'react'
import {DataContext} from '../Context'
import { Link } from 'react-router-dom'
import '../css/Favorite.css'
import '../css/Pcc.css'
import { MainTitle } from '../MainTitle'

class Favorite extends Component {
    static contextType = DataContext;

    render() {
        const {theme, favorite, removeProduct} = this.context;
        if(favorite.length === 0){
            return (
                <div>
                <MainTitle title="Favorite" provider={theme}/>
                <h2 className={theme ? "theme-card-main" : "card-main"}>Your wish list is empty</h2>
                </div>
            )
        }else{
            return (
                <>
                <MainTitle title="Favorite" provider={theme}/>
                    {
                        favorite.map(item => (
                            <div className="card" title={item.title} key={item._id}>
                                <Link to={`/pc/${item._id}`}>
                                    <img src={item.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/pc/${item._id}`}>{item.title}</Link>
                                    </div>
                                </div>
                                <div className="right-column">
                                    <div className="real-price" title="">
                                        <Link to={`/pc/${item._id}`}>{item.price}
                                            <p><sup>EUR</sup></p></Link>
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
                                        <div className={item.new === "new" ? "new-game" : ""}>
                                            <span>{item.new}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </>
            )
        }
    }
}

export default Favorite
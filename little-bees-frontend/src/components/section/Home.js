import React, { Component } from 'react'
import HomeImg from '../img/medd.jpg'
import '../css/Home.css'
import { Link } from 'react-router-dom'
import { MainTitle } from '../MainTitle'
import { ProductConsumer } from '../Context'

function Home() {
    function applyFilter({ pcc, psnn, xboxx, theme, addCart, addFavorite }, type) {
        pcc.forEach(element => {
            return element.type = "pc"
        });
        psnn.forEach(element => {
            return element.type = "psn"
        });
        xboxx.forEach(element => {
            return element.type = "xbox"
        });
        var daily_games = type === "pc" ? [...pcc] : type === "psn" ? [...psnn] : [...xboxx];
        var daily_index = [2, 6, 9, 11, 13, 14];
        var random_list = [];
        for (var i = 0; i < 6; i++) {
            random_list.push(daily_games[daily_index[i]])
        }
        {/*return random_list.map(game => (
            <div className={theme ? "theme-card" : "card"} title={game.title} key={game._id}>
                <Link to={`/${game.type}/${game._id}`}>
                    <img src={game.src} alt="" />
                </Link>
                <ul>
                    <li>
                        <div className="game-name">
                            <Link to={`/${game.type}/${game._id}`}>{game.title} ({game.type.toUpperCase()})</Link>
                        </div>
                    </li>
                    <li>
                        <div className="real-price">
                            <Link to={`/${game.type}/${game._id}`}>{game.price}
                                <p><sup>EUR</sup></p></Link>
                        </div>
                    </li>
                    <li className="on-sale">
                        {game.discount ?
                            <div className="discountt">
                                <span>{game.onsale}</span>
                                <p><sup>EUR</sup></p>
                            </div>
                            : <div></div>
                        }
                        {game.discount ?
                            <div className="minus">
                                <span>-{game.discount}%</span>
                            </div>
                            : <div></div>
                        }
                        <div className={game.new === "new" ? "new-game" : ""}>
                            <span>{game.new}</span>
                        </div>
                    </li>
                </ul>
            </div>
        ))*/}
    }

    return (
        <ProductConsumer>
            {
                value => {
                    return (
                        <div>
                            <div className="home-img">
                                <Link to="/pc/3"><img src={HomeImg} alt="" /></Link>
                            </div>
                            <div className="home-content">
                                <MainTitle title="Med" provider={value.theme} type="pc"/>
                                {applyFilter(value, "pc")}
                                <MainTitle title="Kreme" provider={value.theme} type="psn" />
                                {applyFilter(value, "psn")}
                                <MainTitle title="Sapuni" provider={value.theme} type="xbox" />
                                {applyFilter(value, "xbox")}
                            </div>
                        </div>
                    )
                }
            }
        </ProductConsumer>
    )
}

export default Home
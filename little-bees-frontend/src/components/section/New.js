import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../Context'
import '../css/Pcc.css'
import { Title } from '../Title'
import Axios from 'axios';

function New() {
    const [selected_filter, setFilter] = useState("none");
    const [selected_view, setView] = useState("flexrow");
    let url = 'http://localhost:3001';
    useEffect(() => {
        Axios.defaults.withCredentials = true;
        Axios.get(url + "/login", {
            headers: { "x-access-token": localStorage.getItem("token") }
        }).then((response) => {
            if (response.data.loggedIn === true) {
                setUserAuthority(response.data.role_name);
            }

        });
    }, []);

    const [Authority, setUserAuthority] = useState();





    function applyFilter({ pcc, psnn, xboxx, theme, addCart, addFavorite }) {

        var label = document.getElementById("sort_by");
        var select = document.getElementById("selected_filter");
        if (label && select) {
            label.classList.add("display-none");
            select.classList.add("display-none");
        }
        var num_of_games = document.getElementById("num-of-games");
        var pcclass = document.getElementById("pc");
        pcc.forEach(element => {
            return element.type = "pc"
        });
        psnn.forEach(element => {
            return element.type = "psn"
        });
        xboxx.forEach(element => {
            return element.type = "xbox"
        });
        var new_games = [...pcc, ...psnn, ...xboxx];
        if (pcclass) {
            if (num_of_games) {
                num_of_games.innerHTML = "(" + new_games.filter(item => {
                    return item.new !== "";
                }).length + " proizvoda)"
            }
            if (pcclass.className === "flexcolumn") {
                return new_games.map(game => (
                    game.new !== "" ?
                        <div className={theme ? "theme-card" : "card"} title={game.title} key={game._id}>
                            <Link to={`/${game.type}/${game._id}`}>
                                <img src={game.src} alt="" />
                            </Link>
                            <div className={theme ? "theme-title-column" : "title-column"}>
                                <div className="game-name">
                                    <Link to={`/${game.type}/${game._id}`}>{game.title} ({game.type.toUpperCase()})</Link>
                                </div>
                                <div className="content">
                                    <Link to={`/${game.type}/${game._id}`}>{game.content}</Link>
                                </div>
                            </div>
                            <div className={theme ? "theme-right-column" : "right-column"}>
                                <div className="game_name">
                                    <Link to={`/${game.type}/${game._id}`}>{game.title} ({game.type.toUpperCase()})</Link>
                                </div>
                                <div className="real-price" title="">
                                    <Link to={`/${game.type}/${game._id}`}>{game.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                                <div className="on-sale">
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
                                </div>
                                <button title="Add to cart" onClick={() => addCart(game._id)}>Add to cart</button>
                                <button title="Add to favorite" onClick={() => addFavorite(game._id)}>Add to favorite</button>
                            </div>
                        </div>
                        : null
                ))
            }
            return new_games.map(game => (
                game.new !== "" ?
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
                    : null
            ))
        }
    }


    return (
        <ProductConsumer>
            {
                value => {
                    window.addEventListener("popstate", function (e) {
                        window.location.reload();
                    });
                    var pc = document.getElementById("pc");
                    var classChange = new MutationObserver(function (event) {
                        //console.log("class changed");
                        setView(pc.className);
                    })

                    if (pc) {
                        classChange.observe(pc, {
                            attributes: true,
                            attributeFilter: ['class'],
                            childList: false,
                            characterData: false
                        })
                    }

                    return (
                        <div>
                            <Title title="New" provider={value.theme} />
                            <div id="pc">
                                {
                                    applyFilter(value)
                                }

                            </div>
                        </div>
                    )

                }
            }
        </ProductConsumer>
    )
}

export default New

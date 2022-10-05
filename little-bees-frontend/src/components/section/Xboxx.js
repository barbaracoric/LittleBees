import React, { useState, useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../Context'
import '../css/Pcc.css'
import '../css/Xboxx.css'
import { Title } from '../Title'
import Add from './Add'
import Axios from 'axios';
function Xboxx() {
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
    });

    const [Authority, setUserAuthority] = useState();
   



    function applyFilter({ xboxx, theme, addCart, addFavorite}) {

        var num_of_games = document.getElementById("num-of-games");
        var xboxclass = document.getElementById("xbox");
        if (xboxclass) {
            if (xboxclass.className === "flexcolumn") {
                switch (selected_filter) {
                    case "on_sale":
                     xboxx.sort((a, b) => {
                            return b.discount - a.discount;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + xboxx.filter(item => {
                                return item.discount !== 0;
                            }).length + " proizvoda)"
                        }
                        return xboxx.map(xbox => (
                            xbox.discount ?
                                <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                                    <Link to={`/xbox/${xbox._id}`}>
                                        <img src={xbox.src} alt="" />
                                    </Link>
                                    <div className={theme ? "theme-title-column" : "title-column"}>
                                        <div className="game-name">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                        </div>
                                        <div className="content">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.content}</Link>
                                        </div>
                                    </div>
                                    <div className={theme ? "theme-right-column" : "right-column"}>
                                        <div className="game_name">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                        </div>
                                        <div className="real-price" title="">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                                <p><sup>EUR</sup></p></Link>
                                        </div>
                                        <div className="on-sale">
                                            {xbox.discount ?
                                                <div className="discountt">
                                                    <span>{xbox.onsale}</span>
                                                    <p><sup>EUR</sup></p>
                                                </div>
                                                : <div></div>
                                            }
                                            {xbox.discount ?
                                                <div className="minus">
                                                    <span>-{xbox.discount}%</span>
                                                </div>
                                                : <div></div>
                                            }
                                            <div className={xbox.new === "new" ? "new-game" : ""}>
                                                <span>{xbox.new}</span>
                                            </div>
                                        </div>
                                        <button title="Add to cart" onClick={() => addCart(xbox._id)}>Add to cart</button>
                                        <button title="Add to favorite" onClick={() => addFavorite(xbox._id)}>Add to favorite</button>
                                    </div>
                                </div>
                                : <div key={xbox._id}></div>
                        ))
                    case "newest":
                     xboxx.sort((a, b) => {
                            return b.new - a.new;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + xboxx.filter(item => {
                                return item.new !== "";
                            }).length + " proizvoda)"
                        }
                        return xboxx.map(xbox => (
                            xbox.new !== "" ?
                                <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                                    <Link to={`/xbox/${xbox._id}`}>
                                        <img src={xbox.src} alt="" />
                                    </Link>
                                    <div className={theme ? "theme-title-column" : "title-column"}>
                                        <div className="game-name">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                        </div>
                                        <div className="content">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.content}</Link>
                                        </div>
                                    </div>
                                    <div className={theme ? "theme-right-column" : "right-column"}>
                                        <div className="game_name">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                        </div>
                                        <div className="real-price" title="">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                                <p><sup>EUR</sup></p></Link>
                                        </div>
                                        <div className="on-sale">
                                            {xbox.discount ?
                                                <div className="discountt">
                                                    <span>{xbox.onsale}</span>
                                                    <p><sup>EUR</sup></p>
                                                </div>
                                                : <div></div>
                                            }
                                            {xbox.discount ?
                                                <div className="minus">
                                                    <span>-{xbox.discount}%</span>
                                                </div>
                                                : <div></div>
                                            }
                                            <div className={xbox.new === "new" ? "new-game" : ""}>
                                                <span>{xbox.new}</span>
                                            </div>
                                        </div>
                                        <button title="Add to cart" onClick={() => addCart(xbox._id)}>Add to cart</button>
                                        <button title="Add to favorite" onClick={() => addFavorite(xbox._id)}>Add to favorite</button>
                                    </div>
                                </div>
                                : <div key={xbox._id}></div>
                        ))
                    case "high-low":
                     xboxx.sort((a, b) => {
                            return b.price - a.price;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + xboxx.length + " proizvoda)"
                        }
                        return xboxx.map(xbox => (
                            <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                                <Link to={`/xbox/${xbox._id}`}>
                                    <img src={xbox.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                        </div>
                                    <div className="real-price" title="">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {xbox.discount ?
                                            <div className="discountt">
                                                <span>{xbox.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {xbox.discount ?
                                            <div className="minus">
                                                <span>-{xbox.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={xbox.new === "new" ? "new-game" : ""}>
                                            <span>{xbox.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(xbox._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(xbox._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                    case "low-high":
                     xboxx.sort((a, b) => {
                            return a.price - b.price;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + xboxx.length + " proizvoda)"
                        }
                        return xboxx.map(xbox => (
                            <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                                <Link to={`/xbox/${xbox._id}`}>
                                    <img src={xbox.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                        </div>
                                    <div className="real-price" title="">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {xbox.discount ?
                                            <div className="discountt">
                                                <span>{xbox.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {xbox.discount ?
                                            <div className="minus">
                                                <span>-{xbox.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={xbox.new === "new" ? "new-game" : ""}>
                                            <span>{xbox.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(xbox._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(xbox._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                    case "none":
                    default:
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + xboxx.length + " proizvoda)"
                        }
                     xboxx.sort((a, b) => {
                            return a._id - b._id;
                        })
                        return xboxx.map(xbox => (
                            <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                                <Link to={`/xbox/${xbox._id}`}>
                                    <img src={xbox.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                            <Link to={`/xbox/${xbox._id}`}>{xbox.title} y</Link>
                                        </div>
                                    <div className="real-price" title="">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {xbox.discount ?
                                            <div className="discountt">
                                                <span>{xbox.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {xbox.discount ?
                                            <div className="minus">
                                                <span>-{xbox.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={xbox.new === "new" ? "new-game" : ""}>
                                            <span>{xbox.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(xbox._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(xbox._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                }
            }
        }
        switch (selected_filter) {
            case "on_sale":
             xboxx.sort((a, b) => {
                    return b.discount - a.discount;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + xboxx.filter(item => {
                        return item.discount !== 0;
                    }).length + " proizvoda)"
                }
                return xboxx.map(xbox => (
                    xbox.discount ?
                        <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                            <Link to={`/xbox/${xbox._id}`}>
                                <img src={xbox.src} alt="" />
                            </Link>
                            <ul>
                                <li>
                                    <div className="game-name">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="real-price">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                </li>
                                <li className="on-sale">
                                    <div className="discountt">
                                        <span>{xbox.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    <div className="minus">
                                        <span>-{xbox.discount}%</span>
                                    </div>
                                    <div className={xbox.new === "new" ? "new-game" : ""}>
                                        <span>{xbox.new}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        : <div key={xbox._id}></div>
                ))
            case "newest":
             xboxx.sort((a, b) => {
                    return b.new - a.new;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + xboxx.filter(item => {
                        return item.new !== "";
                    }).length + " proizvoda)"
                }
                return xboxx.map(xbox => (
                    xbox.new !== "" ?
                        <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                            <Link to={`/xbox/${xbox._id}`}>
                                <img src={xbox.src} alt="" />
                            </Link>
                            <ul>
                                <li>
                                    <div className="game-name">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="real-price">
                                        <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                </li>
                                <li className="on-sale">
                                    {xbox.discount
                                        ? <div className="discountt">
                                            <span>{xbox.onsale}</span>
                                            <p><sup>EUR</sup></p>
                                        </div>
                                        : <div></div>
                                    }

                                    {xbox.discount
                                        ? <div className="minus">
                                            <span>-{xbox.discount}%</span>
                                        </div>
                                        : <div></div>
                                    }
                                    <div className={xbox.new === "new" ? "new-game" : ""}>
                                        <span>{xbox.new}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        : <div key={xbox._id}></div>
                ))
            case "high-low":
             xboxx.sort((a, b) => {
                    return b.price - a.price;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + xboxx.length + " proizvoda)"
                }
                return xboxx.map(xbox => (
                    <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                        <Link to={`/xbox/${xbox._id}`}>
                            <img src={xbox.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {xbox.discount
                                    ? <div className="discountt">
                                        <span>{xbox.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {xbox.discount
                                    ? <div className="minus">
                                        <span>-{xbox.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={xbox.new === "new" ? "new-game" : ""}>
                                    <span>{xbox.new}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))
            case "low-high":
             xboxx.sort((a, b) => {
                    return a.price - b.price;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + xboxx.length + " proizvoda)"
                }
                return xboxx.map(xbox => (
                    <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                        <Link to={`/xbox/${xbox._id}`}>
                            <img src={xbox.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {xbox.discount
                                    ? <div className="discountt">
                                        <span>{xbox.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {xbox.discount
                                    ? <div className="minus">
                                        <span>-{xbox.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={xbox.new === "new" ? "new-game" : ""}>
                                    <span>{xbox.new}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))
            case "none":
            default:
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + xboxx.length + " proizvoda)"
                }
             xboxx.sort((a, b) => {
                    return a._id - b._id;
                })
                return xboxx.map(xbox => (
                    <div className={theme ? "theme-card" : "card"} title={xbox.title} key={xbox._id}>
                        <Link to={`/xbox/${xbox._id}`}>
                            <img src={xbox.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/xbox/${xbox._id}`}>{xbox.title} </Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/xbox/${xbox._id}`}>{xbox.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {xbox.discount
                                    ? <div className="discountt" >
                                        <span>{xbox.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {xbox.discount
                                    ? <div className="minus">
                                        <span>-{xbox.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={xbox.new === "new" ? "new-game" : ""}>
                                    <span>{xbox.new}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
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
                    var filter = document.getElementById("selected_filter");
                    if (filter) {
                        var new_filter = filter.options[filter.selectedIndex].value;

                        filter.onchange = function (e) {
                            new_filter = filter.options[filter.selectedIndex].value;
                            setFilter(new_filter);
                        }
                    }
                    var xbox = document.getElementById("xbox");
                    var classChange = new MutationObserver(function (event) {
                        console.log("class changed");
                        setView(xbox.className);
                    })

                    if (xbox) {
                        classChange.observe(xbox, {
                            attributes: true,
                            attributeFilter: ['class'],
                            childList: false,
                            characterData: false
                        })
                    }

                    return (
                        <div>
                            <Title title="Sapuni" provider={value.theme} />
                            <div id="xbox">
                            {Authority==="SuperAdmin" ?
                                <Add /> : null }
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

export default Xboxx
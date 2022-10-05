import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../Context'
import '../css/Pcc.css'
import { Title } from '../Title'
import Add from './Add'
import Axios from 'axios';

function Pcc() {
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





    function applyFilter({ pcc, theme, addCart, addFavorite }) {

        var num_of_games = document.getElementById("num-of-games");
        var pcclass = document.getElementById("pc");
        if (pcclass) {
            if (pcclass.className === "flexcolumn") {
                switch (selected_filter) {
                    case "on_sale":
                        pcc.sort((a, b) => {
                            return b.discount - a.discount;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + pcc.filter(item => {
                                return item.discount !== 0;
                            }).length + " proizvoda)"
                        }
                        return pcc.map(pc => (
                            pc.discount ?
                                <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                                    <Link to={`/pc/${pc._id}`}>
                                        <img src={pc.src} alt="" />
                                    </Link>
                                    <div className={theme ? "theme-title-column" : "title-column"}>
                                        <div className="game-name">
                                            <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                        </div>
                                        <div className="content">
                                            <Link to={`/pc/${pc._id}`}>{pc.content}</Link>
                                        </div>
                                    </div>
                                    <div className={theme ? "theme-right-column" : "right-column"}>
                                        <div className="game_name">
                                            <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                        </div>
                                        <div className="real-price" title="">
                                            <Link to={`/pc/${pc._id}`}>{pc.price}
                                                <p><sup>EUR</sup></p></Link>
                                        </div>
                                        <div className="on-sale">
                                            {pc.discount ?
                                                <div className="discountt">
                                                    <span>{pc.onsale}</span>
                                                    <p><sup>EUR</sup></p>
                                                </div>
                                                : <div></div>
                                            }
                                            {pc.discount ?
                                                <div className="minus">
                                                    <span>-{pc.discount}%</span>
                                                </div>
                                                : <div></div>
                                            }
                                            <div className={pc.new === "new" ? "new-game" : ""}>
                                                <span>{pc.new}</span>
                                            </div>
                                        </div>
                                        <button title="Add to cart" onClick={() => addCart(pc._id)}>Add to cart</button>
                                        <button title="Add to favorite" onClick={() => addFavorite(pc._id)}>Add to favorite</button>
                                    </div>
                                </div>
                                : <div key={pc._id}></div>
                        ))
                    case "newest":
                        pcc.sort((a, b) => {
                            return b.new - a.new;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + pcc.filter(item => {
                                return item.new !== "";
                            }).length + " proizvoda)"
                        }
                        return pcc.map(pc => (
                            pc.new !== "" ?
                                <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                                    <Link to={`/pc/${pc._id}`}>
                                        <img src={pc.src} alt="" />
                                    </Link>
                                    <div className={theme ? "theme-title-column" : "title-column"}>
                                        <div className="game-name">
                                            <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                        </div>
                                        <div className="content">
                                            <Link to={`/pc/${pc._id}`}>{pc.content}</Link>
                                        </div>
                                    </div>
                                    <div className={theme ? "theme-right-column" : "right-column"}>
                                        <div className="game_name">
                                            <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                        </div>
                                        <div className="real-price" title="">
                                            <Link to={`/pc/${pc._id}`}>{pc.price}
                                                <p><sup>EUR</sup></p></Link>
                                        </div>
                                        <div className="on-sale">
                                            {pc.discount ?
                                                <div className="discountt">
                                                    <span>{pc.onsale}</span>
                                                    <p><sup>EUR</sup></p>
                                                </div>
                                                : <div></div>
                                            }
                                            {pc.discount ?
                                                <div className="minus">
                                                    <span>-{pc.discount}%</span>
                                                </div>
                                                : <div></div>
                                            }
                                            <div className={pc.new === "new" ? "new-game" : ""}>
                                                <span>{pc.new}</span>
                                            </div>
                                        </div>
                                        <button title="Add to cart" onClick={() => addCart(pc._id)}>Add to cart</button>
                                        <button title="Add to favorite" onClick={() => addFavorite(pc._id)}>Add to favorite</button>
                                    </div>
                                </div>
                                : <div key={pc._id}></div>
                        ))
                    case "high-low":
                        pcc.sort((a, b) => {
                            return b.price - a.price;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + pcc.length + " games)"
                        }
                        return pcc.map(pc => (
                            <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                                <Link to={`/pc/${pc._id}`}>
                                    <img src={pc.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/pc/${pc._id}`}>{pc.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                    <div className="real-price" title="">
                                        <Link to={`/pc/${pc._id}`}>{pc.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {pc.discount ?
                                            <div className="discountt">
                                                <span>{pc.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {pc.discount ?
                                            <div className="minus">
                                                <span>-{pc.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={pc.new === "new" ? "new-game" : ""}>
                                            <span>{pc.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(pc._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(pc._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                    case "low-high":
                        pcc.sort((a, b) => {
                            return a.price - b.price;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + pcc.length + " games)"
                        }
                        return pcc.map(pc => (
                            <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                                <Link to={`/pc/${pc._id}`}>
                                    <img src={pc.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/pc/${pc._id}`}>{pc.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                    <div className="real-price" title="">
                                        <Link to={`/pc/${pc._id}`}>{pc.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {pc.discount ?
                                            <div className="discountt">
                                                <span>{pc.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {pc.discount ?
                                            <div className="minus">
                                                <span>-{pc.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={pc.new === "new" ? "new-game" : ""}>
                                            <span>{pc.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(pc._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(pc._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                    case "none":
                    default:
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + pcc.length + " games)"
                        }
                        pcc.sort((a, b) => {
                            return a._id - b._id;
                        })
                        return pcc.map(pc => (
                            <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                                <Link to={`/pc/${pc._id}`}>
                                    <img src={pc.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/pc/${pc._id}`}>{pc.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                    <div className="real-price" title="">
                                        <Link to={`/pc/${pc._id}`}>{pc.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {pc.discount ?
                                            <div className="discountt">
                                                <span>{pc.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {pc.discount ?
                                            <div className="minus">
                                                <span>-{pc.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={pc.new === "new" ? "new-game" : ""}>
                                            <span>{pc.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(pc._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(pc._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                }
            }
        }
        switch (selected_filter) {
            case "on_sale":
                pcc.sort((a, b) => {
                    return b.discount - a.discount;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + pcc.filter(item => {
                        return item.discount !== 0;
                    }).length + " proizvoda)"
                }
                return pcc.map(pc => (
                    pc.discount ?
                        <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                            <Link to={`/pc/${pc._id}`}>
                                <img src={pc.src} alt="" />
                            </Link>
                            <ul>
                                <li>
                                    <div className="game-name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="real-price">
                                        <Link to={`/pc/${pc._id}`}>{pc.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                </li>
                                <li className="on-sale">
                                    <div className="discountt">
                                        <span>{pc.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    <div className="minus">
                                        <span>-{pc.discount}%</span>
                                    </div>
                                    <div className={pc.new === "new" ? "new-game" : ""}>
                                        <span>{pc.new}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        : <div key={pc._id}></div>
                ))
            case "newest":
                pcc.sort((a, b) => {
                    return b.new - a.new;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + pcc.filter(item => {
                        return item.new !== "";
                    }).length + " proizvoda)"
                }
                return pcc.map(pc => (
                    pc.new !== "" ?
                        <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                            <Link to={`/pc/${pc._id}`}>
                                <img src={pc.src} alt="" />
                            </Link>
                            <ul>
                                <li>
                                    <div className="game-name">
                                        <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="real-price">
                                        <Link to={`/pc/${pc._id}`}>{pc.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                </li>
                                <li className="on-sale">
                                    {pc.discount
                                        ? <div className="discountt">
                                            <span>{pc.onsale}</span>
                                            <p><sup>EUR</sup></p>
                                        </div>
                                        : <div></div>
                                    }

                                    {pc.discount
                                        ? <div className="minus">
                                            <span>-{pc.discount}%</span>
                                        </div>
                                        : <div></div>
                                    }
                                    <div className={pc.new === "new" ? "new-game" : ""}>
                                        <span>{pc.new}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        : <div key={pc._id}></div>
                ))
            case "high-low":
                pcc.sort((a, b) => {
                    return b.price - a.price;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + pcc.length + " games)"
                }
                return pcc.map(pc => (
                    <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                        <Link to={`/pc/${pc._id}`}>
                            <img src={pc.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/pc/${pc._id}`}>{pc.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {pc.discount
                                    ? <div className="discountt">
                                        <span>{pc.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {pc.discount
                                    ? <div className="minus">
                                        <span>-{pc.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={pc.new === "new" ? "new-game" : ""}>
                                    <span>{pc.new}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))
            case "low-high":
                pcc.sort((a, b) => {
                    return a.price - b.price;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + pcc.length + " games)"
                }
                return pcc.map(pc => (
                    <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                        <Link to={`/pc/${pc._id}`}>
                            <img src={pc.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/pc/${pc._id}`}>{pc.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {pc.discount
                                    ? <div className="discountt">
                                        <span>{pc.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {pc.discount
                                    ? <div className="minus">
                                        <span>-{pc.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={pc.new === "new" ? "new-game" : ""}>
                                    <span>{pc.new}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))
            case "none":
            default:
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + pcc.length + " games)"
                }
                pcc.sort((a, b) => {
                    return a._id - b._id;
                })
                return pcc.map(pc => (
                    <div className={theme ? "theme-card" : "card"} title={pc.title} key={pc._id}>
                        <Link to={`/pc/${pc._id}`}>
                            <img src={pc.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/pc/${pc._id}`}>{pc.title}</Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/pc/${pc._id}`}>{pc.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {pc.discount
                                    ? <div className="discountt" >
                                        <span>{pc.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {pc.discount
                                    ? <div className="minus">
                                        <span>-{pc.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={pc.new === "new" ? "new-game" : ""}>
                                    <span>{pc.new}</span>
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
                            <Title title="Med" provider={value.theme} />
                            <div id="pc">
                                {Authority==="SuperAdmin" ?
                                <Add /> :null}
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

export default Pcc
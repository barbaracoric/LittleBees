import React, { useState, useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../Context'
import '../css/Pcc.css'
import '../css/Psnn.css'
import { Title } from '../Title'
import Add from './Add'
import Axios from 'axios';

function Psnn() {
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

   


    function applyFilter({ psnn, theme, addCart, addFavorite}) {

        var num_of_games = document.getElementById("num-of-games");
        var psnclass = document.getElementById("psn");
        if (psnclass) {
            if (psnclass.className === "flexcolumn") {
                switch (selected_filter) {
                    case "on_sale":
                        psnn.sort((a, b) => {
                            return b.discount - a.discount;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + psnn.filter(item => {
                                return item.discount !== 0;
                            }).length + " proizvoda)"
                        }
                        return psnn.map(psn => (
                            psn.discount ?
                                <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                                    <Link to={`/psn/${psn._id}`}>
                                        <img src={psn.src} alt="" />
                                    </Link>
                                    <div className={theme ? "theme-title-column" : "title-column"}>
                                        <div className="game-name">
                                            <Link to={`/psn/${psn._id}`}>{psn.title}</Link>
                                        </div>
                                        <div className="content">
                                            <Link to={`/psn/${psn._id}`}>{psn.content}</Link>
                                        </div>
                                    </div>
                                    <div className={theme ? "theme-right-column" : "right-column"}>
                                        <div className="game_name">
                                            <Link to={`/psn/${psn._id}`}>{psn.title}</Link>
                                        </div>
                                        <div className="real-price" title="">
                                            <Link to={`/psn/${psn._id}`}>{psn.price}
                                                <p><sup>EUR</sup></p></Link>
                                        </div>
                                        <div className="on-sale">
                                            {psn.discount ?
                                                <div className="discountt">
                                                    <span>{psn.onsale}</span>
                                                    <p><sup>EUR</sup></p>
                                                </div>
                                                : <div></div>
                                            }
                                            {psn.discount ?
                                                <div className="minus">
                                                    <span>-{psn.discount}%</span>
                                                </div>
                                                : <div></div>
                                            }
                                            <div className={psn.new === "new" ? "new-game" : ""}>
                                                <span>{psn.new}</span>
                                            </div>
                                        </div>
                                        <button title="Add to cart" onClick={() => addCart(psn._id)}>Add to cart</button>
                                        <button title="Add to favorite" onClick={() => addFavorite(psn._id)}>Add to favorite</button>
                                    </div>
                                </div>
                                : <div key={psn._id}></div>
                        ))
                    case "newest":
                        psnn.sort((a, b) => {
                            return b.new - a.new;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + psnn.filter(item => {
                                return item.new !== "";
                            }).length + " proizvoda)"
                        }
                        return psnn.map(psn => (
                            psn.new !== "" ?
                            <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                            <Link to={`/psn/${psn._id}`}>
                                <img src={psn.src} alt="" />
                            </Link>
                            <div className={theme ? "theme-title-column" : "title-column"}>
                                <div className="game-name">
                                    <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                </div>
                                <div className="content">
                                    <Link to={`/psn/${psn._id}`}>{psn.content}</Link>
                                </div>
                            </div>
                            <div className={theme ? "theme-right-column" : "right-column"}>
                                <div className="game_name">
                                    <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                </div>
                                <div className="real-price" title="">
                                    <Link to={`/psn/${psn._id}`}>{psn.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                                <div className="on-sale">
                                    {psn.discount ?
                                        <div className="discountt">
                                            <span>{psn.onsale}</span>
                                            <p><sup>EUR</sup></p>
                                        </div>
                                        : <div></div>
                                    }
                                    {psn.discount ?
                                        <div className="minus">
                                            <span>-{psn.discount}%</span>
                                        </div>
                                        : <div></div>
                                    }
                                    <div className={psn.new === "new" ? "new-game" : ""}>
                                        <span>{psn.new}</span>
                                    </div>
                                </div>
                                <button title="Add to cart" onClick={() => addCart(psn._id)}>Add to cart</button>
                                <button title="Add to favorite" onClick={() => addFavorite(psn._id)}>Add to favorite</button>
                            </div>
                        </div>
                        : <div key={psn._id}></div>
                        ))
                    case "high-low":
                        psnn.sort((a, b) => {
                            return b.price - a.price;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + psnn.length + " games)"
                        }
                        return psnn.map(psn => (
                            <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                                <Link to={`/psn/${psn._id}`}>
                                    <img src={psn.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/psn/${psn._id}`}>{psn.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                            <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                        </div>
                                    <div className="real-price" title="">
                                        <Link to={`/psn/${psn._id}`}>{psn.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {psn.discount ?
                                            <div className="discountt">
                                                <span>{psn.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {psn.discount ?
                                            <div className="minus">
                                                <span>-{psn.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={psn.new === "new" ? "new-game" : ""}>
                                            <span>{psn.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(psn._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(psn._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                    case "low-high":
                        psnn.sort((a, b) => {
                            return a.price - b.price;
                        })
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + psnn.length + " games)"
                        }
                        return psnn.map(psn => (
                            <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                                <Link to={`/psn/${psn._id}`}>
                                    <img src={psn.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/psn/${psn._id}`}>{psn.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                            <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                        </div>
                                    <div className="real-price" title="">
                                        <Link to={`/psn/${psn._id}`}>{psn.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {psn.discount ?
                                            <div className="discountt">
                                                <span>{psn.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {psn.discount ?
                                            <div className="minus">
                                                <span>-{psn.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={psn.new === "new" ? "new-game" : ""}>
                                            <span>{psn.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(psn._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(psn._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                    case "none":
                    default:
                        if (num_of_games) {
                            num_of_games.innerHTML = "(" + psnn.length + " games)"
                        }
                        psnn.sort((a, b) => {
                            return a._id - b._id;
                        })
                        return psnn.map(psn => (
                            <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                                <Link to={`/psn/${psn._id}`}>
                                    <img src={psn.src} alt="" />
                                </Link>
                                <div className={theme ? "theme-title-column" : "title-column"}>
                                    <div className="game-name">
                                        <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                    </div>
                                    <div className="content">
                                        <Link to={`/psn/${psn._id}`}>{psn.content}</Link>
                                    </div>
                                </div>
                                <div className={theme ? "theme-right-column" : "right-column"}>
                                    <div className="game_name">
                                            <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                        </div>
                                    <div className="real-price" title="">
                                        <Link to={`/psn/${psn._id}`}>{psn.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                    <div className="on-sale">
                                        {psn.discount ?
                                            <div className="discountt">
                                                <span>{psn.onsale}</span>
                                                <p><sup>EUR</sup></p>
                                            </div>
                                            : <div></div>
                                        }
                                        {psn.discount ?
                                            <div className="minus">
                                                <span>-{psn.discount}%</span>
                                            </div>
                                            : <div></div>
                                        }
                                        <div className={psn.new === "new" ? "new-game" : ""}>
                                            <span>{psn.new}</span>
                                        </div>
                                    </div>
                                    <button title="Add to cart" onClick={() => addCart(psn._id)}>Add to cart</button>
                                    <button title="Add to favorite" onClick={() => addFavorite(psn._id)}>Add to favorite</button>
                                </div>
                            </div>
                        ))
                }
            }
        }
        switch (selected_filter) {
            case "on_sale":
                psnn.sort((a, b) => {
                    return b.discount - a.discount;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + psnn.filter(item => {
                        return item.discount !== 0;
                    }).length + " proizvoda)"
                }
                return psnn.map(psn => (
                    psn.discount ?
                        <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                            <Link to={`/psn/${psn._id}`}>
                                <img src={psn.src} alt="" />
                            </Link>
                            <ul>
                                <li>
                                    <div className="game-name">
                                        <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="real-price">
                                        <Link to={`/psn/${psn._id}`}>{psn.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                </li>
                                <li className="on-sale">
                                    <div className="discountt">
                                        <span>{psn.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    <div className="minus">
                                        <span>-{psn.discount}%</span>
                                    </div>
                                    <div className={psn.new === "new" ? "new-game" : ""}>
                                        <span>{psn.new}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        : <div key={psn._id}></div>
                ))
            case "newest":
                psnn.sort((a, b) => {
                    return b.new - a.new;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + psnn.filter(item => {
                        return item.new !== "";
                    }).length + " proizvoda)"
                }
                return psnn.map(psn => (
                    psn.new !== "" ?
                        <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                            <Link to={`/psn/${psn._id}`}>
                                <img src={psn.src} alt="" />
                            </Link>
                            <ul>
                                <li>
                                    <div className="game-name">
                                        <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="real-price">
                                        <Link to={`/psn/${psn._id}`}>{psn.price}
                                            <p><sup>EUR</sup></p></Link>
                                    </div>
                                </li>
                                <li className="on-sale">
                                    {psn.discount
                                        ? <div className="discountt">
                                            <span>{psn.onsale}</span>
                                            <p><sup>EUR</sup></p>
                                        </div>
                                        : <div></div>
                                    }

                                    {psn.discount
                                        ? <div className="minus">
                                            <span>-{psn.discount}%</span>
                                        </div>
                                        : <div></div>
                                    }
                                    <div className={psn.new === "new" ? "new-game" : ""}>
                                        <span>{psn.new}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        : <div key={psn._id}></div>
                ))
            case "high-low":
                psnn.sort((a, b) => {
                    return b.price - a.price;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + psnn.length + " games)"
                }
                return psnn.map(psn => (
                    <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                        <Link to={`/psn/${psn._id}`}>
                            <img src={psn.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/psn/${psn._id}`}>{psn.title}</Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/psn/${psn._id}`}>{psn.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {psn.discount
                                    ? <div className="discountt">
                                        <span>{psn.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {psn.discount
                                    ? <div className="minus">
                                        <span>-{psn.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={psn.new === "new" ? "new-game" : ""}>
                                    <span>{psn.new}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))
            case "low-high":
                psnn.sort((a, b) => {
                    return a.price - b.price;
                })
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + psnn.length + " games)"
                }
                return psnn.map(psn => (
                    <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                        <Link to={`/psn/${psn._id}`}>
                            <img src={psn.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/psn/${psn._id}`}>{psn.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {psn.discount
                                    ? <div className="discountt">
                                        <span>{psn.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {psn.discount
                                    ? <div className="minus">
                                        <span>-{psn.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={psn.new === "new" ? "new-game" : ""}>
                                    <span>{psn.new}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))
            case "none":
            default:
                if (num_of_games) {
                    num_of_games.innerHTML = "(" + psnn.length + " games)"
                }
                psnn.sort((a, b) => {
                    return a._id - b._id;
                })
                return psnn.map(psn => (
                    <div className={theme ? "theme-card" : "card"} title={psn.title} key={psn._id}>
                        <Link to={`/psn/${psn._id}`}>
                            <img src={psn.src} alt="" />
                        </Link>
                        <ul>
                            <li>
                                <div className="game-name">
                                    <Link to={`/psn/${psn._id}`}>{psn.title} </Link>
                                </div>
                            </li>
                            <li>
                                <div className="real-price">
                                    <Link to={`/psn/${psn._id}`}>{psn.price}
                                        <p><sup>EUR</sup></p></Link>
                                </div>
                            </li>
                            <li className="on-sale">
                                {psn.discount
                                    ? <div className="discountt" >
                                        <span>{psn.onsale}</span>
                                        <p><sup>EUR</sup></p>
                                    </div>
                                    : <div></div>
                                }

                                {psn.discount
                                    ? <div className="minus">
                                        <span>-{psn.discount}%</span>
                                    </div>
                                    : <div></div>
                                }
                                <div className={psn.new === "new" ? "new-game" : ""}>
                                    <span>{psn.new}</span>
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
                    var psn = document.getElementById("psn");
                    var classChange = new MutationObserver(function (event) {
                        //console.log("class changed");
                        setView(psn.className);
                    })

                    if (psn) {
                        classChange.observe(psn, {
                            attributes: true,
                            attributeFilter: ['class'],
                            childList: false,
                            characterData: false
                        })
                    }

                    return (
                        <div>
                            <Title title="Kreme" provider={value.theme} />
                            <div id="psn">
                            {Authority==="SuperAdmin" ?
                                <Add /> : null}
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

export default Psnn
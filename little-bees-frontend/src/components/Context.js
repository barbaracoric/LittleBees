import React, { Component } from 'react'
import { pcc } from '../data_pc'
import { psnn } from '../data_psn'
import { xboxx } from '../data_xbox'

const DataContext = React.createContext();

class DataProvider extends Component {
    state = {
        pcc: pcc,
        psnn: psnn,
        xboxx: xboxx,
        theme: false,
        headerMargin: false,
        searchTerm: '',
        view: "flexrow",
        cart: [],
        favorite: []
    }

    changeTheme = () => {
        this.setState({ theme: !this.state.theme })
    }

    changeHeaderMargin = () => {
        this.setState({ headerMargin: !this.state.headerMargin })
    }

    editSearchTerm = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    dynamicSearch = () => {
        return this.state.gameNames.filter(gameName => gameName.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    addCart = (id) => {
        console.log("adding to cart");
        const { pcc, psnn,xboxx,cart } = this.state;
        const check = cart.every(item => {
            return item._id !== id
        })
        if (check) {
            const data_pc = pcc.filter(pc => {
                return pc._id === id
            })
            const data_psn = psnn.filter(psn => {
                return psn._id === id
            })
            const data_xbox = xboxx.filter(xbox => {
                return xbox._id === id
            })
            this.setState({ cart: [...cart, ...data_pc,...data_psn,...data_xbox] })
        } else {
            alert("The game has been added to cart.")
        }
    }

    reduction = id => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    }

    increase = id => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item._id === id) {
                item.count += 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    }

    removeProduct = id => {
        if (window.confirm("Do you want to delete this game?")) {
            const { cart } = this.state;
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            this.setState({ cart: cart });
            this.getTotal();
        }
    }

    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        }, 0)
        this.setState({ total: res })
    }

    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidUpdate() {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({ cart: dataCart });
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({ total: dataTotal });
        }
    }

    addFavorite = (id) => {
        const { pcc,psnn,xboxx, favorite } = this.state;
        const check = favorite.every(item => {
            return item._id !== id
        })
        if (check) {
            const data_pc = pcc.filter(pc => {
                return pc._id === id
            })
            const data_psn = psnn.filter(psn => {
                return psn._id === id
            })
            const data_xbox = xboxx.filter(xbox => {
                return xbox._id === id
            })
            this.setState({ favorite: [...favorite, ...data_pc,...data_psn,...data_xbox] })
        } else {
            alert("The game has been added to favorite.")
        }
    }

    removeFavorite = id => {
        if (window.confirm("Do you want to delete this game?")) {
            const { favorite } = this.state;
            favorite.forEach((item, index) => {
                if (item._id === id) {
                    favorite.splice(index, 1)
                }
            })
            this.setState({ favorite: favorite });
        }
    }

    componentDidUpdate() {
        localStorage.setItem('dataFavorite', JSON.stringify(this.state.favorite))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidUpdate() {
        const dataFavorite = JSON.parse(localStorage.getItem('dataFavorite'));
        if (dataFavorite !== null) {
            this.setState({ favorite: dataFavorite });
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({ total: dataTotal });
        }
    }

    componentDidMount() {
        this.setGames()
    }

    setGames = () => {
        let tempGamesPc = [];
        let tempGamesPsn = [];
        let tempGamesXbox = [];
        pcc.forEach(game => {
            let pcGame = { ...game }
            pcGame.discount = pcGame.onsale ? Math.floor(100 - (pcGame.price / pcGame.onsale) * 100) : 0;
            tempGamesPc = [...tempGamesPc, pcGame]
        })
        psnn.forEach(game => {
            let psnGame = { ...game }
            psnGame.discount = psnGame.onsale ? Math.floor(100 - (psnGame.price / psnGame.onsale) * 100) : 0;
            tempGamesPsn = [...tempGamesPsn, psnGame]
        })
        xboxx.forEach(game => {
            let xboxGame = { ...game }
            xboxGame.discount = xboxGame.onsale ? Math.floor(100 - (xboxGame.price / xboxGame.onsale) * 100) : 0;
            tempGamesXbox = [...tempGamesXbox, xboxGame]
        })
        this.setState({
            pcc: tempGamesPc,
            psnn: tempGamesPsn,
            xboxx: tempGamesXbox,

        })
        console.log(tempGamesPc)
        console.log(tempGamesPsn)
        console.log(tempGamesXbox)
    }


    render() {
        const { cart, theme, headerMargin, total, favorite } = this.state;
        const { addCart, changeTheme, changeHeaderMargin, reduction, increase, removeProduct, getTotal, addFavorite, removeFavorite } = this;
        return (
            <DataContext.Provider value={{ ...this.state, addCart, cart, theme, changeTheme, headerMargin, changeHeaderMargin, reduction, increase, removeProduct, total, getTotal, addFavorite, favorite, removeFavorite }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
const ProductConsumer = DataContext.Consumer

export { DataProvider, ProductConsumer, DataContext }
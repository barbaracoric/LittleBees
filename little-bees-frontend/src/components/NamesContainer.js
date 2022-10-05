import React, { Component } from 'react'
import Name from './Name'

class NamesContainer extends Component {
    render() {
        return (
            <div>
                {this.props.gameNames.map(gameName => <Name gameName = {gameName}/>)}
            </div>
        )
    }
}

export default NamesContainer
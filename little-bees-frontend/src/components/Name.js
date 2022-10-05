import React, { Component } from 'react'

class Name extends Component {
    render() {
        return (
            <div>
                {this.props.gameName}
            </div>
        )
    }
}

export default Name
import React, {Component} from 'react'
import ShowMoreText from 'react-show-more-text';
import './css/App.css'
 
class ShowMore extends Component {
    executeOnClick(isExpanded) {
        console.log(isExpanded);
    }
 
    render() {
        return (
            <ShowMoreText
                /* Default options */
                lines={4}
                more='Show more'
                less='Show less'
                className='content-css'
                anchorClass='my-anchor-css-class'
                onClick={this.executeOnClick}
                expanded={false}
                width={650}>
                    {this.props.content}
            </ShowMoreText>
        );
    }
}

export default ShowMore
import React from 'react'
import './css/Title.css'
import Filter from './Filter'

export function Title(props){
    return(
        <div className={props.provider ? "theme-title" : "title"}>
            <div className="main-title">
                <div>{props.title}</div>
                {/*<p id="num-of-games">(6 Pro)</p>*/}
            </div>
            <Filter />
        </div>
    )
}
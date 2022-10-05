import React from 'react'
import './css/Title.css'

export function MainTitle({ title, provider, type }) {
    return (
        <div className={provider ? "theme-title" : "title"} onClick={() => { if (type) window.location.replace("/" + type); }}>
            <div className="main-title">
                <div>{title}</div>
            </div>
        </div>
    )

}
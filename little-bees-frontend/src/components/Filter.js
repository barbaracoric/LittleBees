import React, { Component } from 'react'
import './css/Title.css'

function Filter(props) {
    return (
        <div className={props.provider ? "theme-filters" : "filters"}>
            <label id="sort_by">Sort by</label>
            <select id="selected_filter">
                <option value="none">None</option>
                <option value="on_sale">Sale</option>
                <option value="newest">Newest</option>
                <option value="high-low">Price: High-Low</option>
                <option value="low-high">Price: Low-High</option>
            </select>
            {/* <div className="gallery selected" id="gallery" onClick={() => {
                var pc = document.getElementById("pc");
                var psn = document.getElementById("psn");
                var xbox = document.getElementById("xbox");
                var gallery = document.getElementById("gallery");
                var list = document.getElementById("list");
                if (pc) {
                    pc.className = "flexrow";
                }
                if (psn) {
                    psn.className = "flexrow";
                }
                if (xbox) {
                    xbox.className = "flexrow";
                }
                if(gallery){
                    gallery.className = "gallery selected";
                }
                if(list){
                    list.className = "list";
                }
            }}>
                <i class="fas fa-th fa-lg"></i>
            </div>
            <div className={props.provider ? "theme-list" : "list"} id="list" onClick={() => {
                var pc = document.getElementById("pc");
                var psn = document.getElementById("psn");
                var xbox = document.getElementById("xbox");
                var gallery = document.getElementById("gallery");
                var list = document.getElementById("list");
                if (pc) {
                    pc.className = "flexcolumn";
                }
                if (psn) {
                    psn.className = "flexcolumn";
                }
                if (xbox) {
                    xbox.className = "flexcolumn";
                }
                if(gallery){
                    gallery.className = "gallery";
                }
                if(list){
                    list.className = "list selected";
                }
            }}>
                <i class="fas fa-th-list fa-lg"></i>
            </div> */}
        </div>
    )
}

export default Filter
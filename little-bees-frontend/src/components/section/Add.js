import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import AddGame from './AddGame'
import '../css/Add.css'


class Add extends Component {
    render(){
        return (
            <div className="addgame">
                <Link to="/addgame">+<p>DODAJ</p></Link>
                {/* <AddGame /> */}
            </div>
        )
    }
}

export default Add
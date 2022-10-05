import React, {Component} from 'react'
import {DataContext} from '../Context'
import Barbara from '../img/barbara.jpeg'
import Milica from '../img/milica.jpeg'
import '../css/About.css' 
import { MainTitle } from '../MainTitle'

class About extends Component {
    static contextType = DataContext;

    render(){
        const {theme} = this.context;

        return (
            <div>
            <MainTitle title="About us" provider={theme}/>
            <div className={theme ? "theme-about" : "about"}>
                <div className={theme ? "theme-barbara" : "barbara"}>
                    <img src={Barbara} alt ="" width="200px"/>
                    <p>Zovem se Barbara Ćorić, imam 23 godine. Studentica sam treće godine računarstva na Fakultetu Strojarstva Računarstva i Elektrotehnike. Poznajem Milicu već 3 godine, dobre smo kolegice od početka studija. Do sada sam stekla iskustva u programiranju u programskim jezicima kao što HTML, C, C++, Java i Javascript. Nadam da se da će mi stečeno znanje u programiranju pomoći u savladavanju ovog izazovnog projekta.</p>
                </div>
                <div className={theme ? "theme-milica" : "milica"}>
                    <img src={Milica} alt ="" width="200px"/>
                    <p>Zovem se Milica Bago i imam 24 godine. Studentica sam treće godine računarstva na Fakultetu Strojarstva Računarstva i Elektrotehnike. Kolegicu Barbaru poznajem od prve godine studija. Do sada sam se susretala sa programiranjem u jezicima HTML, C, C++, Java i Javascript, te CSS-om. Nadam se da će mi ovaj projekt biti dobar izazov te da ću uspjeti proširiti svoje znanje iz programiranja i naučiti dosta toga.</p>
                </div>
                
            </div>
            </div>
        )
    }
}

export default About
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import SVGComponent from "./wave";
import './header.css'

export default function Header() {
    const { t, i18n } = useTranslation();
    const nameArr = Array.from("rodrigo zea");

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    return(
        <div>
            <div id="header">
                <div id="name-container">
                    <div id="name">
                        {
                            nameArr.map((i, index) => {
                                if (index == 0 || index == 8) {
                                    return(
                                        <div id={"l"+index} key={index}><span>{i}</span></div>
                                    )
                                } else {
                                    return(
                                        <div className='animated' key={index}><span>{i}</span></div>
                                    ) 
                                }
                            })
                        }
                        <span id="dev">| developer</span>
                    </div>
                   
                </div>
                
                <div id="icons">
                    <div id="icons-container">
                        <a href="https://www.linkedin.com/in/rodrigo-zea/" target="_blank">
                            <BsLinkedin className="header-icon" style={{marginRight:'0.5em'}}/>
                        </a>
                        <a href="https://www.github.com/RodrigoZea" target="_blank">
                            <BsGithub className="header-icon" style={{marginRight:'0.5em'}}/>
                        </a>
                        <a href="mailto:zearodrigo37@gmail.com" target="_blank">
                            <HiMail className="header-icon" />
                        </a>
                        <select id="select-box" onChange={changeLanguage}>
                            <option className="optionsMenu" value="en">
                                EN
                            </option>
                            <option className="optionsMenu" value="es">
                                ES
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <SVGComponent/>
        </div>
    )
}
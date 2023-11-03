import HomePage from "./HomePage";
import './HomeScreen.css';
import { logoIcon, profilePicture, menuIcon } from '../Data'


function HomeScreen() {
    return (
        <div className="mainContainer">
            <div className="firstSection"><span><img src={logoIcon} /></span><p>Chirpz</p></div>
            <div className="middleSection"><HomePage /></div>
            <div className="lastSection"><img src={profilePicture} /><span className="profile">John Deo</span><img className="manuIcon" src={menuIcon} /></div>
        </div>
    )
}

export default HomeScreen;
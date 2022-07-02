import twitterLogo from '../assets/img/logos/twitter-black.png'
import githubLogo from '../assets/img/logos/github-black.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className="footer">
            <p id='email'>hehg.cs@gmail.com</p>
            <a className='icon' href="https://github.com/Hett-XY-14/phonebook/" target="_blank" rel="noreferrer"> <FontAwesomeIcon icon={faGithubSquare} size="2x" className='github-icon'/> </a>
            <a className='icon' href="https://twitter.com/Heco_cs" target="_blank" rel="noreferrer"> <FontAwesomeIcon icon={faTwitterSquare} size="2x" className='twitter-icon'/> </a>

        </div>
    )
}

export default Footer;
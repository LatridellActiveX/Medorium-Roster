import { Link } from 'react-router-dom';
import logo from './../assets/CorpLogo.png';

const Header: React.FC = () => {

    return <header id='Heading'>
        <h1 id="HeadingText">Medor Dashboard</h1>
        <Link className='transition-opacity hover:opacity-70' to='/'>
            <img id="Logo" src={logo} alt="Logo" />
        </Link>
    </header>
}

export default Header;
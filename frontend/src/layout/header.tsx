import { Link } from 'react-router-dom';
import logo from './../assets/CorpLogo.png';

const Header: React.FC = () => {
    return <header className="fixed text-2xl flex justify-center items-center flex-col w-screen bg-black opacity-60">
        <Link className="transition-opacity hover:opacity-70" to="/">
            <img id="Logo" src={logo} alt="Logo" className='h-24' />
        </Link>
    </header>
}

export default Header;
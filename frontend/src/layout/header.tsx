import { Link } from 'react-router-dom';
import LoginOrLogout from '../ui/loginOrLogout';

const Header: React.FC = () => {
    return <header className="w-full fixed text-2xl px-4">
        <div className="h-16 sm:w-[32rem] md:w-[42rem] mx-auto flex justify-between items-center">
            <div className="">
                <div className="flex items-center cursor-pointer">
                    <Link to="/" className="text-slate-200">
                        Medor
                    </Link>
                </div>
            </div>
            <div className="flex gap-4">
                <LoginOrLogout />
                <button className="space-y-2">
                    <span className="block w-5 h-[3px] rounded-sm bg-slate-100"></span>
                    <span className="block w-8 h-[3px] rounded-sm bg-slate-100"></span>
                    <span className="block w-8 h-[3px] rounded-sm bg-slate-100"></span>
                </button>
            </div>
        </div>
        <Link className="transition-opacity hover:opacity-70" to="/">
            {/* <img id="Logo" src={logo} alt="Logo" className='h-24' /> */}
        </Link>
    </header>
}

export default Header;
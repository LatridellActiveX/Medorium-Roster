import logo from './../assets/CorpLogo.png';

const Header: React.FC = () => {

    return <header id='Heading'>
        <h1 id="HeadingText">Medor Dashboard</h1>
        <img id="Logo" src={logo} alt="Logo" />
    </header>
}

export default Header;
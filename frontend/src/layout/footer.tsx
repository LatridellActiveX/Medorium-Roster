import BgScreen from "../ui/bgScreen";

const Footer: React.FC = () => {
	const version = import.meta.env.VITE_APPLICATION_VERSION;

	return <footer className="relative py-5 mt-10 sm:mt-16">
		<BgScreen />
		<h3>
			EVE Online related media is used under The official EVE Online Content Creation Terms of Use.
			<strong> Site Version: {version}</strong>
		</h3>
	</footer>
};

export default Footer;
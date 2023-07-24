const Footer: React.FC = () => {
	const version = import.meta.env.VITE_APPLICATION_VERSION;

	return <footer>
		<h3>
			EVE Online related media is used under The official EVE Online Content Creation Terms of Use.
			<strong> Site Version: {version}</strong>
		</h3>
	</footer>
};

export default Footer;
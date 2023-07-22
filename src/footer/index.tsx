import React from 'react';

const Footer: React.FC = () => {
    const version = import.meta.env.SNOWPACK_PUBLIC_APPLICATION_VERSION;

    return <footer id="footer">
        <h3>
            EVE Online related media is used under The official EVE Online Content Creation Terms of Use.
            <strong> Site Version: {version}</strong>
        </h3>
    </footer>
};

export default Footer;
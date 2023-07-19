import React from 'react';

const Footer = () =>{
    const version = import.meta.env.SNOWPACK_PUBLIC_APPLICATION_VERSION;
    return(
        <p id="footer">EVE Online related media is used under The official EVE Online Content Creation Terms of Use.    <strong> Site Version: {version}</strong></p>
    );
};

export default Footer;
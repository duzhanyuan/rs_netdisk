import * as React from 'react';

import { Navbar, NavbarBrand } from 'reactstrap';

class LoginNav extends React.Component<{}, {}> {
    public render() {
        return (
            <Navbar className="navbar-expand-md fixed-top">
                <NavbarBrand>Storage</NavbarBrand>
            </Navbar>
        );
    }
}

export default LoginNav;

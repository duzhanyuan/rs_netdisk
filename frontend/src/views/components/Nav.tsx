import * as React from 'react';

import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse
} from 'reactstrap';

interface State {
    is_open: boolean;
}

class Nav extends React.Component<{}, State> {
    constructor() {
        super();

        this.state = {
            is_open: false
        };

        this.toggle = this.toggle.bind(this);
    }

    public toggle() {
        this.setState({
            is_open: !this.state.is_open
        });
    }

    public render() {
        return (
            <Navbar className="fixed-top">
                <NavbarBrand>Storage</NavbarBrand>

                <NavbarToggler onClick={this.toggle}>
                    <img src={require('../../icons/baseline-menu-24px.svg')}/>
                </NavbarToggler>

                <Collapse isOpen={this.state.is_open} navbar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </Collapse>
            </Navbar>
        );
    }
}

export default Nav;

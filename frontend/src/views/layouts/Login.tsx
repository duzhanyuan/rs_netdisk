import * as React from 'react';

import LoginNav from '../components/LoginNav';
import Well from '../login/Well';

class Login extends React.Component<{}, {}> {
    public render() {
        return (
            <div id="app">
                <LoginNav />

                <Well />
            </div>
        );
    }
}

export default Login;

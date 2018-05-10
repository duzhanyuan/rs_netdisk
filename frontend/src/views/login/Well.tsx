import * as React from 'react';

import LoginForm from './LoginForm';

import { Col } from 'reactstrap';

class Well extends React.Component<{}, {}> {
    public render() {
        return (
            <div className="flex-center mt-4">
                <Col md={6}>
                    <div className="panel">
                        <div className="panel-heading">
                            Login
                        </div>

                        <div className="panel-body">
                            <LoginForm />
                        </div>
                    </div>
                </Col>
            </div>
        );
    }
}

export default Well;

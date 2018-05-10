import * as React from 'react';

import { Redirect } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import AuthFacade from '../../web/facades/AuthFacade';

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

interface State {
    email: string;
    password: string;
    pending: boolean;
}

class LoginForm extends React.Component<{}, State> {
    public constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            pending: false
        };

        this.set_email = this.set_email.bind(this);
        this.set_password = this.set_password.bind(this);
        this.login = this.login.bind(this);
    }

    public login( e: React.MouseEvent<HTMLButtonElement> ) {
        e.preventDefault();

        this.setState({
            pending: true,
        });

        AuthFacade.login( this.state.email, this.state.password )
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if ( response.user ) {
                    AuthService.set_token(
                        response.token
                    );

                    AuthService.set_user(
                        UserService.make_user(
                            response.user.user_id,
                            response.user.name,
                            response.user.email,
                            response.roles,
                            []
                        )
                    );
                }

                this.setState({
                    pending: false,
                });
            });
    }

    public render() {
        if ( AuthService.is_authenticated() ) {
            return (
                <Redirect to="/storage" />
            );
        }

        return (
            <Form>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="text" onChange={this.set_email} placeholder="Email"/>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" onChange={this.set_password} placeholder="Password"/>
                </FormGroup>

                <Button className="button button-primary float-right" type="submit" onClick={this.login}>
                    {this.state.pending ? 'Logging In...' : 'Login'}
                </Button>

                <div className="clearfix"/>
            </Form>
        );
    }

    private set_email(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: e.target.value,
        });
    }

    private set_password(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: e.target.value,
        });
    }
}

export default LoginForm;

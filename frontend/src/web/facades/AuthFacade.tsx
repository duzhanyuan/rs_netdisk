import AuthImpl from '../impl/AuthImpl';

class AuthFacade {
    public login(email: string, password: string): Promise<Response> {
        return AuthImpl.login(email, password);
    }
}

export default new AuthFacade();

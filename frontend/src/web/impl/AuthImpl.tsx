import AuthApi from '../api/AuthApi';
import make_request from '../Request';

class AuthImpl {
    public login(email: string, password: string): Promise<Response> {
        return make_request(AuthApi.login_route(), {
            email,
            password
        });
    }
}

export default new AuthImpl();

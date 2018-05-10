import Route from '../Route';

class AuthApi {
    public login_route(): Route {
        return {
            format: 'application/json',
            method: 'POST',
            path: '/api/login'
        };
    }
}

export default new AuthApi();

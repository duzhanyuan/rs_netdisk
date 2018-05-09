import Route from '../Route';

class AuthApi {
    public login_route(): Route {
        return {
            path: '/api/login',
            method: 'POST',
            format: 'application/json'
        };
    }
}

export default new AuthApi();

import User from '../entities/User';

class AuthService {
    static user: User | undefined = undefined;

    public get_user(): User | undefined {
        return AuthService.user;
    }

    public set_user(user: User): User {
        AuthService.user = user;

        return AuthService.user;
    }

    public delete_user() {
        AuthService.user = undefined;
    }

    public is_authenticated(): boolean {
        return AuthService.user != undefined;
    }
}

export default new AuthService();

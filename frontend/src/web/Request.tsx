import Route from './Route';

import AuthService from '../services/AuthService';

export function make_request(route: Route, body: object): Promise<Response> {
    return fetch(route.path, {
            body: JSON.stringify(body),
            headers: {
                'Authorization': 'Bearer ' + AuthService.get_token(),
                'Content-Type': route.format
            },
            method: route.method,
        });
}

export default make_request;

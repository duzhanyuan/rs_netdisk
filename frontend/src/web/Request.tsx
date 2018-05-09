import Route from './Route';

import TokenService from '../services/Token';

export function make_request(route: Route, body: object): Promise<Response> {
    return fetch(route.path, {
            body: JSON.stringify(body),
            headers: {
                'Authorization': 'Bearer ' + TokenService.getToken(),
                'Content-Type': route.format
            },
            method: route.method,
        })
}

export default make_request;

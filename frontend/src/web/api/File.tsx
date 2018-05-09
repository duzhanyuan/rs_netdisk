import Route from '../Route';

class File {
    public index_route(user_id: number, folder_id: number): Route {
        return {
            path: '/api/users/' + user_id + '/folders/' + folder_id + '/files',
            method: 'GET',
            format: 'application/json'
        };
    }

    public show_route(user_id: number, folder_id: number, file_id: number): Route {
        return {
            path: '/api/users/' + user_id + '/folders/' + folder_id + '/files/' + file_id,
            method: 'GET',
            format: 'application/json'
        };
    }

    public download_route(user_id: number, folder_id: number, file_id: number): Route {
        return {
            path: '/api/users/' + user_id + '/folders/' + folder_id + '/files/' + file_id + '/download',
            method: 'GET',
            format: 'application/json'
        };
    }

    public upload_route(user_id: number, folder_id: number): Route {
        return {
            path: '/api/users/' + user_id + '/folders/' + folder_id + '/files',
            method: 'POST',
            format: 'text/plain'
        };
    }

    public store_route(user_id: number, folder_id: number): Route {
        return {
            path: '/api/users/' + user_id + '/folders/' + folder_id + '/files',
            method: 'POST',
            format: 'application/json'
        };
    }

    public update_route(user_id: number, folder_id: number, file_id: number): Route {
        return {
            path: '/api/users/' + user_id + '/folders/' + folder_id + '/files/' + file_id,
            method: 'PUT',
            format: 'application/json'
        };
    }

    public delete_route(user_id: number, folder_id: number, file_id: number): Route {
        return {
            path: '/api/users/' + user_id + '/folders/' + folder_id + '/files/' + file_id,
            method: 'DELETE',
            format: 'application/json'
        };
    }
}

export default new File();

import * as React from "react";

import AuthService from "../../services/Auth";
import TokenService from "../../services/Token";

import { File as FileModel } from "../../models/File";

import FileSetItem from "./FileSetItem";

import NewFileButton from "./NewFileButton";

class FileSet extends React.Component<{ root: number }, { files: FileModel[] }> {
    private uploading;

    constructor() {
        super();

        this.state = {
            files: [],
        };

        this.load = this.load.bind(this);
        this.upload = this.upload.bind(this);

        this.load();
    }

    public upload(files) {
        if(this.uploading) {
            return;
        }

        this.uploading = true;

        AuthService.user().then((user) => {
            const path = "/api/users/" + user.user_id + "/folders/" + this.props.root + '/files';

            for(let i = 0; i < files.length; i++) {
                fetch(path, {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + TokenService.getToken(),
                        'Content-Type': 'text/plain'
                    },
                    body: files[i],
                }).then((response) => {
                    return response.text();
                }).then((response) => {
                    console.log(files[i]);
                    console.log(response);

                    let file_name = files[i].name.split('.');

                    fetch(path, {
                        method: 'post',
                        headers: {
                            'Authorization': 'Bearer ' + TokenService.getToken(),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            extension: file_name.pop() || "text",
                            name: file_name.join(''),
                            file_name: response,
                        }),
                    }).then((response) => {
                        return response.json();
                    }).then((response) => {
                        this.load();
                    });
                });
            }
        });

        this.uploading = false;
    }

    public load() {
        AuthService.user().then((user) => {
            const path = "/api/users/" + user.user_id + "/folders/" + this.props.root + '/files';

            fetch(path, {
                headers: {
                    'Authorization': 'Bearer ' + TokenService.getToken(),
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                return response.json();
            }).then((response: FileModel[]) => {
                this.setState({
                    files: response
                });
            });
        });
    }

    public render() {
        return (
            <div className="file-set">
                {this.state.files.map( file => <FileSetItem file={file} key={file.file_id}/> )}

                <NewFileButton root={this.props.root} onUpload={this.load}/>
            </div>
        );
    }
}

export default FileSet;
import * as React from "react";

class Folder extends React.Component<{ folder_id: number, folder_name: string }, { }> {
    constructor( folder_id: number, folder_name: string ) {
        super();

        this.props = {
            folder_id,
            folder_name
        };
    }

    public render() {
        return (
            <li data-folder-id={this.props.folder_id} className="folder">
                {this.props.folder_name}
            </li>
        );
    }
}

export default Folder;
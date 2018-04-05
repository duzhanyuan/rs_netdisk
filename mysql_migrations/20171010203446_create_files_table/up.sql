CREATE TABLE files (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    file_name VARCHAR(128) NOT NULL,
    folder_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    FOREIGN KEY (folder_id) REFERENCES folders(id)
);

CREATE TRIGGER files_set_updated_at BEFORE UPDATE ON files
FOR EACH ROW SET @updated_at = CURRENT_TIMESTAMP();

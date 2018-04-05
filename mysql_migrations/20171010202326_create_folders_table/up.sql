CREATE TABLE folders (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    parent_id INT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    FOREIGN KEY (parent_id) REFERENCES folders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TRIGGER folders_set_updated_at BEFORE UPDATE ON folders
FOR EACH ROW SET @updated_at = CURRENT_TIMESTAMP();

use schema::*;

use database::pool::DbConn;

use diesel;
use diesel::ExecuteDsl;
use diesel::result::Error;

use std::ops::Deref;

#[derive(Insertable)]
#[table_name = "files"]
pub struct NewFile {
    pub name: String,
    pub file_name: String,
    pub extension: String,
    pub folder_id: i32,
}

impl NewFile {
    pub fn save(&self, conn: &DbConn) -> Result<usize, Error> {
        use std::str::FromStr;
        use schema::files;

        let new_file = NewFile {
            name: String::from_str(&self.name).unwrap(),
            file_name: String::from_str(&self.file_name).unwrap(),
            extension: String::from_str(&self.extension).unwrap(),
            folder_id: self.folder_id
        };

        diesel::insert(&new_file).into(files::table).execute(conn.deref())
    }
}

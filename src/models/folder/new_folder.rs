use schema::*;

use database::pool::DbConn;

use diesel;
use diesel::ExecuteDsl;
use diesel::result::Error;

use std::ops::Deref;

#[derive(Insertable)]
#[table_name = "folders"]
pub struct NewFolder {
    pub name: String,
    pub parent_id: Option<i32>,
    pub user_id: i32,
}

impl NewFolder {
    pub fn save(&self, conn: &DbConn) -> Result<usize, Error> {
        use std::str::FromStr;
        use schema::folders;

        let new_folder = NewFolder {
            name: String::from_str(&self.name).unwrap(),
            parent_id: self.parent_id,
            user_id: self.user_id
        };

        diesel::insert(&new_folder).into(folders::table).execute(conn.deref())
    }
}

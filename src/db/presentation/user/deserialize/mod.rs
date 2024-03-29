mod field;
mod field_visitor;
mod user_visitor;

use self::user_visitor::UserVisitor;
use db::models::User;
use db::presentation::FromJson;
use serde::de::{Deserialize, Deserializer};

const FIELDS: &'static [&'static str] = &["user_id", "email", "name", "role"];

impl<'de> Deserialize<'de> for User {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        deserializer.deserialize_struct("User", FIELDS, UserVisitor)
    }
}

impl<'a> FromJson<'a> for User {}

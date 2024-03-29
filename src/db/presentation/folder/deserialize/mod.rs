mod field;
mod field_visitor;
mod folder_visitor;

use self::folder_visitor::FolderVisitor;
use db::models::Folder;
use db::presentation::FromJson;
use serde::de::{Deserialize, Deserializer};

const FIELDS: &'static [&'static str] = &["folder_id", "name", "parent_id", "user_id"];

impl<'de> Deserialize<'de> for Folder {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        deserializer.deserialize_struct("Folder", FIELDS, FolderVisitor)
    }
}

impl<'a> FromJson<'a> for Folder {}

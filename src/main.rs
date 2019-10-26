#![feature(proc_macro_hygiene, decl_macro)]
extern crate chrono;
#[macro_use]
extern crate diesel;
extern crate bcrypt;
extern crate dotenv;
extern crate rand;
extern crate time;
#[macro_use]
extern crate lazy_static;
extern crate bytes;
extern crate diesel_derive_enum;
extern crate frank_jwt;
extern crate futures;
extern crate hyper;
extern crate postgres;
extern crate r2d2_postgres;
#[macro_use]
extern crate rocket;
extern crate rocket_codegen;
extern crate rusoto_core;
extern crate rusoto_s3;
extern crate serde;
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate tera;
extern crate rocket_contrib;
extern crate tokio;

#[cfg(test)]
#[macro_use]
extern crate fake;

#[macro_use]
mod logging;

#[cfg(test)]
#[macro_use]
mod test;

mod auth;
mod controllers;
mod db;
mod env;
mod policies;
mod schema;
mod services;
mod storage_drivers;
mod web;

fn main() -> std::io::Result<()> {
    // Load .env file
    dotenv::dotenv().expect("Missing .env file");

    seed();

    web::boot()
}

use db::models::User;
use db::DbPool;
use diesel::ExpressionMethods;
use diesel::QueryDsl;
use diesel::RunQueryDsl;
use schema::*;
use services::UserService;

fn seed() {
    match User::all()
        .filter(users::role.eq("admin"))
        .first::<User>(&DbPool::connection())
    {
        Ok(_) => {}
        Err(_) => {
            UserService::create(
                "Temp Admin".to_string(),
                "temp@temp.com".to_string(),
                "admin".to_string(),
                "password".to_string(),
            )
            .unwrap();
        }
    };
}

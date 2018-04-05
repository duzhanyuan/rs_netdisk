use r2d2;
use r2d2_diesel::ConnectionManager;

#[allow(unused_imports)]
use diesel::pg::PgConnection;

#[allow(unused_imports)]
use diesel::mysql::MysqlConnection;

#[cfg(feature = "postgres")]
pub type ManagedConn = ConnectionManager<PgConnection>;

#[cfg(feature = "mysql")]
pub type ManagedConn = ConnectionManager<MysqlConnection>;

pub type Pool = r2d2::Pool<ManagedConn>;

#[cfg(feature = "postgres")]
type Connection = PgConnection;

#[cfg(feature = "mysql")]
type Connection = MysqlConnection;

use std::ops::Deref;
use rocket::http::Status;
use rocket::request::{self, FromRequest};
use rocket::{Request, State, Outcome};
/// Db Connection request guard type: wrapper around r2d2 pooled connection
pub struct DbConn(pub r2d2::PooledConnection<ManagedConn>);

/// Attempts to retrieve a single connection from the managed database pool. If
/// no pool is currently managed, fails with an `InternalServerError` status. If
/// no connections are available, fails with a `ServiceUnavailable` status.
impl<'a, 'r> FromRequest<'a, 'r> for DbConn {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<DbConn, ()> {
        let pool = request.guard::<State<Pool>>()?;
        match pool.get() {
            Ok(conn) => Outcome::Success(DbConn(conn)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ())),
        }
    }
}

// For the convenience of using an &DbConn as an &SqliteConnection.
impl Deref for DbConn {
    type Target = Connection;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

pub fn init(database_url: &str) -> Pool {
    let config = r2d2::Config::default();
    let manager = ConnectionManager::<Connection>::new(database_url);
    r2d2::Pool::new(config, manager).expect("Failed to create pool.")
}

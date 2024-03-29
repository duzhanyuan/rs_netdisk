use super::ControllerError as Error;
use db::models::User;
use db::DbFacade;
use diesel::result;
use diesel::ExpressionMethods;
use diesel::QueryDsl;
use diesel::RunQueryDsl;
use policies::Restricted;
use schema::*;
use services::UserService;

pub struct UserController;

impl UserController {
    pub fn index(user: User) -> Result<Vec<User>, Error> {
        if !user.can_index::<User>() {
            return Err(Error::Forbidden);
        }

        let conn = &DbFacade::connection();

        match User::all().load(conn) {
            Ok(users) => Ok(users),
            Err(_) => Err(Error::InternalServerError),
        }
    }

    pub fn show(user: User, user_id: i32) -> Result<User, Error> {
        let conn = &DbFacade::connection();

        let found: User = match User::all().filter(users::id.eq(&user_id)).first(conn) {
            Ok(user) => user,
            Err(result::Error::NotFound) => return Err(Error::NotFound),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        };

        match user.can_view(found.clone()) {
            true => Ok(found),
            false => Err(Error::Forbidden),
        }
    }

    pub fn create(user: User) -> Result<(), Error> {
        match user.can_create::<User>() {
            true => Ok(()),
            false => Err(Error::Forbidden),
        }
    }

    pub fn store(
        user: User,
        name: String,
        email: String,
        role: String,
        password: String,
    ) -> Result<User, Error> {
        if !user.can_create::<User>() {
            return Err(Error::Forbidden);
        }

        match <resolve!(UserService)>::create(name, email, role, password) {
            Ok(user) => Ok(user),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        }
    }

    pub fn edit(user: User, user_id: i32) -> Result<User, Error> {
        let conn = &DbFacade::connection();

        let found: User = match User::all().filter(users::id.eq(&user_id)).first(conn) {
            Ok(user) => user,
            Err(result::Error::NotFound) => return Err(Error::NotFound),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        };

        match user.can_modify(found.clone()) {
            true => Ok(found),
            false => Err(Error::Forbidden),
        }
    }

    pub fn update(
        user: User,
        user_id: i32,
        name: String,
        email: String,
        role: String,
    ) -> Result<User, Error> {
        let conn = &DbFacade::connection();

        let found: User = match User::all().filter(users::id.eq(&user_id)).first(conn) {
            Ok(user) => user,
            Err(result::Error::NotFound) => return Err(Error::NotFound),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        };

        if !user.can_modify(found.clone()) {
            return Err(Error::Forbidden);
        }

        match <resolve!(UserService)>::update(user_id, name, email, role) {
            Ok(user) => Ok(user),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        }
    }

    pub fn delete(user: User, user_id: i32) -> Result<User, Error> {
        let conn = &DbFacade::connection();

        let found: User = match User::all().filter(users::id.eq(&user_id)).first(conn) {
            Ok(user) => user,
            Err(result::Error::NotFound) => return Err(Error::NotFound),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        };

        if !user.can_delete(found.clone()) {
            return Err(Error::Forbidden);
        }

        match <resolve!(UserService)>::delete(user_id) {
            Ok(user) => Ok(user),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        }
    }

    pub fn update_password(user: User, user_id: i32, password: String) -> Result<User, Error> {
        let conn = &DbFacade::connection();

        let found: User = match User::all().filter(users::id.eq(&user_id)).first(conn) {
            Ok(user) => user,
            Err(result::Error::NotFound) => return Err(Error::NotFound),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        };

        if !user.can_modify(found.clone()) {
            return Err(Error::Forbidden);
        }

        match <resolve!(UserService)>::update_password(user_id, password) {
            Ok(user) => Ok(user),
            Err(e) => {
                log!("error", "500 Internal Server Error: {}", e);
                return Err(Error::InternalServerError);
            }
        }
    }
}

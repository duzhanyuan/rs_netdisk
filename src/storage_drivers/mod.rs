mod aws;
// mod disk;
pub mod storage_driver_option;
pub mod storage_router;

pub use self::storage_router::StorageRouter;

use bytes::Bytes;
use futures::stream::Stream;
use std::error::Error;
use std::fs::File;
use std::path::Path;

pub trait StorageDriver {
    type Error: Error;

    fn store<S>(path: &Path, contents: S) -> Result<(), Self::Error>
    where
        S: Stream<Item = Bytes, Error = std::io::Error> + Send + 'static;

    fn read(
        path: &Path,
    ) -> Result<Box<dyn Stream<Item = Bytes, Error = std::io::Error> + Send>, Self::Error>;

    fn delete(path: &Path) -> Result<(), Self::Error>;
}

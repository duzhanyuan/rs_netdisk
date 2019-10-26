use super::bucket::Bucket;
use super::credentials::Credentials;
use super::region::Region;
use bytes::Bytes;
use chrono::Utc;
use rand::{self, distributions::Alphanumeric, Rng};
use rusoto_core::credential::StaticProvider;
use rusoto_core::request::HttpClient;
use rusoto_core::{ByteStream, RusotoError};
use rusoto_s3::S3 as RusotoS3;
use rusoto_s3::{
    DeleteObjectError, DeleteObjectRequest, GetObjectError, GetObjectRequest, PutObjectError,
    PutObjectRequest, S3Client,
};
use std::error;
use std::fmt;
use std::fs::File;
use std::io::Error;
use std::io::Write;
use std::path::Path;
use storage_drivers::StorageDriver;
use tokio::prelude::{Future, Stream};

pub struct S3;

impl StorageDriver for S3 {
    type Error = S3Error;

    fn store<S>(path: &Path, contents: S) -> Result<(), Self::Error>
    where
        S: Stream<Item = Bytes, Error = std::io::Error> + Send + 'static,
    {
        let region = Region::env().into();
        let bucket = Bucket::env().into();
        let provider: StaticProvider = Credentials::env().into();

        let client = S3Client::new_with(HttpClient::new().unwrap(), provider, region);

        let request = PutObjectRequest {
            body: Some(ByteStream::new(contents)),
            bucket: bucket,
            key: path.to_str().unwrap().to_string(),
            ..Default::default()
        };

        match client.put_object(request).sync() {
            Ok(_) => Ok(()),
            Err(e) => Err(S3Error::from(e)),
        }
    }

    fn read(
        path: &Path,
    ) -> Result<Box<dyn Stream<Item = Bytes, Error = std::io::Error> + Send>, Self::Error> {
        let region = Region::env().into();
        let bucket = Bucket::env().into();
        let provider: StaticProvider = Credentials::env().into();

        let client = S3Client::new_with(HttpClient::new().unwrap(), provider, region);

        let request = GetObjectRequest {
            bucket: bucket,
            key: path.to_str().unwrap().to_string(),
            ..Default::default()
        };

        let response = match client.get_object(request).sync() {
            Ok(response) => response,
            Err(e) => return Err(S3Error::from(e)),
        };

        Ok(Box::new(response.body.unwrap()))
    }

    fn delete(path: &Path) -> Result<(), Self::Error> {
        let region = Region::env().into();
        let bucket = Bucket::env().into();
        let provider: StaticProvider = Credentials::env().into();

        let client = S3Client::new_with(HttpClient::new().unwrap(), provider, region);

        let request = DeleteObjectRequest {
            bucket: bucket,
            key: path.to_str().unwrap().to_string(),
            ..Default::default()
        };

        match client.delete_object(request).sync() {
            Ok(_) => Ok(()),
            Err(e) => Err(S3Error::from(e)),
        }
    }
}

pub enum S3Error {
    DeleteObject(RusotoError<DeleteObjectError>),
    GetObject(RusotoError<GetObjectError>),
    PutObject(RusotoError<PutObjectError>),
    IO(Error),
}

impl error::Error for S3Error {
    fn description(&self) -> &str {
        match self {
            S3Error::DeleteObject(s3) => s3.description(),
            S3Error::GetObject(s3) => s3.description(),
            S3Error::PutObject(s3) => s3.description(),
            S3Error::IO(io) => io.description(),
        }
    }
}

impl fmt::Display for S3Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> Result<(), fmt::Error> {
        match self {
            S3Error::DeleteObject(s3) => s3.fmt(f),
            S3Error::GetObject(s3) => s3.fmt(f),
            S3Error::PutObject(s3) => s3.fmt(f),
            S3Error::IO(io) => io.fmt(f),
        }
    }
}

impl fmt::Debug for S3Error {
    fn fmt(&self, f: &mut fmt::Formatter) -> Result<(), fmt::Error> {
        match self {
            S3Error::DeleteObject(s3) => s3.fmt(f),
            S3Error::GetObject(s3) => s3.fmt(f),
            S3Error::PutObject(s3) => s3.fmt(f),
            S3Error::IO(io) => io.fmt(f),
        }
    }
}

impl From<RusotoError<PutObjectError>> for S3Error {
    fn from(from: RusotoError<PutObjectError>) -> Self {
        S3Error::PutObject(from)
    }
}

impl From<RusotoError<GetObjectError>> for S3Error {
    fn from(from: RusotoError<GetObjectError>) -> Self {
        S3Error::GetObject(from)
    }
}

impl From<RusotoError<DeleteObjectError>> for S3Error {
    fn from(from: RusotoError<DeleteObjectError>) -> Self {
        S3Error::DeleteObject(from)
    }
}

impl From<Error> for S3Error {
    fn from(from: Error) -> Self {
        S3Error::IO(from)
    }
}

use lambda_http::{
    handler,
    lambda_runtime::{self, Context, Error},
    IntoResponse, Request, RequestExt, Response,
};

use simple_logger;

#[tokio::main]
async fn main() -> Result<(), Error> {
    simple_logger::SimpleLogger::new()
        .env()
        .without_timestamps()
        .with_level(log::LevelFilter::Debug)
        .init()
        .unwrap();

    lambda_runtime::run(handler(func)).await?;
    Ok(())
}

async fn func(event: Request, _: Context) -> Result<impl IntoResponse, Error> {
    Ok(match event.path_parameters().get("name") {
        Some(name) => format!("🦀  Hello, {}! 🦀 ", name).into_response(),
        _ => Response::builder()
            .status(400)
            .body("Empty first name".into())
            .expect("failed to render response"),
    })
}

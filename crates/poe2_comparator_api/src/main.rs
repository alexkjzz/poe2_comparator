use axum::{
    Router,
    extract::Json,
    http::StatusCode,
    routing::{get, post},
};
use poe2_comparator_core::{models::ApiItem, service::compare_items};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct ComparisonResponse {
    active_dps: f32,
    candidate_dps: f32,
    delta_percent: f32,
    candidate_is_upgrade: bool,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct ComparisonRequest {
    active_item: ApiItem,
    candidate_item: ApiItem,
}

async fn healthcheck() -> String {
    "OK".to_string()
}

async fn compare(
    Json(payload): Json<ComparisonRequest>,
) -> Result<Json<ComparisonResponse>, StatusCode> {
    let result = compare_items(&payload.active_item, &payload.candidate_item);

    Ok(Json(ComparisonResponse {
        active_dps: result.active_dps,
        candidate_dps: result.candidate_dps,
        delta_percent: result.delta_percent,
        candidate_is_upgrade: result.candidate_is_upgrade,
    }))
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = Router::new()
        .route("/health", get(healthcheck))
        .route("/api/compare", post(compare))
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("Server running on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

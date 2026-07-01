use poe2_comparator_core::{models::ApiItem, service::compare_items};
use serde::Serialize;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ComparePayloadsResponse {
    pub active_dps: f32,
    pub candidate_dps: f32,
    pub delta_percent: f32,
    pub candidate_is_upgrade: bool,
}

#[tauri::command]
pub fn healthcheck() -> &'static str {
    "ok"
}

#[tauri::command]
pub fn compare_payloads(
    active_payload: String,
    candidate_payload: String,
) -> Result<ComparePayloadsResponse, String> {
    let active_item: ApiItem = serde_json::from_str(&active_payload)
        .map_err(|error| format!("ACTIVE_PAYLOAD_DESERIALIZATION_FAILED: {error}"))?;

    let candidate_item: ApiItem = serde_json::from_str(&candidate_payload)
        .map_err(|error| format!("CANDIDATE_PAYLOAD_DESERIALIZATION_FAILED: {error}"))?;

    let comparison = compare_items(&active_item, &candidate_item);

    Ok(ComparePayloadsResponse {
        active_dps: comparison.active_dps,
        candidate_dps: comparison.candidate_dps,
        delta_percent: comparison.delta_percent,
        candidate_is_upgrade: comparison.candidate_is_upgrade,
    })
}

use std::fs;
use poe2_comparator::models::ApiItem;
use poe2_comparator::dps::calculate_dps;

#[test]
fn test_real_api_payload_ingestion_pipeline() {
    let path = "tests/fixtures/dagger.json";
    let file_content = fs::read_to_string(path).expect("UNABLE_TO_READ_FIXTURE_FILE");
    let item: ApiItem = serde_json::from_str(&file_content).expect("DESERIALIZATION_FAILED");

    let dmg_str = &item.properties[0].values[0][0];
    let speed_str = &item.properties[1].values[0][0];
    let speed: f32 = speed_str.parse().expect("SPEED_PARSE_FAILED");

    let computed_dps = calculate_dps(dmg_str, speed).expect("DPS_CALCULATION_ENGINE_FAULT");
    assert!((computed_dps - 157.325).abs() < 0.001, "DPS_VALUE_MISMATCH");
}

#[test]
fn test_standalone_math_matrix_evaluation() {
    let execution = calculate_dps("45-120", 1.55);
    assert!(execution.is_ok());
    assert!((execution.unwrap() - 127.875).abs() < 0.001);
}

#[test]
fn test_standalone_math_invalid_bounds_format() {
    let execution = calculate_dps("invalid_bounds", 1.55);
    assert!(execution.is_err());
}
use std::fs;
use poe2_comparator::models::ApiItem;
use poe2_comparator::dps::{parse_bounds_to_mean, calculate_total_dps};

#[test]
fn test_real_api_payload_ingestion_pipeline() {
    let path = "tests/fixtures/dagger.json";
    let file_content = fs::read_to_string(path).expect("UNABLE_TO_READ_FIXTURE_FILE");
    let item: ApiItem = serde_json::from_str(&file_content).expect("DESERIALIZATION_FAILED");

    let attack_speed = item.get_numeric_property("Attack Speed").unwrap_or(1.0);
    let phys = item.get_damage_bounds("Physical Damage");

    let computed_dps = calculate_total_dps(phys, None, None, attack_speed);
    assert!((computed_dps - 157.325).abs() < 0.001, "DPS_VALUE_MISMATCH");
}

#[test]
fn test_standalone_bounds_parser() {
    let mean = parse_bounds_to_mean("45-120");
    assert!(mean.is_ok());
    assert_eq!(mean.unwrap(), 82.5);
}

#[test]
fn test_hybrid_damage_calculation() {
    let total_dps = calculate_total_dps(Some("50-150"), Some("25-75"), None, 1.5);
    assert_eq!(total_dps, 225.0);
}
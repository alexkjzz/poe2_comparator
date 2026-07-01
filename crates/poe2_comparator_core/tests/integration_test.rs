use std::fs;

use poe2_comparator_core::core::dps::{calculate_total_dps, parse_bounds_to_mean};
use poe2_comparator_core::models::ApiItem;
use poe2_comparator_core::service::compare_items;

#[test]
fn test_real_api_payload_ingestion_pipeline() {
    let path: &str = "tests/fixtures/dagger.json";
    let file_content: String = fs::read_to_string(path).expect("UNABLE_TO_READ_FIXTURE_FILE");
    let item: ApiItem = serde_json::from_str(&file_content).expect("DESERIALIZATION_FAILED");

    let attack_speed: f32 = item.get_numeric_property("Attack Speed").unwrap_or(1.0);
    let phys: Option<&str> = item.get_damage_bounds("Physical Damage");

    let computed_dps = calculate_total_dps(phys, None, None, attack_speed);
    assert!((computed_dps - 157.325).abs() < 0.001, "DPS_VALUE_MISMATCH");
}

#[test]
fn test_standalone_bounds_parser() {
    let mean: Result<f32, String> = parse_bounds_to_mean("45-120");
    assert!(mean.is_ok());
    assert_eq!(mean.expect("mean should parse"), 82.5);
}

#[test]
fn test_hybrid_damage_calculation() {
    let total_dps: f32 = calculate_total_dps(Some("50-150"), Some("25-75"), None, 1.5);
    assert_eq!(total_dps, 225.0);
}

#[test]
fn test_item_comparison() {
    let active: ApiItem = serde_json::from_str(
        r#"
        {
            "baseType": "A",
            "ilvl": 80,
            "properties": [
                { "name": "Physical Damage", "values": [["40-80"]] },
                { "name": "Attack Speed", "values": [["1.5"]] }
            ]
        }
    "#,
    )
    .expect("active payload should parse");
    let candidate: ApiItem = serde_json::from_str(
        r#"
        {
            "baseType": "B",
            "ilvl": 80,
            "properties": [
                { "name": "Physical Damage", "values": [["60-120"]] },
                { "name": "Attack Speed", "values": [["1.5"]] }
            ]
        }
    "#,
    )
    .expect("candidate payload should parse");

    let result = compare_items(&active, &candidate);
    assert!(result.candidate_is_upgrade);
    assert!(result.delta_percent > 0.0);
}

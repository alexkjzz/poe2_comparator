use poe2_comparator::models::ApiItem;
use poe2_comparator::dps::calculate_total_dps;

use std::time::Instant;
use log::{info, warn, error};

fn evaluate_item_dps(item: &ApiItem) -> f32 {
    let attack_speed = item.get_numeric_property("Attack Speed").unwrap_or(1.0);
    let phys = item.get_damage_bounds("Physical Damage");
    let elem = item.get_damage_bounds("Elemental Damage");
    let chaos = item.get_damage_bounds("Chaos Damage");

    calculate_total_dps(phys, elem, chaos, attack_speed)
}

fn main() {
    let log_filter = std::env::var("RUST_LOG").unwrap_or_else(|_| "info".to_string());
    env_logger::Builder::new()
        .parse_filters(&log_filter)
        .format_timestamp_millis()
        .init();

    let runtime_start = Instant::now();
    info!("SYS_BOOT: Initializing PoE2 Multi-Element DPS Evaluator v1.1.0");

    // Existing Physical Weapon
    let active_profile_buffer = r#"
    {
        "baseType": "Scythian Dagger",
        "ilvl": 80,
        "properties": [
            { "name": "Physical Damage", "values": [["45-120"]] },
            { "name": "Chaos Damage", "values": [["15-40"]] },
            { "name": "Attack Speed", "values": [["1.55"]] }
        ]
    }
    "#;

    // High-End Elemental Hybrid Loot Drop
    let inbound_stream_buffer = r#"
    {
        "baseType": "Engraved Dagger",
        "ilvl": 85,
        "properties": [
            { "name": "Physical Damage", "values": [["20-50"]] },
            { "name": "Elemental Damage", "values": [["85-150"]] },
            { "name": "Chaos Damage", "values": [["15-40"]] },
            { "name": "Attack Speed", "values": [["1.60"]] }
        ]
    }
    "#;

    let active_entity: Result<ApiItem, _> = serde_json::from_str(active_profile_buffer);
    let inbound_entity: Result<ApiItem, _> = serde_json::from_str(inbound_stream_buffer);

    match (active_entity, inbound_entity) {
        (Ok(active), Ok(inbound)) => {
            info!("STREAM_SYNC: Multi-element payload arrays ingested successfully.");

            let active_dps = evaluate_item_dps(&active);
            let inbound_dps = evaluate_item_dps(&inbound);

            info!("METRIC_FETCH: [Active] [{}]: {:.4} Total DPS", active.base_type, active_dps);
            info!("METRIC_FETCH: [Inbound] [{}]: {:.4} Total DPS", inbound.base_type, inbound_dps);

            if inbound_dps > active_dps {
                let delta_pct = ((inbound_dps - active_dps) / active_dps) * 100.0;
                info!("EVAL_VERDICT: CRITERIA_MATCHED -> Target yields +{:.2}% efficiency gain.", delta_pct);
            } else {
                let delta_pct = ((active_dps - inbound_dps) / active_dps) * 100.0;
                warn!("EVAL_VERDICT: PERFORMANCE_DEGRADATION -> Loss: -{:.2}%.", delta_pct);
            }
        },
        _ => error!("CRITICAL_FAULT: Deserialization processing failure."),
    }

    info!("SYS_SHUTDOWN: Execution terminated in: {:?}", runtime_start.elapsed());
}
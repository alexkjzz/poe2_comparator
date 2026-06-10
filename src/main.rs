use poe2_comparator::models::ApiItem;
use poe2_comparator::dps::calculate_dps;

use std::time::Instant;
use log::{info, warn, error};

fn extract_structural_metrics(payload: &ApiItem) -> Option<(&str, f32)> {
    if payload.properties.len() < 2 {
        return None;
    }
    let dmg_slice = &payload.properties[0].values[0][0];
    let speed_slice = &payload.properties[1].values[0][0];
    
    speed_slice.parse::<f32>().ok().map(|speed| (dmg_slice.as_str(), speed))
}

fn main() {
    let log_filter = std::env::var("RUST_LOG").unwrap_or_else(|_| "info".to_string());
    
    env_logger::Builder::new()
        .parse_filters(&log_filter)
        .format_timestamp_millis()
        .init();

    let runtime_start = Instant::now();
    info!("SYS_BOOT: Initializing PoE2 Core Evaluation Engine v1.0.0");

    let active_profile_buffer = r#"
    {
        "baseType": "Scythian Dagger",
        "ilvl": 80,
        "properties": [
            { "name": "Physical Damage", "values": [["45-120"]] },
            { "name": "Attack Speed", "values": [["1.55"]] }
        ]
    }
    "#;

    let inbound_stream_buffer = r#"
    {
        "baseType": "Engraved Dagger",
        "ilvl": 84,
        "properties": [
            { "name": "Physical Damage", "values": [["60-110"]] },
            { "name": "Attack Speed", "values": [["1.65"]] }
        ]
    }
    "#;

    let active_entity: Result<ApiItem, _> = serde_json::from_str(active_profile_buffer);
    let inbound_entity: Result<ApiItem, _> = serde_json::from_str(inbound_stream_buffer);

    match (active_entity, inbound_entity) {
        (Ok(active), Ok(inbound)) => {
            info!("STREAM_SYNC: Payload ingestion sequence completed successfully.");

            if let (Some((act_dmg, act_spd)), Some((in_dmg, in_spd))) = 
                (extract_structural_metrics(&active), extract_structural_metrics(&inbound)) 
            {
                let active_dps = calculate_dps(act_dmg, act_spd).unwrap_or(0.0);
                let inbound_dps = calculate_dps(in_dmg, in_spd).unwrap_or(0.0);

                info!("METRIC_FETCH: [Entity: Active] [Type: {}] [Calculated Value: {:.4} DPS]", active.base_type, active_dps);
                info!("METRIC_FETCH: [Entity: Inbound] [Type: {}] [Calculated Value: {:.4} DPS]", inbound.base_type, inbound_dps);

                if inbound_dps > active_dps {
                    let delta_pct = ((inbound_dps - active_dps) / active_dps) * 100.0;
                    info!("EVAL_VERDICT: CRITERIA_MATCHED -> Target modification yields +{:.2}% operational efficiency gain.", delta_pct);
                } else if active_dps > inbound_dps {
                    let delta_pct = ((active_dps - inbound_dps) / active_dps) * 100.0;
                    warn!("EVAL_VERDICT: PERFORMANCE_DEGRADATION -> Modification aborted. Expected loss: -{:.2}%.", delta_pct);
                } else {
                    info!("EVAL_VERDICT: NO_OP -> Statistical delta is within zero-tolerance margins.");
                }
            }
        },
        _ => error!("CRITICAL_FAULT: Deserialization engine failed to process standard inbound JSON stream array headers."),
    }

    info!("SYS_SHUTDOWN: Operational cycle terminated. Total execution runtime: {:?}", runtime_start.elapsed());
}
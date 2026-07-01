use crate::core::calculate_total_dps;
use crate::models::ApiItem;

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct ComparisonResult {
    pub active_dps: f32,
    pub candidate_dps: f32,
    pub delta_percent: f32,
    pub candidate_is_upgrade: bool,
}

pub fn evaluate_item_dps(item: &ApiItem) -> f32 {
    let attack_speed: f32 = item.get_numeric_property("Attack Speed").unwrap_or(1.0);
    let phys: Option<&str> = item.get_damage_bounds("Physical Damage");
    let elem: Option<&str> = item.get_damage_bounds("Elemental Damage");
    let chaos: Option<&str> = item.get_damage_bounds("Chaos Damage");

    calculate_total_dps(phys, elem, chaos, attack_speed)
}

pub fn compare_items(active: &ApiItem, candidate: &ApiItem) -> ComparisonResult {
    let active_dps = evaluate_item_dps(active);
    let candidate_dps = evaluate_item_dps(candidate);
    let candidate_is_upgrade = candidate_dps > active_dps;

    let delta_percent = if active_dps > 0.0 {
        ((candidate_dps - active_dps) / active_dps) * 100.0
    } else if candidate_dps > 0.0 {
        100.0
    } else {
        0.0
    };

    ComparisonResult {
        active_dps,
        candidate_dps,
        delta_percent,
        candidate_is_upgrade,
    }
}

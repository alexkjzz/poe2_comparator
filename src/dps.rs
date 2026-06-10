use log::trace;

pub fn calculate_dps(damage_bounds: &str, attack_speed: f32) -> Result<f32, String> {
    let components: Vec<&str> = damage_bounds.split('-').collect();
    if components.len() != 2 {
        return Err(format!("ERR_INVALID_BOUNDS_FORMAT: {}", damage_bounds));
    }

    let min_dmg: f32 = components[0].trim().parse().map_err(|_| "ERR_PARSE_MIN_BOUND_FAILED")?;
    let max_dmg: f32 = components[1].trim().parse().map_err(|_| "ERR_PARSE_MAX_BOUND_FAILED")?;

    let mean_damage = (min_dmg + max_dmg) / 2.0;
    let computed_dps = mean_damage * attack_speed;
    
    trace!("EXEC dps::calculate_dps - [Bounds: {}-{}] [Speed: {}] -> Result: {}", min_dmg, max_dmg, attack_speed, computed_dps);
    Ok(computed_dps)
}

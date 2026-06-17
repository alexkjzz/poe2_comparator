use log::trace;

pub fn parse_bounds_to_mean(bounds_str: &str) -> Result<f32, String> {
    let components: Vec<&str> = bounds_str.split('-').collect();
    if components.len() != 2 {
        return Err(format!("ERR_INVALID_BOUNDS_FORMAT: {}", bounds_str));
    }
    
    let min_val: f32 = components[0].trim().parse().map_err(|_| "ERR_PARSE_MIN_FAILED")?;
    let max_val: f32 = components[1].trim().parse().map_err(|_| "ERR_PARSE_MAX_FAILED")?;
    
    Ok((min_val + max_val) / 2.0)
}

pub fn calculate_total_dps(
    phys_bounds: Option<&str>,
    elem_bounds: Option<&str>,
    chaos_bounds: Option<&str>,
    attack_speed: f32,
) -> f32 {
    let mut accumulated_mean_damage = 0.0;

    if let Some(p_str) = phys_bounds {
        if let Ok(mean) = parse_bounds_to_mean(p_str) {
            accumulated_mean_damage += mean;
        }
    }

    if let Some(e_str) = elem_bounds {
        if let Ok(mean) = parse_bounds_to_mean(e_str) {
            accumulated_mean_damage += mean;
        }
    }

    if let Some(c_str) = chaos_bounds {
        if let Ok(mean) = parse_bounds_to_mean(c_str) {
            accumulated_mean_damage += mean;
        }
    }

    let calculated_dps = accumulated_mean_damage * attack_speed;
    trace!("EXEC dps::calculate_total_dps -> Total Cumulative DPS: {}", calculated_dps);
    
    calculated_dps
}
use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
#[allow(dead_code)]
pub struct ApiItem {
    #[serde(default)]
    pub name: String,
    
    #[serde(rename = "baseType")]
    pub base_type: String,
    
    #[serde(rename = "ilvl")]
    pub item_level: u32,
    
    #[serde(default)]
    pub properties: Vec<ItemProperty>,
}

#[derive(Debug, Deserialize, Clone)]
#[allow(dead_code)]
pub struct ItemProperty {
    pub name: String,
    pub values: Vec<Vec<String>>,
}

impl ApiItem {
    pub fn get_numeric_property(&self, target_name: &str) -> Option<f32> {
            self.properties.iter()
                .find(|p| p.name == target_name)
                .and_then(|p| p.values.first())
                .and_then(|v| v.first())
                .and_then(|s| s.parse::<f32>().ok())
        }
    pub fn get_damage_bounds(&self, target_name: &str) -> Option<&str> {
        self.properties.iter()
            .find(|prop| prop.name == target_name)
            .and_then(|prop| prop.values.first())
            .and_then(|value| value.first())
            .map(|string| string.as_str())
    }
}
    
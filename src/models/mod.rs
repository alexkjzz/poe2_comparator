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
            .find(|prop: &&ItemProperty| prop.name == target_name)
            .and_then(|prop: &ItemProperty| prop.values.first())
            .and_then(|value: &Vec<String>| value.first())
            .and_then(|string: &String| string.parse::<f32>().ok())
    }

    pub fn get_damage_bounds(&self, target_name: &str) -> Option<&str> {
        self.properties.iter()
            .find(|prop: &&ItemProperty| prop.name == target_name)
            .and_then(|prop: &ItemProperty| prop.values.first())
            .and_then(|value: &Vec<String>| value.first())
            .map(|string: &String| string.as_str())
    }
}
    
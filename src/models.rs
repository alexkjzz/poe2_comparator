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
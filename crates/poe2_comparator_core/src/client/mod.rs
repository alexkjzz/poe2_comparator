use reqwest::blocking::Client;
use std::time::Duration;

use log::{debug, trace};

pub struct Poe2Client {
    http_client: Client,
    target_url: String,
}

impl Poe2Client {
    pub fn new(target_url: &str) -> Self {
        let user_agent: &str = "PoE2_DPS_Comparator_Production_Engine/1.2.0 (Contact: developer@local)";

        let http_client: Client = Client::builder()
            .user_agent(user_agent)
            .timeout(Duration::from_secs(5))
            .connect_timeout(Duration::from_secs(2))
            .build()
            .unwrap_or_else(|_| Client::new());

        debug!("NET_CLIENT: Secure connection pool instantiated for target URL.");

        Self {
            http_client,
            target_url: target_url.to_string(),
        }
    }

    pub fn fetch_payload(&self) -> Result<String, String> {
        trace!("NET_CLIENT: Executing outbound HTTP GET call.");

        let response: reqwest::blocking::Response = self
            .http_client
            .get(&self.target_url)
            .send()
            .map_err(|error: reqwest::Error| format!("NET_ERR_CONNECTION_FAILED: {error}"))?;

        if !response.status().is_success() {
            return Err(format!(
                "NET_ERR_HTTP_STATUS_INVALID: {}",
                response.status()
            ));
        }

        response
            .text()
            .map_err(|error: reqwest::Error| format!("NET_ERR_READ_STREAM_FAILED: {error}"))
    }
}

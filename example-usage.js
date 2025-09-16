import API_CONFIG from './api-config.js';

// Example usage
const exampleInput = {
  decalSize: 4500,
  noCut: 7,
  rolls: [{
    item_name: "KRAFT PAPER SIZE (151 TO ABOVE)",
    size: 50,
    uom: "IN",
    nor: 5
  }]
};

// Create and send request
const payload = API_CONFIG.createPayload(
  exampleInput.decalSize,
  exampleInput.noCut,
  exampleInput.rolls
);

API_CONFIG.optimizeCutting(payload)
  .then(response => {
    const parsed = API_CONFIG.parseResponse(response);
    console.log('Optimization Results:', parsed);
  })
  .catch(error => console.error('API Error:', error));
const API_CONFIG = {
  baseURL: process.env.API_BASE_URL || 'http://192.168.29.138:8000',
  
  // Input payload structure
  createPayload: (decalSize, noCut, rolls) => ({
    decal_size: decalSize,
    no_of_cut: noCut,
    rolls: rolls.map(roll => ({
      item_name: roll.item_name,
      size: roll.size,
      uom: roll.uom,
      nor: roll.nor
    }))
  }),

  // API call function
  optimizeCutting: async (payload) => {
    const response = await fetch(`${API_CONFIG.baseURL}/optimize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.json();
  },

  // Response parser
  parseResponse: (response) => ({
    status: response.status,
    message: response.message,
    strategies: {
      minCutterChanges: response.data.strategies.min_cutter_changes,
      minWastage: response.data.strategies.min_wastage
    },
    systemStats: response.data.system_stats
  })
};

export default API_CONFIG;
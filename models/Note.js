'use strict';

module.exports = (client) => {
  // Setup "model"
  client.indices.create({
    index: "notes",
    body: {
      "mappings": {
        "note": {
          "properties": {
            "title": { "type": "string", "index": "analyzed", "analyzer": "simple" },
            "body": { "type": "string", "index": "analyzed", "analyzer": "simple" },
            "username": { "type": "string", "index": "not_analyzed" }
          }
        }
      }
    }
  }, (err, resp, respcode) => {
    if (err) { console.error(err); };
  });
};

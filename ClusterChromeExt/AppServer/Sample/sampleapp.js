const urllib = require("urllib");

const baseUrl =
  "https://cloud.mongodb.com/api/atlas/v2/groups/65afa10de7cfa50a87ebf807/clusters";
const ATLAS_USER = "abswhqaq";
const ATLAS_USER_KEY = "20c363b9-54ab-4c81-98d6-749f44661102";

const options = {
  digestAuth: `${ATLAS_USER}:${ATLAS_USER_KEY}`,
  headers: {
    Accept: "application/vnd.atlas.2023-01-01+json",
    "Content-Type": "application/json",
  },
};

const setCORSHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const requestHandler = (req, res) => {
  if (req.method === "OPTIONS") {
    setCORSHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/state") {
    setCORSHeaders(res);

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        const { clusterName, paused } = parsedBody;

        if (typeof paused !== "boolean" || !clusterName) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end(
            "Invalid input. Ensure 'clusterName' and 'paused' (boolean) are provided."
          );
          return;
        }

        const payload = JSON.stringify({ paused });
        const clusterUrl = `${baseUrl}/${clusterName}`;

        urllib
          .request(clusterUrl, {
            ...options,
            method: "PATCH",
            data: payload,
          })
          .then(({ data, res: apiRes }) => {
            console.log("Response Status:", apiRes.statusCode);
            console.log("Response Body:", data.toString());

            if (apiRes.statusCode !== 200) {
              res.writeHead(apiRes.statusCode, {
                "Content-Type": "text/plain",
              });
              res.end(
                `Unexpected Status: ${apiRes.statusCode}: ${apiRes.statusMessage}`
              );
            } else {
              const jsonRes = JSON.parse(data);
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(jsonRes, null, 2));
            }
          })
          .catch((error) => {
            console.error("Error in PATCH request:", error.message);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(`Error occurred: ${error.message}`);
          });
      } catch (error) {
        console.error("Error processing request body:", error.message);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Error processing the request: ${error.message}`);
      }
    });
  } else {
    setCORSHeaders(res);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

const http = require("http");
const server = http.createServer(requestHandler);

const PORT = 5002;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

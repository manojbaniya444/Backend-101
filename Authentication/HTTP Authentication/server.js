const http = require("node:http")

const server = http.createServer()
const apiSecret = "sec123"

server.on("request", (req, res) => {
    // console.log(req)
    console.log(`Got new ${req.method} : ${req.url}`)
    // handle the preflight request
    if (req.url === "/api" && req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Authorization")
        console.log("Got the request")
        res.end()
    }
    if (req.url === "/api" && req.method === "GET") {
            res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
            res.setHeader("Access-Control-Allow-Methods", "GET, POST")
            res.setHeader("Access-Control-Allow-Headers", "Authorization")

            const authorizationToken = req.headers?.authorization ? req.headers.authorization : null
            if (!authorizationToken) {
                return res.end(JSON.stringify({message: "No api key provided"}))
            }

            const apiKey = authorizationToken.split(" ")[1] || null

            if (apiKey === apiSecret) {
                return res.end(JSON.stringify({success: true, message: "The secret message is hahahahaha."}))
            } else {
                return res.end(JSON.stringify({message: "Please provide valid API KEY.", success: false}))
            }

    }
})

server.listen(8080, () => {
    console.log("server is running on port 8080")
})

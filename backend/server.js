const http = require("http");

const users = [
  { id: 1, name: "Kay" },
  { id: 2, name: "Zin" }
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url.startsWith("/api/users/")) {
    const id = req.url.split("/").pop();

    const user = users.find(user => user.id === Number(id));

    if (!user) {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      return res.end(
        JSON.stringify({ error: "User not found" })
      );
    }

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify(user));
  }

  res.writeHead(404, {
    "Content-Type": "application/json"
  });

  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});

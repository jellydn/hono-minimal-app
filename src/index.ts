import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

const app = new Hono();

// Builtin middleware
app.use("*", etag(), logger());

// Routing
app.get("/", (c) => c.html("<h1>Hello Hono!</h1>"));
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

// Nested route
const api = new Hono();
api.use("/link/*", cors());
// Named path parameters
api.get("/link/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ "Your link ID is": id });
});
api.post("/link", (c) => c.text("Link is created", 201));

app.route("/api", api);

export default app;

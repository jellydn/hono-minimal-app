import app from ".";

describe("Test the application", () => {
  it("Should return 200 response", async () => {
    const res = await app.request("http://localhost/");
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toMatchSnapshot();
  });

  it("Should return 404 response", async () => {
    const res = await app.request("http://localhost/notfound");
    expect(res.status).toBe(404);
    const body: { message: string } = await res.json();
    expect(body).toMatchSnapshot();
    expect(body.message).toBe("Not Found");
  });
});

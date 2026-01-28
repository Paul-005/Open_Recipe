/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app"); // Adjust path to your server file
const mongoose = require("mongoose");

describe("API Basic Routes & Middleware", () => {
  
  // Close DB connection after tests so Jest can exit
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /api", () => {
    it("should return the welcome message", async () => {
      const res = await request(app).get("/api");
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Welcome to the Open Recipe API");
    });
  });

  describe("Security Headers", () => {
    it("should have Helmet headers enabled", async () => {
      const res = await request(app).get("/api");
      // Check for a common Helmet header
      expect(res.headers).toHaveProperty("x-content-type-options");
    });

    it("should have CORS enabled for all origins", async () => {
      const res = await request(app).get("/api");
      expect(res.headers["access-control-allow-origin"]).toBe("*");
    });
  });

});
import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("referrers", () => {
  describe("get all referrers route", () => {
    it("should return 200 and an array", async () => {
      const response = await supertest(app).get(`/api/referrers`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("add referrers route", () => {
    describe("all properties present", () => {
      it("should return 201", async () => {
        const referrer = {
          refName: "Test",
          affiliation: "Test Company",
          content: "Test content"
        };
        const response = await supertest(app)
          .post("/api/referrers")
          .send({ referrer: referrer });
        expect(response.status).toBe(201);
        expect(typeof response.body._id).toBe("string");
      });
    });
    describe("Name is missing", () => {
      it("should return 401", async () => {
        const referrer = {
          affiliation: "Test Company",
          content: "Test content"
        };
        await supertest(app)
          .post("/api/referrers")
          .send({ referrer: referrer })
          .expect(401);
      });
    });
    describe("Affiliation is missing", () => {
      it("should return 401", async () => {
        const referrer = {
          refName: "Test",
          content: "Test content"
        };
        await supertest(app)
          .post("/api/referrers")
          .send({ referrer: referrer })
          .expect(401);
      });
    });
    describe("Content is missing", () => {
      it("should return 401", async () => {
        const referrer = {
          refName: "Test",
          affiliation: "Test Company"
        };
        await supertest(app)
          .post("/api/referrers")
          .send({ referrer: referrer })
          .expect(401);
      });
    });
  });
  describe("get individual referrers post route", () => {
    describe("referrers id not valid format", () => {
      it("should return 500", async () => {
        const id = "a2erdfsd";
        await supertest(app).get(`/api/referrers/${id}`).expect(500);
      });
    });
    describe("referrers does not exist", () => {
      it("should return 404", async () => {
        const id = "65571a3895ada6c0a24b1a66";
        await supertest(app).get(`/api/referrers/${id}`).expect(404);
      });
    });
  });
});

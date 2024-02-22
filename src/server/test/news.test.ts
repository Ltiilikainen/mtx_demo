import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("news", () => {
  describe("get all news route", () => {
    it("should return 200 and an array", async () => {
      const response = await supertest(app).get(`/api/news`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  describe("add news route", () => {
    describe("all properties present", () => {
      it("should return 201", async () => {
        const news = { title: "Test", body: "Test body" };
        const response = await supertest(app)
          .post("/api/news")
          .send({ newsItem: news });
        expect(response.status).toBe(201);
        expect(typeof response.body._id).toBe("string");
      });
    });
    describe("title is missing", () => {
      it("should return 401", async () => {
        const news = { body: "Test body" };
        await supertest(app)
          .post("/api/news")
          .send({ newsItem: news })
          .expect(401);
      });
    });
    describe("body is missing", () => {
      it("should return 401", async () => {
        const news = { title: "Test" };
        await supertest(app)
          .post("/api/news")
          .send({ newsItem: news })
          .expect(401);
      });
    });
  });
  describe("get individual news post route", () => {
    describe("news id not valid format", () => {
      it("should return 500", async () => {
        const id = "a2erdfsd";
        await supertest(app).get(`/api/news/${id}`).expect(500);
      });
    });
    describe("news does not exist", () => {
      it("should return 404", async () => {
        const id = "65571a3895ada6c0a24b1a66";
        await supertest(app).get(`/api/news/${id}`).expect(404);
      });
    });
  });
});

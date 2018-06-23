const nock = require("nock");
nock("https://api.omise.co")
  .persist()
  .post("/sources")
  .reply(
    200,
    {
      object: "error",
      location: "https://www.omise.co/api-errors#service-not-found",
      code: "service_not_found",
      message: "you are using api version which does not support this operation"
    },
    {
      server: "nginx/1.1",
      "content-type": "application/json"
    }
  );

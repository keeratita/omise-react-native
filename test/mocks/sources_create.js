const nock = require("nock");
nock("https://api.omise.co")
  .persist()
  .post("/sources")
  .reply(
    200,
    {
      object: "source",
      id: "src_test_5cd1vt51zdjrmy2leyg",
      livemode: false,
      location: "/sources/src_test_5cd1vt51zdjrmy2leyg",
      type: "internet_banking_bbl",
      flow: "redirect",
      amount: 500000,
      currency: "thb"
    },
    {
      server: "nginx/1.1",
      "content-type": "application/json"
    }
  );

export default function (app: any) {
  app.get("/test", (req: any, res: any) => {
    res.send("Hello With Test");
  });
}

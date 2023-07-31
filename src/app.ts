import * as express from "express";
import { Response, Request } from "express";

const app = express();

// we could parse json body. it is middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "hello world" });
  // return res.send({ message: "hello world" });
});

app.get("/api/redirect", (req: Request, res: Response) => {
  return res.redirect("https://google.com/");
});

app.post("/api/data", (req: Request, res: Response) => {
  console.log(req.body);
  // return res.sendStatus(200);
  return res.send({ message: "hello" });
});

// it will listen to all http methods
// app.all("/api/all", (req: Request, res: Response) => {
//   return res.sendStatus(200);
// });

app.get("/api/books/:bookId/:authorId", (req: Request, res: Response) => {
  console.log(req.params);
  console.log(req.params.bookId);
  console.log(req.params.authorId);
  return res.send(req.params);
});

app
  .route("/api/chainrequest")
  .get((req: Request, res: Response) => {
    return res.send("chain request method: GET");
  })
  .post((req: Request, res: Response) => {
    return res.send("chain request method: POST");
  })
  .put((req: Request, res: Response) => {
    return res.send("chain request method: PUT");
  })
  .all((req: Request, res: Response) => {
    return res.send("X request");
  });

// any letter in between ab and cd
app.get("/api/ab*cd", (req: Request, res: Response) => {
  return res.send("ab * cd");
});

app.listen(3000, () => {
  console.log("Application listening at port 3000");
});

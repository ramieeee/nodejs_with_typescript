import * as express from "express";
import { Response, Request, NextFunction } from "express";

const app = express();

// we could parse json body. it is middleware
app.use(express.json());

// middleware
const middleware = (req: Request, res: Response, next: NextFunction) => {
  res.locals.name = "Tom";
  next();
};
// it applies middleware to every methods and functions
app.use(middleware);
// if middleware is applied to only one method, give it to parameter
// app.get("/api", [middleware], (req: Request, res: Response) => {
//   return res.json({ message: "hello world" });
// });

app.get("/", (req: Request, res: Response) => {
  console.log(res.locals.name); // it comes from middleware
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

// dynamic params
app.get(
  "/api/books/:bookId/:authorId",
  (
    req: Request<{ bookId: string; authorId: number }, {}, { name: string }>,
    res: Response
  ) => {
    console.log(req.params);
    console.log(req.params.bookId);
    console.log(req.params.authorId);
    console.log(req.body.name);
    return res.send(req.params);
  }
);

// route handler
// it allows multiple functions as parameter and work as synchronous
const bookA = (req: Request, res: Response, next: NextFunction) => {
  console.log("first function");

  // bookB function is triggered with this function
  next();
};

const bookB = (req: Request, res: Response) => {
  console.log("second function");
  return res.sendStatus(200);
};
app.get("/api/book", [bookA, bookB]);

// chain request
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

// listener
app.listen(3000, () => {
  console.log("Application listening at port 3000");
});

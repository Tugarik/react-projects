const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("GET home huselt orj irlee");
  res.status(200).send("Home page");
});

// products
app.get("/products", (req, res) => {
  console.log("GET - Products huselt orj irlee");
  fs.readFile("./database/products.json", (err, data) => {
    let savedData = JSON.parse(data);
    err
      ? res.status(500).send({ message: err })
      : res.status(200).send(savedData);
  });
});

app.post("/products", (req, res) => {
  console.log("POST - Products huselt orj irlee");
  fs.readFile("./database/products.json", (err, data) => {
    let savedData = JSON.parse(data);
    if (err) {
      res.status(500).send({ message: err });
    } else {
      savedData.unshift(req.body);
      fs.writeFile(
        "./database/products.json",
        JSON.stringify(savedData),
        (err) => {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            res.status(200).send({ message: "Data successfully updated" });
          }
        }
      );
    }
  });
});

app.delete("/products/:id", (req, res) => {
  console.log("DELETE - Products huselt orj irlee");
  fs.readFile("./database/products.json", (err, data) => {
    let savedData = JSON.parse(data);
    console.log("read success:");
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const id = req.params.id;
      const filtered = savedData.filter((product) => product.id !== id);
      console.log("filter success");
      fs.writeFile(
        "./database/products.json",
        JSON.stringify(filtered),
        (err) => {
          if (err) {
            res.status(500).send({ message: err });
          } else {
            res.status(200).send({ success: true, data: filtered });
          }
        }
      );
    }
  });
});

app.put("/products/:id", (req, res) => {
  console.log("PUT - Products huselt orj irlee");
  fs.readFile("./database/products.json", (err, data) => {
    let savedData = JSON.parse(data);
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const { id } = req.params;
      const edited = savedData.filter((product) => product.id !== id);
      edited.unshift(req.body);
      fs.writeFile(
        "./database/products.json",
        JSON.stringify(edited),
        (err) => {
          err
            ? res.status(500).send({ message: err })
            : res.status(200).send({ message: "Data successfully edited" });
        }
      );
    }
  });
});

// user login from shop
app.put("/users/login", (req, res) => {
  console.log("PUT check user hiih medeelel irlee");
  fs.readFile("./database/users.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let savedData = JSON.parse(data);
      savedData.filter(
        (el) =>
          el.userName == req.body.userName && el.password == req.body.password
      ).length
        ? res.status(200).send({ success: true })
        : res.status(401).send({ success: false });
    }
  });
});

// user registration from shop
app.put("/users/register", (req, res) => {
  console.log("PUT register user hiih medeelel irlee");
  fs.readFile("./database/users.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let savedData = JSON.parse(data);
      savedData.filter((el) => el.userName == req.body.userName).length
        ? res.status(401).send({ success: false })
        : fs.writeFile(
            "./database/users.json",
            JSON.stringify([...savedData, req.body]),
            (err) => {
              err
                ? res.status(500).send({ message: err })
                : res.status(200).send({ success: true });
            }
          );
    }
  });
});

// Users from dashboard
app.get("/users", (req, res) => {
  console.log("GET - Users huselt orj irlee");
  fs.readFile("./database/users.json", (err, data) => {
    err
      ? res.status(500).send({ message: err })
      : res.status(200).send(JSON.parse(data));
  });
});

app.post("/users", (req, res) => {
  console.log("POST - Users huselt orj irlee");
  fs.readFile("./database/users.json", (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      let savedData = JSON.parse(data);
      savedData.unshift(req.body);
      fs.writeFile(
        "./database/users.json",
        JSON.stringify(savedData),
        (err) => {
          err
            ? res.status(500).send({ message: err })
            : res.status(200).send({ message: "Data successfully updated" });
        }
      );
    }
  });
});

app.delete("/users/:id", (req, res) => {
  console.log("DELETE - Users huselt orj irlee");
  fs.readFile("./database/users.json", (err, data) => {
    let savedData = JSON.parse(data);
    console.log("read success:");
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const id = req.params.id;
      const filtered = savedData.filter((product) => product.id !== id);
      console.log("filter success");
      fs.writeFile("./database/users.json", JSON.stringify(filtered), (err) => {
        err
          ? res.status(500).send({ message: err })
          : res.status(200).send({ success: true, data: filtered });
      });
    }
  });
});

app.put("/users/:id", (req, res) => {
  console.log("PUT - Users huselt orj irlee");
  fs.readFile("./database/users.json", (err, data) => {
    let savedData = JSON.parse(data);
    if (err) {
      res.status(500).send({ message: err });
    } else {
      const { id } = req.params;
      const edited = savedData.filter((product) => product.id !== id);
      edited.unshift(req.body);
      fs.writeFile("./database/users.json", JSON.stringify(edited), (err) => {
        err
          ? res.status(500).send({ message: err })
          : res.status(200).send({ message: "Data successfully edited" });
      });
    }
  });
});

// Orders
app.get("/orders", (req, res) => {
  console.log("GET - Orders huselt orj irlee");
  fs.readFile("./database/orders.json", (err, data) => {
    err
      ? res.status(500).send({ message: err })
      : res.status(200).send(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server is starting in ${port} port`);
});

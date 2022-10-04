const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const Auth0 = require("./middlewares/Auth0")

const Games = require("./games/Games");
const Users = require("./users/Users");

const JWTSecret = "bfasidjhbfiudfaifhjnioaefjhiop";

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/games", Auth0, (req, res) => {
    Games.findAll().then((games) => {
        res.statusCode = 200;
        res.json(games);
    });
});

app.get("/game/:id", Auth0, (req, res) => {
    var id = req.params.id;
    Games.findByPk(id).then((game) => {
        if (isNaN(id) || game == null) {
            res.sendStatus(400);
        } else {
            res.statusCode = 200;
            res.json(game);
        }
    });
});

app.post("/game", Auth0, (req, res) => {
    var { title, year, price } = req.body;

    if (title != undefined && price != undefined && year != undefined) {
        Games.create({
            title: title,
            year: year,
            price: price,
        }).then(() => res.send("cadastrado!"));
    } else {
        res.sendStatus(400);
    }
});

app.delete("/game/:id", Auth0, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = req.params.id;
        Games.findByPk(id).then((game) => {
            if (game == null) {
                res.sendStatus(404);
            } else {
                Games.destroy({
                    where: { id: id },
                }).then(() => {
                    res.sendStatus(200);
                });
            }
        });
    }
});

app.put("/game/:id", Auth0, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = req.params.id;
        Games.findByPk(id).then((game) => {
            if (game == null) {
                res.sendStatus(404);
            } else {
                var { title, year, price } = req.body;
                if (title != undefined) {
                    if (title == "") {
                        res.sendStatus(400);
                    } else {
                        Games.update({ title: title }, { where: { id: id } });
                    }
                }
                if (year != undefined) {
                    if (isNaN(year)) {
                        res.sendStatus(400);
                    } else {
                        Games.update({ year: year }, { where: { id: id } });
                    }
                }
                if (price != undefined) {
                    if (isNaN(price)) {
                        res.sendStatus(400);
                    } else {
                        Games.update({ price: price }, { where: { id: id } });
                    }
                }
                res.sendStatus(200);
            }
        });
    }
});

app.post("/auth", (req, res) => {
    var { email, password } = req.body;

    if (email == null) {
        res.status(400);
        res.send("email is required");
    } else {
        Users.findOne({ where: { email: email } }).then((user) => {
            if (user == undefined) {
                res.status(404);
                res.send("invalid email");
            } else if (password == null) {
                res.status(400);
                res.send("password is required");
            } else {
                Users.findOne({ where: { password: password } }).then(
                    (pass) => {
                        if (pass == undefined) {
                            res.status(404);
                            res.send("invalid password");
                        } else {
                            jwt.sign(
                                { id: Users.id, email: Users.email },
                                JWTSecret,
                                { expiresIn: "48h" },
                                (err, token) => {
                                    if (err) {
                                        res.status(401);
                                        res.send("Unauthorized");
                                    } else {
                                        res.status(200);
                                        res.json({ token: token });
                                        res.send("Logged!");
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }
});

app.listen(3030, () => {
    console.log("listening on 3030");
});

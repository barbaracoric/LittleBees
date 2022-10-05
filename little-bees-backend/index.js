/*require('dotenv').config();
const { DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    JWT_SECRET, } = process.env;*/
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hfnsduofhds97gfdgshfubsugf"



const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Test12345!",
    database: "projekt_rwa",
});






app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


app.get('/api/get', (req, res) => {
    const sqlSelect =
        "SELECT * FROM user";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get('/getAdminsOnly', (req, res) => {
    const SQL_GET_USER_ROLE = "SELECT id_role FROM roles WHERE role_name = 'Admin';"
    db.query(SQL_GET_USER_ROLE, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            const SQL_GET_USER = `SELECT *
                                FROM user u
                                JOIN user_role ur ON u.user_id = ur.id_user
                                WHERE ur.id_role = ?;`
            db.query(SQL_GET_USER, result[0].id_role, (err, result2) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result2)
                    res.send(result2)
                }
            })
        }
    });
});

app.get('/getUsersOnly', (req, res) => {
    const SQL_GET_USER_ROLE = "SELECT id_role FROM roles WHERE role_name = 'User';"
    db.query(SQL_GET_USER_ROLE, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result);
            const SQL_GET_USER = `SELECT *
                                FROM user u
                                JOIN user_role ur ON u.user_id = ur.id_user
                                WHERE ur.id_role = ?;`
            db.query(SQL_GET_USER, result[0].id_role, (err, result2) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result2)
                    res.send(result2)
                }
            })
        }
    });
});

app.get("getUserRole", (req, res) => {
    const user_id = req.body.user_id;
    db.query("SELECT role_name FROM user_role  JOIN user ON user.user_id=user_role.id_user JOIN roles ON user_role.id_role=roles.id_role  WHERE user.user_id=?"
    [user_id],
        (err, result) => {
            if (err) {
                console.log(err);

            }
            else {
                res.send({ role_name: result[0].role_name, })
            }

        }

    )

})







app.post('/api/post', (req, res) => {
    email = req.body.email;
    username = req.body.username;
    console.log("primljeno" + email + " " + username);

    const sqlSelect =
        "SELECT * FROM user";
    db.query(sqlSelect, (err, result) => {
        var i = 0;
        for (i = 0; i < result.length; i++) {
            if (email === result[i].email) {
                res.send({ emailtaken: true });
                return;
            }
            if (username === result[i].username) {
                res.send({ usernametaken: true });
                return;
            }
        }
        if (i === result.length) {
            res.send({ emailtaken: false, usernametaken: false });
            return;
        }
    });
});



app.post("/register", (req, res) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log("primljeno" + email + " " + username + " " + password);

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO user (email,username, password) VALUES(?,?,?)",
            [email, username, hash],
            (err, result) => {
                console.log(err);
                db.query(
                    "SELECT  * FROM user WHERE username = ? ",
                    username,
                    (err, result_1) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const SQL_FIND_ID_ROLE = "SELECT id_role FROM roles WHERE role_name = 'User';"
                            db.query(SQL_FIND_ID_ROLE, (err, result_2) => {
                                if (err) {
                                    console.log(err)
                                }
                                else {
                                    const SQL_INSERT_ID_ROLE = "INSERT INTO user_role (id_user, id_role) VALUES (?,?);"
                                    db.query(SQL_INSERT_ID_ROLE, [result_1[0].user_id, result_2[0].id_role], (err, result_3) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            //res.send("role korisnik added.")
                                            console.log(result_3)
                                        }
                                    })

                                }



                            })
                        }


                    })

            });



    });

});









function verifiyJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("no token");
        res.send({ loggedIn: false });
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("wrong token");
                res.send({ loggedIn: false });
            }
            else {
                req.user_id = decoded.user_id;
                next();
            }
        });
    }
}



app.get("/login", verifiyJWT, (req, res) => {
    console.log("correct token id=" + req.user_id);
    const user_id = req.user_id;
    db.query(
        "SELECT user_id, email, username FROM user WHERE user_id= ?",
        [user_id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            else if (result.length > 0) {
                const SQL_FIND_ROLE_NAME = "SELECT role_name FROM user_role  JOIN user ON user.user_id=user_role.id_user JOIN roles ON user_role.id_role=roles.id_role  WHERE user.user_id=?"
                db.query(SQL_FIND_ROLE_NAME, user_id, (err, result5) => {
                    if (err) {
                        console.log(err)
                    }
                    else if (result5.length > 0) {

                        res.send({ userInfo: result[0], loggedIn: true, role_name: result5[0].role_name, });
                    }
                    else {
                        res.send({ userInfo: result[0], loggedIn: true, role_name: "User" });
                    }
                    console.log(result5);


                })

            }
            else {
                res.send({ loggedIn: false });
            }
        })
})



app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM user WHERE username= ?",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        const token = jwt.sign({ user_id: result[0].user_id }, JWT_SECRET, {
                            expiresIn: 30 * 60 * 1000
                        })
                        res.json({
                            loggedIn: true,
                            userInfo: {
                                user_id: result[0].user_id,
                                email: result[0].email,
                                username: result[0].username,
                            },
                            token: token, result: result
                        });

                    }
                    else {
                        res.json({ loggedIn: false, message: "Wrong username/password" });
                    }
                });
            }
            else {
                res.json({ loggedIn: false, message: "User not found" });
            }
        }
    );
});


app.put("/api/updateusername", (req, res) => {
    const newusername = req.body.newusername;
    const password = req.body.password;
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("no token");
        res.send("no token");
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("wrong token");
            }
            else {
                const user_id = decoded.user_id;
                db.query(
                    "SELECT password FROM user WHERE user_id = ?",
                    [user_id],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result.length > 0) {
                            bcrypt.compare(password, result[0].password, (err, response) => {
                                if (response) {
                                    const SQL_SELECT = "SELECT username FROM user WHERE user_id != ?"
                                    db.query(SQL_SELECT, user_id, (err, result2) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            var i = 0;
                                            for (i = 0; i < result2.length; i++) {
                                                if (newusername === result2[i].username) {
                                                    res.send({ usernametaken: true });
                                                    return;
                                                }
                                                else {
                                                    db.query(
                                                        "UPDATE user SET username = ? WHERE user_id= ?",
                                                        [newusername, user_id],
                                                        (err, result3) => {
                                                            if (err) {
                                                                console.log(err);
                                                            }
                                                            else {
                                                                console.log("Updateani");
                                                                
                                                            }
                                                        })
                                                }
                                            }
                                        }
                                    })
                                }
                                else {
                                    console.log(err);
                                    res.send({ passwordwrong: true })
                                }
                            })
                        }
                        else {
                            console.log("Not found");
                        }

                    }
                )
            }
        })
    }
})

app.put("/api/updatepassword", (req, res) => {
    const newpassword = req.body.newpassword;
    const password = req.body.password;
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("no token");
        res.send("no token");
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.send("Error");
            }
            else {
                const user_id = decoded.user_id;
                bcrypt.hash(newpassword, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    db.query(
                        "SELECT password FROM user WHERE user_id= ?",
                        [user_id],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            if (result.length > 0) {
                                bcrypt.compare(password, result[0].password, (err, response) => {
                                    if (response) {
                                        db.query(
                                            "UPDATE user SET password = ? WHERE user_id= ?",
                                            [hash, user_id],
                                            (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                                else {
                                                    console.log("Updated");
                                                }
                                            })
                                    }
                                    else {
                                        console.log("Netocno");
                                        res.send({ passwordwrong: true });
                                    }
                                })

                            }
                            else {
                                console.log("Upisite lozinku konju");
                            }
                        }
                    )

                })
            }

        })
    }

})




app.post("/PasswordValidation", (req, res) => {
    const token = req.headers["x-access-token"];
    password = req.body.password;
    if (!token) {
        console.log("no token");
        res.send("no token");
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.send("Error");
            }
            else {
                const user_id = decoded.user_id;
                db.query(
                    "SELECT password FROM user WHERE user_id= ?",
                    [user_id],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        if (result.length > 0) {
                            bcrypt.compare(password, result[0].password, (err, response) => {
                                if (response) {
                                    res.send("Good job");
                                }
                                else {
                                    res.send({ passwordwrong: true })
                                }
                            })
                        }
                        else {
                            console.log(err);
                        }
                    }
                )
            }

        })
    }
})


app.delete("/api/deleteuser", (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("no token");
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("wrong token");
                
            }
            else {
                const user_id = decoded.user_id;
                db.query(
                    "DELETE FROM user WHERE user_id = ?",
                    [user_id],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            res.send("Uspjesno izbrisan korisnik");
                        }
                    }
                )
            }

        })
    }


})

app.delete("/removeuser", (req, res) => {
    const user_id = req.body.user_id
    db.query("DELETE FROM user WHERE user_id = ?",
        [user_id],
        (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                res.send("user deleted, id = " + user_id);
            }
        }
    );
})



app.put("/updateIntoAdmin", (req, res) => {
    const user_id = req.body.data.user_id
    console.log(user_id);
    db.query("UPDATE user_role JOIN user ON user.user_id=user_role.id_user JOIN roles ON user_role.id_role=roles.id_role SET user_role.id_role=2 WHERE user.user_id=?",
    [user_id],
        (error, result1) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Updatead user into ADMIN with id" + user_id);
                res.send({update:true});
            }
        }
    )
    

}) 


app.put("/revertbacktoUser", (req, res) => {
    const user_id = req.body.data.user_id
    console.log(user_id);
    db.query("UPDATE user_role JOIN user ON user.user_id=user_role.id_user JOIN roles ON user_role.id_role=roles.id_role SET user_role.id_role=3 WHERE user.user_id=?",
    [user_id],
        (error, result1) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Updatead user into user with id" + user_id);
                res.send({update:true});
            }
        }
    )
    

}) 












app.listen(3001, () => {
    console.log("running on port 3001");
});

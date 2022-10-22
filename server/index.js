const express = require("express"); 
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const path = require("path");
const jwt = require("jsonwebtoken");
const gentoken = "token-Login";
const nodemailer = require("nodemailer");
const multer = require("multer");

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "DBEV61040626362",
  database: "evoting",
});

app.post("/checklogin", (req, res) => {
  const idss = req.body.idss;
  const buff = Buffer.from(idss, "utf-8");
  const base64 = buff.toString("base64");
  db.query("select * from user_info where email = ? ", [idss], (err, user) => {
    if (user.length == 0) {
      res.send({ massage: "Failusername", Login: user.length });
    } else {
      res.send({ massage: "Login", Login: user.length, pass: base64 });
    }
  });
});

app.post("/login", (req, res) => {
  const idss = req.body.idss;
  const passwordl = req.body.passwordl;
  passwordl.trim();
  const buff = Buffer.from(passwordl, "utf-8");
  const base64 = buff.toString("base64");
  base64.trim();
  db.query(
    "select * from user_info where email = ? or password = ? ",
    [idss, passwordl],
    (err, user) => {
      if (user.length == 0) {
        res.send({ massage: "Fail Username", Login: user.length });
      }
      if (err) {
        console.log({ err: err });
      }
      console.log("password = ", user[0].password);
      console.log("level = ", user[0].level);
      for (var i = 0; i < user.length; i++) {
        if (base64 == user[i].password) {
          console.log("password2 = ", user[i].password);
          console.log("level2 = ", user[i].level);
          // Store hash in your password DB.
          if (user[0].name_event == "admin") {
            res.send({
              message: "admin",
              user: idss,
              level: user[i].level,
              token: user[i].token,
              nameevent: user[i].name_event,
            });
          } else if (user[i].name_event == "staff") {
            res.send({
              message: "staff",
              user: idss,
              level: user[i].level,
              token: user[i].token,
              nameevent: user[i].name_event,
            });
          } else {
            res.send({
              message: "user",
              user: idss,
              level: user[i].level,
              token: user[i].token,
              nameevent: user[i].name_event,
            });
          }
        } else {
          console.log(user[i]);
        }
      }
    }
  );
});

app.get("/authen", (req, res) => {
  var token = req.headers.authorization.split(" ")[1];
  if (token == null) {
    console.log("error");
  } else if (token == token) {
    res.send({ message: "Login" });
  } else {
    res.send({ message: "ree", asdasdas: "A1234" });
  }
});

app.post("/authen", (req, res) => {
  const tokenC = req.body.tokenC;
  var decoded = jwt.verify(tokenC, gentoken);
  db.query("select * from user_info where token = ?",[tokenC], (err, user) => {
    try {
      res.send({
        message: user[0].name_event, 
        auth: decoded,
        tokenC: tokenC,
      });
    } catch (err) {
      res.send({ message: "err", message: err.message, decoded });
    }
  });
});

app.get("/admin", (req, res) => {
  db.query("select * from admin where level = 1", (err, result) => {
    if (err) {
      console.log(err, "err");
    } else {
      res.send({ result: result });
    }
  });
});

app.post("/create", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const level = req.body.level;
  bcrypt.hash(username, saltRounds, function (err, hash) {
    bcrypt.hash(password, saltRounds, function (err, hash2) {
      db.query("INSERT INTO admin (username, password, level) VALUEs(?,?,?)", [
        hash,
        hash2,
        level,
      ]),
        (err, result) => {
          if (err) {
            console.log("Values insert");
          } else {
            res.send("Values insert");
          }
        };
    });
  });
});

// event ------------------------------------------------------------------------------
app.post("/createevnet", (req, res) => {
  const nameevent = req.body.nameevent;
  const detaile = req.body.detaile;
  const starte = req.body.starte;
  const ende = req.body.ende;
  const checka = req.body.checka;
  db.query(
    "select * from prepare_data_event where p_name_event = ? ",
    [nameevent],
    (err, user) => {
      if (user.length != 0) {
        res.send({ massage: "FailEventname", user });
      } else {
        db.query(
          "INSERT INTO prepare_data_event (p_name_event, p_detail_e	,p_start_e , p_end_e , p_check_anonimus) VALUEs(?,?,?,?,?)",
          [nameevent, detaile, starte, ende, checka],
          (err, user) => {
            if (err) {
              res.send("fail");
            } else {
              res.send("Values insert");
            }
          }
        );
      }
    }
  );
});

// getname_event  ------------------------------------------------------------------------------

app.get("/eventname", (req, res) => {
  db.query("select * from prepare_data_event", (err, result) => {
    if (err) {
      console.log("err");
    } else {
      res.send({
        length: result,
      });
    }
  });
});

// prepare_candidate  ------------------------------------------------------------------------------

app.get("/lengthcandidate", (req, res) => {
  db.query("select * from prepare_data_candidate", (err, result) => {
    if (err) {
      console.log("err");
    } else {
      res.send({
        lengthdata: result.length,
        massage: result[result.length - 1],
      });
    }
  });
});

// const storage = multer.diskStorage({
//   destination:("../ux-project/src/", "images"),
//   filename: function (req, file, cb) {
     
//     cb(null, Date.now() + "-" + file.originalname);
//     console.log("asdasd", file);
//   },
// });


const storage = multer.diskStorage({
  destination: path.join("../ux-project/src/", "images"), 
  filename: function (req, file, cb) {
    // null as first argument means no error
    const name123 = file.originalname;
    cb(null, name123);
    console.log("asdasd", file , name123);
  },
});

app.post("/image", (req, res) => {
  let upload = multer({ storage: storage }).single("avatar");
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields
    if (!req.file) {
      console.log("res1");
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      console.log("res2");
      return res.send(err);
    } else if (err) {
      console.log("res3");
      return res.send(err);
    } else {
      res.send({ massage: 1 });
      classifiedsadd = req.file.originalname;;
      console.log(req.file.originalname);
      console.log(req.get.name123);
      // db.query("INSERT INTO prepare_data_candidate (p_image_c) VALUEs(?)",[classifiedsadd], (err, results) => {  if (err) throw err;
      // res.send({ success: 1 })
      // });
      app.post("/createcandidate", (req, res) => {
        const totalcandidate = req.body.totalcandidate;
        const getname = req.body.getname;
        const detailc = req.body.detailc;
        const namec = req.body.namec;
        db.query(
          "select * from prepare_data_event where p_name_event = ?",
          [getname],
          (err, result) => {
            if (err) {
              console.log("err");
            } else {
              db.query(
                "select * from prepare_data_candidate where p_name_candidate = ? and p_name_e =?",
                [namec, getname],
                (err, user) => {
                  if (user.length != 0) {
                    console.log("FailCandidatename");
                    res.send({ massage: "FailCandidate", user });
                  } else {
                    db.query(
                      "INSERT INTO prepare_data_candidate (p_id_c,p_name_candidate, p_detail_c,p_image_c,p_name_e) VALUEs(?,?,?,?,?)",
                      [totalcandidate, namec, detailc, classifiedsadd, getname],
                      (err, user) => {
                        if (err) {
                          res.send({ massage: "fail", err, user: user });
                        } else {
                          db.query(
                            "select * from prepare_data_candidate where p_name_e = " +
                              "'" +
                              getname +
                              "'",
                            (err, result) => {
                              if (err) {
                                console.log("err");
                                res.send(err);
                              } else {
                                res.send({
                                  result,
                                  lengthdata: result.length,
                                  massage: "insertsubmit",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      });
    }
  });
});

app.post("/uplaod", async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("avatar");

    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields

      if (!req.file) {
        console.log("res1");
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        console.log("res2");
        return res.send(err);
      } else if (err) {
        console.log("res3");
        return res.send(err);
      }
      const classifiedsadd = req.file.path;
      console.log(req.file.path);
      // db.query("INSERT INTO prepare_data_candidate (p_image_c) VALUEs(?)",[classifiedsadd], (err, results) => {  if (err) throw err;
      // res.send({ success: 1 })
      // });
    });
  } catch (err) {
    console.log(err);
  }
});

// prepare_user ------------------------------------------------------------------------------

app.post("/createuser", (req, res) => {
  const totaluser = req.body.totaluser;
  const mail = req.body.mail;
  const password = req.body.password;
  const getname = req.body.getname;

  const buff = Buffer.from(password, "utf-8");
  const base64 = buff.toString("base64");

  db.query(
    "select * from prepare_data_event where p_name_event = ?",
    [getname],
    (err, result) => {
      if (err) {
        console.log("err");
      } else {
        db.query(
          "select * from prepare_mailuser where mail_kmutnb = ? and name_event = ?",
          [mail, getname],
          (err, user) => {
            if (user.length != 0) {
              console.log("FailUser");
              res.send({ massage: "FailUser", user });
            } else {
              db.query(
                "INSERT INTO prepare_mailuser (no_user,mail_kmutnb,password,name_event) VALUEs(?,?,?,?)",
                [totaluser + 1, mail, base64, getname],
                (err, user) => {
                  if (err) {
                    res.send({ massage: "fail", err });
                  } else {
                    db.query(
                      "select * from prepare_mailuser where name_event = " +
                        "'" +
                        getname +
                        "'",
                      (err, result) => {
                        if (err) {
                          console.log("err");
                          res.send(err);
                        } else {
                          res.send({
                            result,
                            lengthdata: result.length,
                            massage: "insertsubmit",
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

// --------------- Result_user -------------------

app.post("/Resulcan", (req, res) => {
  const getname = req.body.getname;
  db.query(
    "select * from prepare_data_candidate where p_name_e = " +
      "'" +
      getname +
      "'",
    (err, user) => {
      if (err) {
        console.log("err");
        res.send({ err, massage: que });
      } else {
        console.log(user); 
        res.send({
          user,
          lengthdata: getname,
          massage: user,
          candidatelength: user.length,
        });
      }
    }
  );
});

app.post("/Resuluser", (req, res) => {
  const getname = req.body.getname;
  db.query(
    "select * from prepare_mailuser where name_event = " + "'" + getname + "'",
    (err, user) => {
      if (err) {
        console.log("err");
        res.send({ err, massage: que });
      } else {
        res.send({
          user,
          lengthdata: getname,
          massage: user,
          userlength: user.length,
        });
      }
    }
  );
});

// Result_event ------------------------------------------------------------------------=>

app.post("/mailuser", (req, res) => {
  const userinfo = req.body.userinfo;
  const password = req.body.password;
  const getname = req.body.getname;
  var id = 0;
  var token = [];
  for (id; id < userinfo.length; id++) {
    const gento = jwt.sign({ userinfo: userinfo[id] }, gentoken);
    token[id] = gento;
    console.log(token);
    db.query(
      "INSERT INTO user_info (no_user,email,password,token,name_event,level) VALUEs(?,?,?,?,?,3)",
      [id, userinfo[id], password[id], token[id], getname],
      (err, user) => {
        if (err) {
          res.send({
            result: "fail",
            massage: userinfo,
            userlength: userinfo.length,
            getnamelength: getname,
            err: err,
          });
        }
        if (id > userinfo.length) {
          res.send({ massage: "insert data info_user", err: err });
          console.log("insertqweqwe");
        }
      }
    );
  }
  if (id >= userinfo.length) {
    res.send({
      massage: "insert data info_user",
      idss: id,
      userinsert: userinfo,
      length: userinfo.length,
    });
    console.log("insert");
  }
});

app.post("/sendmail", (req, res) => {
  const userinfo = req.body.userinfo;
  const password = req.body.password;
  const getname = req.body.getname;
  // const buff = [];
  const str = [];
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Evotingcase2022@gmail.com", // your email
      pass: "coxnlmsuvobgczlz", // your email password
    },
  });
  for (var id = 0; id < userinfo.length; id++) {
    const buff = Buffer.from(password[id], "base64");
    str[id] = buff.toString("utf-8");

    const mailOptions = {
      from: "Evotingcase2022@gmail.com", // sender
      to: userinfo[id], // list of receivers
      subject: "One Time Password For Vote = " + getname, // Mail subject
      html: "<div><b>" + userinfo[id] + "</b>" + "<b>" + str[id] + "</b></div>", // HTML body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(info);
        res.send({ massage: "Sand mail", decode: str });
      }
    });
  }
});

app.post("/totaluser", (req, res) => {
  const getname = req.body.getname;
  const totaluser = req.body.totaluser;
  const totalcandidate = req.body.totalcandidate;
  db.query(
    " UPDATE prepare_data_event SET total_candidate =" +
      totalcandidate +
      "," +
      "total_user = " +
      totaluser +
      " WHERE p_name_event = " +
      "'" +
      getname +
      "'",
    (err, user) => {
      if (err) {
        console.log("No Update");
        res.send({ massage: "No Update", err });
      } else {
        console.log("Update");
        res.send({ massage: "Can Update", user });
      }
    }
  );
});

app.post("/Deleteuser", (req, res) => {
  const id = req.body.id;
  db.query("DELETE  FROM user_info where id_user = " + id, (err, result) => {
    if (err) {
      console.log("err");
      res.send({ err, massage: "no delete", id: id });
    } else {
      res.send({
        result,
      });
    }
  });
});

// User Election ------------------------------------------------

app.get("/userevent", (req, res) => {
  db.query("select * from prepare_data_candidate", (err, result) => {
    if (err) {
      console.log("err");
    } else {
      res.send({
        result,
      });
    }
  });
});

// Edit --------------------------------------------------------
app.get("/showevent", (req, res) => {
  db.query("select * from prepare_data_event ", (err, user) => {
    if (err) {
      console.log("err");
      res.send({ err, massage: "dont show" });
    } else {
      res.send({
        user,
        massage: user,
        userlength: user.length,
      });
    }
  });
});

app.post("/Delete_e", (req, res) => {
  const name_event = req.body.name_event;
  db.query(
    "DELETE FROM prepare_data_event where p_name_event = " +
      "'" +
      name_event +
      "'",
    (err, result1) => {
      if (err) {
        console.log("err1", err);
        res.send({ err, massage: "no delete", err: err });
      } else {
        console.log("Delete 1");
        db.query(
          "DELETE FROM prepare_data_candidate where p_name_e = " +
            "'" +
            name_event +
            "'",
          (err, result2) => {
            if (err) {
              console.log("err2", err);
              res.send({ err, massage: "no delete", err: err });
            } else {
              console.log("Delete 2");
              db.query(
                "DELETE FROM user_info where name_event = " +
                  "'" +
                  name_event +
                  "'",
                (err, result3) => {
                  if (err) {
                    console.log("err3", err);
                    res.send({ err, massage: "no delete", err: err });
                  } else {
                    console.log("Delete 3");
                    res.send({ massage: "Delete Sugsess", result3: result3 });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

// Create Staff ------------------------------------------------

app.post("/Createstaff", (req, res) => {
  const userinfo = req.body.userinfo;
  const password = req.body.password;
  const getname = req.body.getname;
  var id = 0;
  var token = [];
  for (id; id < userinfo.length; id++) {
    const gento = jwt.sign({ userinfo: userinfo[id] }, gentoken);
    token[id] = gento;
    console.log(token);
    db.query(
      "INSERT INTO user_info (email,password,token,name_event,level) VALUEs(?,?,?,?,?,3)",
      [id, userinfo[id], password[id], token[id], getname],
      (err, user) => {
        if (err) {
          res.send({
            result: "fail",
            massage: userinfo,
            userlength: userinfo.length,
            getnamelength: getname,
            err: err,
          });
        }
        if (id > userinfo.length) {
          res.send({ massage: "insert data info_user", err: err });
          console.log("insertqweqwe");
        }
      }
    );
  }
  if (id >= userinfo.length) {
    res.send({
      massage: "insert data info_user",
      idss: id,
      userinsert: userinfo,
      length: userinfo.length,
    });
    console.log("insert");
  }
});

app.post("/createadmin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const authen = req.body.authen;
  const level = req.body.level;
  const gento = jwt.sign({ userinfo: username, authen: authen }, gentoken);

  const buff = Buffer.from(password, "utf-8");
  const base64 = buff.toString("base64");

  db.query(
    "INSERT INTO user_info (email , password , token , name_event , level) VALUEs(?,?,?,?,?)",
    [username, base64, gento, authen, level],
    (err, user) => {
      if (err) {
        res.send({ massage: "fail", err });
      } else {
        res.send({
          user,
          massage: "insertsubmit",
        });
      }
    }
  );
});

// Edit_Event --------------------------------------------------

app.post("/Showdetailevent", (req, res) => {
  const namm_edit = req.body.namm_edit;
  db.query(
    "select * from prepare_data_event where p_name_event = " +
      "'" +
      namm_edit +
      "'",
    (err, user) => {
      if (err) {
        res.send({ massage: "fail", err });
      } else {
        res.send({
          naem_e: user[0].p_name_event,
          detail: user[0].p_detail_e,
          start: user[0].p_start_e,
          end: user[0].p_end_e,
          anonimus: user[0].p_check_anonimus,
          massage: user,
        });
      }
    }
  );
});

app.post("/Update_event", (req, res) => {
  const namm_edit = req.body.namm_edit;
  const name_e = req.body.name_e;
  const detail = req.body.detail;
  const start = req.body.start;
  const end = req.body.end;
  const anon = req.body.anon;
  db.query(
    "UPDATE prepare_data_event SET p_name_event =" +
      "'" +
      name_e +
      "'" +
      "," +
      "p_detail_e = " +
      "'" +
      detail +
      "'" +
      ",p_start_e = " +
      "'" +
      start +
      "'" +
      ",p_end_e = " +
      "'" +
      end +
      "'" +
      ",p_check_anonimus = " +
      anon +
      " WHERE p_name_event = " +
      "'" +
      namm_edit +
      "'",
    (err, user) => {
      if (err) {
        console.log("No Update 1");
        res.send({ massage: "No Update 1", err });
      } else {
        console.log("Update1");
        db.query(
          "UPDATE prepare_data_candidate SET p_name_e =" +
            "'" +
            name_e +
            "'" +
            "  WHERE p_name_e = " +
            "'" +
            namm_edit +
            "'",
          (err, user) => {
            if (err) {
              console.log("No Update 2");
              res.send({ massage: "No Update 2 ", err });
            } else {
              console.log("Update2");
              db.query(
                "UPDATE prepare_mailuser SET name_event =" +
                  "'" +
                  name_e +
                  "'" +
                  "  WHERE name_event = " +
                  "'" +
                  namm_edit +
                  "'",
                (err, user) => {
                  if (err) {
                    console.log("No Update 3");
                    res.send({ massage: "No Update 3", err });
                  } else {
                    console.log("Update 3");
                    res.send({ massage: "Can Update 3", user });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

// app.post("/Delete_event" , (req,res ) =>{
//   db.query( "DELETE FROM prepare_mailuser where id_user = " + id,
//     (err, result) => {
//       if (err) {
//         console.log("err");
//         res.send({ err, massage: "no delete", id: id });
//       } else {
//         res.send({
//           result,
//         });
//       }
//     }
//   );
// });
// Staff/Admin  ------------------------------------------------

app.get("/showStaff", (req, res) => {
  db.query(
    "select * from user_info where Level = 1 or Level = 2",
    (err, user) => {
      if (err) {
        console.log("err");
        res.send({ err, massage: "dont show" });
      } else {
        res.send({
          user,
          massage: user,
          userlength: user.length,
        });
      }
    }
  );
});


//--------  Election   Vote------------------------------------------------------


app.post("/Vote", (req, res) => {
  const getname = req.body.getname;
  const getuser = req.body.getuser;
  const id = req.body.id;
  var no_u = 0;
  db.query(
    "select * from results_vote where event = " + "'" + getname + "'",
    (err, data) => {
      if (err) {
        console.log("fail1", err);
        data.send({ massage: "fail1", err });
      } else {
        if (data.length >= 0) {
          no_u = data.length + 1;
          if (data.length > 0) {
            bcrypt.hash(
              getuser + getname + id,
              saltRounds,
              function (err, hash1) {
                // Set hash Mailuser
                bcrypt.hash(getuser, saltRounds, function (err, hash2) {
                  db.query(
                    "insert into results_vote(no_user,user,vote,event,hash,p_hash) Values(?,?,?,?,?,?)",
                    [
                      no_u,
                      hash2,
                      id,
                      getname,
                      hash1,
                      data[data.length - 1].hash,
                    ],
                    (err, Result) => {
                      if (err) {
                        console.log("fail2", err);
                        res.send({ massage: "fail2", err });
                      } else {
                        console.log("Insert Sugcess");
                        db.query(
                          "DELETE FROM user_info where email = ?",
                          [getuser],
                          (err, res2) => {
                            if (err) {
                              res.send({ Massage: "No insert", resError: err });
                            } else {
                              res.send({ Massage: "insert", res: res2 });
                            }
                          }
                        );
                      }
                    }
                  );
                });
              }
            );
          } else {
            bcrypt.hash(
              getuser + getname + id,
              saltRounds,
              function (err, hash1) {
                // Set hash Mailuser
                bcrypt.hash(getuser, saltRounds, function (err, hash2) {
                  db.query(
                    "insert into results_vote(no_user,user,vote,event,hash,p_hash) Values(?,?,?,?,?,?)",
                    [no_u, hash2, id, getname, hash1, 0],
                    (err, Result) => {
                      if (err) {
                        console.log("fail2", err);
                        res.send({ massage: "fail2", err });
                      } else {
                        console.log("Insert Sugcess 0");
                        db.query(
                          "DELETE FROM user_info where email = ?",
                          [getuser],
                          (err, res2) => {
                            if (err) {
                              res.send({ Massage: "No insert", resError: err });
                            } else {
                              res.send({ Massage: "insert No.0", res: res2 });
                            }
                          }
                        );
                      }
                    }
                  );
                });
              }
            );
          }
        }
      }
    }
  );
});


//--------------------------------------------------------------
app.listen("3001", jsonParser, () => {
  console.log("Server Runing 3001");
});

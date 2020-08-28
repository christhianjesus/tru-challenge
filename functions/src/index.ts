import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as nodemailer from "nodemailer";

admin.initializeApp();
const db = admin.firestore();

const transporter = nodemailer.createTransport(functions.config().smtp);

const app = express();
const corsHandler = cors({ origin: true });
app.use(corsHandler);

app.post("/contact", async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.content) {
    res.status(400).send("Missing required fields.");
    return;
  }

  const from = functions.config().msg.sender;
  const to = req.body.email;
  const subject = `Message sent by ${req.body.name}: ${req.body.email}`;
  const text = req.body.content;

  const error: Error | null = await new Promise((resolve, reject) => {
    transporter.sendMail({ from, to, subject, text }, (err, info) => {
      resolve(err);
    });
  });

  if (error) {
    res.status(500).send(error.toString());
    return;
  }

  transporter.sendMail({ from, to: from, subject, text }, (err, info) => {
    if (err) res.status(500).send(err.toString());
    else res.end();
  });
});

app.get("/messages*", (req, res) => {
  const ids = req.params[0].split("/").filter(i => i);
  let ref = db.collection("messages");
  ids.forEach(id => {
    ref = ref.doc(id).collection("messages");
  });

  ref
    .get()
    .then(snapshot => {
      res.send(snapshot.docs.map(i => ({ ...i.data(), id: i.id })));
    })
    .catch(err => {
      res.status(500).send(err.toString());
    });
});

app.get("/post*", (req, res) => {
  const ids = req.params[0].split("/").filter(i => i);
  if (ids.length === 0) {
    res.status(400).send("Invalid request.");
    return;
  }

  let ref = db.collection("messages").doc(ids[0]);
  ids.slice(1).forEach(id => {
    ref = ref.collection("messages").doc(id);
  });

  ref
    .get()
    .then(doc => {
      if (doc.exists) {
        res.send(doc.data());
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).send(err.toString());
    });
});

app.post("/post*", (req, res) => {
  if (!req.body.title || !req.body.msg || !req.body.author) {
    res.status(400).send("Missing required fields.");
    return;
  }

  const ids = req.params[0].split("/").filter(i => i);
  let ref = db.collection("messages");
  ids.forEach(id => {
    ref = ref.doc(id).collection("messages");
  });

  ref
    .add({
      title: req.body.title,
      msg: req.body.msg,
      author: req.body.author,
      answers: 0
    })
    .then(() => {
      res.end();
    })
    .catch(err => {
      res.status(500).send(err.toString());
    });

  // Update answers counter
  if (ids.length > 0) {
    let ref2 = db.collection("messages").doc(ids[0]);
    ids.slice(1).forEach(id => {
      ref2 = ref2.collection("messages").doc(id);
    });

    ref2
      .update({
        answers: admin.firestore.FieldValue.increment(1)
      })
      .catch(err => {
        console.error(err.toString());
      });
  }
});

exports.api = functions.https.onRequest(app);

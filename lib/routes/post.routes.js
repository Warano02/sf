const express = require("express");
const {
  tel,
  vE,
  sendMail,
  upload,
  new_commande,
} = require("../controllers/post.controler");
const auth = require("../SECURITY");
const {
  generateWelcomeEmail,
  generateWelcomeEmail2,
} = require("../helper/src/mailSend");
const { sequelize, publications, messages } = require("../config/db");
const { getPubOfUser } = require("../controllers/get.contoler");
const { keys } = require("../SECURITY/api.keys");
const Mailler = require("../app/confirm/email");
const path = require("path");
const generateConfirmationEmail = require("../helper/function/t");
const { generatePreventMessageBd, BDn } = require("../helper/function/bd");
const router = express.Router();
router.post("/verify/mail/", (req, res) => {
  req.body.email
    ? res
        .status(200)
        .json({ email: req.body.email, validiter: vE(req.body.email) })
    : res.status(403).json({ msg: "Veuillez preciser une email a vérifié" });
});

router.post("/welcome", (req, res) => {
  if (!req.query.name || !req.query.email) {
    res.status(403).json({ msg: "Veuillez preciser le nom et l'email" });
  } else {
    let t = generateWelcomeEmail(req.query.name);
    Mailler(req.query.email, "Message de bienvenue !", "Success-field", t)
      .then(() => res.status(201).json({ msg: "Message envoyé ave success !" }))
      .catch((e) => {
        console.log(
          "Une erreur est survenue lors de l'envoie de l'email  " + e
        );
        res.status(500).json({
          error: true,
          msg: "Une erreur est survenue de notre côté !",
        });
      });
  }
});
// Route pour envoyer le message de bienvenue lors de l'inscription sur le site de bd en 2024
router.post("/welcome2", (req, res) => {
  if (!req.query.name || !req.query.email) {
    res.status(403).json({ msg: "Veuillez preciser le nom et l'email" });
  } else {
    let t = generateWelcomeEmail2(req.query.name);
    Mailler(req.query.email, "Message de bienvenue !", "Groupe 5 BD", t)
      .then(() => res.status(201).json({ msg: "Message envoyé ave success !" }))
      .catch((e) => {
        console.log(
          "Une erreur est survenue lors de l'envoie de l'email  " + e
        );
        res.status(500).json({
          error: true,
          msg: "Une erreur est survenue de notre côté !",
        });
      });
  }
});

router.post("/verify/tel/", (req, res) => {
  req.body.tel
    ? res
        .status(200)
        .json({ tel: req.body.tel, validiter: tel.cameroon(req.body.tel) })
    : res
        .status(403)
        .json({ error: "Veuillez preciser un numéro de tel  a verifier" });
});

router.post("/confirm/email/", (req, res) => {
  if (!req.body.API_KEY || !req.body.email || !req.body.object) {
    res.status(422).json({
      error: true,
      msg: "Veuillez bien construire le body de votre requête car elle n'est pas complète",
    });
  } else {
    if (auth(req.body.API_KEY)) {
      let main = sendMail(req.body.email, req.body.object);
      !main
        ? res.status(400).json({
            error: true,
            msg: "L'objet de votre requête n'est pas défini. Veuillez consulter la documentation ou contacter le développeur via le +237621092130",
          })
        : res.status(201).json({
            error: false,
            msg: `Code de confirmation envoyé avec Success a ${req.body.email}`,
            code: main,
          });
    } else {
      res.status(401).json({
        error: true,
        msg: "L'API_KEY que vous avez entrer n'ai pas correct",
      });
    }
  }
});

// Confirmation d'email pour le groupe 5 de bd

router.post("/w2r", (req, res) => {
  if (!req.query.email || !req.query.name) {
    res.status(403).json({
      error: true,
      msg: "Veuillez preciser l'email et le nom de l'utilisateur ",
    });
  } else {
    let code = Math.floor(Math.random() * 100000);
    let html = generateConfirmationEmail(code);
    Mailler(
      req.query.email,
      "Confirmation de votre inscription",
      "Groupe 5 BD",
      html
    )
      .then(() =>
        res.status(201).json({
          msg: "Code de confirmation envoyé avec success",
          error: false,
          code,
        })
      )
      .catch((e) => {
        console.log(
          "Une erreur de reseaux est survenue lors de l'envoie d'un email : " +
            e
        );
        res.status(500).json({
          error: true,
          msg: "Une erreur est survenue de notre coté ou l'adresse email que vous avez envoyer n'existe pas",
        });
        d;
      });
  }
});

router.post("/w3r", (req, res) => {
  if (!req.query.email || !req.query.name) {
    res.status(403).json({
      error: true,
      msg: "Veuillez preciser l'email et le nom de l'utilisateur ",
    });
  } else {
    let html = generatePreventMessageBd(req.query.name);
    Mailler(req.query.email, "Nouvelle connexion", "Groupe 5 BD", html)
      .then(() =>
        res.status(201).json({
          msg: "Message envoyé",
          error: false,
        })
      )
      .catch((e) => {
        console.log(
          "Une erreur de reseaux est survenue lors de l'envoie d'un email : " +
            e
        );
        res.status(500).json({
          error: true,
          msg: "Une erreur est survenue de notre coté ou l'adresse email que vous avez envoyer n'existe pas",
        });
      });
  }
});

router.post("/w4r", (req, res) => {
  if (!req.query.email || !req.query.name || !req.query.date) {
    res.status(403).json({
      error: true,
      msg: "Veuillez preciser l'email,la date  et le nom de l'utilisateur ",
    });
  } else {
    let html = BDn(req.query.name, req.query.date);
    console.log(req.query.name,req.query.email,req.query.date);
    
    Mailler(req.query.email, "Notification requête", "Groupe 5 BD", html)
      .then(() =>
        res.status(201).json({
          msg: "Message envoyé",
          error: false,
        })
      )
      .catch((e) => {
        console.log(
          "Une erreur de reseaux est survenue lors de l'envoie d'un email : " +
            e
        );
        res.status(500).json({
          error: true,
          msg: "Une erreur est survenue de notre coté ou l'adresse email que vous avez envoyer n'existe pas",
        });
      });
  }
});

router.post("/new_publication", (req, res) => {
  const Key = req.headers["x-api_key"];
  if (!Key) {
    res.status(401).json({
      error: true,
      msg: "Veuillez preciser votre clé api et réessayez",
    });
  } else if (!keys.includes(Key)) {
    res.status(403).json({
      error: true,
      msg: "Votre clé API est invalide. Corrigez la puis réessayez",
    });
  } else if (!req.body.auth || !req.body.pub) {
    res.status(406).json({
      error: true,
      msg: "Veuillez completer les information pour la creation d'une publication",
    });
  } else {
    publications.create({
      auth: req.body.auth,
      pub: req.body.pub,
      stat: { nbr_like: 0, nbr_com: 0, nbr_par: 0 },
      comments: [],
    });
    res
      .status(201)
      .json({ error: false, msg: "Publication ajouter avec success" });
  }
});

router.post("/new_porfolio/contact", (req, res) => {
  if (
    !req.body.nom ||
    !req.body.email ||
    !req.body.tel ||
    !req.body.sujet ||
    !req.body.messages
  ) {
    res.status(406).json({
      error: true,
      msg: "Les informations que vous avez envoyer ne sont pas complètes",
    });
  } else {
    new_commande(
      req.body.nom,
      req.body.email,
      req.body.tel,
      req.body.sujet,
      req.body.messages
    )
      .then((_) =>
        res.status(201).json({
          error: false,
          msg: "Vous venez de me contacter avec succès. Je vous répond dans quelques minutes",
        })
      )
      .catch((err) => res.status(500).json({ error: true, msg: err }));
  }
});

router.post("/publications/user", (req, res) => {
  if (!req.body.nom || !req.body.profil) {
    res.status(400).json({
      error: true,
      msg: "Veuillez mentionner toutes les donnee puis réesayez",
    });
  } else {
    let publicationOfUser = getPubOfUser(req.body.profil, req.body.nom);
    publicationOfUser !== false
      ? res.status(200).json(publicationOfUser)
      : res.status(404).json({
          error: true,
          msg: "Aucun utilisateur trouver avec les données que vous avez preciser",
        });
  }
});

router.post("/messages/add", (req, res) => {
  const Key = req.headers["x-api_key"];
  if (!Key) {
    res.status(401).json({
      error: true,
      msg: "Veuillez preciser votre clé api et réessayez",
    });
  } else if (!keys.includes(Key)) {
    res.status(403).json({
      error: true,
      msg: "Votre clé API est invalide. Corrigez la puis réessayez",
    });
  } else if (
    !req.body.par ||
    !req.body.pour ||
    !req.body.contenue ||
    !req.body.type
  ) {
    res.status(416).json({
      error: true,
      msg: "Le body de votre requête est incomplète. Veuillez à y mentionner l'Id de la publication et le nouveau commentaire",
    });
  } else {
    let date_Actuel = new Date();
    let date = {
      jour: date_Actuel.getDate(),
      mois: date_Actuel.getMonth(),
      heure: date_Actuel.getHours(),
      minute: date_Actuel.getMinutes(),
    };
    let par = req.body.par;
    let pour = req.body.pour;
    if (isNaN(par) || isNaN(pour)) {
      res.status(400).json({
        error: true,
        msg: "Veuillez preciser des nombres réels aux endroit requis.  Si vous avez des doutes, Fiellez vous a la documentation.",
      });
    } else {
      messages.create({
        type: req.body.type,
        par: req.body.par,
        pour: req.body.pour,
        date,
        valeur: req.body.contenue,
      });
      res
        .status(201)
        .json({ error: false, msg: "Message envoyé avec succès !" });
    }
  }
});
router.post("/message/add/audio", upload.single("audioFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Aucun fichier audio n'a été envoyé.");
  } else {
    let date_Actuel = new Date();
    let date = {
      jour: date_Actuel.getDate(),
      mois: date_Actuel.getMonth(),
      heure: date_Actuel.getHours(),
      minute: date_Actuel.getMinutes(),
    };
    let par = req.body.par;
    let pour = req.body.pour;
    if (isNaN(par) || isNaN(pour)) {
      res.status(400).json({
        error: true,
        msg: "Veuillez preciser des nombres réels aux endroit requis.  Si vous avez des doutes, veuillez vous a la documentation.",
      });
    } else {
      messages.create({
        type: "audio",
        par: req.body.par,
        pour: req.body.pour,
        date,
        valeur: req.file.filename,
      });
      res.status(200).json({
        msg: `Fichier ${req.file.filename} enregistré avec succès.`,
        error: false,
      });
    }
  }
});

module.exports = router;

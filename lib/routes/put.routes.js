const express = require("express");
const { publications } = require("../config/db");
const { keys } = require("../SECURITY/api.keys");
const { uploadImage } = require("../controllers/put.controller");
const router = express.Router();
//adjouter un nouveau commentaire a un e publication

router.put("/add_new_comment", (req, res) => {
  const Key = req.headers["x-api_key"];
  if (!Key) {
    res.status(401).json({
      error: true,
      msg: "Veuillez preciser votre clé api et réesayez",
    });
  } else if (!keys.includes(Key)) {
    res.status(403).json({
      error: true,
      msg: "Votre clé API est invalide. Corrigez la puis réesayez",
    });
  } else if (!req.body.id || !req.body.comment) {
    res.status(416).json({
      error: true,
      msg: "Le body de votre requête est incomplète. Veuillez à y mentionner l'Id de la publication et le noouveau commentaire",
    });
  } else {
    const Id = req.body.id;
    publications
      .findByPk(Id)
      .then((data) => {
        data.comments.push(req.body.comment);
        data.stat.nbr_com = data.stat.nbr_com + 1;
        publications
          .update(
            { comments: data.comments, stat: data.stat },
            {
              where: { id: Id },
            }
          )
          .then((_) =>
            res.status(202).json({
              error: false,
              msg: `Nouveau commentaire ajouter avec success. Nouveau_Nombre de commentaire ${data.stat.nbr_com}`,
            })
          );
      })
      .catch(() =>
        res.status(404).json({
          error: true,
          msg:
            "Aucune publication avec l'id que vous avez mentionner <" +
            Id +
            ">",
        })
      );
  }
});

router.put("/bd_2k25", async (req, res) => {
  if (!req.body.img) {
    res.status(400).json({ error: true, msg: "Entrer une image " });
  } else {
    const update = await uploadImage(req.body.img);
    !update
      ? res
          .status(400)
          .json({ error: true, msg: "Veuillez entrer l'image en base 64" })
      : res.status(201).json({ error: false, msg: update });
  }
});

module.exports = router;

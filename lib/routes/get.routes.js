require('dotenv').config();
const express = require("express");
const { sequelize, publications, messages, citations } = require("../config/db");
const Hours = require("../helper/function/minuteOrHours");
const router = express.Router()
const axios = require('axios')
const path = require("path");
const fs = require('fs')
const { keys } = require("../SECURITY/api.keys");
const randomCatego = require("../helper/function/quote.categori");
const { generateQrCode } = require('../controllers/get.contoler');
// recuperation d'une publication ou de toute les publications
router.get('/publications/', (req, res) => {
    let result = []
    let r = []
    if (req.query.id) {
        const Id = parseInt(req.query.id)
        publications.findAll({ where: { id: Id } })
            .then((data) => {
                if (data.length > 0) {
                    data.forEach(Actual_data => {
                        let pub = Actual_data.pub
                        let comments = Actual_data.comments
                        pub.heure = Hours(pub.heure)
                        comments.forEach(comment => {
                            comment.heure = Hours(comment.heure);
                        });
                        r.push(Actual_data.id, Actual_data.auth, pub, Actual_data.stat, comments)
                        result.push(r)
                        r = []
                    });
                    res.status(200).json(data)
                } else {
                    res.status(503).json({ error: true, msg: "Aucune publication avec l'identifiant que vous avez mentioner " + Id })
                }
            })
            .catch(() => res.status(404).json({ error: true, msg: "Aucune publication avec l'identifiant que vous avez mentioner " + Id }))
    } else {
        publications.findAll().then((data) => {
            data.forEach(Actual_data => {
                let pub = Actual_data.pub
                let comments = Actual_data.comments
                pub.heure = Hours(pub.heure)
                comments.forEach(comment => {
                    comment.heure = Hours(comment.heure);
                });
                r.push(Actual_data.id, Actual_data.auth, pub, Actual_data.stat, comments)
                result.push(r)
                r = []

            });
            data = []
            for (let index = result.length - 1; index > 0; index--) {
                const element = result[index];
                data.push(element)
            }
            result = data
            res.status(200).setHeader("CORS", "Access-Control-Allow-Origin").json(result)
        }).catch(() => res.status(500).json({ error: true, msg: "Une erreur est survenue lors de la recuperation des publication. Réessayer dans quelques instant" }))
    }
})

router.get("/publications/user", (req, res) => {
    if (!req.query.profil) {
        res.status(400).json({ error: true, msg: "Veuillez preciser le profil de l'utilisateur que vous souhaitez voir les publications" })
    } else {
        let r = []
        let result = []
        const profil = req.query.profil
        publications.findAll().then((data) => {
            data.forEach(Actual_data => {
                let auth = Actual_data.auth
                let pub = Actual_data.pub
                let comments = Actual_data.comments
                if (auth.profil == profil) {
                    pub.heure = Hours(pub.heure)
                    comments.forEach(comment => {
                        comment.heure = Hours(comment.heure);
                    });
                    r.push(Actual_data.id, Actual_data.auth, pub, Actual_data.stat, comments)
                    result.push(r)
                    r = []
                }
            });
            result.length > 0 ? res.status(200).setHeader("CORS", "Access-Control-Allow-Origin").json(result) : res.status(400).json({ error: true, msg: `Aucun utilisateur n'as publier avec le profil ${profil}` })
        }).catch(() => res.status(500).json({ error: true, msg: "Une erreur est survenue lors de la recuperation des publication. Réessayer dans quelques instant" }))

    }
})

router.get("/messages/:id/:id2", (req, res) => {
    const Key = req.headers["x-api_key"]
    if (!Key) {
        res.status(401).json({ error: true, msg: "Veuillez preciser votre clé api et réessayez" })
    } else if (!keys.includes(Key)) {
        res.status(403).json({ error: true, msg: "Votre clé API est invalide. Corrigez la puis réessayez" })
    } else if (!Number.isInteger(Number(req.params.id) || !Number.isInteger(Number(req.params.id2)))) {
        res.status(416).json({ error: true, msg: "Veuillez preciser un nombre entier au niveau de l'id puis réessayez!" })
    } else {
        let id = parseInt(req.params.id)
        let id2 = parseInt(req.params.id2)

        messages.findAll().then(allMessages => {
            let messageBrutes = []
            allMessages.forEach(message => {
                if ((message.par == id && message.pour == id2) || (message.par == id2 && message.pour == id)) {
                    messageBrutes.push(message)
                }
            });
            if (messageBrutes.length == 0) {
                res.status(200).json({ error: true, msg: "Les deux utilisateurs que vous avez mentioner n'ont pas encore eux de conversation." })
            } else {
                let tampon = []
                let filter = []
                messageBrutes.forEach(message => {
                    let date = message.date;
                    let details = `${date.mois}-${date.jour}-${date.heure}-${date.minute}`;
                    date = Hours(details);
                    message.date = date
                    let valeur = message.valeur
                    if (valeur == "audio") {
                        let filePath = path.join(__dirname, `../public/audio/${valeur}`)
                        fs.readFile(filePath, (err, data) => {
                            if (err) {
                                res.status(500).json({ error: true, msg: "Une erreur est survenue lors de la mise en forme de vos messages " })
                            } else {
                                valeur = data.toString("base64")
                                message.valeur = valeur
                            }
                        })
                        tampon.push(message)
                    } else {
                        tampon.push(message)
                    }
                });
                tampon.forEach(message => {
                    let moi = message.par == id
                    filter.push({ id: message.id, moi, valeur: message.valeur, date: message.date, type: message.type })
                });
                filter.sort((a, b) => b.id - a.id);
                res.status(200).json(filter)
            }
        })
    }
})

router.get('/randomquote', (req, res) => {
    const Key = req.headers["x-api_key"]
    if (!Key) {
        res.status(401).json({ error: true, msg: "Veuillez preciser votre clé api et réessayez" })
    } else if (!keys.includes(Key)) {
        res.status(403).json({ error: true, msg: "Votre clé API est invalide. Corrigez la puis réessayez" })
    } else {
        const category = randomCatego()
        axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
            headers: { 'X-Api-Key': process.env.NINJA_API }
        })
            .then(async (response) => {
                const add = response.data[0]

                try {
                    const find = await citations.findOne({ where: { citation: add.quote, auteur: add.author } })
                    if (!find) {
                        citations.create({
                            citation: add.quote,
                            auteur: add.author
                        })
                    }
                    
                    res.status(200).json({ citation: add.quote, auteur: add.author })

                } catch (e) {
                    console.log("ERREUR LORS DU TRAITEMENT DE LA CITATION " + e)
                    res.status(500).json({ error: true, msg: "Une erreur technique est survenue de notre côté. Veuillez réessayer ! " })
                }
            })
            .catch((error) => {
                citations.findOne({ where: { id: 2 } })
                    .then(data => res.status(200).json(data))
                // res.status(500).json({ error: true, msg: "Une erreur est survenue de notre coté. Veuillez réessayer ultérieurement" })
                console.error('Error:', error.response ? error.response.status : error.message);
            });
    }


})
router.get('/warano-qr-code', (req, res) => {
    const Key = req.headers["x-api_key"]
    const url = req.query.url
    if (!Key) {
        res.status(401).json({ error: true, msg: "Veuillez preciser votre clé api et réessayez" })
    } else if (!keys.includes(Key)) {
        res.status(403).json({ error: true, msg: "Votre clé API est invalide. Corrigez la puis réessayez" })
    } else if (!url) {
        res.status(400).json({ error: true, msg: "Veuillez preciser en query l'url dont vous souhaiter avoir le code qr" })
    } else {
        generateQrCode(url)
            .then(response => res.status(200).json({ reponse: response }))
            .catch(err => {
                console.log("Une erreur est survenue lors de la generation du code qr");
                res.status(500).json({ error: true, msg: "Une erreur est survenue de notre coté. Veuillez réessayer plus tard." })
            })
    }
})

router.get('/message/audio/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../public/audio/', req.params.filename);
    fs.stat(filePath, (err, stat) => {
        if (err) {
            return res.status(404).send('Fichier non trouvé');
        }
        res.setHeader('Content-Type', 'audio/ogg');
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
})

module.exports = router
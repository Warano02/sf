require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const publicationModel = require("./models/publication")
const messageModel=require('./models/message')
const citationModel=require('./models/citation')
const profolioModel=require('./models/porfolio')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    logging: false
  }
)
sequelize.authenticate()
  .then((_) => console.log("La connexion a la bd a ete réussis"))
  .catch((err) => console.log("Une erreur est survenue lors de la connexion a la base de donnee" + err))

const publications = publicationModel(sequelize, DataTypes)
console.log("Publications is "+typeof publications)
const messages=messageModel(sequelize,DataTypes)
const citations=citationModel(sequelize,DataTypes)
const porfolios=profolioModel(sequelize,DataTypes)
const initDb=()=>{
  return sequelize.sync()
  .then((_) => {
    console.log("La base de donnee a été synchroniser avec nos table");
  })
}

module.exports={initDb,publications,sequelize,messages,citations,porfolios}


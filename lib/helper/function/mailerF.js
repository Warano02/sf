/* here it's  a script who provide a mail structure */
/**
 * 
 * @param {string} to : it's a email of who can receive a email
 * @returns object :  {code,html} the can thats send and a html code that can send
 */
function FormMail(to,code) {
  return `
     <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre message de confirmation</title>
   
</head>
<body>
    <main>
        <header><span>Votre code de confirmation</span></header>
        <p >Hey 👋 ${to}! <br> Pour la confirmation de votre adresse e-mail, veuillez entrer le code <code  style="font-size: 25px; font-family: monospace;">${code}</code>. <br>
         <span> Ne le divulger  a personne</span></p>
    </main>
</body>
</html>`
}
module.exports=FormMail
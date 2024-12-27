/**
 * 
 * @param {string} email 
 * @param {number} code 
 * @returns html
 */
function mail(email, code) {
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
        <p >Hey 👋 ${email}! <br> Pour la confirmation de votre adresse e-mail, veuillez entrer le code <code  style="font-size: 25px; font-family: monospace;">${code}</code>. <br>
         <span> Ne le divulger  a personne</span></p>
    </main>
</body>
</html>`;
}

function MailPorfolio(name, email, projet) {
    return `
     <!DOCTYPE html>
     <html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle commande depuis le porfolio</title>
</head>
<body>
    <main>
        <header><span>Nouvelle commande</span></header>
        <p >Hey 👋 Warano! <br> Tu te porte bien j'espère. Juste pour te dire que tu as reçus une nouvelle commende de  <code  style="font-size: 25px; font-family: monospace;">${name}</code> qui répond a l'email <code  style="font-size: 25px; font-family: monospace;">${email}</code>
         Pour parvenir a discuter avec lui/elle pour son projet <code  style="font-size: 25px; font-family: monospace;">${projet}</code>, Je t'invite a consulter avant tout ta base de donnée
    </main>
</body>
</html>`
}

// Email de bienvenue sur le site success-field avec    Calvain
function generateWelcomeEmail(userName) {
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue sur Success-Field</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #4CAF50;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #555555;
            }
        </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
            <h1>Bienvenue sur Success-Field ! 🎉</h1>
        </div>
        <p>Bonjour ${userName},</p>
        <p>Nous sommes ravis de vous accueillir sur <strong>Success-Field</strong> ! Vous faites désormais partie d'une communauté passionnée par l'apprentissage et le partage de ressources éducatives de qualité.</p>

        <h3>Ce que vous pouvez faire maintenant :</h3>
        <ul>
            <li><b>Parcourir nos épreuves</b> : Accédez à notre vaste bibliothèque d’épreuves disponibles à télécharger et enrichissez vos compétences !</li>
            <li><b>Personnaliser votre profil</b> : Complétez votre profil pour tirer le meilleur parti de notre plateforme et découvrir du contenu qui vous correspond.</li>
            <li><b>Rester informé</b> : Inscrivez-vous à notre newsletter pour recevoir des mises à jour sur les nouvelles épreuves, des conseils d'étude, et bien plus encore.</li>
        </ul>

        <p>N'hésitez pas à nous contacter si vous avez des questions ou besoin d'assistance. Votre succès est notre priorité !</p>

        <p>Merci de faire partie de <strong>Success-Field</strong>. Nous avons hâte de vous voir progresser !</p>

        <div class="footer">
            <p>Cordialement,</p>
            <p>L’équipe de <strong>Success-Field</strong></p>
        </div>
    </div>
    </body>
    </html>
    `;
    
    return emailHtml;
}

//Email de bienvenue pour le projet de base de donnee 2024 
function generateWelcomeEmail2(userName) {
    const emailHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue sur Success-Field</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                margin: auto;
                padding: 20px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #4CAF50;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #555555;
            }
        </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
            <h1>Bienvenue Dans le Projet 5 ! 🎉</h1>
        </div>
        <p>Bonjour ${userName},</p>
        <p>Nous sommes ravis de vous accueillir sur <strong>GP5_BD</strong> ! Vous faites désormais partie d'une communauté passionnée par l'apprentissage et le partage de ressources éducatives de qualité.</p>

        <h3>Ce que vous pouvez faire maintenant :</h3>
        <ul>
            <li><b>Faire  des requêtes</b> : Nous vous accompagnons sur la mise sur pied d'une requête de qualité</li>
            <li><b>Personnaliser votre profil</b> Tenant compte du fait que c'est dû a un problème que vous avez rejoint la communauté, nous vous donnons la possibilité de modifier votre profil afin que votre compte vous soit agréable a utiliser et moins stressant tout au long de l'attente d'une reponse a votre requête.</li>
            <li><b>Rester informé</b> : Nous vous offrons une option d'historique de requête pour suivre l'evolution de celle-ci.</li>
        </ul>

        <p>N'hésitez pas à nous contacter si vous avez des questions ou besoin d'assistance. Votre succès est notre priorité !</p>

        <p>Merci de faire partie de <strong>GP5_BD</strong>. Nous avons hâte de vous voir progresser !</p>

        <div class="footer">
            <p>Cordialement,</p>
            <p>L’équipe de <strong>Warano & GP5_BD</strong></p>
        </div>
    </div>
    </body>
    </html>
    `;
    
    return emailHtml;
}




module.exports = { mail, MailPorfolio,generateWelcomeEmail,generateWelcomeEmail2 };

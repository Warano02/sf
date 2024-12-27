/**
 * 
 * @param {number} confirmationCode 
 * @returns html
 */
function generateConfirmationEmail(confirmationCode) {
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de Compte</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #555;
            }
            footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bienvenue Dans le projet du Groupe 5!</h1>
            <p>Votre compte a été créé avec succès. Nous sommes ravis de vous accueillir parmi nous !</p>
            <p>Voici votre code de confirmation : <strong>${confirmationCode}</strong></p>
            <p>Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.</p>
            <footer>
                <p>Pour toute question, contactez-nous à <a href="mailto:carineteoi@gmail.com">supportGP5_BD@contact.fr</a>.</p>
                <p>&copy;2024 Gestion de requêtes GP5_BD. Tous droits réservés.</p>
            </footer>
        </div>
    </body>
    </html>
    `;
}


module.exports=generateConfirmationEmail
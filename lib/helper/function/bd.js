
function generatePreventMessageBd(nom){
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification de Connexion</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            padding: 20px;
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Connexion de votre compte</h1>
        <p>Bonjour ${nom},</p>
        <p>Nous tenons à vous informer que votre compte a été récemment connecté sur un nouvel appareil. Si c'est vous qui avez effectué cette connexion, aucune action n'est nécessaire.</p>
        <p>Cependant, si vous n'êtes pas à l'origine de cette connexion, nous vous recommandons de changer votre mot de passe immédiatement et de vérifier vos paramètres de sécurité.</p>
        <p>Pour toute question ou assistance, n'hésitez pas à nous contacter.</p>
        <div class="footer">
            Cordialement,<br>
            <a href="mailto:carineteoi@gmail.com">GP5_BD</a>
        </div>
    </div>
</body>
</html>`
}

function formatDate(dateStr) {
    const parts = dateStr.split('/');
    
    if (parts.length !== 3) {
        return "Format de date invalide. Utilisez j/m/a.";
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const dateObj = new Date(year, month, day);

    if (isNaN(dateObj.getTime())) {
        return "Date invalide.";
    }

    const daysOfWeek = [
        "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"
    ];

    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const dayOfWeek = daysOfWeek[dateObj.getDay()];

    return `${dayOfWeek} le ${day} ${months[month]} ${year}`;
}

function BDn(nom,date){
    return`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notification de Mise à Jour</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: #007bff;
            padding: 20px;
            color: white;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 10px 15px;
            margin: 20px 0;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Notification de Mise à Jour</h2>
        </div>
        <div class="content">
            <p>Bonjour ${nom},</p>
            <p>Nous espérons que vous allez bien.</p>
            <p>Nous tenons à vous informer que votre requête soumise le ${formatDate(date)} a été traitée par notre équipe administrative.</p>
            <p>Vous pouvez dès à présent consulter la réponse et les détails concernant votre demande en vous rendant sur votre tableau de bord.</p>
            <p>
                <a href="http://localhost/bd_20224/front/pages/config/hr.php" class="button">Accédez à votre tableau de bord</a>
            </p>
            <p>Si vous avez des questions ou besoin d'assistance supplémentaire, n'hésitez pas à nous contacter.</p>
            <p>Merci pour votre confiance et votre engagement.</p>
        </div>
        <div class="footer">
            <p>Cordialement,</p>
            <p>L'équipe de gestion des requêtes universitaires</p>
        </div>
    </div>
</body>
</html>`
}

module.exports={generatePreventMessageBd,BDn}
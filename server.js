// Installez express en exécutant : npm install express
const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3001; // Port sur lequel le serveur écoute

// Dossier où se trouvent vos fichiers HTML
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

// Rediriger vers index.html par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(publicFolder, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    // Obtenir l'adresse IP locale
    const interfaces = os.networkInterfaces();
    let localAddress = 'localhost';

    for (const iface of Object.values(interfaces)) {
        if (iface) {
            for (const alias of iface) {
                if (alias.family === 'IPv4' && !alias.internal) {
                    localAddress = alias.address;
                    break;
                }
            }
        }
    }

    console.log(`Serveur lancé ! Accédez à votre site sur :`);
    console.log(`- PC : http://localhost:${PORT}`);
    console.log(`- Téléphone : http://${localAddress}:${PORT}`);
});

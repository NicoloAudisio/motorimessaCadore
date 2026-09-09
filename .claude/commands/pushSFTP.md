---
description: Carica tutti i file del progetto sul server FTP di motorimessacadoretorino.altervista.org
---

Esegui l'upload di tutti i file del progetto sul server FTP tramite lo script `push-sftp.js`.

1. Se la cartella `node_modules` non esiste, esegui `npm install`.
2. Esegui `npm run pushSFTP` (invoca `node push-sftp.js`).
3. Riporta all'utente l'esito del caricamento, segnalando eventuali file/cartelle che hanno dato errore.

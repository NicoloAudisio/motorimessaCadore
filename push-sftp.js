const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

async function uploadToFTP() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log('🔗 Connessione al server FTP...');
    await client.access({
      host: 'ftp.motorimessacadoretorino.altervista.org',
      user: 'motorimessacadoretorino',
      password: 'DF3GnEnSVmwb',
      port: 21,
      pasvMode: true
    });

    console.log('✅ Connesso al server FTP!\n');

    // Carica tutti i file dalla cartella corrente
    await uploadDir(client, '.', '/public_html');

    console.log('\n✅ Caricamento completato con successo!');
  } catch (err) {
    console.error('❌ Errore durante il caricamento:', err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

async function uploadDir(client, localDir, remoteDir) {
  const files = fs.readdirSync(localDir);

  for (const file of files) {
    // Salta i file e cartelle da ignorare
    if (shouldIgnore(file)) {
      continue;
    }

    const localPath = path.join(localDir, file);
    const remotePath = remoteDir + '/' + file;
    const stat = fs.statSync(localPath);

    if (stat.isDirectory()) {
      console.log(`📁 Creazione cartella: ${remotePath}`);
      try {
        await client.ensureDir(remotePath);
        await uploadDir(client, localPath, remotePath);
      } catch (err) {
        console.error(`⚠️  Errore nella cartella ${remotePath}:`, err.message);
      }
    } else {
      console.log(`📤 Caricamento: ${file}`);
      try {
        await client.uploadFrom(fs.createReadStream(localPath), remotePath);
      } catch (err) {
        console.error(`⚠️  Errore nel file ${file}:`, err.message);
      }
    }
  }
}

function shouldIgnore(filename) {
  const ignoredItems = [
    'node_modules',
    '.git',
    '.gitignore',
    'package-lock.json',
    '.DS_Store',
    'push-sftp.js',
    'package.json',
    '.vscode',
    '.env'
  ];

  return ignoredItems.includes(filename) || filename.startsWith('.');
}

uploadToFTP();

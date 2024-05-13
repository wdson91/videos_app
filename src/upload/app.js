/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

const fs = require('fs');
const { google } = require('googleapis');

const GOOGLE_API_FOLDER_ID = '1-is8j--EYB4WpDNhNigRNHLikOqg7JZk';

async function uploadFileToGoogleDrive(filePath, fileName, mimetype) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './divine-quest-417313-6af103438c28.json',
      scopes: 'https://www.googleapis.com/auth/drive',
    });

    const drive = google.drive({
      version: 'v3',
      auth,
    });

    const fileMetadata = {
      name: fileName,
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: mimetype,
      body: fs.createReadStream(filePath),
    };

    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    console.log(`File uploaded to Google Drive with ID: ${res.data.id}`);
  } catch (err) {
    console.log('Upload file error', err);
  }
}

module.exports = uploadFileToGoogleDrive;

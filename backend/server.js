require('dotenv').config();
const Hapi = require('@hapi/hapi');
const path = require('path');
const multer = require('multer');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const fs = require('fs').promises; // Import fs.promises untuk readFile dan writeFile
const { v4: uuidv4 } = require('uuid'); // Untuk menghasilkan UUID unik
const Vision = require('@hapi/vision');
const Handlebars = require('handlebars');

// Inisialisasi Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Sesuaikan dengan path ke service account key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecowise-47f54-default-rtdb.asia-southeast1.firebasedatabase.app" // Sesuaikan dengan databaseURL
});

const db = admin.firestore();
const storage = new Storage({
    projectId: "ecowise-47f54", // Sesuaikan dengan projectId
    keyFilename: './serviceAccountKey.json' // Sesuaikan dengan path ke service account key
});
const bucket = storage.bucket("ecowise-47f54.appspot.com"); // Sesuaikan dengan storageBucket

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    await server.register(Vision);

    server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: 'src/templates'
    });


    // Route untuk mendapatkan semua FAQ
    server.route({
        method: 'GET',
        path: '/faq',
        handler: async (request, h) => {
            try {
                const snapshot = await db.collection('faq').get();
                const faqs = snapshot.docs.map(doc => doc.data());
                return h.response(faqs).code(200);
            } catch (error) {
                console.error('Error fetching FAQ:', error);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    // Route untuk menambahkan FAQ baru
    server.route({
        method: 'POST',
        path: '/faq',
        handler: async (request, h) => {
            const faq = request.payload;
            try {
                const res = await db.collection('faq').add(faq);
                return { id: res.id };
            } catch (error) {
                console.error('Error adding FAQ:', error);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    // Route untuk mendapatkan FAQ berdasarkan ID
    server.route({
        method: 'GET',
        path: '/faq/{id}',
        handler: async (request, h) => {
            const faqId = request.params.id;
            try {
                const doc = await db.collection('faq').doc(faqId).get();
                if (!doc.exists) {
                    return h.response({ message: 'FAQ not found' }).code(404);
                }
                return doc.data();
            } catch (error) {
                console.error('Error fetching FAQ:', error);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    // Route untuk mengupdate FAQ berdasarkan ID
    server.route({
        method: 'PUT',
        path: '/faq/{id}',
        handler: async (request, h) => {
            const faqId = request.params.id;
            const faq = request.payload;
            try {
                await db.collection('faq').doc(faqId).update(faq);
                return { message: 'FAQ updated successfully' };
            } catch (error) {
                console.error('Error updating FAQ:', error);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });

    // Route untuk menghapus FAQ berdasarkan ID
    server.route({
        method: 'DELETE',
        path: '/faq/{id}',
        handler: async (request, h) => {
            const faqId = request.params.id;
            try {
                await db.collection('faq').doc(faqId).delete();
                return { message: 'FAQ deleted successfully' };
            } catch (error) {
                console.error('Error deleting FAQ:', error);
                return h.response({ error: 'Internal Server Error' }).code(500);
            }
        }
    });
    
// Route untuk mendapatkan semua tantangan
server.route({
    method: 'GET',
    path: '/api/challenges',
    handler: async (request, h) => {
      try {
        const challengesPath = path.join(__dirname, 'src', 'public', 'data', 'challenges.json');
        const rawData = await fs.readFile(challengesPath, { encoding: 'utf8' });
        const challenges = JSON.parse(rawData);
        return challenges; // Mengembalikan struktur challenges.json yang diperbarui
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Gagal membaca file tantangan' }).code(500);
      }
    }
  });
  
  // Route untuk menambahkan tantangan baru
  server.route({
    method: 'POST',
    path: '/api/challenges',
    handler: async (request, h) => {
      const newChallenge = request.payload;
  
      try {
        const challengesPath = path.join(__dirname, 'src', 'public', 'data', 'challenges.json');
        const rawData = await fs.readFile(challengesPath, { encoding: 'utf8' });
        const challenges = JSON.parse(rawData);
  
        // Mendapatkan tipe tantangan dari payload (daily, weekly, atau base)
        const kind = newChallenge.kind;
  
        // Pastikan tipe tantangan yang dimasukkan ada dalam data challenges
        if (!challenges[kind]) {
          return h.response({ error: `Invalid challenge kind: ${kind}` }).code(400);
        }
  
        // Tambahkan tantangan baru ke dalam array sesuai dengan tipe
        challenges[kind].push(newChallenge);
  
        // Simpan perubahan ke dalam file challenges.json
        await fs.writeFile(challengesPath, JSON.stringify(challenges, null, 2));
  
        return { message: 'Challenge added successfully' };
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Failed to add challenge' }).code(500);
      }
    }
  });
  
  // Route untuk mendapatkan tantangan berdasarkan kind dan nama
  server.route({
    method: 'GET',
    path: '/api/challenges/{name}',
    handler: async (request, h) => {
      const { name } = request.params;
  
      try {
        const challengesPath = path.join(__dirname, 'src', 'public', 'data', 'challenges.json');
        const rawData = await fs.readFile(challengesPath, { encoding: 'utf8' });
        const challenges = JSON.parse(rawData);
  
        // Cari tantangan dengan nama yang cocok
        for (const kind in challenges) {
          const challenge = challenges[kind].find(ch => ch.name === name);
          if (challenge) {
            return challenge;
          }
        }
  
        console.log(`Challenge '${name}' not found in any kind of challenges`);
        return h.response({ error: `Challenge '${name}' not found in any kind of challenges` }).code(404);
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Failed to read challenges file' }).code(500);
      }
    }
  });  
  
// Endpoint untuk mengunggah gambar
server.route({
  method: 'POST',
  path: '/api/upload',
  handler: async (request, h) => {
    try {
      const file = request.payload.image;
      const { name } = request.payload;

      // Log payload yang diterima untuk debug
      console.log('Received payload:', request.payload);
      console.log('Received file:', file);
      console.log('Received name:', name);

      // Pastikan file dan name tersedia dalam payload
      if (!file || !name) {
        return h.response({ error: 'Missing file or name' }).code(400);
      }

      // Validasi tipe file
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.hapi.headers['content-type'])) {
        return h.response({ error: 'Invalid file type. Only JPG, JPEG, and PNG are allowed.' }).code(400);
      }

      console.log('Starting upload process for name:', name);

      // Path folder kegiatan di Firebase Storage
      const activityFolder = `${name}/`;

      // Path file di dalam folder kegiatan
      const filename = `${activityFolder}${Date.now()}${path.extname(file.hapi.filename)}`;

      // File reference untuk penyimpanan di Firebase Storage
      const fileRef = bucket.file(filename);

      // Create write stream options
      const options = {
        gzip: true,
        metadata: {
          contentType: file.hapi.headers['content-type'],
        },
      };

      // Menggunakan stream untuk menulis file ke Firebase Storage
      await new Promise((resolve, reject) => {
        const stream = file.pipe(fileRef.createWriteStream(options));

        // Handle upload completion
        stream.on('finish', async () => {
          try {
            console.log('Upload finished successfully.');

            const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

            // Simpan informasi file (URL) ke Firestore atau database lain jika diperlukan
            // Misalnya: await db.collection('uploads').add({ url: fileUrl, name });

            console.log('File URL saved to Firestore:', fileUrl);
            resolve(); // Resolve promise without any specific value
          } catch (err) {
            console.error('Failed to save file URL to Firestore:', err);
            reject(err); // Reject promise with error
          }
        });

        // Handle errors
        stream.on('error', (err) => {
          console.error('Error uploading image:', err);
          reject(err); // Reject promise with error
        });
      });

      // Return response to client
      return h.response({ message: 'Image uploaded successfully', url: `https://storage.googleapis.com/${bucket.name}/${filename}` }).code(200);

    } catch (err) {
      console.error('Error uploading image:', err);
      return h.response({ error: 'Failed to upload image' }).code(500);
    }
  },
  options: {
    payload: {
      output: 'stream',
      parse: true,
      multipart: true
    }
  }
});

server.route({
  method: 'POST',
  path: '/api/register',
  handler: async (request, h) => {
      const { name, email, password } = request.payload;

      try {
          // Buat pengguna menggunakan email dan password
          const userCredential = await admin.auth().createUser({
              displayName: name,
              email: email,
              password: password
          });

          // Simpan data pengguna ke Firestore
          const userData = {
              uid: userCredential.uid,
              name: name,
              email: email,
              created_at: new Date().toString(),
              points: 0 // Poin default diatur ke 0 saat registrasi
          };
          await db.collection('users').doc(userCredential.uid).set(userData);

          return h.response({ message: `Akun berhasil dibuat untuk ${name}` }).code(200);
      } catch (error) {
          console.error('Error during registration:', error);
          return h.response({ error: 'Gagal membuat akun. Periksa kembali informasi yang dimasukkan.' }).code(500);
      }
  }
});



     // Route untuk menambah poin
     server.route({
      method: 'POST',
      path: '/add-points',
      handler: async (request, h) => {
          const { uid, pointsToAdd } = request.payload;
          const userRef = db.collection('users').doc(uid);
          
          try {
              await db.runTransaction(async transaction => {
                  const userDoc = await transaction.get(userRef);
                  if (!userDoc.exists) {
                      throw new Error('User document does not exist!');
                  }

                  const currentPoints = userDoc.data().points || 0;
                  const newPoints = currentPoints + pointsToAdd;
                  transaction.update(userRef, { points: newPoints });
              });
              return h.response({ status: 'success' }).code(200);
          } catch (error) {
              console.error('Error adding points to Firestore:', error);
              return h.response({ status: 'error', message: error.message }).code(500);
          }
      }
  });

  // Route untuk mendapatkan poin
  server.route({
      method: 'GET',
      path: '/get-points/{uid}',
      handler: async (request, h) => {
          const { uid } = request.params;
          const userRef = db.collection('users').doc(uid);
          
          try {
              const userDoc = await userRef.get();
              if (!userDoc.exists) {
                  throw new Error('User document does not exist!');
              }

              const points = userDoc.data().points || 0;
              return h.response({ points }).code(200);
          } catch (error) {
              console.error('Error getting points from Firestore:', error);
              return h.response({ status: 'error', message: error.message }).code(500);
          }
      }
  });

  // Route untuk menghapus poin
  server.route({
      method: 'POST',
      path: '/delete-points',
      handler: async (request, h) => {
          const { uid } = request.payload;
          const userRef = db.collection('users').doc(uid);
          
          try {
              await db.runTransaction(async transaction => {
                  const userDoc = await transaction.get(userRef);
                  if (!userDoc.exists) {
                      throw new Error('User document does not exist!');
                  }

                  transaction.update(userRef, { points: 0 });
              });
              return h.response({ status: 'success' }).code(200);
          } catch (error) {
              console.error('Error deleting points from Firestore:', error);
              return h.response({ status: 'error', message: error.message }).code(500);
          }
      }
  });
  
  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Fungsi untuk menambah poin (contoh sederhana)
async function addPointsToUser(userId, pointsToAdd) {
  // Implementasikan logika untuk menambah poin ke pengguna
  // Misalnya, update poin di database pengguna
  // Di sini contoh sederhana saja
  const currentPoints = 100; // Ambil poin pengguna dari database
  const updatedPoints = currentPoints + pointsToAdd;
  return updatedPoints;
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
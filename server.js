const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (images etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname))); // for other static files like default images

// Session setup
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true if HTTPS
}));

// MongoDB connection
const uri = "mongodb+srv://unboxingadhi:KNPeTFgwTDnfcPeG@cluster0.tk5nnso.mongodb.net/phinix?retryWrites=true&w=majority&tls=true";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

const dbName = 'phinix';
const collectionName = 'users';

// Setup multer for image uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `profile_${req.session.user.id}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const users = db.collection(collectionName);

    // Signup, login, profile, logout routes (as before)...

    // Upload photo route
    app.post('/upload-photo', upload.single('profilePhoto'), async (req, res) => {
      if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }

      try {
        const imagePath = `/uploads/${req.file.filename}`;

        // Update user document with new profilePic path
        await users.updateOne(
          { _id: new ObjectId(req.session.user.id) },
          { $set: { profilePic: imagePath } }
        );

        // Update session user profilePic too
        req.session.user.profilePic = imagePath;

        res.json({ success: true, profilePic: imagePath });
      } catch (err) {
        console.error('Error saving profile image:', err);
        res.status(500).json({ success: false, message: 'Server error while saving image' });
      }
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB error:', err);
  }
}

run().catch(console.dir);

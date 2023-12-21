import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import Booking from './models/Booking.js';
import User from './models/User.js';
import Place from './models/Place.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from "crypto";
dotenv.config();

const app = express();
const PORT = 8000;
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET || 'your_default_secret';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
   
    useUnifiedTopology: true,
    ssl: true,
}).then(() => {

    console.log(" Database Connected....")
})

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Middleware to get user data from the request
async function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) reject(err);
            resolve(userData);
        });
    });
}

// Cloudinary upload function
async function uploadToCloudinary(path, originalFilename) {
    const result = await cloudinary.uploader.upload(path, {
        folder: 'your_upload_folder',
        public_id: originalFilename,
        resource_type: 'auto',
    });

    return result.secure_url;
}

// Routes...

app.post('/api/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: '/tmp/' + newName,
    });
    const url = await uploadToCloudinary('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
    res.json(url);
});

const photosMiddleware = multer({ dest: '/tmp' });
app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, mimetype } = req.files[i];
        const url = await uploadToCloudinary(path, originalname, mimetype);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
});



app.get('/api/test', (req, res) => {
    res.json('test ok');
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }

});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id
            }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/api/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { email, name, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/api/logout', (req, res) => {
    res.cookie('token', '').json(true);
});




app.post('/api/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description, price,
        perks, extraInfo, checkIn, checkOut, maxGuests,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id, price,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
        });
        res.json(placeDoc);
    });
});

app.get('/api/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});





























app.post('/api/user-places/:placeId', async (req, res) => {
    const placeId = req.params.placeId;
    const ownerIdFromBody = req.body.owner;

    try {
        // Find the place by ID
        const place = await Place.findById(placeId);

        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        // console.log(place.owner);

        // Check if the owner ID from the request body matches the owner of the place
        if (ownerIdFromBody == place.owner.toString()) {
            // If it matches, proceed with deletion
            const deletedPlaceResponse = await Place.findByIdAndDelete(placeId);
            return res.status(200).json({ success: 'Place deleted successfully' });
        } else {
            // If the owner IDs do not match, return an error
            return res.status(403).json({ error: 'Unauthorized: Owner mismatch' });
        }

    } catch (error) {
        // console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});






















app.get('/api/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/api/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
});

app.get('/api/places', async (req, res) => {
    res.json(await Place.find());
});

app.post('/api/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
        user: userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});



app.get('/api/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
});




app.post('/api/placesBooking', (req, res) => {

    // console.log(req.body.amount)
    const key = process.env.KEY_ID;
    let instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    });

    var options = {
        amount: Number(req.body.amount * 100),
        currency: 'INR'
    }

    instance.orders.create(options, (err, order) => {

        if (err) {

            res.status(500).json(" Internal Server Error While Creating Booking ")
        }
        else {
            return res.status(200).json({ order, key });
        }
    })

    // res.status(201).json(Bookings)


})



app.use('/api/verify', (req, res) => {


    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var expectedSignature = crypto.createHmac("sha256", process.env.KEY_SECRET).update(body.toString()).digest('hex');


    if (expectedSignature === req.body.response.razorpay_signature) {

        res.status(200).json("Signature Valid ")
    } else {

        res.status(500).json("Signature Invalid ")
    }


})























app.listen(PORT, () => {
    console.log(`Server Is Running on Port: http://localhost:${PORT} `)
});
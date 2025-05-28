const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Folder to save images (make sure it exists)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });



function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try { 
        const user = await User.findOne({email});
        if(!user || user.password !== password){
            return res.status(401).json({success : false });
        }

        const otp = generateOTP();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = { code: otp, expiresAt: expiry};
        await user.save();

        console.log (`OTP for ${email} : ${otp}`);
        res.json({success : true });
    } catch (err) {
        console.error(err);
        res.status(500).json({success : false });
    }
});

router.post('/verify-otp', async(req, res) =>{
    const {email, otp} =  req.body;

    try {
        const user = await User.findOne({email});
        if(!user || !user.otp || user.otp.code !== otp){
            return res.status(401).json({success : false, message: 'Invalid OTP'});
    }

    const now = new Date();
    if(user.otp.expiresAt < now){
        return res.status(400).json({success: false, message: 'OTP Expired'}); 
    }

    user.otp = undefined;
    await user.save();

    res.json({success: true});
    } catch (err) {
        console.error(err);
        res.status(500).json({success : false});
    }
});

router.post('/user-details', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Convert image buffer to base64 string
    const imageBase64 = user.image?.toString('base64') || null;

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        company: user.company,
        age: user.age,
        dob: user.dob,
        image: imageBase64,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

router.post('/remove-account', async (req, res) => {
  const { email } = req.body;

  try {
    await User.deleteOne({ email });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

router.post('/register', upload.single('image'), async (req, res) => {
  const { name, email, password, company, age, dob } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ success: false, message: 'Image required' });

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

    const user = new User({
      name,
      email,
      password,
      company,
      age,
      dob,
      image: `/uploads/${file.filename}`  
    });

    await user.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;

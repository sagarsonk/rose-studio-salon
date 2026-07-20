const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// MIDDLEWARES - Seamless Stream Configuration (150MB Blocks Active)
app.use(cors());
app.use(express.json({ limit: '150mb' })); 
app.use(express.urlencoded({ limit: '150mb', extended: true }));

// DATABASE CONNECTION
const MONGO_URI = "mongodb://127.0.0.1:27017/rose-salon";
mongoose.connect(MONGO_URI)
  .then(() => console.log("🚀 MERN Salon Engine Connected: Upload Blocks Bypassed Perfectly."))
  .catch(err => console.error("❌ Database Error:", err));

// MONGODB SCHEMAS & MODELS CONFIGURATION
const HomeBanner = mongoose.model('HomeBanner', new mongoose.Schema({ img: String }));
const BridalVideo = mongoose.model('BridalVideo', new mongoose.Schema({ videoUrl: String }));
const HeroConfig = mongoose.model('HeroConfig', new mongoose.Schema({ heroImage: String }));
const Service = mongoose.model('Service', new mongoose.Schema({ title: String, category: String, price: String, duration: String, description: String, image: String }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: String, category: String, price: String, description: String, image: String, badge: String }));

const AboutConfigSchema = new mongoose.Schema({
  aboutImage1: { type: String, default: '' },
  aboutImage2: { type: String, default: '' }
});
const AboutConfig = mongoose.model('AboutConfig', AboutConfigSchema);

// --- 📄 APPOINTMENT BOOKING SCHEMA ---
const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, Completed
  createdAt: { type: Date, default: Date.now }
});
const Appointment = mongoose.model('Appointment', AppointmentSchema);


// ==========================================
// REST SHOWCASE API ENGINE INTEGRATION
// ==========================================

// --- CARDSLIDER DATA TRACK ---
app.get('/api/banners', async (req, res) => {
  try { res.json(await HomeBanner.find()); } catch (err) { res.status(500).json(err); }
});
app.post('/api/banners', async (req, res) => {
  try { res.status(201).json(await new HomeBanner({ img: req.body.img }).save()); } catch (err) { res.status(400).json(err); }
});
app.delete('/api/banners/:id', async (req, res) => {
  try { await HomeBanner.findByIdAndDelete(req.params.id); res.json({ success: true }); } catch (err) { res.status(500).json(err); }
});

// --- BRIDAL VIDEO SHOWCASE DATA TRACK ---
app.get('/api/bridal-video', async (req, res) => {
  try {
    let video = await BridalVideo.findOne();
    if (!video) video = await BridalVideo.create({ videoUrl: '' });
    res.json(video);
  } catch (err) { res.status(500).json(err); }
});
app.post('/api/bridal-video', async (req, res) => {
  try {
    let video = await BridalVideo.findOne();
    if (video) { video.videoUrl = req.body.videoUrl; await video.save(); }
    else { video = await BridalVideo.create({ videoUrl: req.body.videoUrl }); }
    res.status(200).json(video);
  } catch (err) { res.status(400).json(err); }
});

// --- HERO SECTION CANVAS DATA TRACK ---
app.get('/api/hero-config', async (req, res) => {
  try {
    let config = await HeroConfig.findOne();
    if (!config) config = await HeroConfig.create({ heroImage: '' });
    res.json(config);
  } catch (err) { res.status(500).json(err); }
});
app.post('/api/hero-config', async (req, res) => {
  try {
    let config = await HeroConfig.findOne();
    if (config) { config.heroImage = req.body.heroImage; await config.save(); }
    else { config = await HeroConfig.create({ heroImage: req.body.heroImage }); }
    res.status(200).json(config);
  } catch (err) { res.status(400).json(err); }
});

// --- 📡 ABOUT SECTION REST API ROUTES ---
app.get('/api/about-config', async (req, res) => {
  try {
    let config = await AboutConfig.findOne();
    if (!config) {
      config = await AboutConfig.create({ aboutImage1: '', aboutImage2: '' });
    }
    res.json(config);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/about-config', async (req, res) => {
  try {
    let config = await AboutConfig.findOne();
    if (!config) {
      config = new AboutConfig();
    }
    if (req.body.aboutImage1 !== undefined) config.aboutImage1 = req.body.aboutImage1;
    if (req.body.aboutImage2 !== undefined) config.aboutImage2 = req.body.aboutImage2;
    
    await config.save();
    res.status(200).json(config);
  } catch (err) { res.status(400).json({ error: err.message }); }
}); 

// --- SERVICES & INVENTORY SYSTEM MODULES ---
app.get('/api/services', async (req, res) => { res.json(await Service.find()); });
app.post('/api/services', async (req, res) => { res.status(201).json(await new Service(req.body).save()); });
app.delete('/api/services/:id', async (req, res) => { await Service.findByIdAndDelete(req.params.id); res.json({ status: "dropped" }); });
app.get('/api/products', async (req, res) => { res.json(await Product.find()); });
app.post('/api/products', async (req, res) => { res.status(201).json(await new Product(req.body).save()); });
app.delete('/api/products/:id', async (req, res) => { await Product.findByIdAndDelete(req.params.id); res.json({ status: "dropped" }); });

// --- 📡 APPOINTMENT REST API ROUTES ---

// 1. GET: Admin panel ke liye saari appointments fetch karna
app.get('/api/appointments', async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. POST: Frontend form se appointment save karne ke liye
app.post('/api/appointments', async (req, res) => {
  try {
    const newBooking = new Appointment(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 3. PUT: Appointment ka status update karne ke liye (Confirm button ke liye)
app.put('/api/appointments/:id', async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 4. DELETE: Appointment ko cancel/remove karne ke liye
app.delete('/api/appointments/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, status: "removed" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


// 🚨 LISTEN ENGINE ALWAYS AT THE ABSOLUTE END
const PORT = 5000;
app.listen(PORT, () => console.log(`📡 High-Speed Clean Master Server Active on Port: ${PORT}`));
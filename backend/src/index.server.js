const express = require('express');
const env = require('dotenv');
require('dotenv/config');
const app = express();
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData')
const pageRoutes = require('./routes/admin/page')
const path = require('path')
const cors = require('cors')
// invironment variable or you can say constants

env.config();

// mongodb commection 
// mongodb+srv://root:<password>@cluster0.zqaxw.mongodb.net/<dbname>?retryWrites=true&w=majority
require('./helpers/db.js')();
app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/api', pageRoutes)
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', initialDataRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
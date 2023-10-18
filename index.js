require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const inquiryRouter = require('./src/routes/inquiryRouter');
const userRouter = require('./src/routes/userRouter');
const homeRouter = require('./src/routes/homeRouter');
const productRouter = require('./src/routes/productRouter');
const searchRouter = require('./src/routes/searchRouter');
const session = require('express-session');

app.use(session({
  secret: 'your secret key', // これは秘密のキーで、実際のアプリケーションでは適切なものに変更してください
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // 開発環境ではこれをfalseに設定
}))
app.set('view engine', 'ejs');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/inquiries', inquiryRouter);
app.use('/users', userRouter);
app.use('/home', homeRouter);
app.use('/products', productRouter);
app.use('/search', searchRouter);

// エラーハンドリング
app.use((err, req, res, next) => {
  // console.error(err.stack)
  res.status(500).render('./commons/error.ejs', { 
    error: err, 
    naviActive: "", 
    title: "エラーが発生しました。", 
    userData: req.session.userData 
  });
})

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

module.exports = app;
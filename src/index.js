require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const inquiryRouter = require('./routes/inquiry');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
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
app.use('/user', userRouter);
app.use('/home', homeRouter);

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('./commons/error.ejs', { error: err, naviActive: "" });
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
});

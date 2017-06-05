// Modules
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';

// Helpers
import verifyRequestSignature from './helpers/verifyRequestSignature';
import normalizePort from './helpers/normalizePort';

// Routes
import index from './routes/index';
import webhooks from './routes/webhooks';

// Messenger Setup
import ThreadSetup from './api-helpers/thread-setup';

const app = express();
// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Static assets
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));
// Parsers
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());
// Logger
app.use(logger('dev'));
// Routes
app.use('/', index);
app.use('/webhook', webhooks);
// Error
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.state = 404;
  next(err);
});
app.use(function(err, req, res) {
  // set locals, only providing eror in developement
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Get the port from environment and store in Express
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
// Messenger Setup
ThreadSetup.setGetStarted();
// Port setup
app.listen(app.get('port'), () => {
  console.log(`Node app is running on port ${app.get('port')}`);
});
export default app;

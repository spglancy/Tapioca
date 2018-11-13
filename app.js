const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const config = require('./config.js');
const fileUpload = require('express-fileupload');
const commentController = require('./controllers/commentController');
const postController = require('./controllers/postController');

app.use(express.static(__dirname + '/public'));
app.use(express.static('uploads'))

mongoose.connect( config.mongoURL, { useNewUrlParser: true })
.catch(err =>{
    throw err;
})

/**
 * Configuring bodyparser.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(fileUpload());

app.use('/', postController);

app.get('*', function (req, res) {
	res.send({
		message: 'This endpoint does not exist',
		error: 404,
	}, 404);
});

/**
 * Starting application on configured port.
 */
app.listen(config.port, () => {
	console.log(`Application is running on: ${config.port}`);
});

module.exports = app;

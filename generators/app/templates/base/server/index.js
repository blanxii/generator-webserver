<% if(options.templateEngine === true){ %>
import expressNunjucks from 'express-nunjucks';
<% } %>
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import Path from 'path';
import middleware from './middleware';
import baseRoutes from './routes/baseRoutes';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(compression());
app.use('/', baseRoutes);

<% if(options.templateEngine === true){ %>
app.set('views', Path.join(__dirname, '..', 'client', 'templates'));
app.use(express.static(Path.join(__dirname, '..', 'client', 'public'), { maxage: '31d' }));

expressNunjucks(app, {
    watch: process.env.NODE_ENV === 'development' ? true : false,
    noCache: process.env.NODE_ENV === 'development' ? true : false
});
<% } %>
app.listen(PORT, () => {
	console.log(`Server listen on port ${PORT}`);
});

import express from 'express';
import compression from 'compression';
import cors from 'cors';
import middleware from './middleware';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(compression());

app.listen(PORT, () => {
	console.log(`Server listen on port ${PORT}`);
});

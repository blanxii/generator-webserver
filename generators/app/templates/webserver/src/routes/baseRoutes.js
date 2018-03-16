import express from 'express';
import container from '../container';

const router = express.Router();

const indexController = container.get('indexController');
router.get('/', indexController.handle.bind(indexController));

export default router;

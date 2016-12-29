import container from '../container';
import express from 'express';
const router = express.Router();

const indexController = container.get('indexController');
router.get('/', indexController.handle.bind(indexController));

export default router;

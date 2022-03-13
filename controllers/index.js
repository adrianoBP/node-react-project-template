import { Router } from 'express';
import sampleController from './sample.controller.js';

const router = new Router();

router.use('/sample', sampleController);

export default router;

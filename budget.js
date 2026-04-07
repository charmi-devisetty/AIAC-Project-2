const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getBudget, setBudget } = require('../controllers/budgetController');

router.get('/', auth, getBudget);
router.post('/', auth, setBudget);

module.exports = router;

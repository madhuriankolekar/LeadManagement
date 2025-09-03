const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { validateLead } = require('../middleware/validateRequest');



router.post('/', validateLead, leadController.createLead);



router.get('/', leadController.listLeads);



router.get('/:id', leadController.getLead);



router.put('/:id', validateLead, leadController.updateLead);


//delete
router.delete('/:id', leadController.deleteLead);


module.exports = router;
const { Router } = require('express');

const ReportsController = require('./controller/reportsController');
const InventoryPolicyController = require('./controller/inventoryPolicyController');
const routes = Router();

routes.get('/reports/list', ReportsController.index);
routes.post('/reports/list', ReportsController.createList);
routes.put('/reports/update', ReportsController.update);
routes.put('/policy/update', InventoryPolicyController.update);
routes.post('/policy', InventoryPolicyController.create);
routes.get('/policy', InventoryPolicyController.index);

module.exports= {routes}
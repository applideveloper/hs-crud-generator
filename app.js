var issueController = require('./controllers/issue');

app.get('/issue/',issueController.index);
app.get('/issue/new',issueController.new);
app.post('/issue/',issueController.create);
app.get('/issue/:id',issueController.show);
app.get('/issue/:id/edit',issueController.edit);
app.post('/issue/:id',issueController.update);
app.delete('/issue/:id',issueController.destroy);var issueController = require('./controllers/issue');

app.get('/issue/',issueController.index);
app.get('/issue/new',issueController.new);
app.post('/issue/',issueController.create);
app.get('/issue/:id',issueController.show);
app.get('/issue/:id/edit',issueController.edit);
app.post('/issue/:id',issueController.update);
app.delete('/issue/:id',issueController.destroy);var issueController = require('./controllers/issue');

app.get('/issue/',issueController.index);
app.get('/issue/new',issueController.new);
app.post('/issue/',issueController.create);
app.get('/issue/:id',issueController.show);
app.get('/issue/:id/edit',issueController.edit);
app.post('/issue/:id',issueController.update);
app.delete('/issue/:id',issueController.destroy);var carController = require('./controllers/car');

app.get('/car/',carController.index);
app.get('/car/new',carController.new);
app.post('/car/',carController.create);
app.get('/car/:id',carController.show);
app.get('/car/:id/edit',carController.edit);
app.post('/car/:id',carController.update);
app.delete('/car/:id',carController.destroy);
var issueController = require('./controllers/issue');

app.get('/issue/',issueController.index);
app.get('/issue/new',issueController.new);
app.post('/issue/',issueController.create);
app.get('/issue/:id',issueController.show);
app.get('/issue/:id/edit',issueController.edit);
app.post('/issue/:id',issueController.update);
app.delete('/issue/:id',issueController.destroy);
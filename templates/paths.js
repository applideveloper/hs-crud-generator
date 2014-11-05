var <model>Controller = require('./controllers/<model>');

app.get('/<model>/',<model>Controller.index);
app.get('/<model>/new',<model>Controller.new);
app.post('/<model>/',<model>Controller.create);
app.get('/<model>/:id',<model>Controller.show);
app.get('/<model>/:id/edit',<model>Controller.edit);
app.post('/<model>/:id',<model>Controller.update);
app.delete('/<model>/:id',<model>Controller.destroy);
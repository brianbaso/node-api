var ObjectID = require('mongodb').ObjectID

// app is express instance
module.exports = function(app, db) {

	// Create
	app.post('/notes', (req, res) => {
		
		const note = { text: req.body.body, title: req.body.title };

		db.collection('notes').insert(note, (err, result) => {
			if (err)
				res.send({'error': 'An error has occured'});
			else
				res.send(result.ops[0]);
		});

	});

	// Read
	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;

		const details = {'_id': new ObjectID(id) };

		db.collection('notes').findOne(details, (err, item) => {
			if (err)
				res.send({'error': 'An error has occured'});
			else
				res.send(item);
		})
	})

	// Update
	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;

		const details = {'_id': new ObjectID(id) };

		const note = { text: req.body.body, title: req.body.title };

		db.collection('notes').update(details, note, (err, item) => {
			if (err)
				res.send({'error': 'An error has occured'});
			else
				res.send(item);
		})
	})

	// Destroy
	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;

		const details = {'_id': new ObjectID(id) };

		db.collection('notes').remove(details, (err, item) => {
			if (err)
				res.send({'error': 'An error has occured'});
			else
				res.send('Note ' + id + ' has been deleted.');
		})
	})
};
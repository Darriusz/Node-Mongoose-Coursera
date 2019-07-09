const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
	console.log("connected to server");

	var newDish = Dishes({
		name: 'Pizza Hawajska',
		description: 'szynka, banany, curry'
	});

	newDish.save();

		newDish = Dishes({
		name: 'Pizza San Francisco',
		description: 'szynka, pieczarki'
	});
	newDish.save();

		newDish = Dishes({
		name: 'Pizza Siciliana',
		description: 'szynka, bazylia, oliwki'
	});

	newDish.save()
		.then((dish) => {
			// console.log(dish);

			return Dishes.find({});

		})
		.then((dishes) => {
			console.log("Dishes in the db: ", dishes);

			return Dishes.deleteMany({});
		})
		.then (() => {
			console.log("The list is empty, dishes deleted");
			return mongoose.connection.close();
		})
		.catch((err) => {
			console.log(err);
		});
});
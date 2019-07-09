const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
	console.log("connected to server");

	// var newDish = Dishes({   //changed for Dishes.create
	// 	name: 'Pizza Hawajska',
	// 	description: 'szynka, banany, curry'
	// });
	// newDish.save()

	Dishes.create({
		name: 'Pizza Sycylijska',
		description: 'szynka, pesto, salami'
	})
	.then((dish) => {
			console.log(dish);

		return Dishes.findByIdAndUpdate(dish._id, 
			{$set: {description: 'Updated test'}},
			{
			new: true  //this is to return the updated item to us
		}).exec();

	})
	.then((dish) => {
		console.log("The dish is: ", dish);

		dish.comments.push({
			rating: 5,
			comment: 'Very good!',
			author: 'Leonard'
		});

		return dish.save();
	})
	.then((dish) => {
		console.log(dish);
	
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
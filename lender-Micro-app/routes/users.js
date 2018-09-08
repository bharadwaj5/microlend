var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var sha256 = require('sha256');
var fetch = require("node-fetch");

var User = require('../models/user');

// Register
router.get('/register', function (req, res) {
	res.render('register');
});

// Login
router.get('/login', function (req, res) {
	res.render('login');
});

// Loan
router.get('/loan', function(req, res) {
	res.render('loan');
});

// Dashboard
router.get('/dashboard', function(req, res) {
	res.render('dashboard');
});

// Proposal
router.get('/proposal', function(req, res) {
	res.render('proposal');
});

// Urgamt
router.get('/urgamt', function(req, res) {
	res.render('urgamt');
});

// FAQ
router.get('/faq', function(req, res) {
	res.render('faq');
});

// Deposit
router.get('/ldeposit', function(req, res) {
	res.render('ldeposit');
});

// Urgamt submission
router.post('/ldeposit', function(req, res) {
	var amount = req.body.amount;
	var lid = req.body.lid;

	req.checkBody('lid', 'Your ID is required').notEmpty();
	req.checkBody('amount', 'Amount is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('ldeposit', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.lenderDeposit";

		var jsonObj = {
			"$class": "test.lenderDeposit",
			"lac": "resource:test.lAccount#" + lid,
			"Amount": Number(amount)
		  }

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1;
	res.render('ldeposit', {
		test: test
	});
});

// Urgamt submission
router.post('/urgamt', function(req, res) {
	var detail = req.body.detail;
	var lid = req.body.lid;
	var bid = req.body.bid;
	var amount = req.body.amount ;

	req.checkBody('detail', 'Detail is required').notEmpty();
	req.checkBody('lid', 'Your ID is required').notEmpty();
	req.checkBody('bid', 'Borrower ID is required').notEmpty();
	req.checkBody('amount', 'Amount is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('urgamt', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.urgamt";

		var jsonObj = {
			"$class": "test.urgAmt",
			"Description1": detail,
			"lendId": "resource:test.lAccount#" + lid,
			"Id3": "resource:test.bAccount#" + bid,
			"amount1": Number(amount)
		  }

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1;
	res.render('urgamt', {
		test: test
	});
});

// Proposal submission
router.post('/proposal', function(req, res) {
	var detail = req.body.detail;
	var lid = req.body.lid;
	var bid = req.body.bid;
	var rate = req.body.rate ;

	req.checkBody('detail', 'Detail is required').notEmpty();
	req.checkBody('lid', 'Your ID is required').notEmpty();
	req.checkBody('bid', 'Borrower ID is required').notEmpty();
	req.checkBody('rate', 'Rate is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('proposal', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.lendproposal";

		var jsonObj = {
			"$class": "test.lendproposal",
			"detail": detail,
			"lac": "resource:test.lAccount#" + lid,
			"bac": "resource:test.bAccount#" + bid,
			"rate": Number(rate)
		  }

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1;
	res.render('proposal', {
		test: test
	});
});

// Loan validation
router.post('/loan', function(req, res) {
	var description = req.body.description;
	var id = req.body.id;
	var bid = req.body.bid;
	var amount = req.body.amount;
	var rate = req.body.rate;
	var duedate = req.body.duedate;
	var n = req.body.n;
	var type = req.body.type;

	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('id', 'ID is required').notEmpty();
	req.checkBody('bid', 'Borrower ID is required').notEmpty();
	req.checkBody('rate', 'Rate is required').notEmpty();
	req.checkBody('id', 'ID is required').notEmpty();
	req.checkBody('n', 'n is required').notEmpty();
	req.checkBody('duedate', 'Duedate is required').notEmpty();
	req.checkBody('type', 'Type required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('loan', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.loan";

		var jsonObj = {
			"$class": "test.loan",
			"Description": description ,
			"lendId": "resource:test.lAccount#" + id,
			"Id": "resource:test.bAccount#" + bid,
			"amount": Number(amount),
			"rate": Number(rate),
			"duedate": Number(duedate),
			"n": Number(n),
			"type": type
		  }

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var loan = 1;
	res.render('loan', {
		loan: loan
	});
});

// Register User
router.post('/register', function (req, res) {
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var contact = req.body.contact;
	var hno = req.body.hno;
	var street = req.body.street;
	var city = req.body.city;
	var pin = req.body.pin;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('firstname', 'firstName is required').notEmpty();
	req.checkBody('lastname', 'lastName is required').notEmpty();
	req.checkBody('contact', 'Contact number is required').notEmpty();
	req.checkBody('hno', 'House-number is required').notEmpty();
	req.checkBody('street', 'Street is required').notEmpty();
	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('pin', 'PINCODE is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: firstname,
						email: email,
						username: username,
						password: password
					});

					var url1 = "http://localhost:3000/api/test.borrower";
					var url2 = "http://localhost:3000/api/test.lender";
					var url3 = "http://localhost:3000/api/test.bAccount";
					var url4 = "http://localhost:3000/api/test.lAccount";
					hash = sha256(email);
					var id1 = hash.substring(0,5);

					var jsonObj1 = {
						"$class": "test.borrower",
						"bId": id1,
						"firstName": firstname,
						"lastName": lastname,
						"Phno": Number(contact),
						"mailid": email,
						"address": {
							"$class": "test.Address",
							"Address": "DO",
							"Dno": hno,
							"Street": street,
							"City": city,
							"pin": Number(pin)
						}
					}
					var Obj1 = JSON.stringify(jsonObj1);
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.open("POST", url1, false);
					xmlhttp.setRequestHeader("Content-Type", "application/json");
					xmlhttp.send(Obj1);

					var jsonObj2 = {
						"$class": "test.lender",
						"lenId": id1,
						"Firstname": firstname,
						"Lastname": lastname,
						"phno": Number(contact),
						"mailId": email
					}
					var Obj2 = JSON.stringify(jsonObj2);
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.open("POST", url2, false);
					xmlhttp.setRequestHeader("Content-Type", "application/json");
					xmlhttp.send(Obj2);

					var jsonObj3 = {
							"$class": "test.bAccount",
							"accId": id1,
							"iD": "resource:test.borrower#" +String(id1),
							"amt": 0,
							"industry": "Sample industry",
							"Company": "sample company",
							"domainAddress": "www.xyz.com",
							"lamnt": 0,
							"emiamt": 0,
							"rate": 0,
							"duedate": 0,
							"n": 0,
							"type": " ",
							"desc": " ",
							"exp": 0,
							"rd": 0,
							"sal": 0,
							"adv": 0,
							"oth": 0,
							"cnt": 0,
							"cibil": 0
					}
					var Obj3 = JSON.stringify(jsonObj3);
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.open("POST", url3, false);
					xmlhttp.setRequestHeader("Content-Type", "application/json");
					xmlhttp.send(Obj3);

					var jsonObj4 = {
						"$class": "test.lAccount",
						"Accid": id1,
						"Id5": "resource:test.lender#" + String(id1),
						"amt1": 0,
						"count": 0,
						"msg": " ",
						"assetId": " ",
						"tlmnt": 0
					}
					var Obj4 = JSON.stringify(jsonObj4);
					
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.open("POST", url4, false);
					xmlhttp.setRequestHeader("Content-Type", "application/json");
					xmlhttp.send(Obj4);

					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});

         	req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/users/login');
				}
			});
		});
	}
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});

router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
	});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
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

// Proposal
router.get('/proposal', function (req,res) {
	res.render('proposal');
});

// Retrieve
router.get('/retrieve', function(req, res) {
	res.render('retrieve');
});

// Manage account
router.get('/manage', function(req, res) {
	res.render('manage');
});

// Dashboard
router.get('/dashboard', function(req, res) {
	res.render('dashboard');
});

// Message
router.get('/message', function(req, res) {
	res.render('message');
});

// FAQ
router.get('/faq', function(req, res) {
	res.render('faq');
});

// EMI
router.get('/emi', function(req, res) {
	res.render('emi');
});

// Collateral
router.get('/collateral', function(req, res) {
	res.render('collateral');
});

// Cibil
router.get('/cibil', function(req, res) {
	res.render('cibil');
});

// Deposit
router.get('/bdeposit', function(req, res) {
	res.render('bdeposit');
});

// Submitting Deposit
router.post('/bdeposit', function(req, res) {
	var bid = req.body.bid;
	var amount = req.body.amount;

	req.checkBody('bid', 'Your ID is required').notEmpty();
	req.checkBody('amount', 'Amount is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('bdeposit', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.borrowerDeposit";

		var jsonObj = {
			"$class": "test.borrowerDeposit",
			"bac": "resource:test.bAccount#" + bid,
			"Amount": Number(amount)
		}

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
			res.render('bdeposit', {
				test: test
			});
});

// Submitting CIBIL
router.post('/cibil', function(req, res) {
	var bid = req.body.bid;
	var cibil = req.body.cibil;

	req.checkBody('bid', 'Your ID is required').notEmpty();
	req.checkBody('cibil', 'CIBIL score is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('cibil', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.cibilsc";

		var jsonObj = {
			"$class": "test.cibilsc",
			"bac": "resource:test.bAccount#" + bid,
			"cibil": cibil
		}

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
			res.render('cibil', {
				test: test
			});
});

// Submitting EMI
router.post('/emi', function(req, res) {
	var bid = req.body.bid;
	var lid = req.body.lid;

	req.checkBody('bid', 'Your ID is required').notEmpty();
	req.checkBody('lid', 'Lender ID is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('emi', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.emi";

		var jsonObj = {
			"$class": "test.emi",
			"bac": "resource:test.bAccount#" + bid,
			"lac": "resource:test.lAccount#" + lid
		}

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
			res.render('emi', {
				test: test
			});
});

// Submitting Collateral
router.post('/collateral', function(req, res) {
	var bid = req.body.bid;
	var lid = req.body.lid;
	var assetid = req.body.assetid;

	req.checkBody('bid', 'Your ID is required').notEmpty();
	req.checkBody('lid', 'Lender ID is required').notEmpty();
	req.checkBody('assetid', 'Asset ID is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('collateral', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.colateral";

		var jsonObj = {
			"$class": "test.colateral",
			"bac": "resource:test.bAccount#" + bid,
			"lac": "resource:test.lAccount#" + lid,
			"assetId": assetid
		}

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
	res.render('collateral', {
		test: test
	});
});

// Submitting message
router.post('/message', function(req, res) {
	var bid = req.body.bid;
	var lid = req.body.lid;

	req.checkBody('bid', 'Your ID is required').notEmpty();
	req.checkBody('lid', 'Lender ID is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('message', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.message";

		var jsonObj = {
			"$class": "test.message",
			"bac": "resource:test.bAccount#" + bid,
			"lac": "resource:test.lAccount#" + lid
		}

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
	res.render('message', {
		test: test
	});
});

// Submitting proposal
router.post('/proposal', function(req, res) {
	var description = req.body.description;
	var id = req.body.id;
	var amount = req.body.amount;
	var duration = req.body.duration;

	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('id', 'ID is required').notEmpty();
	req.checkBody('amount', 'Amount is required').notEmpty();
	req.checkBody('duration', 'Duration is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('proposal', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.Proposal";

		var jsonObj = {
			"$class": "test.Proposal",
			"description": description,
			"Id": "resource:test.bAccount#" + id,
			"amnt": Number(amount),
			"dur": Number(duration)
		}

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
			res.render('proposal', {
				test: test
			});
});

// Retrieval 

router.post('/retrieve', function(req, res) {
	var description = req.body.description;
	var id = req.body.id;
	var lid = req.body.lid;

	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('id', 'ID is required').notEmpty();
	req.checkBody('lid', 'Lender\'s required').notEmpty();
	

	var errors = req.validationErrors();

	if(errors) {
		res.render('retrieve', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.retrieve";

		var jsonObj = {
			"$class": "test.retrieve",
			"statement": description,
			"lAc": "resource:test.lAccount#" + id,
			"bAc": "resource:test.bAccount#" + lid
		  }
		  

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
			res.render('retrieve', {
				test: test
			});
});

// Manage

router.post('/manage', function(req, res) {
	var bid = req.body.bid;
	var exp = req.body.exp;
	var rd = req.body.rd;
	var sal = req.body.sal;
	var adv = req.body.adv;
	var oth = req.body.oth;

	req.checkBody('bid', 'Your ID is required').notEmpty();
	req.checkBody('exp', 'Expenditures is required').notEmpty();
	req.checkBody('rd', 'R&D required').notEmpty();
	req.checkBody('sal', 'Salary is required').notEmpty();	
	req.checkBody('adv', 'Advertisement is required').notEmpty();	
	req.checkBody('oth', 'Others is required').notEmpty();	

	var errors = req.validationErrors();

	if(errors) {
		res.render('manage', {
			errors: errors
		});
	} else {
		var url = "http://localhost:3000/api/test.accountManage";

		var jsonObj = {
			"$class": "test.accountManage",
			"bac": "resource:test.bAccount#" + bid,
			"exp": Number(exp) ,
			"rd": Number(rd) ,
			"sal": Number(sal),
			"adv": Number(adv),
  			"oth": Number(oth)
		}		  

		var Obj = JSON.stringify(jsonObj);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(Obj);
	}
	var test = 1
			res.render('manage', {
				test: test
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
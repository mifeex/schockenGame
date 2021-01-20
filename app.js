const express = require('express');
const app = require("https-localhost")()

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql2');
const nodemailer = require('nodemailer')

const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));

const bcrypt = require('bcrypt');
const saltRounds = 10;

const config = require('./routes/connection');
const pool = mysql.createPool(config);

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
	name: 'DevOoops',
    secret: 'justKitten',
    resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: true
	}
}));

let name = '';

class Database {
	constructor(config) {
		this.connection = mysql.createConnection(config);
	}

	query = (sql, args) => {
		return new Promise((resolve, reject) => {
			this.connection.query( sql, args, (err, results) => {
				if (err)
					return reject(err);
					resolve(results);
			});
		});
	}

	close = () => {
		return new Promise((resolve, reject) => {
			this.connection.end(err => {
				if (err)
					return reject(err);
					resolve();
			});
		});
	}
}

const sendEmail = async (username, email) => {
    let transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sportscardchat.com@gmail.com',
            pass: 'Chickenfootsoup#121!'
        }
    });

    // Step 2
    let mailOptions = {
        from: 'sportscardchat.com@gmail.com',
        to: `${email}`,
        subject: 'New user',
        text: `Well cum`,
        html: `<div>
                    <h3>Hello, ${username}</h3>
                    <div>Today you try to reset your password!
                        If you still want to change you password use this <a>
                            link
                        </a>
                    </div>
                    <div>If you don't try to reset your password <strong>ignore this message</strong></div>
                </div>`,
    };

    // Step 3
    await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs');
        }
        else {
            codeForReser.push(resetValueObj)
            console.log(checkCode)
            return res.json({checkCode});
        }
    });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/api.html');
})

app.get('/auth/me', (req, res, next) => { // проверка залогинен ли пользователь socket.io get запрос
	if (req.session.userId === undefined || req.session.username === undefined) {

		resultCode = false;
		res.json({resultCode, authError: `userId or email undefined. Please try to logout and login again`})
	}
	else {
		res.json({resultCode, userId: req.session.userId, email: req.session.username})
	}
})

app.post('/user/register', (req, res, next) => { // регистрация, fetch post запрос
	
	const data = req.body;
	const DB = new Database(config)

	let username = '';
	let password = '';
	let email = '';
	let isStay = false;

	for(let key in data) {
		username = data.username;
		email = data.email
		password = data.password;

		if (data[key].isStay !== undefined && data[key].isStay !== null) {
			isStay = data[key].isStay
		}
	}
	pool.getConnection((error, connection) => {
		connection.query(`SELECT * FROM user WHERE username='${username}' OR email='${email}'`, (err, result) => {
			if (err) {
				resultCode = 1
				return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
			}
			
			if (result === undefined || result.length < 1) { // if user not register
				
				bcrypt.hash(password, saltRounds, function(err, hash) {
					if (err) {
						resultCode = 1
						return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
					}

					else {
						connection.query(`INSERT INTO user(username, email, password, gameNumber) 
									VALUES ('${username}', '${email}', '${hash}', 0)`, 
						(err, result2) =>{
							if (err) {
								console.log(err)
								resultCode = 1;
								return res.status(500).json({resultCode, errorFromServer: `Something go wrong: ${err}!`})
							}

							else { //if everything "ok"
								resultCode = 0;

								isStay ? req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 60 : req.session.cookie.maxAge = 1000 * 60 * 60 * 24

								req.session.userId = result2.insertId;
								req.session.username = username;
								
								// sending email to new registered user
								sendEmail(username, email)

								return res.json({
									resultCode,
									userId: req.session.userId,
									email: req.session.username
								});
							}

						})
						pool.end()
					}
				});
			}

			else {
				resultCode = 1
				return res.json({resultCode, error: `This username or email already !exists!`})
			}
		})
		connection.release();
	})
})

app.post('/user/login', (req, res, next) => { // логин fetch post запрос, проходит по email'у

	const data = req.body;
	const DB = new Database(config)

	let password = '';
	let email = '';
	let isStay = false;

	for(let key in data) {
		email = data.email
		password = data.password;

		if (data[key].isStay !== undefined && data[key].isStay !== null) {
			isStay = data[key].isStay
		}
	}

	DB.query(`SELECT * FROM user WHERE email='${email}'`)
	.then((results, err) => {
		if (err) {
			resultCode = 1;
			return res.json({error: `Error: ${err}`, resultCode})
		}

		if (results.length < 1) {
			resultCode = 1;
			return res.json({error: `Error: email is ${err}`, resultCode})
		}

		for(let key in results) {
			bcrypt.compare(password, results[key].password, (err, result) => {
				if (result) { //if everythink "ok" auth user and save data in cookie
					resultCode = 0;

					isStay ? req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 60 : req.session.cookie.maxAge = 1000 * 60 * 60 * 24

					req.session.userId = results[key].id;
					req.session.username = results[key].username;

					res.json({
						resultCode,
						userId: req.session.userId,
						email: req.session.username
					});

					return DB.close();
				}

				resultCode = 1;
				res.json({error: `Invalid password! Password is ${err}`, resultCode});
				return DB.close();
			});
		}
	})
})

app.get('/user/logout', (req, res, next) => { // разлогинизация fetch get запрос
	req.session.destroy(err => {
		res.json('logged out');
	});
});

app.get('/game/create/:id', (req, res) => {
	const username = req.session.username;
	let random = Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(10, 15)));
	const DB = new Database(config)

	DB.query(`SELECT * FROM room WHERE creator=${req.params.id}`)
	.then(result => {
		console.log(result.length);
		if (result === undefined || result.length === 0) {
			return DB.query(`INSERT INTO room(game_id, creator) values('${random}', ${req.params.id})`);
		}
		else {
			resultCode = 1;
			res.json({resultCode, errorFromServer: `You already create a game!`});
			return DB.close();
		}
	})
	.then(result => {
		return DB.query(`UPDATE user SET gameNumber=${result.insertId} WHERE id=${req.params.id}`);
	})
	.then(result => {
		res.json({status: 'ok', gameCode: random});
		return DB.close();;
	});
});

app.get('/game/start/:id', (req, res) => {
	const DB = new Database(config)

	DB.query(`SELECT * FROM user WHERE gameNumber=${req.params.id}`)
	.then(result => {
		if(result.length >= 2) {
			res.json({start: 1});
			return DB.close();
		}
		else {
			resultCode = 1;
			res.json({errorFromServer: 'There are must be more than 2 players'});
			return DB.close();
		}
	})
})

io.on('connection', (socket) => {
	const DB = new Database(config)
	
	socket.on('/game/enter', (userId, gameId) => {
		// if (req.session.userId !== '' && req.session.userId !== null && req.session.userId !== undefined) {
			return DB.query(`SELECT * FROM user WHERE id=${userId}`)
			.then(result => {
				if (result === undefined || result.length === 0) {
					return socket.emit('error', {errorFromServer: 'User is undefined'});
				}

				name = result[0].username;
				console.log(name)
				return DB.query(`SELECT id FROM room WHERE game_id='${gameId}'`)
			})
			.then(result => {
				if (result === undefined || result.length === 0) {
					return socket.emit('error', {errorFromServer: 'Game id is undefined'});
				}
				console.log(name + ' what?')
				return DB.query(`UPDATE user SET gameNumber=${result.insertId} WHERE id=${userId}`)
			})
			.then(result => {
				if(result) {
					socket.emit('enter', name);
					return DB.close();
				}

				return DB.close();
			})
		// }

		// return res.json({errorFromServer: 'User is undefined'});
	})
	
});

server.listen(8080, () => {
    console.log('Listening on port 8000');
});
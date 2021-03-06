const sha256 = require('js-sha256');
const SALT = sha256("kebab");
module.exports = (dbPoolInstance) => {

    const insertOrders = (userId, packageId, orderDetails, callback) => {
        console.log(userId)

        const gamesArray = orderDetails.games_id
        const insertQuery = 'INSERT INTO orders (users_id, packages_id, one_games_id, two_games_id, three_games_id, four_games_id, duration, date, time, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';

        const values = [userId, packageId, gamesArray[0], gamesArray[1], gamesArray[2], gamesArray[3], , orderDetails.date, orderDetails.time, orderDetails.address]

        dbPoolInstance.query(insertQuery, values, (err, results) => {
            callback(err, results);
        })
    };  // end of insert orders

    const getAllOrders = (callback) => {
        const allOrdersQuery = `SELECT orders.id, users.username, users.email, users.contact_num, packages.name, orders.duration, orders.date, orders.time, orders.address
            FROM orders
            INNER JOIN users
            ON orders.users_id = users.id
            INNER JOIN packages
            ON orders.packages_id = packages.id
            ORDER BY orders.id`;

        dbPoolInstance.query(allOrdersQuery, (err, results) => {
            callback(err, results);
        })
    }  // end of get all orders


    const getAllOrderGames = (callback) => {
        const gamesQuery = `SELECT orders.id, games.name
            FROM orders
            INNER JOIN games
            ON orders.one_games_id = games.id
            OR orders.two_games_id = games.id
            OR orders.three_games_id = games.id
            OR orders.four_games_id = games.id
            ORDER BY orders.id`;

        dbPoolInstance.query(gamesQuery, (err, results) => {
            callback(err, results);
        })
    }  // end of get my games


    // get member orders // separate others and games
    const myOrders = (userId, callback) => {
        const orderQuery = `SELECT orders.id, packages.name, orders.date, orders.time, orders.duration, orders.address
            FROM orders
            INNER JOIN packages
            ON orders.packages_id = packages.id
            WHERE orders.users_id = '${userId}'
            ORDER BY orders.id`;

        dbPoolInstance.query(orderQuery, (err, results) => {
            callback(err, results);
        })
    }  // end of myOrders


    const getMyGames = (userId, callback) => {
        const gamesQuery = `SELECT orders.id, games.name
            FROM orders
            INNER JOIN games
            ON orders.one_games_id = games.id
            OR orders.two_games_id = games.id
            OR orders.three_games_id = games.id
            OR orders.four_games_id = games.id
            WHERE orders.users_id = '${userId}'
            ORDER BY orders.id`;

        dbPoolInstance.query(gamesQuery, (err, results) => {
            callback(err, results);
        })
    }  // end of get my games


  return {
    insertOrders,
    getAllOrders,
    getAllOrderGames,
    myOrders,
    getMyGames
  };
};
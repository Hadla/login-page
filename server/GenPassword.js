const bcrypt = require('bcrypt');

let password = bcrypt.hashSync('12345', 9);
console.log('PASSWORD LOG: ', password);

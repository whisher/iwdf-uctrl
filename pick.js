var webshot = require('webshot');

webshot('http://localhost:3000/#!/wrench', 'google.png', function(err) {
  // screenshot now saved to google.png
});
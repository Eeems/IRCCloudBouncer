global.IRCCloud = require('./lib/irccloud.js');
global.irc = new IRCCloud();

require('repl').start({
	useGlobal: true
});
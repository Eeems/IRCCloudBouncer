var hotswap = require('hotswap'),
	extend = require('extend'),
	IRCCloud = require('./lib/irccloud.js'),
	irc = new IRCCloud(),
	swap = function(){
		if(irc.session){
			var s = irc.session;
			irc.delete();
			irc = new IRCCloud(s);
		}else if(irc.delete){
			irc.delete();
			irc = new IRCCloud();
		}
		extend(global,{
			IRCCloud: IRCCloud,
			irc: irc
		});
	};
hotswap.configure({
	watch: true,
	autoreload: true
});
hotswap.on('swap',function(module){
	console.log('Hot swapped '+module);
});
hotswap.on('error',function(e){
	console.error(e);
});

hotswap.on('swap',swap);

swap();

require('repl').start({
	useGlobal: true
});
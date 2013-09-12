/**
 * config.js
 */

exports.config = {
	cookieSecret: 'microblog',
	db: 'node-microblog',
	host: 'localhost',
	settings: {
		port: 4000
	},
	footer: [
		{
			text: 'ChangeLog',
			href: '/log'
		},
		{
			text: '反馈',
			href: '/feedback'
		},
		{
			text: '源码',
			href: 'https://github.com/hankewins/microblog'
		}
	]
};


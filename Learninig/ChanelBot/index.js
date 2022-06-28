
const CHAT_ID = '-1001518703810'
const { Telegraf } = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
const axios = require('axios').default;
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const translate = async (...args) => {
	let result = "loading";
	try {
		
		const response = await axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate', 
		{"folderId":"b1g517b5avna1jih0mcc", "texts":`${args}`, "targetLanguageCode":"ru"}, 
		{
			headers: {
				Accept: 'application/jspn',
				Authorization:'Bearer t1.9euelZqenZqOnpjLypWbx4yYkJmXzO3rnpWanMqTmJPMmM2JnsuYjY6NxpPl8_caMF5q-e9OLCxA_t3z91peW2r5704sLED-.AB34SkyBraTLsL9KKlqA5g6v9h4KNnYA3xEhVpVXPBH36CwrxWlwNheCFAxM7PhZQfrAv1zhMuHZXq7vRoAFBQ'
			}
		})
		result = response.data.translations[0].text;
	} catch (error) {
			result = "err";
	}	
	// response.data.translations.forEach(element => {
	// 	console.log(element.text)
	return result
}

const github = async () => { 
	let page = "loading"
	try {
		await fetch('https://raw.githubusercontent.com/nvim-lualine/lualine.nvim/master/README.md').then(result => console.log(data))
	} catch (error) {
		
	}
}
github()
bot.use(async (ctx) => {
	console.log(github)
	// const translated = await translate(ctx.message.text)
	// ctx.telegram.sendMessage(CHAT_ID, translated)
	// ctx.telegram.sendCopy(ctx.message.chat.id, translated)
	// ctx.telegram.sendMessage(ctx.message.chat.id, translated)
})

bot.launch()


const Discord = require("discord.js")
const jimp =require("jimp")
const client = new Discord.Client()
const config = require("./config.json")


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
});

client.on("guildMemberAdd", async member => {

  let canal = client.channels.get("551917020715810825")
  let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
  let mask = await jimp.read('mascara.png')
  let fundo = await jimp.read('fundo.png')
  
  jimp.read(member.user.displayAvatarURL).then(avatar => {
  avatar.resize(130, 130)
  mask.resize(130, 130)
  avatar.mask(mask)

  fundo.print(fonte, 170, 175, member.user.username)
  fundo.composite(avatar, 40, 90).write('bemvindo.png')
  canal.send(``, { files: ["bemvindo.png"] })
  
  console.log('Imagem enviada para o Discord')
  })
  .catch(err => {
  console.log('error avatar')
  })
})


client.login(config.token);
const Discord = require("discord.js");
const jimp = require('jimp')
const client = new Discord.Client();
const config = require("./config.json")


client.on("ready", () => {
  console.log(`O bot foi iniciado, com ${client.users.cache.size} usuários e em ${client.guilds.cache.size} servidores.`);
  client.user.setActivity('Bot criado para destruir a humanidade.', { type: 'PLAYING' });(`Eu estou em ${client.guilds.cache.size} servidores`);
});
client.on("guildMemberAdd", () =>{
  client.user.setActivity('eu sou burro');

});

client.on("guildMemberAdd", async member =>{
    let canal = client.channels.get("601216823819501568")
    let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
    let mask = await jimp.read('mascara.png')
    let fundo = await jimp.read('fundo.png')

    jimp.read(member.user.defaultAvatarURL).then(avatar => {
        avatar.resize(130, 130)
        mask.resize(130, 130)
        avatar.mask(mask)
        fundo.print(fonte, 175, 175, member.user.username)
        fundo.composite(avatar,40, 90).write('bemvindo.png')
        canal.send(``, { files:["bemvindo.png"] })
        console.log("novo membro entrou")
      })
      .catch(err =>{
          console.log("erro critico na imagem")
      }) 

})

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (ID do servidor: ${guild.id}). Membros: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (ID do servidor: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});


client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

 const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
 const comando = args.shift().toLowerCase();

 if(comando === "ping"){
     const m = await message.channel.send("ping?");
     m.edit(`Seu Ping é ${m.createdTimestamp - message.createdTimestamp}ms.`);
 }

 if(comando === "teste"){
     const nick = message.channel.send(
        `> **Seu** avatar 🖼 ${message.author.avatarURL({ dynamic:true})}`
        )
 }

 if (message.content.startsWith("*")|| message.content.startsWith("=")) {
     setTimeout(() => message.delete(), 10000); //Supposed to delete message
    
 }
//  if(comando == "time"){
//      if (!message.member.hasPermission('MANAGE_MESSAGES')) 
//         return message.reply('você não tem permissão para usar esse comando!')
//      setTimeout(() => message.delete(), 10000);
//     //  

    //  await message.delete()
    //  const messages = await message.channel.fetchMessages({ limit: 100 })
    //  const userMessages = messages.filter((m) => m.author === message.author && m.deletable)
    //  if (userMessages === 0) return message.reply('Não encontrei nenhuma mensagem recente para apagar.')
    //  const target = userMessages.first()
    //  if (!target.deletable) return message.reply('Eu não consigo apagar a sua ultima mensagem.')
    //  if (!time) return message.reply('Por favor especifique um tempo em segundos.')
    //  time = parseInt(time)
    //  if (!Number.isInteger(time)) return message.reply('Por favor especifique um tempo válido.')
    //  setTimeout(() => {
    //    if (target.deletable) target.delete()
    //  }, time * 1000)
    //  const sent = await message.reply(`Sua ultima mensagem será apagada em ${time} segundos.`)
    //  setTimeout(() => sent.delete(), 3000)
//  }

});




// client.on("message", async message => {
//     const embed = {
//         color: 0xB1103C,
//         title: 'Minha lista de comandos',
//         description: '[Clique aqui para ir até o repositório onde estou =)](https://github.com/Liga-dos-Programadores/Project-A)',
//         timestamp: new Date(),
//         footer: {
//             text: '2020 ®Liga dos Programadores'
//         },
//         fields: []
//         }

//     let commands = client.commands

//     if (message.member === null || !message.member.hasPermission('ADMINISTRATOR')) commands = commands.filter(c => !c.help.admin)

//     commands.forEach(command => {
//     if (command.alias) return
//     embed.fields.push({
//         name: `**!${command.help.name}**`,
//         value: `*Descrição*: ${command.help.description}
//         *Categoria*: ${command.help.category}\n`
//     })
//     })

//     message.author.send({
//     embed: embed
//     })
//     .then(() => message.react('⚡'))
//     .catch(() => message.reply('eu não tenho permissões para enviar DM para você 😥'))

// });



client.login(config.token);
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
client.on('ready', () => {
  console.log(`Loggeado en ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === `${config.prefijo}ping`) {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
    if (msg.content === `${config.prefijo}infoserver`) {
        let embedsv = new Discord.MessageEmbed()
        .setAuthor("Info de este Servidor")
        .setColor("RED")
        .addField("Nombre de el Servidor", msg.guild.name)
        .addField("ID de el Servidor", msg.guild.id)
        .addField("Owner de el Servidor", msg.guild.owner)
        .addField("Miembros", msg.guild.memberCount)
        .addField("Servidor creado el", msg.guild.createdAt)
        .setFooter(config.footer)
      msg.reply(embedsv);
    }
  });

  client.on('message', msg => {
    if (msg.content === `${config.prefijo}miinfo`) {
      let embedin = new Discord.MessageEmbed()   
      .setAuthor(`Informacion de ${msg.author.tag}`)
      .setColor("RED")
      .addField("Usuario:", `**${msg.author.tag}** [**__${msg.author}__**]`, true)
      .addField("ID Usuario:", `\`${msg.author.id}\``, true)
      .addField("Cuenta creada el:", `${msg.author.createdAt}`)
      .setFooter(config.footer)
      msg.reply(embedin);
      }
  });

  client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
    oldChannel.guild.fetchAuditLogs().then(logs => {
       let userID = logs.entries.first().executor.id;
       if(oldChannel.name !== newChannel.name) {
        let embededcan = new Discord.MessageEmbed()  
        .setTitle('**[CANAL EDITADO]**')
        .setColor('ORANGE')
        .addField("Anterior Nombre:", oldChannel.name, true)
        .addField("Nuevo Nombre:", newChannel.name, true)
        .addField("ID De el Canal:", `\`${oldChannel.id}\``, false)
        .addField("Canal Editado por:", `**__<@!${userID}>__**`, true)
        .addField("ID De el que ha editado el Canal", `\`${userID}\``, true)
        .setTimestamp()
        .setFooter(config.footer)
        let canalLogs = oldChannel.guild.channels.cache.get(config.idcanallogs);
        canalLogs.send(embededcan);
       }
    })
  })

  client.on('channelCreate', (channel) => {
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    if(!channel.guild) return;
    channel.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
       let embedcrcan = new Discord.MessageEmbed() 
       .setTitle('**[CANAL CREADO]**')
       .setColor('GREEN')
       .addField("Nombre de el Canal:", channel.name, true)
       .addField("ID De el Canal:", `\`${channel.id}\``, true)
       .addField("Tipo de Canal:", `\`${channel.type}\``, false)
       .addField("Canal Creado por:", `**__<@!${userID}>__**`, true)
       .addField("ID Creador de el Canal", `\`${userID}\``, true)
       .setTimestamp()
       .setFooter(config.footer)
       let canalLogs = client.channels.cache.get(config.idcanallogs);
       canalLogs.send(embedcrcan);
    })
  })

   client.on('channelDelete', (channel) => {
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    if(!channel.guild) return;
    channel.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
     let embedbrcan = new Discord.MessageEmbed() 
       .setTitle('**[CANAL ELIMINADO]**')
       .setColor('RED')
       .addField("Canal Eliminado:", channel.name, true)
       .addField("ID Canal Eliminado:", channel.id, true)
       .addField("Tipo de Canal:", channel.type, false)
       .addField("ID De el que ha borrado el Canal", `\`${userID}\``, true)
       .addField("Canal Eliminado Por:", `**__<@!${userID}>__**`, true)
       .setTimestamp()
       .setFooter(config.footer)
       let canalLogs = client.channels.cache.get(config.idcanallogs);
       canalLogs.send(embedbrcan);
    })
  })

  client.on('roleUpdate', (oldRole, newRole) => {
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    oldRole.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
     if(oldRole.name !== newRole.name) {
      let embededrol = new Discord.MessageEmbed()  
         .setTitle('**[ROL EDITADO]**')
         .setColor('ORANGE')
         .addField("Anterior Nombre:", oldRole.name, true)
         .addField("Nuevo Nombre:", newRole.name, true)
         .addField("ID De el Rol:", `\`${oldRole.id}\``, false)
         .addField("Rol Editado por:", `**__<@!${userID}>__**`, true)
         .addField("ID De el que ha editado el Rol", `\`${userID}\``, true)
         .setTimestamp()
         .setFooter(config.footer)
         let canalLogs = client.channels.cache.get(config.idcanallogs);
         canalLogs.send(embededrol);
      }
    })
  })

   client.on('roleCreate', (role) => {
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    role.guild.fetchAuditLogs().then(logs => { 
     let userID = logs.entries.first().executor.id;
     let embedcrrol = new Discord.MessageEmbed() 
       .setTitle('**[ROL CREADO]**')
       .setColor('GREEN')
       .addField("Nombre de el Rol:", role.name, true)
       .addField("ID De el Rol:", `\`${role.id}\``, false)
       .addField("Rol Creado por:", `**__<@!${userID}>__**`, true)
       .addField("ID Creador de el Rol", `\`${userID}\``, true)
       .setTimestamp()
       .setFooter(config.footer)
       let canalLogs = client.channels.cache.get(config.idcanallogs);
       canalLogs.send(embedcrrol);
    })
  })

   client.on('roleDelete', (role) => {
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
    role.guild.fetchAuditLogs().then(logs => {
     let userID = logs.entries.first().executor.id;
       let embedbrrol = new Discord.MessageEmbed() 
       .setTitle('**[ROL ELIMINADO]**')
       .setColor('RED')
       .addField("Rol Eliminado:", role.name, true)
       .addField("ID Rol Eliminado:", role.id, false)
       .addField("Rol Eliminado Por:", `**__<@!${userID}>__**`, true)
       .addField("ID De el que ha borrado el Rol", `\`${userID}\``, true)
       .setTimestamp()
       .setFooter(config.footer)
       let canalLogs = client.channels.cache.get(config.idcanallogs);
       canalLogs.send(embedbrrol);
    })
  })
   client.on('messageUpdate', (oldMessage, newMessage) => {
    let canal = newMessage.channel.name
    let miembro = newMessage.member.displayName
    let embedmsgact = new Discord.MessageEmbed() 
       .setTitle('**[MENSAJE EDITADO]**')
       .setColor('RED')
       .addField("Mensaje de:", miembro, true)
       .addField("ID Author:", `\`${miembro.id}\``, true)
       .addField("Canal:", canal, false)
       .addField("ID Canal:", `\`${canal.id}\``, false)
       .addField("Mensaje Anterior:", `${oldMessage.content}`, true)
       .addField("Mensaje Ahora:", `${newMessage.content}`, true)
       .setTimestamp()
       .setFooter(config.footer)
    let canalLogs = client.channels.cache.get(config.idcanallogs);
    canalLogs.send(embedmsgact);
  })

   client.on('message', (message) => {
    let m = message.content
    let c = message.channel.name
    let a = message.author.username
    let embedmsgact = new Discord.MessageEmbed() 
       .setTitle('**[NUEVO MENSAJE]**')
       .setColor('GREEN')
       .addField("Mensaje de:", a, true)
       .addField("ID Author:", `\`${message.author.id}\``, true)
       .addField("Mensaje:", `${m}`, false)
       .addField("Canal:", c, true)
       .addField("ID Canal:", `\`${c.id}\``, true)
       .setTimestamp()
       .setFooter(config.footer)
    let canalLogs = client.channels.cache.get(config.idcanallogs);
    canalLogs.send(embedmsgact);
  })

   client.on('messageDelete', (message) => {
     if(message.author.bot) return;
     if(message.channel.type === 'dm') return;
     if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
     let embedmsgel = new Discord.MessageEmbed() 
       .setTitle('**[MENSAJE ELIMINADO]**')
       .setColor('RED')
       .addField("Mensaje:", message.content, true)
       .addField("ID Mensaje:", `\`${message.id}\``, true)
       .addField("Canal:", message.channel.name, false)
       .addField("ID Canal:", `\`${message.channel.id}\``, true)
       .addField("Borrado Por", `<@${message.author.id}>`, false)
       .addField("ID De el Author", message.author.id, true)
       .setTimestamp()
       .setFooter(config.footer)
       let canalLogs = client.channels.cache.get(config.idcanallogs);
       canalLogs.send(embedmsgel);
  })
   client.on('guildMemberAdd', (member) => {
    let embedbienv = new Discord.MessageEmbed() 
       .setThumbnail(member.user.displayAvatarURL())
       .setDescription(member.user.username + ' se unio al servidor!')
       .setFooter('Ahora somos ' + member.guild.memberCount + ' miembros.' )
       .setColor("BLUE") 
     let canalLogs = client.channels.cache.get(config.idcanallogs);
     canalLogs.send(embedbienv);
     let canalBienvenida = client.channels.cache.get(config.idCanalBienvenidas);
     canalBienvenida.send(embedsalid);
  })

  client.on('guildMemberRemove', (member) => {
    let embedsalid = new Discord.MessageEmbed() 
       .setThumbnail(member.user.displayAvatarURL())
       .setDescription(member.user.username + ' dejo el servidor!')
       .setFooter('Ahora somos ' + member.guild.memberCount + ' miembros.' )
       .setColor("RED") 
       let canalLogs = client.channels.cache.get(config.idcanallogs);
       canalLogs.send(embedsalid);
       let canalDespedida = client.channels.cache.get(config.idCanalDespedidas);
       canalDespedida.send(embedsalid);
  })
    
client.login(config.token);

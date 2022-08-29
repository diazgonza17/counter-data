const { SlashCommandBuilder, ChannelType, EmbedBuilder, userMention } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
        .setName('counter')
        .setDescription('Devuelve informacion sobre el contador del server')
        .addChannelOption(option => 
          option.setName('channel')
            .setDescription('canal del contador')
    			  .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)),
  
  async execute(interaction) {
    const chan = interaction.options.getChannel('channel');
    await interaction.reply({ content: 'Loading... this could take a while', ephemeral: true });

    //Upgrade: Should take into account id instead of username
    //Note: Predefined scores in order to compensate errors made in my server
    var leaderboard = [{user: "Gon'tzalo", score: 0}];    
    let lastId;
    let found;
    let checkSum = 0;
    
    if(chan.id === 1002926473386143814) {
      leaderboard = [{ user: "Gon'tzalo", score: 1}, {user: "Gothia", score: 1}];
      checkSum = 2;
      console.log("Taking into account errors made in patitos");
    } 

    while (true) {
      const options = { limit: 100 };
      if(lastId) options.before = lastId;
      
      const fetchMessages = await chan.messages.fetch(options);
      fetchMessages.each(msg => {
        found = false
        checkSum++;
        //console.log("1 ----- Lectura " + msg.content + " " + msg.author.username);
        for(let i=0; i<leaderboard.length;i++) {
          //console.log(`2 ----- Searching for ${msg.author.username} in leaderboard of length ${leaderboard.length} pos ${i+1}`);
          if(leaderboard[i].user === msg.author.username) {
            //console.log("-----FOUND-----")
            found = true;
            leaderboard[i].score ++;
            break;
          }
        }

        if(!found) {
          //console.log("!!!!! " + msg.author.username + " NOT Found, adding new user")
          leaderboard.push({user: msg.author.username, score: 1});
        }
      });

      lastId = fetchMessages.last().id;
      if(fetchMessages.size != 100) break;
    }
    
    //OrdXBur
    let ord = false;
    while(!ord) {
      ord = true;
      for(let i = 1; i<leaderboard.length;i++){
        let aux = {};
        if(leaderboard[i-1].score < leaderboard[i].score){
          ord = false;
          aux = leaderboard[i];
          leaderboard[i] = leaderboard[i-1];
          leaderboard[i-1] = aux;
        };
      }
    }
  
    //Preparar string de salida
    let rankings = `Channel: ${chan}\n\n_Current Number: ${checkSum}_\n\n`;    
    for (let i = 0; i < leaderboard.length; i++) {
      switch(i) {
        case 0: 
          rankings += ':first_place: ';
          break;
        case 1:
          rankings += ':second_place: ';
          break;
        case 2:
          rankings += ':third_place: ';
          break;
        default:
          rankings += (i+1) + '- '
          break;
      }
      rankings += leaderboard[i].user + ': ' + leaderboard[i].score + '\n';
    }
    rankings += `||Requested by ${userMention(interaction.user.id)}||`
    
    const rankEmbed = new EmbedBuilder()
    .setColor(0xe63e52)
    .setTitle(`COUNTER LEADERBOARD`)
    .setDescription(rankings)
    .setTimestamp()
    .setFooter({text: `Use: \\counter <channel>`});
    
    await interaction.channel.send({embeds: [rankEmbed]});
  },
};
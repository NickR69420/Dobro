const Discord = require('discord.js')

module.exports = {
    name: "hack",
    aliases: ["hacc", "hacker"],
    usage: "{prefix}hack [ @user ]",
    description: "",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send("Who tf you wanna hack men?");

        message.channel.send(`Hacking into ${user.user.tag}...`).then(msg => {

            /**
            * Phase Shit
            */
            let phaseno = 1;
            let randomEmail = [`@smollpp.org`, `@gaymail.pride`, `@isimpforu.com`, `@virginhero.com`];
            let randomPass = [`Iluvmom92827`, `1inchpp0982`, `Seggzforlyfe`, `ilikebois6969`, `fuckmeDadi69420`];
            let randomSearch = [`toes pics xxx`, `How to suck own dick`, `how to grow a pp`, `https://findingwifesforme.com/`];
            let randomIP = [`69.420.0.0`, `420.0.0.0`, `127.0.0.0`, `0.0.0.0`]
            let pOneMessages = [`Found ${user.user.tag}'s data! Sending data to your email...`, "0"];
            let pTwoMessages = [`IP: ${randomIP[Math.floor(Math.random() * randomIP.length)]}, Email: ${user.user.username}${randomEmail[Math.floor(Math.random() * randomEmail.length)]}, Password: ${randomPass[Math.floor(Math.random() * randomPass.length)]}`, "0"]
            let pThreeMessages = [`Last Google Search: ${randomSearch[Math.floor(Math.random() * randomSearch.length)]}`];
            let pFourMessages = [`Deleting System32.....`, `Uninstalling Anime_Hoties folder...`, `Injecting SeggzTrojan #6696`, `Corrupting C: Drive...`];

            setInterval(() => {
                switch (phaseno) {
                    case 1:
                        pOneMessages = pOneMessages[Math.floor(Math.random() * pOneMessages.length)];
                        if(pOneMessages == "0") {
                            msg.edit(`Failed to hack ${user.user.tag}. MAYDAY MAYDAY, SECURITY WAY TOO STRONG`);
                            return clearInterval(this);
                        }
                        msg.edit(pOneMessages);
                        phaseno++
                        break;
                    case 2:
                        pTwoMessages = pTwoMessages[Math.floor(Math.random() * pTwoMessages.length)];
                        if(pTwoMessages == "0") {
                            msg.edit(`OH SHIT IT BACKFIRED AND YOU'RE GETTING HACKED!!!!`);
                            return clearInterval(this);
                        }
                        msg.edit(pTwoMessages);
                        phaseno++            
                        break;
                    case 3:
                        pThreeMessages = pThreeMessages[Math.floor(Math.random() * pThreeMessages.length)];
                        msg.edit(pThreeMessages);
                        phaseno++          
                        break;
                    case 4:
                        pFourMessages = pFourMessages[Math.floor(Math.random() * pFourMessages.length)];
                        msg.edit(pFourMessages);
                        phaseno++   
                        break;
                    case 5:
                        msg.edit(`**DONE!** ${user.user.tag} was successfully HACKED! *(100% real)*`);
                        phaseno++
                        break;
                        clearInterval(this)
                                                          
                }
            }, 2000);
        });
    }
}
  
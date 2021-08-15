// This file is part of Dobro
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
const Discord = require('discord.js')

module.exports = {
    name: "hack",
    aliases: ["hacc", "hacker"],
    usage: "{prefix}hack [ @user ]",
    cooldown: 15,
    description: "Don't like someone? Hack them!",
    permsneeded: "SEND_MESSAGES",
    run: async (bot, message, args) => {
        try {
            let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!user) return message.channel.send("Who tf you wanna hack men?");

            message.channel.send(`Hacking ${user.user.tag}...`).then(msg => {

                /**
                 * Phase Shit
                 */
                let phaseno = 1;
                const haxor = bot.emojis.cache.find(emoji => emoji.name === "haxor");
                const mcemoji = bot.emojis.cache.find(emoji => emoji.name === "mcgif");
                const gf = bot.emojis.cache.find(emoji => emoji.name === "gurl");
                const fortniteemoji = bot.emojis.cache.find(emoji => emoji.name === "fortnitedance");
                const vbucks = bot.emojis.cache.find(emoji => emoji.name === "VBuck");
                let mc = [`Hacking Minecraft account..  ${mcemoji}`]
                let fornite = [`Hacking Fornite account..  ${fortniteemoji}`]
                let randomEmail = [`@smollpp.org`, `@gaymail.pride`, `@isimpforu.com`, `@virginhero.com`];
                let randomPass = [`Iluvmom92827`, `1inchpp0982`, `Seggzforlyfe`, `ilikebois6969`, `fuckmeDadi69420`];
                let randomSearch = [`toes pics xxx`, `How to suck own dick`, `how to grow a pp`, `https://findingwifesforme.com/`];
                let randomIP = [`69.420.0.0`, `420.0.0.0`, `127.0.0.0`, `1.234.342.1`]
                let pOneMessages = ["0", `Initializing hack.. ${haxor}`];
                let pTwoMessages = [`**IP ADDRESS:** ${randomIP[Math.floor(Math.random() * randomIP.length)]} \nEmail: \`${user.user.username}${randomEmail[Math.floor(Math.random() * randomEmail.length)]}\`, Password: \`${randomPass[Math.floor(Math.random() * randomPass.length)]}\``]
                let pThreeMessages = [`**Last Google Search:** ${randomSearch[Math.floor(Math.random() * randomSearch.length)]}`];
                let pFourMessages = ["mc", "fortnite"]
                let MCresponse = `Successfully stole their Minecraft girlfriend ${gf}`
                let Forniteresponse = `Successfully stole their V-Bucks ${vbucks}`
                let pFiveMessages = [`Deleting System32.....`, `Uninstalling Anime_Hoties folder...`, `Injecting SeggzTrojan #6696`, `Corrupting C: Drive...`];

                setInterval(() => {
                    switch (phaseno) {
                        case 1:
                            pOneMessages = pOneMessages[Math.floor(Math.random * pOneMessages.length)];
                            if (pOneMessages == "0") {
                                msg.edit(`NEVER MIND! IT BACKFIRED AND YOU'RE GETTING HACKED!!!!`);
                                return clearInterval(this);
                            }
                            msg.edit(pOneMessages);
                            phaseno++
                            break;
                        case 2:
                            pTwoMessages = pTwoMessages[Math.floor(Math.random() * pTwoMessages.length)];
                            msg.edit(pTwoMessages);
                            phaseno++
                            break;

                        case 3:
                            pThreeMessages = pThreeMessages[Math.floor(Math.random() * pThreeMessages.length)];
                            msg.edit(pThreeMessages);
                            phaseno++
                            break;
                        case 4:
                            pFourMessages = pFourMessages[Math.floor(Math.random * pFourMessages.length)];
                            if (pFourMessages == "fornite") {
                                msg.edit(fornite)
                            }
                            msg.edit(mc)
                            phaseno++
                            break;
                        case 5:
                            if (pFourMessages == "fortnite") {
                                msg.edit(Forniteresponse)
                            }
                            msg.edit(MCresponse)
                            phaseno++
                            break;
                        case 6:
                            pFiveMessages = pFiveMessages[Math.floor(Math.random() * pFiveMessages.length)];
                            msg.edit(pFiveMessages);
                            phaseno++
                            break;
                        case 7:
                            msg.edit(`**DONE!** \n${user.user.tag} was successfully HACKED! *(100% real)*`);
                            phaseno++
                            clearInterval(this)
                            break;

                    }
                }, 3500);
            });
        } catch (err) {
            console.log(err)
        }
    }
}
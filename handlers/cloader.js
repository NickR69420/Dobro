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
const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');
module.exports= (bot) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name){
                bot.commands.set(pull.name, pull);
                table.addRow(file,'✅ Success')
            } else {
                table.addRow(file, '❌ Failed')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
}
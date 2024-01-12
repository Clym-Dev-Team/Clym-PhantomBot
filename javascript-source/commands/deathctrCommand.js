/*
 * Copyright (C) 2016-2023 phantombot.github.io/PhantomBot
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * deathCounter.js
 *
 * A death counter.
 */

(function() {
    /*
     * @function deathUpdateFile
     *
     * @param {String} game
     */
    function deathUpdateFile(game) {
        var deathFile = './addons/deathctr/deathctr.txt',
            deathCounter = parseInt($.getIniDbString('deaths', game));

        if (!$.isDirectory('./addons/deathctr/')) {
            $.mkDir('./addons/deathctr');
        }
        if (isNaN(deathCounter)) {
            deathCounter = 0;
        }

        $.writeToFile(deathCounter.toFixed(0), deathFile, false);
    }

    /*
     * @event command
     * This function was modified by the Clym Dev Team to be a general purpose Counter instead of a deathCounter
     * For that we repurposed the game name as an counter name and gave the command caller a way to specify the counter
     * This Counter can still be used a Death Counter by giving the game name as the parameter for the name of the counter
     */
    $.bind('command', function (event) {
        var sender = event.getSender();
        var command = event.getCommand();
        var args = event.getArgs();

        if (command.equalsIgnoreCase('counter') || command.equalsIgnoreCase('c')) {
            // @commandpath counter set [number] - Set the counter with that associated name.
            if (args[0].equalsIgnoreCase("set")) {
                var amount;
                var game;

                if (!isNaN(args[1])) {
                    amount = +args[1];
                    game = args.slice(2).join(' ');
                } else {
                    amount = 0;
                    game = args.slice(1).join(' ');
                }

                $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.set-success', game, amount));
                $.inidb.set('deaths', game, amount);
                $.deathUpdateFile(game);
                return;
            }
            // @commandpath counter incr - Add one to the counter with that associated name.
            else if (args[0].equalsIgnoreCase("add") || args[0].equalsIgnoreCase("incr") || args[0].equalsIgnoreCase("+")) {
                var amount;
                var game;

                if (!isNaN(args[1])) {
                    amount = +args[1];
                    game = args.slice(2).join(' ');
                } else {
                    amount = 1;
                    game = args.slice(1).join(' ');
                }

                $.inidb.incr('deaths', game, amount);
                $.deathUpdateFile(game);
                $.say($.lang.get('deathcounter.add-success', $.ownerName, game, ($.getIniDbNumber('deaths', game, 0))));
                return;
            }
            // @commandpath counter decr - Subtract one from the counter with that associated name.
            else if (args[0].equalsIgnoreCase("sub") || args[0].equalsIgnoreCase("decr") || args[0].equalsIgnoreCase("-")) {
                var amount;
                var game;
                if (!isNaN(args[1])) {
                    amount = +args[1];
                    game = args.slice(2).join(' ');
                } else {
                    amount = 1;
                    game = args.slice(1).join(' ');
                }
                $.inidb.decr('deaths', game, amount);
                $.deathUpdateFile(game);
                $.say($.lang.get('deathcounter.sub-success', game, ($.getIniDbNumber('deaths', game, 0))));
                return;
            }
            // @commandpath counter - Print out the current counter value for the associated name.
            else {
                var game = args.join(' ');
                $.say($.lang.get('deathcounter.counter', $.ownerName, game, $.getIniDbNumber('deaths', game)));
                return;
            }
        }
    });

    /*
     * @event initReady
     */
    $.bind('initReady', function () {
        $.registerChatCommand('./commands/deathctrCommand.js', 'counter', $.PERMISSION.Viewer);
        $.registerChatSubcommand('counter', 'set', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'add', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'incr', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', '+', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'sub', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'decr', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', '-', $.PERMISSION.Mod);

        $.registerChatCommand('./commands/deathctrCommand.js', 'c', $.PERMISSION.Viewer);
        $.registerChatSubcommand('c', 'set', $.PERMISSION.Mod);
        $.registerChatSubcommand('c', 'add', $.PERMISSION.Mod);
        $.registerChatSubcommand('c', 'incr', $.PERMISSION.Mod);
        $.registerChatSubcommand('c', '+', $.PERMISSION.Mod);
        $.registerChatSubcommand('c', 'sub', $.PERMISSION.Mod);
        $.registerChatSubcommand('c', 'decr', $.PERMISSION.Mod);
        $.registerChatSubcommand('c', '-', $.PERMISSION.Mod);

        setInterval(function () {
            deathUpdateFile(($.jsString($.getGame($.channelName)) !== '' ? $.getGame($.channelName) : 'Some Game'));
        }, 10000);
    });

    /*
     * Export functions to API
     */
    $.deathUpdateFile = deathUpdateFile;
})();

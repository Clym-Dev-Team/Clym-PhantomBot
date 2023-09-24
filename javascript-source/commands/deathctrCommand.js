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
            deathCounter = parseInt($.inidb.get('deaths', game));

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
     * This Counter can still be used a an Death Counter by giving the game name as the parameter for the name of the counter
     */
    $.bind('command', function(event) {
        var sender = event.getSender(),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0],
            game = "";
            amount = 1;
            amount_given = false;

        // Make the amount Optional
        if !isNaN(args[1]) { //isNaN => false means the argument is a Number, or emtpy whitespace
            amount = 0+args[1]
            game = args.slice(2).join(' ');
            amount_given = true;
        } else {
            amount = 1;
            game = args.slice(1).join(' ');
            amount_given = false;
        }

        /*
         * @commandpath counter - Display the current number of deaths in game being played.
         */
        if (command.equalsIgnoreCase('counter')) {
            var deathCounter = parseInt($.inidb.get('deaths', game));
            var noDeathExists = isNaN(parseInt(deathCounter)) || parseInt(deathCounter) === 0 ? (deathCounter = 0, true) : (false);
            if (action === undefined) {
                if (noDeathExists) {
                    $.say($.lang.get('deathcounter.none', $.ownerName, game));
                } else {
                    $.say($.lang.get('deathcounter.counter', $.ownerName, game, deathCounter));
                }
            } else {
                /*
                 * @commandpath counter reset - Reset the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('reset')) {
                    if (noDeathExists) {
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.reset-nil', game));
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.reset', game, deathCounter));
                        $.inidb.set('deaths', game, 0);
                        $.deathUpdateFile(game);
                    }
                    return;
                }

                /*
                 * @commandpath counter set [number] - Set the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('set')) {
                    if (amount_given == false) {
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.set-error'));
                        return;
                    } else {
                        var setDeath = parseInt(args[1]);
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.set-success', game, amount));
                        $.inidb.set('deaths', game, amount);
                        $.deathUpdateFile(game);
                        return;
                    }
                }

                /*
                 * @commandpath counter incr - Add one to the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('add') || action.equalsIgnoreCase('incr') || action.equalsIgnoreCase('+')) {
                    $.say($.lang.get('deathcounter.add-success', $.ownerName, game, ($.getIniDbNumber('deaths', game, 0) + amount)));
                    $.inidb.incr('deaths', game, amount);
                    $.deathUpdateFile(game);
                    return;
                }

                /*
                 * @commandpath counter decr - Subtract one from the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('sub') || action.equalsIgnoreCase('decr') || action.equalsIgnoreCase('-')) {
                    if (isNaN(parseInt($.inidb.get('deaths', game))) || parseInt($.inidb.get('deaths', game)) - amount < 0) {
                        $.say($.lang.get('deathcounter.sub-zero', game));
                        return;
                    }

                    $.say($.lang.get('deathcounter.sub-success', game, ($.getIniDbNumber('deaths', game, 0) - amount)));
                    $.inidb.decr('deaths', game, amount);
                    $.deathUpdateFile(game);
                    return;
                }
            }
        }
    });

    /*
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./commands/deathctrCommand.js', 'counter', $.PERMISSION.Viewer);

        $.registerChatSubcommand('counter', 'reset', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'set', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'add', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'incr', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', '+', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'sub', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', 'decr', $.PERMISSION.Mod);
        $.registerChatSubcommand('counter', '-', $.PERMISSION.Mod);

        $.registerChatCommand('./commands/deathctrCommand.js', 'c', $.PERMISSION.Mod);

        setInterval(function() {
            deathUpdateFile(($.jsString($.getGame($.channelName)) !== '' ? $.getGame($.channelName) : 'Some Game'));
        }, 10000);
    });

    /*
     * Export functions to API
     */
    $.deathUpdateFile = deathUpdateFile;
})();

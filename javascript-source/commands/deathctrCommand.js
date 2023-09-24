/*
 * Copyright (C) 2016-2022 phantombot.github.io/PhantomBot
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
     */
    $.bind('command', function(event) {
        //Utility Functions \/
        function getArgIndex(args) {
            var input = args;
            const regex = /(add|set|reset|-|decr|sub|\+|incr)/;

            var i = 0;
            while (!regex.test(input[i]) && i < input.length) {
                i++;
            }
            return i;
        }


        function joinUntil(index, args) {
            var str = args;
            str = str.slice(0, index);
            str = str.join(' ');
            return String(str);
        }
        //Utility Functions End

        var sender = event.getSender(),
            command = event.getCommand(),
            args = event.getArgs(),
            argIndex = getArgIndex(args);
        action = args[argIndex],
            game = joinUntil(argIndex, args);

        /*
         * @commandpath counter - Display the current number of deaths in game being played.
         */
        if (command.equalsIgnoreCase('counter') || command.equalsIgnoreCase('c')) {
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
                    if (isNaN(parseInt(argIndex + 1))) {
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.set-error'));
                        return;
                    } else {
                        var setDeath = parseInt(argIndex + 1);
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.set-success', game, setDeath));
                        $.inidb.set('deaths', game, setDeath);
                        $.deathUpdateFile(game);
                        return;
                    }
                }

                /*
                 * @commandpath counter incr - Add one to the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('add') || action.equalsIgnoreCase('incr') || action.equalsIgnoreCase('+')) {

                    $.say($.lang.get('deathcounter.add-success', $.ownerName, game, ($.inidb.exists('deaths', game) ? (parseInt($.inidb.get('deaths', game)) + 1) : 1)));
                    $.inidb.incr('deaths', game, 1);
                    $.deathUpdateFile(game);
                    return;
                }

                /*
                 * @commandpath counter decr - Subtract one from the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('sub') || action.equalsIgnoreCase('decr') || action.equalsIgnoreCase('-')) {
                    if (isNaN(parseInt($.inidb.get('deaths', game))) || parseInt($.inidb.get('deaths', game)) === 0) {
                        $.say($.lang.get('deathcounter.sub-zero', game));
                        return;
                    }

                    $.say($.lang.get('deathcounter.sub-success', game, ($.inidb.exists('deaths', game) ? (parseInt($.inidb.get('deaths', game)) - 1) : 0)));
                    $.inidb.decr('deaths', game, 1);
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
        $.registerChatCommand('./commands/deathctrCommand.js', 'counter', 7);

        $.registerChatSubcommand('counter', 'reset', 2);
        $.registerChatSubcommand('counter', 'set', 2);
        $.registerChatSubcommand('counter', 'add', 2);
        $.registerChatSubcommand('counter', 'incr', 2);
        $.registerChatSubcommand('counter', '+', 2);
        $.registerChatSubcommand('counter', 'sub', 2);
        $.registerChatSubcommand('counter', 'decr', 2);
        $.registerChatSubcommand('counter', '-', 2);

        //counter shortcut
        $.registerChatCommand('./commands/deathctrCommand.js', 'c', 7);

        setInterval(function() {
            deathUpdateFile(($.getGame($.channelName) != '' ? $.getGame($.channelName) : 'Some Game'));
        }, 10000);
    });

    /*
     * Export functions to API
     */
    $.deathUpdateFile = deathUpdateFile;
})();

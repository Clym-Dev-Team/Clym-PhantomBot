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

/* global Packages */

(function () {
    var cmd, i, keys, match, temp;

    /*
     * @transformer randomInt
     * @formula (#) a random integer from 1 to 100, inclusive
     * @formula (# a:int, b:int) a random integer from a to b, inclusive
     * @example Caster: !addcom !lucky Your lucky number is (#)
     * User: !lucky
     * Bot: Your lucky number is 7
     */
    function randomInt(args) {
        if (!args) {
            return {
                result: $.randRange(1, 100),
                cache: false
            };
        } else if ((match = args.match(/^\s(-?\d+),\s?(-?\d+)$/))) {
            return {
                result: $.randRange(parseInt(match[1]), parseInt(match[2])),
                cache: false
            };
        }
    }

    /*
     * @transformer buildArgs
     * @formula (n:int) the n-th argument (escaped by default)
     * @formula (n:int=tag:str) the n-th argument, if given, else another tag to replace this one
     * @formula (n:int|default:str) the n-th argument, if given, else a provided default value
     * @example Caster: !addcom !love (sender) loves (1).
     * User: !love monkeys
     * Bot: User loves monkeys.
     * @raw sometimes
     * @cached
     */
    function buildArgs(n) {
        return function (args, event) {
            var arg = event.getArgs()[n - 1];
            if (!args) {
                return {result: arg !== undefined ? arg : ''};
            } else if ((match = args.match(/^([=\|])(.*)$/))) {
                if (arg !== undefined) {
                    return {
                        result: arg,
                        cache: true
                    };
                }
                return {
                    result: ($.equalsIgnoreCase(match[1], '=') ? '(' : '') + escapeTags(match[2]) + ($.equalsIgnoreCase(match[1], '=') ? ')' : ''),
                    raw: $.equalsIgnoreCase(match[1], '='),
                    cache: true
                };
            }
        };
    }

    /*
     * @transformer code
     * @formula (code length:int) random code of the given length composed of a-zA-Z0-9
     * @example Caster: !addcom !code (code 5)
     * User: !code
     * Bot: A1D4f
     */
    function code(args) {
        var code,
                length,
                temp = '';
        if ((match = args.match(/^(?:=|\s)([1-9]\d*)$/))) {
            code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            length = parseInt(match[1]);
            for (i = 0; i < length; i++) {
                temp += code.charAt(Math.floor(Math.random() * code.length));
            }
            return {
                result: temp,
                cache: false
            };
        }
    }

    /*
     * @transformer command
     * @formula (command name:str) execute command with given name and pass no args
     * @formula (command name:str args:str) execute command with given name and pass args
     * @cancels
     */
    function command(args, event) {
        var argStr;
        if ((match = args.match(/^\s(\S+)(?:\s(.*))?$/))) {
            cmd = match[1];
            argStr = match[2] || '';
            if (cmd.length > 0) {
                var EventBus = Packages.tv.phantombot.event.EventBus;
                var CommandEvent = Packages.tv.phantombot.event.command.CommandEvent;
                EventBus.instance().postAsync(new CommandEvent(event.getSender(), cmd, argStr));
            }
            return {cancel: true};
        }
    }

    /*
     * @transformer commandslist
     * @formula (commandslist) lists custom commands (paginated)
     * @formula (commandslist prefix:str) lists custom commands (paginated) with a prefix in the output
     * @cancels
     */
    function commandslist(args, event) {
        var prefix;
        if ((match = args.match(/^(?:\s(.*))?$/))) {
            prefix = match[1] || '';
            keys = $.inidb.GetKeyList('pricecom', '');
            temp = [];
            for (i in keys) {
                if (!keys[i].includes(' ')) {
                    temp.push('!' + keys[i] + ': ' + $.getPointsString($.inidb.get('pricecom', keys[i])));
                }
            }
            $.paginateArray(temp, 'NULL' + prefix, ', ', true, event.getSender());
            return {cancel: true};
        }
    }

    /*
     * @transformer count
     * @formula (count) increases the count of how often this command has been called and output new count
     * @example Caster:  !addcom !spam Chat has been spammed (count) times
     * User: !spam
     * Bot: Chat has been spammed 5050 times.
     */
    function count(args, event) {
        if (!args) {
            $.inidb.incr('commandCount', event.getCommand(), 1);
            return {result: $.inidb.get('commandCount', event.getCommand())};
        }
    }

    /*
     * @transformer countdown
     * @formula (countdown datetime:str) shows the time remaining until the given datetime
     * @notes for information about accepted datetime formats, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
     * @example Caster: !addcom !count Time Left: (countdown December 23 2017 23:59:59 GMT+0200)
     * User: !count
     * Bot: Time Left: 20 hours, 30 minutes and 55 seconds.
     * @cached
     */
    function countdown(args) {
        if ((match = args.match(/^(?:=|\s)(.*)$/))) {
            temp = Date.parse(match[1]);
            if (isNaN(temp)) {
                return {result: $.lang.get('customcommands.datetime.format.invalid', match[1])};
            }
            temp -= Date.parse($.getLocalTime());
            return {
                result: $.getCountString(temp / 1000, false),
                cache: true
            };
        }
    }

    /*
     * @transformer countup
     * @formula (countup datetime:str) shows the time elapsed since the given datetime
     * @notes for information about accepted datetime formats, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
     * @example Caster: !addcom !ago You missed it by (countup December 23 2017 23:59:59 GMT+0200)
     * User: !ago
     * Bot: You missed it by 20 hours, 30 minutes and 55 seconds.
     * @cached
     */
    function countup(args) {
        if ((match = args.match(/^(?:=|\s)(.*)$/))) {
            temp = Date.parse(match[1]);
            if (isNaN(temp)) {
                return {result: $.lang.get('customcommands.datetime.format.invalid', match[1])};
            }
            temp = Date.parse($.getLocalTime()) - temp;
            return {
                result: $.getCountString(temp / 1000, true),
                cache: true
            };
        }
    }

    /*
     * @transformer currenttime
     * @formula (currenttime timezone:str, format:str) shows the current date/time in given timezone, using the provided output format
     * @notes for information about crafting a format string, see https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/text/SimpleDateFormat.html
     * @notes for information about accepted timezone strings, see https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/TimeZone.html
     * @cached
     */
    function currenttime(args) {
        if ((match = args.match(/^ (.+), (.*)$/))) {
            return {
                result: $.getCurrentLocalTimeString(match[2], match[1]),
                cache: true
            };
        }
    }

    /*
     * @transformer echo
     * @formula (echo) all arguments passed to the command
     * @example Caster: !addcom !echo (echo)
     * User: !echo test test
     * Bot: test test
     */
    function echo(args, event) {
        if (!args) {
            return {result: event.getArguments() ? event.getArguments() : ''};
        }
    }

    /*
     * @transformer encodeurl
     * @formula (encodeurl url:str) url encode the given url
     * @cached
     */
    function encodeurl(args) {
        if ((match = args.match(/^ (.*)$/))) {
            return {
                result: encodeURI(match[1]),
                cache: true
            };
        }
    }

    /*
     * @transformer encodeurlparam
     * @formula (encodeurlparam paramter:str) like encodeurl but also ecapes "&", "=", "+", "/", etc.
     * @cached
     */
    function encodeurlparam(args) {
        if ((match = args.match(/^ (.*)$/))) {
            return {
                result: encodeURIComponent(match[1]),
                cache: true
            };
        }
    }

    /*
     * @transformer gettimevar
     * @formula (gettimevar name:str) retrieves the specified timevar, set using !settimevar, for use in a (countdown) or (countup) transformer
     * @example Caster: !settimevar christmas December 25 2017 00:00:00 GMT-0500
     * Caster: !addcom !count Time Left until Christmas: (countdown (gettimevar christmas))
     * User: !count
     * Bot: Time Left until Christmas: 20 hours, 30 minutes and 55 seconds.
     * @cached
     */
    function gettimevar(args) {
        if (!args) {
            return {
                result: $.getLocalTime(),
                cache: true
            };
        } else {
            return {
                result: $.inidb.get('timevars', args),
                cache: true
            };
        }
    }

    /*
     * @formula help
     * @formula (help message:str) if no arguments are provided to the command, outputs the provided message and then cancels the command
     * @cancels sometimes
     */
    function help(args, event) {
        if ((match = args.match(/^(?:=|\s)(.*)$/))) {
            if (event.getArgs()[0] === undefined) {
                $.say(match[1]);
                return {cancel: true};
            } else {
                return {result: ''};
            }
        }
    }

    /*
     * @transformer keywordcount
     * @formula (keywordcount keyword:str) increase the keyword count for the given keyword and return new count
     */
    function keywordcount(args) {
        var keyword,
                keywordInfo;
        if ((match = args.match(/^\s(.+)$/))) {
            keyword = match[1];
            if ($.inidb.exists('keywords', keyword)) {
                keywordInfo = JSON.parse($.inidb.get('keywords', keyword));
                if ('count' in keywordInfo) {
                    ++keywordInfo["count"];
                } else {
                    keywordInfo["count"] = 1;
                }
                $.inidb.set('keywords', keyword, JSON.stringify(keywordInfo));
                return {result: keywordInfo["count"]};
            } else {
                return {result: $.lang.get('customcommands.keyword.404', keyword)};
            }
        }
    }

    /*
     * @transformer pay
     * @formula (pay) outputs the number of points the sender has gained by using this command
     * @formula (pay command:str) outputs the number of points the sender would gain if they use the specified command
     * @cached
     */
    function pay(args, event) {
        if ((match = args.match(/^(?:\s(.*))?$/))) {
            cmd = match[1] || '';
            if (cmd.length === 0) {
                cmd = event.getCommand();
            }
            if ($.inidb.exists('paycom', cmd)) {
                temp = $.inidb.get('paycom', cmd);
            } else {
                temp = 0;
            }
            return {
                result: $.getPoints($.jsString(temp)),
                cache: true
            };
        }
    }

    /*
     * @transformer pointname
     * @formula (pointname) the plural name of the loyalty points
     * @example Caster: !addcom !pointsname (sender) current points name is set to: (pointname)
     * User: !pointsname
     * Bot: User current points name is set to: points
     */
    function pointname(args) {
        if (!args) {
            return {result: $.pointNameMultiple};
        }
    }

    /*
     * @transformer points
     * @formula (points) points of the sender
     * @formula (points user:str) points of the given user
     * @cached
     */
    function points(args, event) {
        if ((match = args.match(/^(?:\s(.*))?$/))) {
            var user;
            user = (match[1] || '').replace(/^@/, '');
            if (user.length === 0) {
                user = event.getSender();
            }
            return {
                result: $.getUserPoints(user),
                cache: true
            };
        }
    }

    /*
     * @transformer price
     * @formula (price) the number of points the sender paid to use this command
     * @formula (price command:str) the number of points the sender would pay if they use the specified command
     * @example Caster: !addcom !cost This command costs (price) (pointname)
     * User: !cost
     * Bot: This command costs 10 points
     * @cached
     */
    function price(args, event) {
        if ((match = args.match(/^(?:\s(.*))?$/))) {
            cmd = match[1] || '';
            if (cmd.length === 0) {
                cmd = event.getCommand();
            }
            if ($.inidb.exists('pricecom', cmd)) {
                temp = $.inidb.get('pricecom', cmd);
            } else {
                temp = 0;
            }
            return {
                result: $.getPointsString(temp),
                cache: true
            };
        }
    }

    /*
     * @transformer random
     * @formula (random) random user in chat, or the bot's name if chat is empty
     * @example Caster: !addcom !poke /me pokes (random) with a long wooden stick.
     * User: !poke
     * Bot: /me pokes User2 with a long wooden stick.
     */
    function random(args) {
        if (!args) {
            try {
                var name = $.username.resolve($.randElement($.users));

                if ($.users.length === 0 || name === null || name === undefined) {
                    name = $.username.resolve($.botName);
                }

                return {
                    result: name,
                    cache: false
                };
            } catch (ex) {
                return {result: $.username.resolve($.botName)};
            }
        }
    }

    /*
     * @transformer randomrank
     * @formula (randomrank) random user in chat, or the bot's name if chat is empty; the chosen user's rank is prefixed
     * @example Caster: !addcom !poke /me Pokes (randomrank) with a bar of soap.
     * User: !poke
     * Bot: /me Pokes Master User2 with a bar of soap.
     */
    function randomrank(args) {
        if (!args) {
            try {
                return {
                    result: $.resolveRank($.randElement($.users)),
                    cache: false
                };
            } catch (ex) {
                return {result: $.resolveRank($.botName)};
            }
        }
    }

    /*
     * @transformer repeat
     * @formula (repeat n:int, message:str) repeat the message n times (copy/paste)
     * @note the value of n is limited to a maximum of 30
     * @cached
     */
    function repeat(args) {
        var MAX_COUNTER_VALUE = 30,
                n;
        if ((match = args.match(/^\s([1-9]\d*),\s?(.*)$/))) {
            if (!match[2]) {
                return {result: ''};
            }
            n = parseInt(match[1]);
            if (n > MAX_COUNTER_VALUE) {
                n = MAX_COUNTER_VALUE;
            }
            if (n < 1) {
                n = 1;
            }
            temp = [];
            for (i = 0; i < n; i++) {
                temp.push(match[2]);
            }
            return {
                result: temp.join(' '),
                cache: true
            };
        }
    }

    /*
     * @transformer token
     * @formula (token) replaced with the secret token that was set by !tokencom or the panel
     * @example Caster: !addcom !weather (customapijson http://api.apixu.com/v1/current.json?key=(token)&q=$1 {Weather for} location.name {:} current.condition.text {Temps:} current.temp_f {F} current.temp_c {C})
     * Caster: !tokencom !weather mySecretApiKey
     * User: !weather 80314
     * // customapijson generates the below response using the url: http://api.apixu.com/v1/current.json?key=mySecretApiKey&q=80314
     * Bot: Weather for Boulder, CO : Sunny Temps: 75 F 24 C
     * @cached
     */
    function token(args, event) {
        cmd = event.getCommand();
        if ($.inidb.HasKey('commandtoken', '', cmd)) {
            return {
                result: $.inidb.GetString('commandtoken', '', cmd),
                cache: true
            };
        } else {
            return {
                result: 'NOT_SET',
                cache: true
            };
        }
    }

    /*
     * @transformer unescape
     * @formula (unescape str:str) unescape \\ \( \) to \ ( ) respectively
     * @raw
     * @cached
     */
    function unescape(args) {
        if ((match = args.match(/^ (.*)$/))) {
            return {
                result: match[1],
                raw: true,
                cache: true
            };
        }
    }

    transformers = {
        '#': randomInt,
        'code': code,
        'command': command,
        'commandslist': commandslist,
        'count': count,
        'countdown': countdown,
        'countup': countup,
        'currenttime': currenttime,
        'echo': echo,
        'encodeurl': encodeurl,
        'encodeurlparam': encodeurlparam,
        'gettimevar': gettimevar,
        'help': help,
        'keywordcount': keywordcount,
        'pay': pay,
        'pointname': pointname,
        'points': points,
        'price': price,
        'random': random,
        'randomrank': randomrank,
        'repeat': repeat,
        'token': token,
        'unescape': unescape
    };
    for (i = 1; i <= 9; i++) {
        transformers[$.jsString(i)] = buildArgs(i);
    }
})();

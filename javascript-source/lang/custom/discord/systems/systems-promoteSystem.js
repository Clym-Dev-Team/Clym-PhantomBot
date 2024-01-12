$.lang.register('discord.promotesystem.cmd.promote.usage', '!promote add [kurze Beschreibung] | delete - Füge hinzu oder lösche dich selbst von der Promotion.');
$.lang.register('discord.promotesystem.cmd.promote.noselfmanage', 'Niemand darf sich selbst verwalten, bitte sprechen Sie mit einem Moderator, der dich hinzufügt oder löscht.');
$.lang.register('discord.promotesystem.cmd.promote.nochannels', 'Bitten Sie einen Administrator, einen Werbekanal mit "!promote channel" und/oder "!promote streamchannel" einzurichten.');
$.lang.register('discord.promotesystem.cmd.promote.revoked', 'Du darfst dich nicht mehr selbst hinzufügen.');

$.lang.register('discord.promotesystem.cmd.promote.add.nobio', 'Sie müssen eine kurze Biographie angeben oder das Schlüsselwort \'none\' (!promote add none) verwenden.');
$.lang.register('discord.promotesystem.cmd.promote.add.success', 'Du ($1) wirst jetzt promotet.');
$.lang.register('discord.promotesystem.cmd.promote.del.success', 'Du ($1) wirst nicht mehr promotet.');

$.lang.register('discord.promotesystem.cmd.promoteadm.usage', '!promoteadm add | delete | so | channel | streamchannel | revoke | allow | toggleselfmanage | togglestats | togglebanner | list | setinterval');
$.lang.register('discord.promotesystem.cmd.promoteadm.nochannels', 'Setze Kanäle mit !promoteadm Kanal und/oder !promoteadm Streamchannel.');
$.lang.register('discord.promotesystem.cmd.promoteadm.noacct', 'Dieses Konto scheint auf Twitch nicht zu existieren: $1');

$.lang.register('discord.promotesystem.cmd.promoteadm.add.nouser', 'Wen möchtest du promoten?');
$.lang.register('discord.promotesystem.cmd.promoteadm.add.nobio', 'YSie müssen eine kurze Biographie angeben oder das Schlüsselwort \'none\' verwenden (!promoteadm add user none).');
$.lang.register('discord.promotesystem.cmd.promoteadm.add.success', '$1 wird nun promotet.');
$.lang.register('discord.promotesystem.cmd.promoteadm.del.nouser', 'Wen möchten Sie von der Promotion ausschließen?');
$.lang.register('discord.promotesystem.cmd.promoteadm.del.success', '$1 wird nicht mehr promotet.');

$.lang.register('discord.promotesystem.cmd.promoteadm.channel.nochannel', 'Welchen Kanal für Promotionen nutzen? Um den aktuellen Kanal zu entfernen, verwende  "!promoteadm channel clear"');
$.lang.register('discord.promotesystem.cmd.promoteadm.channel.cleared', 'Der Promo-Kanal wurde gelöscht.');
$.lang.register('discord.promotesystem.cmd.promoteadm.channel.success', 'Promo-Kanal wurde gesetzt zu: $1');

$.lang.register('discord.promotesystem.cmd.promoteadm.streamchannel.nochannel', 'Welchen Kanal für Stream-Ankündigungen verwenden? Um den aktuellen Kanal zu entfernen, verwendee "!promoteadm streamchannel clear"');
$.lang.register('discord.promotesystem.cmd.promoteadm.streamchannel.cleared', 'Der Stream-Ankündigungskanal wurde gelöscht.');
$.lang.register('discord.promotesystem.cmd.promoteadm.streamchannel.success', 'Stream-Ankündigungskanal wurde gesetzt zu: $1');

$.lang.register('discord.promotesystem.cmd.promoteadm.revoke.nouser', 'Welchen Benutzern die Berechtigung entziehen, sich selbst hinzufügen zu können?');
$.lang.register('discord.promotesystem.cmd.promoteadm.revoke.success', '$1 wird nicht mehr promotet und kann sich nicht mehr selbst verwalten.');

$.lang.register('discord.promotesystem.cmd.promoteadm.allow.nouser',  'Entzug der Berechtigung welche Benutzer sich selbst hinzufügen können?');
$.lang.register('discord.promotesystem.cmd.promoteadm.allow.success', '$1 wird nicht mehr promotet und kann sich nicht mehr selbst verwalten.');

$.lang.register('discord.promotesystem.cmd.promoteadm.toggleselfmanage.off', 'Benutzer können sich nicht mehr über "!promote add und delete"  selbst verwalten.');
$.lang.register('discord.promotesystem.cmd.promoteadm.toggleselfmanage.on', 'Benutzer können sich nun über "!promote add und delete" selbst verwalten.');

$.lang.register('discord.promotesystem.cmd.promoteadm.togglestats.off', 'Statistiken werden nicht mehr angezeigt, wenn ein Stream angekündigt wird.');
$.lang.register('discord.promotesystem.cmd.promoteadm.togglestats.on', 'Statistiken werden nun angezeigt, wenn ein Stream angekündigt wird.');

$.lang.register('discord.promotesystem.cmd.promoteadm.togglebanner.off', 'Banner werden nicht mehr angezeigt, wenn ein Stream angekündigt wird.');
$.lang.register('discord.promotesystem.cmd.promoteadm.togglebanner.on', 'Banner werden nun angezeigt, wenn ein Stream angekündigt wird.');

$.lang.register('discord.promotesystem.cmd.promoteadm.list.empty', 'Derzeit werden keine Benutzer promotet.');
$.lang.register('discord.promotesystem.cmd.promoteadm.list.success', 'Benutzer werden promotet: $1');

$.lang.register('discord.promotesystem.cmd.promoteadm.setinterval.nominutes', 'eben Sie ein Intervall in Minuten an.');
$.lang.register('discord.promotesystem.cmd.promoteadm.setinterval.toolow', 'Das Intervall sollte 15 Minuten oder mehr betragen, um den Kanal nicht zu spammen.');
$.lang.register('discord.promotesystem.cmd.promoteadm.setinterval.success', 'Das Intervall für die Promotion von Streamern wurde auf $1 Minuten festgelegt.');

$.lang.register('discord.promotesystem.cmd.so.nouser', 'Du musst einen Benutzer zum Nachschlagen und Ausrufen bereitstellen.');
$.lang.register('discord.promotesystem.cmd.so.noexist', 'Dieser Benutzer wird derzeit nicht befördert. Prüfe "!promoteadm list"');

$.lang.register('discord.promotesystem.livemsg.title', '$1 streamt gerade auf https://twitch.tv/$2');
$.lang.register('discord.promotesystem.livemsg.nowplaying', 'Aktuelle Kategorie');
$.lang.register('discord.promotesystem.livemsg.streamtitle', 'Streamtitel');
$.lang.register('discord.promotesystem.livemsg.followers', 'Follower');
$.lang.register('discord.promotesystem.livemsg.views', 'Aufrufe');
$.lang.register('discord.promotesystem.livemsg.missingtitle', 'Kein Titel angegeben');
$.lang.register('discord.promotesystem.livemsg.missinggame', 'Keine Kategorie angegeben');

$.lang.register('discord.promotesystem.promotemsg.description', 'Vergesse nicht, bei $1 zu folgen und reinzuschauen.');
$.lang.register('discord.promotesystem.promotemsg.biography', 'Bio');
$.lang.register('discord.promotesystem.promotemsg.nobio', 'Keine Biographie vorhanden.');

# <ins>Does and don't's</ins>

## Don't's

## Does

- Wait **at least 1 Second** between drawing Winners, because otherwise you can get duplicate Winners

# <ins>Issues/Warnings</ins>

- When you open **or reopen** a giveaway, all participants and Winners **are deleted!**
- If you reload the Giveaway Panel page, or you didn't open the giveaway personally, all Input Fields will have their
  default values. This does not mean that the Giveaway is not running or is corrupted or incorrectly configured!
- The Stream Information section on the Dashboard is not always working correctly, check if your changes applied in the
  Twitch Player. If your Changes did not apply, use the Chat Commands: `!settitle` and `!setgame`.
- Trying to delete a Default Command will result in unexpected and undocumented behaviour. Disable or increase its
  permission level instead!
- It is not possible to open a TRaffle with 0 Coins
- The Command field in TRaffles does not work
- You can use `!ticket` or `!tickets` to enter a TRaffle

# <ins>Update Checklist</ins>

You must check if all of these functionalities work as described here, before releasing the updated Version!

## Dashboard

- You can change the Game
- You can change the Title

## Commands

These are to be checked with multiple different Accounts with different permission levels

- Users can trigger commands
- Users can trigger all commands that they have permission to
- Users can not trigger modonly commands
- The user and global cooldowns work as expected
- you can add commands and they work without a restart
- you can add aliases and they work without a restart
- you can change permission/response/etc. of the command and see the changes in the chat without a restart
- you can delete a command, and it ceases to work without a restart
- you can delete a alias, and it ceases to work without a restart
- check if correct language files are used in default commands

## Giveaways

- Open a Raffle
- Users can Enter raffles (with enough coins)
- Users can't enter raffles with not enough coins
- Users cant enter again, if they have already entered the raffle, and get an error message
- You can close the raffle
- You can draw a Winner from the Raffle
- You can draw a Winner from the Raffle, without closing the raffle beforehand
- You can draw a Winner from the Raffle multiple times (redraw)
- check if the Raffle Timer works, and all variables are replaced correctly

## Ticket Raffles

- Open a Raffle
- Users can buy tickets (with enough coins)
- Users can't buy tickets with not enough coins
- Users cant buy more tickets than they are allowed to, and get an error message
- You can close the TRaffle
- You can draw a Winner from the TRaffle
- You can draw a Winner from the TRaffle, without closing the TRaffle beforehand
- You can draw a Winner from the TRaffle multiple times (redraw)
- check if the TRaffle Timer works, and all variables are replaced correctly

## Timer

- You can create a Timer
- Timer appears in Chat
- Timer cooldown work as expected
- Timer stops when disabled or deleted
- You can trigger commands from the timer

## Coins

- Users receive 1 coins every 10 Minutes, the streamer is live
- Users can lookup their coins

## Writing/Reading Files

- Files are written as expected
- Files are read from as expected
- Random read looks random
- Multiple writes append to file correctly

## Prod. DB updates

Check with a backup of Prod. if the updates that the Bot applies to the Database work correctly and complete in an
acceptable amount of time
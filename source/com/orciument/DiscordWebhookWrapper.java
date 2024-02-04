package com.orciument;

import com.tonykrops.DiscordWebhookAPI;
import tv.phantombot.CaselessProperties;

// [CLASS] Clym-Dev-Team added to allow sending of discord webhooks
public class DiscordWebhookWrapper extends DiscordWebhookAPI {

    private static final String DISCORD_WEBHOOK = CaselessProperties.instance().getProperty("discordWebhook", "");

    /**
     * Constructs a new DiscordWebhook instance
     *
     */
    public DiscordWebhookWrapper() {
        super(DISCORD_WEBHOOK);
        if (DISCORD_WEBHOOK.isBlank()) {
            System.out.println("[DISCORDWEBHOOKAPI]: Discord webhook is missing!");
        }
    }
}

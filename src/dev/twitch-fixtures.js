// Trames IRC Twitch représentatives, pour développer sans chat réel.
// Chaque constante = le contenu d'UN événement `onmessage` de la WebSocket (event.data).
// Une trame peut contenir plusieurs lignes, séparées par "\r\n", et se termine par "\r\n".
// Format reconstitué d'après la doc Twitch : l'ordre et la liste exacte des tags peuvent
// varier (Twitch en ajoute régulièrement). Ton parseur ne doit dépendre ni de l'ordre, ni
// de la présence d'un tag précis. Compare avec de vraies trames dès que tu peux.

// ─── 1. Connexion ──────────────────────────────────────────────────────────────

// Réponse à : CAP REQ :twitch.tv/tags twitch.tv/commands
export const CAP_ACK =
  ":tmi.twitch.tv CAP * ACK :twitch.tv/tags twitch.tv/commands\r\n";

// Réponse à : PASS + NICK justinfan12345 (plusieurs lignes dans une seule trame)
export const BIENVENUE =
  ":tmi.twitch.tv 001 justinfan12345 :Welcome, GLHF!\r\n" +
  ":tmi.twitch.tv 002 justinfan12345 :Your host is tmi.twitch.tv\r\n" +
  ":tmi.twitch.tv 003 justinfan12345 :This server is rather new\r\n" +
  ":tmi.twitch.tv 004 justinfan12345 :-\r\n" +
  ":tmi.twitch.tv 375 justinfan12345 :-\r\n" +
  ":tmi.twitch.tv 372 justinfan12345 :You are in a maze of twisty passages, all alike.\r\n" +
  ":tmi.twitch.tv 376 justinfan12345 :>\r\n";

// Réponse à : JOIN #chainetest
export const JOIN_OK =
  ":justinfan12345!justinfan12345@justinfan12345.tmi.twitch.tv JOIN #chainetest\r\n" +
  ":justinfan12345.tmi.twitch.tv 353 justinfan12345 = #chainetest :justinfan12345\r\n" +
  ":justinfan12345.tmi.twitch.tv 366 justinfan12345 #chainetest :End of /NAMES list\r\n" +
  "@emote-only=0;followers-only=-1;r9k=0;room-id=123456789;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #chainetest\r\n";

// ─── 2. Messages du chat (PRIVMSG) ─────────────────────────────────────────────

// Viewer classique, commande valide
export const MSG_ACHAT =
  "@badge-info=;badges=;client-nonce=4f1c0a7e2b9d4e6f8a3b5c7d9e1f2a4b;color=#1E90FF;display-name=Lea_Navet;emotes=;first-msg=0;flags=;id=b34ccfc7-4977-403a-8a94-33c6bac34fb8;mod=0;returning-chatter=0;room-id=123456789;subscriber=0;tmi-sent-ts=1760049600123;turbo=0;user-id=987654321;user-type= :lea_navet!lea_navet@lea_navet.tmi.twitch.tv PRIVMSG #chainetest :!achat 10\r\n";

// Abonné (badges remplis), sans couleur choisie (color vide), pas de client-nonce
export const MSG_VENTE_ABONNE =
  "@badge-info=subscriber/3;badges=subscriber/3,premium/1;color=;display-name=TomLeMarchand;emotes=;first-msg=0;flags=;id=0c9a3f6e-1d2b-4c5e-9f8a-7b6c5d4e3f2a;mod=0;returning-chatter=0;room-id=123456789;subscriber=1;tmi-sent-ts=1760049605456;turbo=0;user-id=111222333;user-type= :tomlemarchand!tomlemarchand@tomlemarchand.tmi.twitch.tv PRIVMSG #chainetest :!vente tout\r\n";

// Modérateur
export const MSG_MODO =
  "@badge-info=;badges=moderator/1;color=#00FF7F;display-name=ModoMarcel;emotes=;first-msg=0;flags=;id=5e4d3c2b-1a09-4f8e-b7d6-c5b4a3928170;mod=1;returning-chatter=0;room-id=123456789;subscriber=0;tmi-sent-ts=1760049610789;turbo=0;user-id=444555666;user-type=mod :modomarcel!modomarcel@modomarcel.tmi.twitch.tv PRIVMSG #chainetest :!solde\r\n";

// Pseudo affiché non ASCII : display-name ≠ login (le login, dans le préfixe, reste en minuscules ASCII)
export const MSG_PSEUDO_UNICODE =
  "@badge-info=;badges=;color=#FF69B4;display-name=ネコ好き;emotes=;first-msg=0;flags=;id=9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d;mod=0;returning-chatter=0;room-id=123456789;subscriber=0;tmi-sent-ts=1760049615012;turbo=0;user-id=777888999;user-type= :nekozuki42!nekozuki42@nekozuki42.tmi.twitch.tv PRIVMSG #chainetest :!achat 5\r\n";

// Premier message de ce viewer sur la chaîne (first-msg=1), texte qui n'est pas une commande
export const MSG_PREMIER =
  "@badge-info=;badges=;color=#DAA520;display-name=Nouvelle_Venue;emotes=;first-msg=1;flags=;id=1f2e3d4c-5b6a-4987-a6b5-c4d3e2f1a0b9;mod=0;returning-chatter=0;room-id=123456789;subscriber=0;tmi-sent-ts=1760049620345;turbo=0;user-id=135792468;user-type= :nouvelle_venue!nouvelle_venue@nouvelle_venue.tmi.twitch.tv PRIVMSG #chainetest :coucou tout le monde !\r\n";

// Message avec emote (Kappa occupe les caractères 0 à 4 du texte) et " :" DANS le texte
export const MSG_EMOTE_ET_DEUX_POINTS =
  "@badge-info=;badges=;color=#8A2BE2;display-name=Blagueur;emotes=25:0-4;first-msg=0;flags=;id=2a3b4c5d-6e7f-4809-9a1b-2c3d4e5f6a7b;mod=0;returning-chatter=0;room-id=123456789;subscriber=0;tmi-sent-ts=1760049625678;turbo=0;user-id=246813579;user-type= :blagueur!blagueur@blagueur.tmi.twitch.tv PRIVMSG #chainetest :Kappa mon conseil : !achat 50\r\n";

// Commande envoyée avec /me : le texte est encadré par \u0001ACTION ... \u0001
export const MSG_ACTION_ME =
  "@badge-info=;badges=;color=#1E90FF;display-name=Lea_Navet;emotes=;first-msg=0;flags=;id=3b4c5d6e-7f80-4911-a2b3-c4d5e6f7a8b9;mod=0;returning-chatter=0;room-id=123456789;subscriber=0;tmi-sent-ts=1760049630901;turbo=0;user-id=987654321;user-type= :lea_navet!lea_navet@lea_navet.tmi.twitch.tv PRIVMSG #chainetest :\u0001ACTION !achat 3\u0001\r\n";

// Plusieurs messages dans UNE seule trame (arrive quand le chat va vite)
export const TRAME_MULTIPLE = MSG_ACHAT + MSG_VENTE_ABONNE + MSG_MODO;

// ─── 3. Commandes piégées (même format, texte malveillant ou maladroit) ────────

const piege = (texte, i) =>
  `@badge-info=;badges=;color=;display-name=Testeur${i};emotes=;first-msg=0;flags=;id=00000000-0000-4000-8000-00000000000${i};mod=0;returning-chatter=0;room-id=123456789;subscriber=0;tmi-sent-ts=17600496${40000 + i};turbo=0;user-id=50000000${i};user-type= :testeur${i}!testeur${i}@testeur${i}.tmi.twitch.tv PRIVMSG #chainetest :${texte}\r\n`;

export const PIEGES = [
  "!vente -10",
  "!achat 0",
  "!achat 1.5",
  "!achat 10abc",
  "!achat 99999999999999999999",
  "!achat",
  "!ACHAT 10",
  "!achat    10",
  "!achat dix",
  "!achatt 10",
].map(piege);

// ─── 4. Messages techniques du serveur ─────────────────────────────────────────

// À recevoir toutes les ~5 min. Réponse attendue : "PONG :tmi.twitch.tv"
export const PING = "PING :tmi.twitch.tv\r\n";

// Le serveur demande de se reconnecter (maintenance) : fermer et rouvrir la connexion
export const RECONNECT = ":tmi.twitch.tv RECONNECT\r\n";

// Un modérateur supprime UN message (target-msg-id = id du message supprimé)
export const CLEARMSG =
  "@login=lea_navet;room-id=;target-msg-id=b34ccfc7-4977-403a-8a94-33c6bac34fb8;tmi-sent-ts=1760049650000 :tmi.twitch.tv CLEARMSG #chainetest :!achat 10\r\n";

// Un viewer est exclu temporairement (timeout de 600 s)
export const CLEARCHAT_TIMEOUT =
  "@ban-duration=600;room-id=123456789;target-user-id=111222333;tmi-sent-ts=1760049655000 :tmi.twitch.tv CLEARCHAT #chainetest :tomlemarchand\r\n";

// Événement d'abonnement (USERNOTICE) : les espaces dans les valeurs de tags sont échappés en \s
export const USERNOTICE_SUB =
  "@badge-info=subscriber/1;badges=subscriber/0;color=;display-name=Nouvelle_Venue;emotes=;flags=;id=4c5d6e7f-8091-4a22-b3c4-d5e6f7a8b9c0;login=nouvelle_venue;mod=0;msg-id=sub;msg-param-cumulative-months=1;msg-param-sub-plan=1000;msg-param-sub-plan-name=Channel\\sSubscription;room-id=123456789;subscriber=1;system-msg=Nouvelle_Venue\\ssubscribed\\sat\\sTier\\s1.;tmi-sent-ts=1760049660000;user-id=135792468;user-type= :tmi.twitch.tv USERNOTICE #chainetest\r\n";
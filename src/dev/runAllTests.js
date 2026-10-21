// Runs every test file of the project, in order.
// Usage: node src/dev/runAllTests.js

console.log('\n=== twitch ===');
await import('../twitch/fragmentFrame.test.js');
await import('../twitch/extractParts.test.js');
await import('../twitch/parseTags.test.js');
await import('../twitch/parseFrame.test.js');
await import('../twitch/cleanText.test.js');

console.log('\n=== game ===');
await import('../game/splitWords.test.js');
await import('../game/parseQuantity.test.js');
await import('../game/parseDuration.test.js');
await import('../game/parseCommand.test.js');
await import('../game/ensurePlayer.test.js');
await import('../game/buy.test.js');
await import('../game/sell.test.js');
await import('../game/clampPrice.test.js');
await import('../game/applyChange.test.js');
await import('../game/nextPrice.test.js');
await import('../game/pickTrend.test.js');
await import('../game/pickDuration.test.js');
await import('../game/tickMarket.test.js');
await import('../game/events.test.js');
await import('../game/rotRadish.test.js');
await import('../game/countPlayers.test.js');
await import('../game/getLeaderboard.test.js');
await import('../game/getRank.test.js');
await import('../game/keepLast.test.js');
await import('../game/countRadish.test.js');
await import('../game/gameReducer.test.js');
await import('../game/handleTick.test.js');
await import('../game/handleEnd.test.js');
await import('../game/handleSeconds.test.js');
await import('../game/formatTime.test.js');
await import('../game/formatPercent.test.js');

console.log('\n=== bridge ===');
await import('../bridge/frameToActions.test.js');

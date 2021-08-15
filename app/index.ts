import { authenticate, Credentials, request } from "league-connect";
import { writeFileSync } from "fs";

/**
 * Uses the LCU API to get list of active game modes.
 */
async function getGameModes(credentials: Credentials): Promise<Array<any>> {
    console.log(`Fetching gamemodes`);
    const response = await request({
        method: "GET",
        url: "/lol-game-queues/v1/queues",
    }, credentials);
    const body = await response.json();
    let gamemodes = body.filter(x => x.queueAvailability === "Available");
    return gamemodes;
}

/**
 * Sleeps for the desired delay.
 */
async function sleep(ms:number): Promise<void> {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

/**
 * Main body
 */
async function main() {
    // Waits for client to be logged in
    console.log(`Fetching credentials`);
    const credentials = await authenticate({
        awaitConnection: true,
        pollInterval: 5000
    });

    // Once logged in, start polling the gamemode endpoint
    for(let attempt=0; attempt<500; attempt++) {
        console.log(`Attempt ${attempt}`);
        try {
            // Get gamemodes
            const gameModes = await getGameModes(credentials);

            // Display in console
            console.dir(gameModes);

            // Write the JSON file
            writeFileSync("./gamemodes.json", JSON.stringify({
                dateGenerated: new Date(),
                gameModes: gameModes.map(x => ({id: x.gameMode, name: x.name}))
            }, null, 4));

            // Exit with success(0) if URF is in the list, error(1) otherwise
            process.exit(gameModes.some(x => x.gameMode === "URF") ? 0 : 1);
        } catch (e) {
            console.log(e);
            await sleep(1000);
        }
    }

    // Exit with error if gamemodes endpoint didn't respond.
    process.exit(1);
}
main();
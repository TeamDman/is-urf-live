import { authenticate, Credentials, request } from "league-connect";

async function getGameModes(credentials: Credentials): Promise<Set<string>> {
    console.log(`Fetching gamemodes`);
    const response = await request({
        method: "GET",
        url: "/lol-game-queues/v1/queues",
    }, credentials);
    const body = await response.json();
    let gamemodes = body
        .filter(x => x.queueAvailability === "Available")
        .map(x => x.gameMode);
    gamemodes = new Set(gamemodes);
    return gamemodes;
}

async function sleep(ms:number): Promise<void> {
    return new Promise((res, rej) => {
        setTimeout(res, ms);
    });
}

async function main() {
    console.log(`Fetching credentials`);
    const credentials = await authenticate({
        awaitConnection: true,
        pollInterval: 5000
    });
    for(let attempt=0; attempt<500; attempt++) {
        console.log(`Attempt ${attempt}`);
        try {
            const gameModes = await getGameModes(credentials);
            console.dir(gameModes);
            process.exit(gameModes.has("URF") ? 0 : 1);
        } catch (e) {
            console.log(e);
            await sleep(1000);
        }
    }
    process.exit(1);
}
main();
# League of Legends Gamemode Fetcher - Is URF Live?

Scripts for using the League Client Update (LCU) API to check available gamemodes for URF.

## Required tools

- Powershell
- NodeJs
    - ts-node installed globally

## Usage

1. Run `npm init` in the [`app`](./app) dir
1. Copy the [`.env.example`](./.env.example) file to a file named `.env`
1. Edit `.env` with your configuraion
    - Storage account params only necessary for upload stage
1. Run [`1-launch.ps1`](./1-launch.ps1)

The script will launch the league client, get the list of current gamemodes, write it to a file, play music if URF is available, and uploads the JSON to an Azure storage account.

## Useful Links

- https://lol.teamdman.ca/ has a link to a JSON file for the list of PBE gamemodes, updated almost daily. I have a task to run this at startup and it updates the website with the results.
- https://github.com/supergrecko/league-connect
- https://github.com/Hi-Ray/LCU-Arguments

# Use Live
# $leagueClientPath = "C:\Riot Games\League of Legends\LeagueClient.exe";

# Use PBE
$leagueClientPath = "C:\Riot Games\League of Legends (PBE)\LeagueClient.exe";

# Start the league client in the background
$riotClient = Start-Process `
    -FilePath $leagueClientPath `
    -PassThru;

# Run the node script (blocking) that fetches the current gamemodes
ts-node .\app\index.ts;

# Script has exited and writen the gamemodes.json file
# If the script exits with 0, then URF is in the list of gamemodes
$isUrfLive=$?;

# Play the urf mp3 if it's available.
if ($isUrfLive) {
    .\resources\urf.mp3;
}

# Run the upload script to make the json available online for others
.\2-upload.ps1;

# Wait for user acknowledgement before closing dialog
Write-Host -NoNewLine 'Press any key to continue...';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');

# Close the league client
Stop-Process $riotClient;
Stop-Process -Name LeagueClient;
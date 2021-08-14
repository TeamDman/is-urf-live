# $leagueClientPath = "C:\Riot Games\League of Legends\LeagueClient.exe";
$leagueClientPath = "C:\Riot Games\League of Legends (PBE)\LeagueClient.exe";

$riotClient = Start-Process `
    -FilePath $leagueClientPath `
    -PassThru;

ts-node .\index.ts;
$isUrfLive=$?;

Stop-Process $riotClient;
Stop-Process -Name LeagueClient;

if ($isUrfLive) {
    .\urf.mp3;
}

.\upload.ps1;

# Write-Host -NoNewLine 'Press any key to continue...';
# $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
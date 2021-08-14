$config = Get-Content .env | ConvertFrom-StringData;

az storage blob upload `
    --account-name $config.STORAGE_ACCOUNT_NAME `
    --account-key $config.STORAGE_ACCOUNT_ACCESS_KEY `
    --container-name '$web' `
    --file .\gamemodes.json `
    --name "gamemodes.json";
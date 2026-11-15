$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$backup = Join-Path $root 'backups'
New-Item -ItemType Directory -Force -Path $backup | Out-Null
$archive = Join-Path $backup ("MEEDX-{0}.zip" -f (Get-Date -Format 'yyyy-MM-dd_HH-mm-ss-fff'))
$inputs = Get-ChildItem -LiteralPath $root -Force | Where-Object Name -NotIn @('backups','node_modules','dist','.git')
Push-Location -LiteralPath $root
try {
  & tar.exe -a --options zip:compression=store -cf $archive -- @($inputs.Name)
  if ($LASTEXITCODE -ne 0) { throw 'Archive creation failed.' }
  $listing = & tar.exe -tf $archive
  if ($LASTEXITCODE -ne 0 -or $listing -notcontains 'package.json' -or $listing -notcontains 'public/api/version.json') { throw 'Archive verification failed.' }
  Write-Output $archive
} finally { Pop-Location }

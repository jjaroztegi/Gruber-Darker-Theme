param(
  [string]$CodeCommand = "D:\Program Files\Microsoft VS Code\bin\code.cmd",
  [string]$TempRoot = (Join-Path $env:TEMP "gruber-darker-theme-vscode-qa"),
  [switch]$SkipPackage,
  [switch]$SkipLanguageExtensions
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$packageJson = Get-Content -Raw -LiteralPath (Join-Path $root "package.json") | ConvertFrom-Json
$vsixPath = Join-Path $root "$($packageJson.name)-$($packageJson.version).vsix"
$userData = Join-Path $TempRoot "user-data"
$extensions = Join-Path $TempRoot "extensions"
$settingsDir = Join-Path $userData "User"

if (-not (Test-Path -LiteralPath $CodeCommand)) {
  $codeFromPath = Get-Command code -ErrorAction SilentlyContinue
  if (-not $codeFromPath) {
    throw "Could not find VS Code. Pass -CodeCommand with the path to code.cmd."
  }
  $CodeCommand = $codeFromPath.Source
}

if (-not $SkipPackage) {
  Push-Location $root
  try {
    npm run package
  }
  finally {
    Pop-Location
  }
}

if (-not (Test-Path -LiteralPath $vsixPath)) {
  throw "VSIX was not found at $vsixPath."
}

New-Item -ItemType Directory -Force -Path $settingsDir, $extensions | Out-Null

@'
{
  "workbench.colorTheme": "Tsoding Gruber Darker",
  "editor.semanticHighlighting.enabled": true,
  "editor.fontFamily": "Cascadia Code, Consolas, monospace",
  "editor.bracketPairColorization.enabled": false,
  "editor.renderLineHighlight": "none",
  "workbench.activityBar.location": "top",
  "workbench.startupEditor": "none",
  "workbench.editor.showTabs": "multiple",
  "window.commandCenter": false,
  "extensions.ignoreRecommendations": true,
  "security.workspace.trust.enabled": false,
  "C_Cpp.errorSquiggles": "disabled",
  "go.showWelcome": false,
  "go.diagnostic.vulncheck": "Off",
  "dotnet.preferCSharpExtension": true,
  "dotnet.server.useOmnisharp": false
}
'@ | Set-Content -LiteralPath (Join-Path $settingsDir "settings.json") -Encoding UTF8

& $CodeCommand --user-data-dir $userData --extensions-dir $extensions --install-extension $vsixPath --force

if (-not $SkipLanguageExtensions) {
  $languageExtensions = @(
    "ms-vscode.cpptools",
    "ms-dotnettools.csharp",
    "golang.go",
    "ms-python.python",
    "ms-python.vscode-pylance",
    "rust-lang.rust-analyzer"
  )

  foreach ($extensionId in $languageExtensions) {
    & $CodeCommand --user-data-dir $userData --extensions-dir $extensions --install-extension $extensionId --force
  }
}

$examples = Join-Path $root "examples"
$files = @(
  (Join-Path $examples "typescript_example.ts"),
  (Join-Path $examples "csharp_example.cs"),
  (Join-Path $examples "python_example.py"),
  (Join-Path $examples "rust_example.rs"),
  (Join-Path $examples "go_example.go"),
  (Join-Path $examples "cpp_example.cpp")
)

& $CodeCommand --user-data-dir $userData --extensions-dir $extensions --new-window $examples @files

Write-Output "VS Code QA user-data: $userData"
Write-Output "VS Code QA extensions: $extensions"

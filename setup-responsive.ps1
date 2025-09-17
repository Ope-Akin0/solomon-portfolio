# setup-responsive.ps1
# PowerShell script to add a responsive.css file with modern best practices
# and automatically link it in index.html

# -----------------------------
# Paths
# -----------------------------
$projectRoot   = Get-Location
$srcFolder     = Join-Path $projectRoot "src"
$cssFolder     = Join-Path $srcFolder "styles"
$responsiveFile = Join-Path $cssFolder "responsive.css"

# -----------------------------
# Ensure styles folder exists
# -----------------------------
if (-Not (Test-Path $cssFolder)) {
    Write-Host "📂 Creating styles folder..."
    New-Item -ItemType Directory -Path $cssFolder | Out-Null
}

# -----------------------------
# Create responsive.css with modern responsive boilerplate
# -----------------------------
@"
 /* ===============================
    Responsive.css — Modern Starter
    =============================== */

 /* Reset / Base */
 * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
 }

 html {
     font-size: 100%;
     -webkit-text-size-adjust: 100%;
 }

 body {
     font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
     line-height: 1.5;
     color: #222;
     background: #fff;
     max-width: 100%;
     overflow-x: hidden;
 }

 img, video {
     max-width: 100%;
     height: auto;
     display: block;
 }

 /* Fluid Typography */
 :root {
     --min-font: 16px;
     --max-font: 20px;
     --fluid-font: clamp(var(--min-font), 2vw, var(--max-font));
 }

 body {
     font-size: var(--fluid-font);
 }

 h1, h2, h3, h4, h5, h6 {
     line-height: 1.2;
 }

 /* Layout Helpers */
 .container {
     width: 100%;
     max-width: 1200px;
     margin: 0 auto;
     padding: 0 1rem;
 }

 .flex {
     display: flex;
     gap: 1rem;
 }

 .grid {
     display: grid;
     gap: 1rem;
 }

 /* Breakpoints */
 @media (max-width: 768px) {
     /* Tablet & below */
     body {
         font-size: 15px;
     }

     .grid-2 {
         grid-template-columns: 1fr;
     }
 }

 @media (max-width: 480px) {
     /* Mobile */
     body {
         font-size: 14px;
     }

     .hide-mobile {
         display: none !important;
     }
 }

 @media (min-width: 1024px) {
     /* Desktop */
     .grid-2 {
         grid-template-columns: repeat(2, 1fr);
     }
 }

 @media (min-width: 1440px) {
     /* Large screens */
     body {
         font-size: 18px;
     }
 }
"@ | Out-File -FilePath $responsiveFile -Encoding utf8

Write-Host "✅ Created responsive.css at $responsiveFile"

# -----------------------------
# Auto-link in index.html
# -----------------------------
$indexFile = Join-Path $projectRoot "public\index.html"
if (-Not (Test-Path $indexFile)) {
    $indexFile = Join-Path $projectRoot "index.html"
}

if (Test-Path $indexFile) {
    $htmlContent = Get-Content $indexFile
    $linkTag = @"
    <link rel="stylesheet" href="./src/styles/responsive.css" />
"@

    if ($htmlContent -notmatch "responsive.css") {
        $newContent = $htmlContent -replace '(</head>)', "$linkTag`r`n`$1"
        $newContent | Set-Content $indexFile
        Write-Host "✅ Linked responsive.css in $indexFile"
    } else {
        Write-Host "⚠️ responsive.css already linked in $indexFile"
    }
} else {
    Write-Host "⚠️ Could not find index.html file!"
}

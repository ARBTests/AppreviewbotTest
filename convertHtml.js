const fs = require('fs');
const path = require('path');

// Specify the path to the input file and the output HTML file
const inputFile = path.join(__dirname, 'consoleLogs/test_logs.log');
const outputFile = path.join(__dirname, 'consoleLogs/test_consoleLog.html');

// Read the content from the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the input file:', err);
        return;
    }

    // Create the HTML content
    const htmlContent = 
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Test Report</title>
  <style type="text/css">
    html,
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1rem;
      margin: 0;
      padding: 0;
      color: #333;
    }

    body {
      padding: 2rem 1rem;
      font-size: 0.85rem;
    }

    .jesthtml-content {
      margin: 0 auto;
      max-width: 70rem;
    }

    header {
      display: flex;
      align-items: center;
    }

    #title {
      margin: 0;
      flex-grow: 1;
    }

    #logo {
      height: 4rem;
    }

    #timestamp {
      color: #777;
      margin-top: 0.5rem;
    }

    /** SUMMARY */
    #summary {
      color: #333;
      margin: 2rem 0;
      display: flex;
      font-family: monospace;
      font-size: 1rem;
    }

    #summary>div {
      margin-right: 2rem;
      background: #eee;
      padding: 1rem;
      min-width: 15rem;
    }

    #summary>div:last-child {
      margin-right: 0;
    }

    @media only screen and (max-width: 720px) {
      #summary {
        flex-direction: column;
      }

      #summary>div {
        margin-right: 0;
        margin-top: 2rem;
      }

      #summary>div:first-child {
        margin-top: 0;
      }
    }

    .summary-total {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .summary-passed {
      color: #4f8a10;
      border-left: 0.4rem solid #4f8a10;
      padding-left: 0.5rem;
    }

    .summary-failed,
    .summary-obsolete-snapshots {
      color: #d8000c;
      border-left: 0.4rem solid #d8000c;
      padding-left: 0.5rem;
    }

    .summary-pending {
      color: #9f6000;
      border-left: 0.4rem solid #9f6000;
      padding-left: 0.5rem;
    }

    .summary-empty {
      color: #999;
      border-left: 0.4rem solid #999;
    }

    .test-result {
      padding: 1rem;
      margin-bottom: 0.25rem;
    }

    .test-result:last-child {
      border: 0;
    }

    .test-result.passed {
      background-color: #dff2bf;
      color: #4f8a10;
    }

    .test-result.failed {
      background-color: #ffbaba;
      color: #d8000c;
    }

    .test-result.pending {
      background-color: #ffdf61;
      color: #9f6000;
    }

    .test-info {
      display: flex;
      justify-content: space-between;
    }

    .test-suitename {
      width: 20%;
      text-align: left;
      font-weight: bold;
      word-break: break-word;
    }

    .test-title {
      width: 40%;
      text-align: left;
      font-style: italic;
    }

    .test-status {
      width: 20%;
      text-align: right;
    }

    .test-duration {
      width: 10%;
      text-align: right;
      font-size: 0.75rem;
    }

    .failureMessages {
      padding: 0 1rem;
      margin-top: 1rem;
      border-top: 1px dashed #d8000c;
    }

    .failureMessages.suiteFailure {
      border-top: none;
    }

    .failureMsg {
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }

    .suite-container {
      margin-bottom: 2rem;
    }

    .suite-container>input[type="checkbox"] {
      position: absolute;
      left: -100vw;
    }

    .suite-container label {
      display: block;
    }

    .suite-container .suite-tests {
      overflow-y: hidden;
      height: 0;
    }

    .suite-container>input[type="checkbox"]:checked~.suite-tests {
      height: auto;
      overflow: visible;
    }

    .suite-info {
      padding: 1rem;
      background-color: #eee;
      color: #777;
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
    }

    .suite-info:hover {
      background-color: #ddd;
      cursor: pointer;
    }

    .suite-info .suite-path {
      word-break: break-all;
      flex-grow: 1;
      font-family: monospace;
      font-size: 1rem;
    }

    .suite-info .suite-time {
      margin-left: 0.5rem;
      padding: 0.2rem 0.3rem;
      font-size: 0.75rem;
    }

    .suite-info .suite-time.warn {
      background-color: #d8000c;
      color: #fff;
    }

    .suite-info:before {
       
      display: inline-block;
      margin-right: 0.5rem;
      transform: rotate(0deg);
    }

    .suite-container>input[type="checkbox"]:checked~label .suite-info:before {
      transform: rotate(180deg);
    }

    /* CONSOLE LOGS */
    .suite-consolelog {
      margin-bottom: 0.25rem;
      padding: 1rem;
      background-color: #efefef;
    }

    .suite-consolelog-header {
      font-weight: bold;
    }

    .suite-consolelog-item {
      padding: 0.5rem;
    }

    .suite-consolelog-item pre {
      margin: 0.5rem 0;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }

    .suite-consolelog-item-origin {
      color: #777;
      font-weight: bold;
    }

    .suite-consolelog-item-message {
      color: #000;
      font-size: 1rem;
      padding: 0 0.5rem;
    }

    /* OBSOLETE SNAPSHOTS */
    .suite-obsolete-snapshots {
      margin-bottom: 0.25rem;
      padding: 1rem;
      background-color: #ffbaba;
      color: #d8000c;
    }

    .suite-obsolete-snapshots-header {
      font-weight: bold;
    }

    .suite-obsolete-snapshots-item {
      padding: 0.5rem;
    }

    .suite-obsolete-snapshots-item pre {
      margin: 0.5rem 0;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }

    .suite-obsolete-snapshots-item-message {
      color: #000;
      font-size: 1rem;
      padding: 0 0.5rem;
    }
  </style>
</head>

<body>
  <div class="console-content">
    <header>
      <h1 id="title">Test Report- Console messages</h1>
    </header>
    <div id="metadata-container">
    </div>
    <div id="suite-1" class="suite-container"><input id="collapsible-0" type="checkbox" class="toggle"
        checked="checked" /><label for="collapsible-0">
        <div class="suite-info">
          <div class="suite-path">C:\Users\w3dev\Desktop \puppeteer-githubActions\__test__\arbsearch.test.js</div>
          <div class="suite-time warn">22.568s</div>
        </div>
      </label>
      <div class="suite-tests">
        <div class="test-result passed">
          <div class="test-info">
            <pre>${escapeHtml(data)}</pre>
            </div> 
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Write the HTML content to the output file
    fs.writeFile(outputFile, htmlContent, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the HTML file:', err);
            return;
        }
        console.log('HTML file has been created:', outputFile);
    });
});

// Function to escape HTML special characters in the input data
function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
}

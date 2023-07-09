import parseCLF from "./parseCLF.js";

const logLine = `207.97.227.239 - - [10/Jul/2023:14:02:39 -0400] "GET /example/path HTTP/1.1" 200 2326 "http://www.example.com/start.html" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3" - 123ms`;
console.log(logLine);

const results = parseCLF(logLine);
console.log(results)
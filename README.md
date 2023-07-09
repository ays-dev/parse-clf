## parse-clf extended

Extended Common Log Format from Apache parsed  

const log = `207.97.227.239 - - [10/Jul/2023:14:02:39 -0400] "GET /example/path HTTP/1.1" 200 2326 "http://www.example.com/start.html" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3" - 123ms`;

const parsed = parseCLF(log);

console.log(parsed);
//
=>
{
  remote_addr: '207.97.227.239',
  remote_user: '-',
  date: 2023-07-10T18:02:39.000Z,
  method: 'GET',
  url: '/example/path',
  http_version: 'HTTP/1.1',
  status: 200,
  content_length: 2326,
  referrer: 'http://www.example.com/start.html',
  user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  duration: 123,
  extended: {
    user_agent: {
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        browser: { name: 'Chrome', version: '58.0.3029.110', major: '58' },
        engine: { name: 'Blink', version: '58.0.3029.110' },
        os: { name: 'Windows', version: '10' },
        cpu: { architecture: 'amd64' }
    },
    ip: {
        range: [ 3479298048, 3479302143 ],
        country: 'US',
        region: 'TX',
        eu: '0',
        timezone: 'America/Chicago',
        city: 'San Antonio',
        ll: [ 29.4963, -98.4004 ],
        metro: 641,
        area: 1000
    },
    status_code: { status: 200, type: '2XX', message: 'OK' }
  }
}
import geoip from "geoip-lite";
import HTTPStatusCode from "http-status-code";
import UAParser from "ua-parser-js";

const parser = new UAParser();

const getStatusCodeType = (statusCode) => {
    if (statusCode.startsWith("5")) {
        return "5XX"
    } else if (statusCode.startsWith("4")) {
        return "4XX"
    } else if (statusCode.startsWith("3")) {
        return "3XX"
    } else if (statusCode.startsWith("2")) {
        return "2XX"
    } else if (statusCode.startsWith("1")) {
        return "1XX"
    }
}

const parseCLFDate = (clfDate) => {
    const jsDate = clfDate.replace(/:/, ' ');

    return new Date(Date.parse(jsDate));
}

export default function parseCLF(logLine) {
    const regex = /(?<ip>.*?) - (?<remote_user>.*?) \[(?<date>.*?)\] \"(?<method>.*?) (?<url>.*?) (?<http_version>.*?)\" (?<status>.*?) (?<content_length>.*?) \"(?<referrer>.*?)\" \"(?<user_agent>.*?)\" - (?<duration>\d+(\.\d+)?)(ms)?/g;
    const match = regex.exec(logLine);
    const parsedUserAgent = parser.setUA(match.groups['user_agent']).getResult();
    const parsedIpAddress = geoip.lookup(match.groups['ip']);
    const parsedStatusCode = HTTPStatusCode.getMessage(match.groups['status'], match.groups['method'])
    const statusCodeType = getStatusCodeType(match.groups['status']);

    const logObject = {
        remote_addr: match.groups['ip'],
        remote_user: match.groups['remote_user'],
        date: parseCLFDate(match.groups['date']),
        method: match.groups['method'],
        url: match.groups['url'],
        http_version: match.groups['http_version'],
        status: parseInt(match.groups['status']),
        content_length: parseInt(match.groups['content_length']),
        referrer: match.groups['referrer'],
        user_agent: match.groups['user_agent'],
        duration: parseInt(match.groups['duration']),
        extended: {
            user_agent: parsedUserAgent,
            ip: parsedIpAddress,
            status_code: {
                status: parseInt(match.groups['status']),
                type: statusCodeType,
                message: parsedStatusCode
            }
        }
    };

    return logObject;
}

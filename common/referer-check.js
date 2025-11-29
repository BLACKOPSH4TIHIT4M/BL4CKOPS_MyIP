import dotenv from 'dotenv';
// Keep startup output clean: silence dotenv tips temporarily
{
    const _consoleLog = console.log;
    try {
        console.log = () => {};
        dotenv.config({ debug: false });
    } finally {
        console.log = _consoleLog;
    }
}

function refererCheck(referer, hostHeader) {
    // Normalize allowed domains
    const raw = process.env.ALLOWED_DOMAINS || '';
    const items = raw.split(',').map(s => s && s.trim()).filter(Boolean);
    const allowedDomains = new Set(['localhost', '127.0.0.1', ...items]);

    // If referer present (from browser), validate hostname
    if (referer) {
        try {
            const domain = new URL(referer).hostname;
            if (allowedDomains.has(domain)) return true;
        } catch (e) {
            return false;
        }
    }

    // Fallback to host header or X-Forwarded-Host when referer missing (e.g., curl or proxied)
    if (hostHeader) {
        // hostHeader may include port
        const host = hostHeader.split(':')[0];
        if (allowedDomains.has(host)) return true;
    }

    return false;
}

export { refererCheck };

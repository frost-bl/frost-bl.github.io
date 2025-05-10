function isTailscaleIP(ip) {
    // Tailscale uses CGNAT range 100.64.0.0/10
    var parts = ip.split(".");
    var first = parseInt(parts[0]);
    var second = parseInt(parts[1]);
    return first === 100 && second >= 64 && second <= 127;
}

function FindProxyForURL(url, host) {
    var resolvedIP = dnsResolve(host);
    if (resolvedIP && isTailscaleIP(resolvedIP)) {
        return "DIRECT";
    }

    return "SOCKS5 100.76.215.61:8080";
}

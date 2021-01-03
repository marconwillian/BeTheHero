const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

Sentry.init({
    dsn: process.env.SENTRY_DNS,
    tracesSampleRate: 1.0,
    release: `bethehero_server@${process.env.npm_package_version}`
});

module.exports = Sentry;
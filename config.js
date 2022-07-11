module.exports = {
    jwtSecret: "QrDCTldbDAjJ0Q3IU7DxAJCpTErCdvqECf6xeuEpgJyzWvJAIxgjiDV7mJxorWJ",
    // mongooseConnect: "mongodb://localhost:27017/log-viewer"
    mongooseConnect: "mongodb://mongo:27017/log-viewer",
    severity_levels: ["emerg", "alert", "crit", "err", "warning", "notice", "info", "debug"],
    roles: ["Admin", "User", "System"]
}
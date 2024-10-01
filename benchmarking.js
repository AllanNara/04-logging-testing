const autocannon = require("autocannon")

async function init () {
    const instance = autocannon({
        url: "http://localhost:3000",
        connections: 10,
        duration: 5
    })

    autocannon.track(instance, {
        renderProgressBar: true
    })
}

init();
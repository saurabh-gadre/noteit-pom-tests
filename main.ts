const createTestCafe = require('testcafe');

createTestCafe('localhost', 1337, 1338).then( tc => {
    tc
        .createRunner()
        .concurrency(2)
        .run()
        .then(nbFailedTests => {
            process.exit(nbFailedTests ? 1 : 0);
        });
});

// node main.ts --user=john.doe --pwd=password123

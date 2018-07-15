before(function(done) {
    //Connect to Mock DB instead of real DB
    //this.timeout(10000);
    console.log('before hook executed');
    done();
});

after(function(done) {
    console.log('after hook executed');
    done();
});
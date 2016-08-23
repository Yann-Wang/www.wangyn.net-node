/**
 * Created by spray on 16-8-23.
 */
const unirest = require('unirest');
const assert  = require('assert');

// 测试连接
describe('首页访问', function () {
    this.timeout(5000); //should take less than 5s
    it('请求首页', function (done) {
        unirest.get('http://localhost:3000/')
            .timeout(5000)
            .end(function (res) {
                assert.equal(res.statusCode, 200, "request succeed.");

                done();
            });
    });

});
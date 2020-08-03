let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let Report = require('../models/Report');
let should = chai.should();
let app = require('../app');
chai.use(chaiHttp);
let token;


describe('Reports API', () => {
    // getting the authorization token before api calls
    beforeEach(async () => {
        let res = await chai.request(app)
            .post('/api/v1/doctors/login')
            .type('form')
            .send({
                'username': 'test_doctor',
                'password': 'test_password'
            });

        token = res.body.token;
    });


    //this test passes if reports of a particular type are returned
    describe('POST /reports/:status', () => {
        it('Should return reports with a particular status', async () => {
            let report = await chai.request(app)
                .post('/api/v1/reports/Positive')
                .set({ "Authorization": `Bearer ${token}` })
                .type('form');

            report.should.have.status(200);
            report.should.be.a.json;
        });
    });

    //this test passes if no report of a particular type is returned
    describe('POST /reports/:status', () => {
        it('Should return No reports if a particular status\'s report is not present', async () => {
            let report = await chai.request(app)
                .post('/api/v1/reports/xxxxxxx')
                .set({ "Authorization": `Bearer ${token}` })
                .type('form');

            report.should.have.status(200);
            report.body.Message.should.be.eql('No reports with this Status');
        });
    });
});
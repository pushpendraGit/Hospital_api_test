let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let Patient = require('../models/Patient');
let Report = require('../models/Report');
let should = chai.should();
let app = require('../app');
chai.use(chaiHttp);
let token;

describe('Patient API', () => {

    //getting the authorization token before api calls
    beforeEach(async()=>{
        let res = await chai.request(app)
        .post('/api/v1/doctors/login')
        .type('form')
        .send({
            'username': 'test_doctor',
            'password': 'test_password'
        });

        token = res.body.token;
    });

    //remove all patients from the collection before creating one
    before((done) => {
        Patient.deleteMany({}, (err) => {
        });
        Report.deleteMany({},(err)=>{
        });
        done();
    });

    //this test passes if new patients are successfully registered
    describe('/POST /patients/register', () => {
        it('Should create a new Patient in the collection', async () => {
            //creating a new patient with the authorzation token
            let patient = await chai.request(app)
                .post('/api/v1/patients/register')
                .set({ "Authorization": `Bearer ${token}` })
                .type('form')
                .send({
                    'phone': '987654321'
                });

            patient.should.have.status(200);
            patient.body.message.should.be.eql('New Patient Registered');
        });
    });

    //this test passes if new reports are successfully being generated
    describe('/POST patients/:id/create_report', () => {
        it('Should create a new Report in the collection', async () => {
            //creating new report with the auth token
            let report = await chai.request(app)
                .post('/api/v1/patients/987654321/create_report')
                .set({ "Authorization": `Bearer ${token}` })
                .type('form')
                .send({
                    'Status': 'Positive'
                });

            report.should.have.status(200);
            report.body.message.should.be.eql('Report created');
        });
    });

    //this test passes if empty status of report is prohibited successfully
    describe('/POST patients/:id/create_report', () => {
        it('Should not allow reports with empty Status', async() => {
                //creating new report with the empty status
                let report = await chai.request(app)
                    .post('/api/v1/patients/987654321/create_report')
                    .set({ "Authorization": `Bearer ${token}` })
                    .type('form')
                    .send({
                        'Status': ''
                    });
    
                report.should.have.status(422);
                report.body.Message.should.be.eql('Please enter the status of report');
            });
    });

    //this test passes if invalid Patients are blocked while report creation
    describe('/POST patients/:id/create_report', () => {
            it('Should not create a new Report with invalid Patient ID', async () => {
                //creating new report with the empty status
                let report = await chai.request(app)
                    .post('/api/v1/patients/11223344552233/create_report')
                    .set({ "Authorization": `Bearer ${token}` })
                    .type('form')
                    .send({
                        'Status': 'Positive'
                    });
    
                report.should.have.status(200);
                report.body.Message.should.be.eql('No such Patient');
            });
        });

    //this test passes if unauthorized tokens are blocked from creating report
    describe('/POST /patients/:id/create-report', () => {
        it('Should not allow Invalid Tokens/Expired tokens to create reports', async() => {
            let res = await chai.request(app)
                .post('/api/v1/patients/987654321/create_report')
                .set({ "Authorization": `Bearer ` })
                .type('form')
                .send({
                    'Status': ''
                });
                res.should.have.status(401);
        });
    });

    //this test should pass if unauthorized patient creation is blocked
    describe('/POST /patients/register', () => {
        it('Should not allow Invalid Tokens/Expired tokens to register patients', async() => {
            let res = await chai.request(app)
                .post('/api/v1/patients/register')
                .set({ "Authorization": `Bearer ` })
                .type('form')
                .send({
                    'Status': ''
                });
            res.should.have.status(401);
        });
    });

    //this test will pass if we get back the newly creted report
    describe('/POST /patients/:id/all_reports',()=>{
        it('Should get the newly created report', async()=>{
            let report = await chai.request(app)
            .post('/api/v1/patients/987654321/all_reports')
            .type('form');
            report.status.should.be.eql(200);
            report.body.should.be.a('array');

        });
    });

});



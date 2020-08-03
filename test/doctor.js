let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let Doctor = require('../models/Doctor');
let should = chai.should();
let app = require('../app');
chai.use(chaiHttp);


describe('Doctor',()=>{
    //before registering a user empty the doctor collection
    before((done)=>{
        Doctor.deleteMany({},(err)=>{
            done();
        });
    });
    //this test passes if a new doctor is successfully registered
    describe('/POST doctors/register',()=>{
        it('Should Register a new Doctor',(done)=>{
            chai.request(app)
            .post('/api/v1/doctors/register')
            .type('form')
            .send({
                'username':'test_doctor',
                'password':'test_password'
            })
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.Message.should.be.eql("New Doctor registered");
                done();
            });
        });
    });

    //this test passes if an already existing username is not re-registered
    describe('/POST doctors/register',()=>{
        it('Should not register new Doctor if already registered',(done)=>{
            chai.request(app)
            .post('/api/v1/doctors/register')
            .type('form')
            .send({
                'username':'test_doctor',
                'password':'test_password'
            })
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.Message.should.be.eql("Doctor already registered, try other username" , 'Failed at Registering same user again');
                done();
            });
        });
    });

    //this test passes if the dcotor is able to login from correct credentials
    describe('/POST /doctors/login', ()=>{
        it('Should login and return Auth Token',(done)=>{
            chai.request(app)
            .post('/api/v1/doctors/login')
            .type('form')
            .send({
                'username':'test_doctor',
                'password':'test_password'
            })
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.Message.should.be.eql('Signed in Successfully');
                done();
            });
        });
    });

    //this test passes if the invalid credentials are detected
    describe('/POST /doctors/login', ()=>{
        it('Should not login unauthorized users',(done)=>{
            chai.request(app)
            .post('/api/v1/doctors/login')
            .type('form')
            .send({
                'username':'test_doctor',
                'password':'wrong_password'
            })
            .end((err,res)=>{
                res.should.have.status(422);
                res.body.Message.should.be.eql('Invalid Credentails');
                done();
            });
        });
    });
    

});

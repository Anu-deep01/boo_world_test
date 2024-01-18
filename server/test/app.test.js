import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

console.log(require.resolve('/home/developer/Downloads/boo-coding-assigment/server/app'));

const { expect } = chai;
chai.use(chaiHttp);

let mongoServer;

before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Routes', () => {
    it('should get all users', async () => {
        const res = await chai.request(app).get('/users');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    it('should get a user by ID', async () => {
        // Assuming you have a valid user ID in your test database
        const userId = '1234567890';
        const res = await chai.request(app).get(`/users/${userId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('username');
    });

    it('should create a new user profile', async () => {
        const newUser = {
            username: 'JohnDoe',
            // Add other necessary fields for user creation
        };

        const res = await chai.request(app).post('/users').send(newUser);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('username');
        // You may add more assertions based on the response structure
    });
});

describe('Comment Routes', () => {
    it('should get all comments', async () => {
        const res = await chai.request(app).get('/comments');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    it('should add a new comment', async () => {
        const newComment = {
            text: 'This is a test comment',
            userId: '1234567890',
            voting: { mbti: { isSelected: true, content: 'INFJ' }, enneagram: { isSelected: true, content: 'Type 1' }, zodiac: { isSelected: true, content: 'Aries' } },
        };

        const res = await chai.request(app).post('/comments').send(newComment);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('text');
        // You may add more assertions based on the response structure
    });

    it('should update an existing comment', async () => {
        // Assuming you have a valid comment ID in your test database
        const commentId = '1234567890';
        const updatedComment = {
            text: 'Updated test comment',
            // Add other necessary fields for comment update
        };

        const res = await chai.request(app).put('/comments').send({ commentId, ...updatedComment });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // You may add more assertions based on the response structure
    });
});

describe('Like Routes', () => {
    it('should toggle a like for a comment', async () => {
        // Assuming you have a valid user ID and comment ID in your test database
        const userId = '1234567890';
        const commentId = '0987654321';

        const res = await chai.request(app).post('/likes/toggle').send({ userId, commentId });
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // You may add more assertions based on the response structure
    });
});

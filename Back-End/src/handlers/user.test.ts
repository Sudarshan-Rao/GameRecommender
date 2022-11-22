import * as user from './user';

describe('User', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    it('should be able to create a new user', async () => {
        const req = {
            body: {
                email: '',
                password: ''
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        const next = jest.fn();
        await user.registerUserHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
    });
    it('should be able to login', async () => {
        const req = {
            body: {
                email: '',
                password: ''
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        const next = jest.fn();
        await user.loginUserHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
    });
});

//         const response = await user.registerUserHandler({
//             name: 'John Doe',
//             email: 'sudarshan',
//             password: '123456',
//         });
//         expect(response.status).toBe(200);
//     }
//     it('should not be able to create a new user with same email from another', async () => {
//         const response = await user.create({
//             name: 'John Doe',
//             email: 'sudarshan',
//             password: '123456',
//         });
//         expect(response.status).toBe(400);
//     }
//     it('should be able to authenticate with valid credentials', async () => {
//         const response = await user.authenticate({
//             email: 'sudarshan',
//             password: '123456',
//         });
//         expect(response.status).toBe(200);
//     }
//     it('should not be able to authenticate with invalid credentials', async () => {
//         const response = await user.authenticate({
//             email: 'sudarshan',
//             password: '1234567',
//         });
//         expect(response.status).toBe(401);
//     }
//     it('should be able to return a jwt token when authenticated', async () => {
//         const response = await user.authenticate({
//             email: 'sudarshan',
//             password: '123456',
//         });
//         expect(response.body).toHaveProperty('token');
//     }
//     it('should be able to access private routes when authenticated', async () => {
//         const response = await user.dashboard({
//             token: token,
//         });
//         expect(response.status).toBe(200);
//     }
//     it('should not be able to access private routes when not authenticated', async () => {
//         const response = await user.dashboard();
//         expect(response.status).toBe(401);
//     }
//     it('should be able to receive a new jwt token when authenticated with a valid refresh token', async () => {
//         const response = await user.refresh({
//             refreshToken: refreshToken,
//         });
//         expect(response.body).toHaveProperty('token');
//     }
//     it('should not be able to receive a new jwt token when not authenticated with a valid refresh token', async () => {
//         const response = await user.refresh({
//             refreshToken: 'invalid-refresh-token',
//         });
//         expect(response.status).toBe(401);
//     }
// });

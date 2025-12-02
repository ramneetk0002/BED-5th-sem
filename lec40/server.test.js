const User=require('./model/user.schema');
const request=require('supertest'); 
const app=require('./server');
jest.mock('./model/user.schema');

describe("POST /api/users/register", ()=>{
    it("should return user Exist-if he try to register with email which are already present in database",async ()=>{
        User.findOne.mockResolvedValueOnce(true);
        let response=await request(app).post("/api/users/register")
        .send({
            name:"ramneet",
            email:"ramneet@gmail.com",
            password:"1234"
        })
        expect(response.body.message).toBe("User already exists");   
    })
    it("should create new user with email ramneet@gmail.com",async ()=>{
        User.findOne.mockResolvedValueOnce(false)
        User.create.mockResolvedValueOnce({
            name:"ramneet",
            email:"ramneet@gmail.com",
            password:"1234"
        })
        let response=await request(app).post("/api/users/register").send({
            name:"ramneet",
            email:"ramneet@gmail.com",
            password:"1234"
        })
        expect(response.body.message).toBe("User registered successfully");
        expect(response.body.data).toEqual({
            name:"ramneet",
            email:"ramneet@gmail.com",
            password:"1234"
        })
    })
})
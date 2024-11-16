const axios = require("axios");


const BACKEND_URL = "http://localhost:3000"

describe("Authentication",()=>{
   
   test('User is able to sign up only once',async() => {
    const username = "yuvraj" + Math.random();
    const password = "123456";
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup` , {
        username,password,type:"admin"
    })

    expect(response.statusCode).toBe(200)

    const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/user/signup` , {
        username,password,type:"admin"
    })

    expect(updatedResponse).toBe(400)
   });

   test('Signup request fails if the username is empty', async () => {
    const username = `kirat-${Math.random()}` // kirat-0.12312313
    const password = "123456"

    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        password
    })

    expect(response.status).toBe(400)
   })

   test('Signin succeeds if the username and password are correct', async() => {
    const username = `kirat-${Math.random()}`
    const password = "123456"

    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type: "admin"
    });

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
    });

    expect(response.status).toBe(200)
    expect(response.data.token).toBeDefined()
    
   })
  


})
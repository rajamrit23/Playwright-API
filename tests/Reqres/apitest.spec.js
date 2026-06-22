import{test,expect}from'@playwright/test';

test('API GET request test',async({request})=>{
const respone=await request.get('https://reqres.in/api/users/2',
{
    headers:{
        'x-api-key': process.env.reqres_API_TOKEN,
    },
}
);
expect.soft(respone.status()).toBe(200);
const data=await respone.text();
expect(data).toContain('John');
console.log('Response Data:',data);
});
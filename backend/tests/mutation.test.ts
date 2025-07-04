import app from '../src/app'; // Your Express/Koa app with GraphQL endpoint

describe('Brighte Eats', () => {
  it('should greet', async () => {
    const query = {
        query: `query Hello {
                    hello {
                        text
                        views
                    }
                }`    
    };
    const res = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    });
    const resData = await res.json();

    expect(res.status).toEqual(200);
    expect(resData.data.hello.text).toEqual('Happy Coding');
  });

  it('should provide a list of leads', async() => {
    const graphqlQuery = {
        query: `query Leads {
                    leads {
                        id
                        name
                        email
                        mobile
                        postcode
                        services
                    }
                }`
    };
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    });
    const resData = await response.json();
    const expectedServices = ['pickup', 'delivery', 'payment'];
    expect(response.status).toEqual(200);
    expect(resData.data.leads[0]).toHaveProperty('id');
    expect(expectedServices).toContain(resData.data.leads[0]['services'][0]);
    //.toEqual([expect.objectContaining({id: expect.any(Number), services: expect.arrayOf(expectedServices), email:  expect.any(String), mobile:  expect.any(String), name:  expect.any(String), postcode:  expect.any(String)}) ]);

  });

  it('should accept registration input for a lead', async() => {
    const graphqlQuery = {
        query: `mutation Register {
                    register(
                        registrationInput: {
                            postcode: "3214"
                            mobile: "09253092415"
                            email: "erwin_pogi0808@yahoo.com"
                            name: "Erwin Pogi"
                            services: ["payment"]
                        }
                    ) {
                        id
                        name
                        email
                        mobile
                        postcode
                        services
                    }
                }`
    };
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
    });
    const resData = await response.json();

    expect(response.status).toEqual(200);
    expect(resData.data.register).toEqual(expect.objectContaining({id: expect.any(Number)}))
    expect(resData.data.register.id).toBeGreaterThan(0);
  });
});
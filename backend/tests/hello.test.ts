import {describe, expect, test} from '@jest/globals';
import {GraphQLClient} from 'graphql-request';

// create a new graphql client for requesting to our api
const client = new GraphQLClient("http://localhost:8080/graphql");
describe('create register mutation', () => {

    test('take a service registration', async () => {

        // graphql query
        const query = `#graphql 
        mutation Register {
            register(
                registrationInput: { $name: string, $email: string, $services: string[], $postcode: string, $mobile: string }
            ) {
                id
                name
                email
                mobile
                postcode
                services
            }
        }
        `;

        // query variables
        const variables = {
            "name": "testing from unittset",
            "email": "unit_test@test.com",
            "services": ["delivery", 'payment'],
            "postcode": "1234",
            "mobile": "1234567890"
        };

        let data: any = {};

        try {
            // execute the query
            data = await client.request(query, variables);

        } catch (e) {
            // report the error
            console.log(e)
        }

        expect(data?.register).toHaveProperty("email", variables?.email)

    });

});

import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Registrant {
        id: Int!
        name: String
        email: String
        mobile: String
        postcode: String
        services: [String]!
    }

    input RegistrationData {
        name: String
        email: String
        mobile: String
        postcode: String
        services: [String!]!
    }

    type Mutation {
        register(registrationInput: RegistrationData): Registrant
    }

    type TestData {
        text: String!
        views: Int!
    }
    
    type Query {
        hello: TestData!,
        leads: [Registrant]!
    }

    schema {
        query: Query,
        mutation: Mutation
    }
`);

export default schema;
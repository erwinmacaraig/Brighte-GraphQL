import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Registrant {
        id: Int!
        name: String
        email: String
        mobile: String
        postcode: String
        services: [String]!
        page: Int
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
        leads(page: Int): [Registrant]!
    }

    schema {
        query: Query,
        mutation: Mutation
    }
`);

export default schema;
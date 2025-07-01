import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Service {
        _id: ID!
        serviceName: String!
    }

    type Registrant {
        _id: ID!
        name: String
        email: String
        mobile: String
        postcode: String
        services: [Service!]!
    }

    input RegistrationData {
        name: String
        email: String
        mobile: String
        postcode: String
        services: String!
    }

    type Mutation {
        register(registrationInput: RegistrationData): Registrant
    }

    type TestData {
        text: String!
        views: Int!
    }

    type Query {
        hello: TestData!
    }

    schema {
        query: Query,
        mutation: Mutation
    }
`);

export default schema;
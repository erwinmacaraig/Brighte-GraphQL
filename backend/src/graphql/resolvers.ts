import { RegistrationDataInterface } from '../interface/interface';


const root = {
    hello() {
        return {
            text: "Happy Coding",
            views: 12
        };
    }, //registrationInput:  RegistrationDataInterface
    register: async function( { registrationInput }: RegistrationDataInterface) {
        const email = registrationInput.email;
        const name = registrationInput.name;
        const mobile = registrationInput.mobile;
        const postcode = registrationInput.postcode;
        const services = registrationInput.services;
        console.log("Should create user here, ");
        console.log(services);
    }
};

export default root;

/*
name: String
        email: String
        mobile: String
        postcode: String
        services: String!
*/        
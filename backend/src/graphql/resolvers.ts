import { RegistrationDataInterface } from '../interface/interface';
import Connection from '../models/Connection';


const root = {
    hello() {
        return {
            text: "Happy Coding",
            views: 12
        };
    }, 
    register: async function( { registrationInput }: RegistrationDataInterface) {
        const email = registrationInput.email;
        const name = registrationInput.name;
        const mobile = registrationInput.mobile;
        const postcode = registrationInput.postcode;
        const services = registrationInput.services;
        console.log("Should create user here, ");
        console.log(services);
        // insert ignore na lang

        // const createdSurvey = 

        return 

    }
};

export default root;

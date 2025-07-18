import { RegistrationDataInterface } from '../interface/interface';
import Registration from '../models/Registration';
import  validator from 'validator';

const root = {
    hello() {
        return {
            text: "Happy Coding",
            views: 12
        };
    }, 
    leads: async function({...page} ){
        try {
            console.log(page['page']);
            const registration = new Registration();
            const collection = await registration.getCollection(2, page['page']);
            return collection;
        } catch(error) {
            return [];
        }        
    },
    register: async function( { registrationInput }: RegistrationDataInterface) {
        const email = registrationInput.email;
        const name = registrationInput.name;
        const mobile = registrationInput.mobile;
        const postcode = registrationInput.postcode;
        const services = registrationInput.services;


        try {
            const registration = new Registration();
            const id = await registration.create({
                email,
                name,
                mobile,
                postcode,
                services: JSON.stringify(services)
            });
            return {
                id,
                email,
                name,
                mobile,
                postcode,
                services
            }
        } catch(err) {
            return {}
        }
        


        return 

    }
};

export default root;

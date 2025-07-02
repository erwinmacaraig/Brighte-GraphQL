export interface RegistrationDataInterface {
    registrationInput: {
        name?: string; 
        email?: string;
        mobile?: string;
        postcode?: string;
        services: string[];
    }
    
}

export interface RegistrationInterface {
    [key:string]: any; 
}
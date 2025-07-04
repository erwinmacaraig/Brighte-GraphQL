import React, { HTMLAttributes } from "react";
import { useState, useRef  } from "react";
import "./SurveyForm.css";

function SurveyForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [postcode, setPostCode] = useState('');
    const [service, setService] = useState<string[]>([]);
    const divCbRef = useRef<HTMLDivElement>(null);

    const handleServiceCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked === true) {
           setService([...service, event.target.value])            
        } else {            
            setService(service.filter(item => item !== event.target.value))
        } 
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const graphqlQuery = {
            query: `mutation Register {
                        register(
                            registrationInput: {
                                postcode: "${postcode}"
                                mobile: "${mobile}"
                                email: "${email}"
                                name: "${name}"
                                services: ${JSON.stringify(service)}
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
        fetch('http://localhost:8080/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphqlQuery)
        
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            setService([]);
            setEmail('');
            setName('');
            setMobile('');
            setPostCode('');  
            let parentDiv1:HTMLInputElement;          
            for(let i = 1; i < 4; i++) {
                (divCbRef.current?.children[i].children[0] as HTMLInputElement).checked = false;
            }

        })
        .catch(err => {
            console.log(err);
        })
    } 
    
    return (
        <form onSubmit={submitHandler}>
            <h1>Brighte Eats </h1>
            <div className="input">
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" required value={email} onChange={(e) => { setEmail(e.target.value) }}/>
            </div>
            <div className="input">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" required value={name} onChange={(e) => { setName(e.target.value) }}/>
            </div>
            <div className="input">
                <label htmlFor="mobile">Mobile</label>
                <input type="text" id="mobile" required value={mobile} onChange={(e) => { setMobile(e.target.value) }}/>
            </div>
            <div className="input">
                <label htmlFor="postcode">Post Code</label>
                <input type="text" id="postcode" required value={postcode} onChange={(e) => { setPostCode(e.target.value) }}/>
            </div>
            <div className="checkboxes" ref={divCbRef}>
                <p>What service(s) are you particularly interested in? </p>
                <div>
                    <input type="checkbox" id="delivery" name="delivery-service" value="delivery" onChange={handleServiceCheckBox}  />
                    <label htmlFor="delivery">Delivery</label>
                </div>
                <div>
                    <input type="checkbox" id="pickup" name="pickup-service" value="pickup" onChange={handleServiceCheckBox} />
                    <label htmlFor="pickup">Pick-up</label>
                </div>
                <div>
                    <input type="checkbox" id="payment" name="payment-service" value="payment" onChange={handleServiceCheckBox} />
                    <label htmlFor="payment">Payment</label>
                </div>
                
            </div>
            <div className="btn-submit">
                <button className="button button--raised" type="submit"> Submit </button>
            </div>
            
        </form>
    );
}

export default SurveyForm;

function DetailedHTMLProps<T>(arg0: null) {
    throw new Error("Function not implemented.");
}

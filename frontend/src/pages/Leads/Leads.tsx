import React, { HTMLAttributes, useState, useEffect } from "react";
import './Leads.css';
import Lead from "../../components/Lead/Lead";

function Leads(){
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        getLeads();
    }, []);

    const getLeads = () => {
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
            setLeads(resData['data']['leads']);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <section className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>EMAIL</th>
                        <th>NAME</th>
                        <th>MOBILE</th>
                        <th>POSTCODE</th>
                        <th>SERVICES</th>
                    </tr>
                </thead> 
                <tbody>
                    {
                     leads.map((lead) => {
                        return ( <Lead id={lead['id']}
                            name={lead['name']}
                            email={lead['email']}
                            mobile={lead['mobile']}
                            postcode={lead['postcode']}
                            services={lead['services']} />
                        )
                        
                     })  
                    }
                </tbody>
                
            </table>
        </section>
    );
}

export default Leads;
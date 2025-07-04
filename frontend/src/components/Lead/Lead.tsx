
import React from "react";

function Lead({id, email, name, mobile, postcode, services}:{id: number, email:string, name:string, mobile:string, postcode:string, services:string[]}){

    return (
        
            <tr className="row">
                <td>{id}</td>
                <td>{email}</td>
                <td>{name}</td>
                <td>{mobile}</td>
                <td>{postcode}</td>
                <td className="tdbreak"><ul>{
                        services.map((service) => {return (<li>{service}</li>)})
                    }
                    </ul>
                </td>                
            </tr>
              
    );
}

export default Lead;
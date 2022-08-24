import details from '../meterInfo.json';

export const userLogin = (values) =>{    
    let userid=values.userid;
    let meterid=values.meterid;
    let res;
    details.map((user) => {        
        if(user.user_id==userid && user.meter_id==meterid){
            res=user;
        }
        return {};
    })
    return res;
}
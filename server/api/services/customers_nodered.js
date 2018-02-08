import {RxHttpRequest} from 'rx-http-request';

export class Customers_NR {
  byMSISDN(MSISDN) {

    RxHttpRequest.get('https://vodafone-backend.mybluemix.net/lastbill').subscribe(
      (data) => {
   
          if (data.response.statusCode === 200) {
              console.log(data.body); // Show the HTML for the Google homepage. 
          }
      },
      (err) => console.error(err) // Show error in console 
  );
  return data.body;
  }
  
  byGeo(lat,lon) {
    //const uri = `${process.env.WEATHER_API_ROOT}/api/weather/v1/geocode/${lat}/${lon}/observations.json`;
    const uri ="https://vodafone-backend.mybluemix.net/lastbill";
    return RxHttpRequest.get(uri, {
      qs: {
        units: 'e',
        language: 'en-US'
      },
      json: true
    })
    .map(r => r.body);
  }
}

export default new Customers_NR();
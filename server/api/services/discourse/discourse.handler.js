import Rx from 'rx';
import ParksDatabase from '../parks';
import CustomerDatabase from '../customers';
import WeatherService from '../weather'
import CustomersNR from '../customers_nodered'


export default function discourseHandler(r) {

  // In this exercise, we will enable a user to get various information about the park
  // he is requesting. In order to do this we must keep track of the park name that
  // the user is talking about. Then, when a user asks for details (#tellmeabout) about
  // that particular park, we must look up the park in the ParksDatabase and provide
  // the full park object in the response payload.
  //
  // We must also store the list of known parks in context, so that the conversation tooling
  // is aware of the known parks list

  // In order to complete this task, here is what you need to do:

  // 1. STORE THE KNOWN PARKS IN CONTEXT
  //    Modify the context object in the response, r to include the 'parks' property.
  //    Set the 'parks' property equal to the array of known park names.
  //    ** Only set the 'parks' property on the first dialog turn.
  //
  //    HINT: You can get the array of parks by calling, ParksDatabase.all()
  //    HINT: You can determine the dialog turn by inspecting the system object
  //    NOTE: ParksDatabase.all() returns a list of park objects, not park names
  //
  // TO TEST YOUR WORK 
  // Ask Watson to 'Show me a list of parks' and verify the new parks are there
  // OR
  // Use e.g. Chrome Dev Tools to inspect the response payload


  if (r.context.system.dialog_turn_counter === 1) {
  //  r.context.parks = ParksDatabase.all().map(p => p.name);
    r.context.platform = 'Web';
    r.context.msisdn = '1000155107';
    r.context.offensive_counter=0;
    r.context.transfer_counter=0;
    
  //  r.context.parks2 = ParksDatabase.all().map(p => p.name);
  }
  

  // 2. STORE THE PARK NAME THAT THE USER IS CURRENTLY ASKING ABOUT
  //    Examine the entities object in the response, r
  //    If the 'NationalParks' entity is detected, update the context object
  //    to include the property 'park' and set 'park' equal to the value
  //    of the NationalParks entity
  //
  // TO TEST YOUR WORK 
  // Use e.g. Chrome Dev Tools to inspect the response payload
/*
  const parkEntity = r.entities.find(e => e.entity === 'NationalParks');
  if (parkEntity) {
    r.context.park = parkEntity.value;
  }
*/  

  // 3. RETURN THE PARK OBJECT WITH THE RESPONSE PAYLOAD
  //    Examine the intents object in the response, r
  //    If the top intent is the 'tellmeabout' intent, then do the following:
  //    - Get the 'park' name from the response's context object
  //    - Add the property, 'park' to the response's output object 
  //    - Set the value of 'park' to the park object
  //
  //    HINT: You can get the parks object by calling ParksDatabase.byName(parkName);
  // 
  // TO TEST YOUR WORK  
  // Ask Watson, "Tell me about Zion", then ask "What animals live there?"
  // OR
  // Use e.g. Chrome Dev Tools to inspect the response payload 
/*
  if (r.intents.length === 0) {
    return Rx.Observable.just(r);
  }
*/
  /*  
  const park = r.context.park 
    ? ParksDatabase.byName(r.context.park)
    : null;
*/
//r.context.lastbill = 0;
delete r.context.balance;
delete r.context.lastbill;
//r.context.billdate = 0;
delete r.context.billdate;
delete r.context.unbilled;
delete r.context.roaming;
delete r.context.nationalcalls;
delete r.context.subscription;
delete r.context.balancetransfer;
delete r.context.mobiledata;
delete r.context.storename;
delete r.context.storeregion;
delete r.context.storelocation;
delete r.context.janbill;
delete r.context.febbill;
delete r.context.marbill;
delete r.context.aprbill;
delete r.context.maybill;
delete r.context.junbill;
delete r.context.julbill;
delete r.context.augbill;
delete r.context.sepbill;
delete r.context.octbill;
delete r.context.novbill;
delete r.context.decbill;
if (r.context.msisdn)
  {
    const vmsisdn = r.context.msisdn;
    const vcustomer = CustomerDatabase.byMSISDN(vmsisdn);
    if (vcustomer){
      const vbalance = vcustomer.balance;
      const vlastbill = vcustomer.lastbill;
      const vbilldate = vcustomer.billdate;
      const vunbilled = vcustomer.unbilled;
      const vroaming = vcustomer.billdetails.roaming;
      const vnationalcalls = vcustomer.billdetails.nationalcalls;
      const vsubscription = vcustomer.billdetails.subscription;
      const vbalancetransfer = vcustomer.billdetails.balancetransfer;
      const vmobiledata = vcustomer.billdetails.mobiledata;
      const vstorename = vcustomer.neareststore.name;
      const vstoreregion = vcustomer.neareststore.region;
      const vstorelocation = vcustomer.neareststore.location;
      
      if (vbalance){
        r.context.balance = vbalance;
      }
      if (vlastbill){
        r.context.lastbill = vlastbill;
      }
      if (vbilldate){
        r.context.billdate = vbilldate;
      }
      if (vroaming){
        r.context.roaming = vroaming;
      }
      if (vnationalcalls){
        r.context.nationalcalls = vnationalcalls;
      }
      if (vbalancetransfer){
        r.context.balancetransfer = vbalancetransfer;
      }
      if (vsubscription){
        r.context.subscription = vsubscription;
      }
      if (vmobiledata){
        r.context.mobiledata = vmobiledata;
      }
      if (vstorename){
        r.context.storename = vstorename;
      }
      if (vstoreregion){
        r.context.storeregion = vstoreregion;
      }
      if (vstorelocation){
        r.context.storelocation = vstorelocation;
      }
      r.context.janbill = vcustomer.billpermonth.jan;
      r.context.febbill = vcustomer.billpermonth.feb;
      r.context.marbill = vcustomer.billpermonth.mar;
      r.context.aprbill = vcustomer.billpermonth.apr;
      r.context.maybill = vcustomer.billpermonth.may;
      r.context.junbill = vcustomer.billpermonth.jun;
      r.context.julbill = vcustomer.billpermonth.jul;
      r.context.augbill = vcustomer.billpermonth.aug;
      r.context.sepbill = vcustomer.billpermonth.sep;
      r.context.octbill = vcustomer.billpermonth.oct;
      r.context.novbill = vcustomer.billpermonth.nov;
      r.context.decbill = vcustomer.billpermonth.dec;



    }
    
  }

  //if (r.intents[0].intent === 'offensive'){
    if (r.intents.length === 0) {
      return Rx.Observable.just(r);
    }
  if (r.intents[0].intent === 'Offensive'){  
    r.context.offensive_counter++;
    
    //window.close();
  }
  if (r.intents[0].confidence < 0.4){
    r.context.transfer_counter++;
  }
  /*
  if (r.intents[0].intent === 'tellmeabout'){
    const ventity = r.entities.find(e => e.entity === 'lastBill');
    if (ventity){
      const vmsisdn = r.context.msisdn;
      const vcustomer = CustomerDatabase.byMSISDN(vmsisdn);
      const vlastbill = vcustomer.lastbill;
      if (vlastbill){
        r.context.lastbill = vlastbill;
      }

    }
    return Rx.Observable.just(r);
  }
  */
  /*
    switch (r.intents[0].intent) {
    case 'tellmeabout':
      if (park) {
        r.output.park = park
      }
      return Rx.Observable.just(r);
    
    case 'myBill':
      if (park) {
        r.output.park = park
      }
      return Rx.Observable.just(r);


    case 'weather':
      if (park) {
        return WeatherService
          .byGeo(park.location.geo.lat, park.location.geo.lon)
          .map(wr => {
            r.output.weather = wr.observation;
            return r;
          });
      }

    default:
      return Rx.Observable.just(r);
  
  }
  */
  return Rx.Observable.just(r);
}

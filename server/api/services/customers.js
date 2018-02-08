const CustomersDb = require('../../data/customers.db.json');

class CustomerService {
  byMSISDN(msisdn) {
    for (let i=0; i < CustomersDb.length; i++) {
      if (CustomersDb[i].msisdn.toLowerCase() === msisdn.toLowerCase().trim()) {
        return CustomersDb[i];
      }
    }
    return null;
  }

  all() {
    return CustomersDb;
  }
}

export default new CustomerService();
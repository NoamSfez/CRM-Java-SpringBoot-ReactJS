import React, { Component } from "react";
import CustomerService from "../services/CustomerService";

class ListCustomerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
    };
    this.addCustomer = this.addCustomer.bind(this);
    this.editCustomer = this.editCustomer.bind(this);
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }

  async componentDidMount() {
    let customers = await CustomerService.getCustomers();
    this.setState({ customers: customers.data });
    //   componentDidMount() {
    //     CustomerService.getCustomers().then((res) =>
    //       this.setState({ customers: res.data })
    //     );
    //   }
  }

  addCustomer() {
    this.props.history.push("/add-customer/_add");
    //ca nous envoi du coup vers l'url avec add-customer et comme ID:_add
  }
  editCustomer(id) {
    this.props.history.push(`/add-customer/${id}`);
  }
  async deleteCustomer(id) {
    await CustomerService.deleteCustomer(id);
    this.setState({
      customers: this.state.customers.filter((customer) => customer.id !== id),
    });
  }

  async deleteAllcustomer() {
    await this.state.customers.map((customer) =>
      CustomerService.deleteCustomer(customer.id)
    );
    this.setState({
      customers: [],
    });
  }

  viewcustomer(id) {
    this.props.history.push(`/view-customer/${id}`);
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Customers List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addCustomer}>
            Add Customer
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="btn btn-danger"
            onClick={() => this.deleteAllCustomer()}
          >
            Delete All Customers
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Customer First Name</th>
                <th> Customer Last Name</th>
                <th> Customer Email</th>
                <th> Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.customers.map((customer) => (
                <tr key={customer.id}>
                  <td> {customer.firstName} </td>
                  <td> {customer.lastName}</td>
                  <td> {customer.email}</td>
                  <td>
                    <button
                      onClick={() => this.editCustomer(customer.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteCustomer(customer.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewCustomer(customer.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListCustomerComponent;

import React, { Component } from "react";
import CustomerService from "../services/CustomerService";
// import { Link } from "react-router-dom";

class CreateCustomerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id, //on le recupere depuis le parametre /:id de la Route donc c'ewst soit _add soit un chiffre
      firstName: "",
      lastName: "",
      email: "",
    };
    // this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    // this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    // this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  async componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      let customer = (await CustomerService.getCustomerById(this.state.id))
        .data;
      this.setState({
        customer,
      });
    }
  }

  // componentDidMount() {
  //   if (this.state.id === "_add") {
  //     return;
  //   } else {
  //     CustomerService.getEmployeeById(this.state.id).then((res) => {
  //       let employee = res.data;
  //       this.setState({
  //         firstName: employee.firstName,
  //         lastName: employee.lastName,
  //         emailId: employee.emailId,
  //       });
  //     });
  //   }
  // }

  saveOrUpdateCustomer = async (e) => {
    e.preventDefault();
    let customer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    console.log("customer => " + JSON.stringify(customer));
    // step 5

    this.state.id === "_add"
      ? await CustomerService.createCustomer(customer)
      : await CustomerService.updateCustomer(customer, this.state.id);
    this.props.history.push("/customers");

    // if (this.state.id === "_add") {
    //   CustomerService.createCustomer(customer).then(() => {
    //     this.props.history.push("/customers");
    //   });
    // } else {
    //   CustomerService.updateCustomer(customer, this.state.id).then(() => {
    //     this.props.history.push("/customers");
    //   });
    // }
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  cancel() {
    this.props.history.push("/customers");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Customer</h3>;
    } else {
      return <h3 className="text-center">Update Customer</h3>;
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email Id: </label>
                    <input
                      placeholder="Email Address"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCustomer}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                  {/* <Link
                    to={"/customers"}
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel2
                  </Link> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCustomerComponent;

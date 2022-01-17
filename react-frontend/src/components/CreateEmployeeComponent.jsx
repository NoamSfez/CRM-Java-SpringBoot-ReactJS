import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import { Link } from "react-router-dom";

class CreateEmployeeComponent extends Component {
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
      let employee = (await EmployeeService.getEmployeeById(this.state.id))
        .data;
      this.setState({
        employee,
      });
    }
  }

  // componentDidMount() {
  //   if (this.state.id === "_add") {
  //     return;
  //   } else {
  //     EmployeeService.getEmployeeById(this.state.id).then((res) => {
  //       let employee = res.data;
  //       this.setState({
  //         firstName: employee.firstName,
  //         lastName: employee.lastName,
  //         emailId: employee.emailId,
  //       });
  //     });
  //   }
  // }

  saveOrUpdateEmployee = async (e) => {
    e.preventDefault();
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    };
    console.log("employee => " + JSON.stringify(employee));
    // step 5

    this.state.id === "_add"
      ? await EmployeeService.createEmployee(employee)
      : await EmployeeService.updateEmployee(employee, this.state.id);
    this.props.history.push("/employees");

    // if (this.state.id === "_add") {
    //   EmployeeService.createEmployee(employee).then(() => {
    //     this.props.history.push("/employees");
    //   });
    // } else {
    //   EmployeeService.updateEmployee(employee, this.state.id).then(() => {
    //     this.props.history.push("/employees");
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
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
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
                    onClick={this.saveOrUpdateEmployee}
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
                    to={"/employees"}
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

export default CreateEmployeeComponent;

import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  async componentDidMount() {
    let employees = await EmployeeService.getEmployees();
    this.setState({ employees: employees.data });
    //   componentDidMount() {
    //     EmployeeService.getEmployees().then((res) =>
    //       this.setState({ employees: res.data })
    //     );
    //   }
  }

  addEmployee() {
    this.props.history.push("/add-employee/_add");
    //ca nous envoi du coup vers l'url avec add-employee et comme ID:_add
  }
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }
  async deleteEmployee(id) {
    await EmployeeService.deleteEmployee(id);
    this.setState({
      employees: this.state.employees.filter((employee) => employee.id !== id),
    });
  }

  async deleteAllEmployee() {
    await this.state.employees.map((employee) =>
      EmployeeService.deleteEmployee(employee.id)
    );
    this.setState({
      employees: [],
    });
  }

  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployee}>
            Add Employee
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="btn btn-danger"
            onClick={() => this.deleteAllEmployee()}
          >
            Delete All Employees
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Employee First Name</th>
                <th> Employee Last Name</th>
                <th> Employee Email</th>
                <th> Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td> {employee.firstName} </td>
                  <td> {employee.lastName}</td>
                  <td> {employee.email}</td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewEmployee(employee.id)}
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

export default ListEmployeeComponent;

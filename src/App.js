import React from 'react';
import EmployeeCard from "./components/EmployeeCard";
import Wrapper from "./components/Wrapper";
// import Searchbar from "./components/Searchbar";
import employees from './employees.json';
import './App.css';

class App extends React.Component {
  state = {
    employees,
    searchTerm: '',
    searchSetting: 'searchBy', //this doesn't actually let us search by anything just shows placeholder
    sortSetting: 'sortBy', //this doesn't actually let us sort by anything just shows placeholder
    sortOrder: 'asc', //we sort ascending by default
  };

  handleChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });

    //this should also call 
    this.renderEmployees();
  };

  returnEmployeeCard = (employee) => {
    return (
      <EmployeeCard
        key={employee.id}
        image={employee.imgUrl}
        firstName={employee.firstName}
        lastName={employee.lastName}
        department={employee.department}
        role={employee.role}
        location={employee.location}
      />
    );
  }

  sortEmployees = () => {
    let sortSetting = this.state.sortSetting;

    this.state.employees.sort((a, b) => {
      let propA;
      let propB;

      //if no sortSetting is specified, we'll sort by id
      if (this.state.sortSetting === 'sortBy') {
        propA = a.id;
        propB = b.id;
        //if sortsetting is a str, lets do the value to lowercase
      } else {
        propA = a[sortSetting].toLowerCase();
        propB = b[sortSetting].toLowerCase();
      }

      if (this.state.sortOrder === 'asc') {
        if (propA < propB) {
          return -1;
        }
        if (propA > propB) {
          return 1;
        }
        return 0;
      } else if (this.state.sortOrder === 'desc') {
        if (propA < propB) {
          return 1;
        }
        if (propA > propB) {
          return -1;
        }
        return 0;

      }

    })
  }

  renderEmployees = () => {
    //sort employees
    this.sortEmployees();
    //IF employee[this.state.searchSetting] -> return employees where employee[this.state.searchSetting] includes this.state.searchTerm
    //ELSE return employees where any attr includes this.state.searchTerm
    return this.state.employees.map((employee) => {

      /* I WANT TO REVISIT THIS AND MAKE IT CLEANER */
      if (employee[this.state.searchSetting]) {
        if (this.state.searchTerm === '' || employee[this.state.searchSetting].toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
          return this.returnEmployeeCard(employee);
        }
      } else if (employee.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || employee.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || employee.location.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || employee.role.toLowerCase().includes(this.state.searchTerm.toLowerCase()) || employee.department.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
        return this.returnEmployeeCard(employee);
      }
    })
  }

  render() {
    return (
      <Wrapper>
        <h1 className="title text-light">💼 Employees</h1>
        <form className=''>
          <div className="row">
            <div className="col-12 col-md-7">
              {/* filter */}
              <div className="form-group form-inline">
                <input type="text" name='searchTerm' placeholder="Search..." className='form-control' value={this.state.searchTerm} onChange={this.handleChange} />
                <div className="input-group-append" >
                  <select className='form-control' id='searchSetting' name='searchSetting' value={this.state.searchSetting} onChange={this.handleChange} >
                    <option value='searchBy'>Search by...</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="department">Department</option>
                    <option value="role">Role</option>
                    <option value="location">Location</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5">
              {/* sort */}
              <div className="form-group form-inline">
                <select id="sort" className='form-control' name='sortSetting' value={this.state.sortSetting} onChange={this.handleChange}>
                  <option disabled value='sortBy'>Sort by...</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="department">Department</option>
                  <option value="role">Role</option>
                  <option value="location">Location</option>
                </select>
                {/* sort by ascending or descending */}
                <div className="input-group-append">
                  <label className={`form-control btn ${this.state.sortOrder === 'asc' ? 'btn-warning' : 'btn-outline-warning'}`}>
                    <input type="radio" name="sortOrder" id="asc" value='asc' checked={this.state.sortOrder === 'asc'} onChange={this.handleChange} /> Asc</label>
                  <label className={`form-control btn ${this.state.sortOrder === 'desc' ? 'btn-warning' : 'btn-outline-warning'}`}>
                    <input type="radio" name="sortOrder" id="desc" value='desc' checked={this.state.sortOrder === 'desc'} onChange={this.handleChange} /> Desc</label>

                </div>
              </div>
            </div>
          </div>



        </form>

        {this.renderEmployees()}
      </Wrapper>
    )
  }
}

export default App;

import Axios from 'axios';
import React from 'react';
import EmployeeCard from "./components/EmployeeCard";
import Wrapper from "./components/Wrapper";
// import Searchbar from "./components/Searchbar";
import './App.css';

class App extends React.Component {
  state = {
    employees: [],
    searchTerm: '',
    searchSetting: 'searchBy', //this doesn't actually let us search by anything just shows placeholder
   
  };

  componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=100&nat=us")
      .then(data => this.setState({ employees: data.data.results }))


  }

  handleChange = event => {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });

    //this should also call 
    this.renderEmployees();
  };

  
  sortEmployeesAZ = () => {
    
    let copyEmp = [...this.state.employees]
    
    copyEmp.sort((a, b) => {
     if(a.name.last > b.name.last){
       return 1 }
       else{return -1}
     })
      console.log(copyEmp.map(e => e.name.last))
     this.setState({employees:copyEmp}) 
  }
  sortEmployeesZA = () => {
    
    let copyEmp = [...this.state.employees]
    
    copyEmp.sort((a, b) => {
     if(a.name.last < b.name.last){
       return 1 }
       else{return -1}
     })
      console.log(copyEmp.map(e => e.name.last))
     this.setState({employees:copyEmp}) 
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
                <button>Search</button>
              </div>
            </div>
           
          </div>
        </form>
        <div className="col-12 col-md-5">
              
              <h2 style={{color:"white"}}>Sort by Last Name</h2>
              <button className="btn btn-warning" onClick={this.sortEmployeesAZ}>A to Z</button>
              <button className="btn btn-warning"onClick={this.sortEmployeesZA}>Z to A</button>
            </div>

        {this.state.employees.map((employee, index) => {
          return (
            <EmployeeCard
              key={index}
              image={employee.picture.thumbnail}
              firstName={employee.name.first}
              lastName={employee.name.last}
              email={employee.email}

            />
          );

        })}
      </Wrapper>
    )
  }
}

export default App;

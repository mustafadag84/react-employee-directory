import React from "react";
import "./style.css";

function EmployeeCard(props) {
  return (
    <div className="card">
      <div className="content">
        <div className="row">
          <div className="col-4 col-md-2">
            <div className="img-container">
              <img alt={`${props.firstName} ${props.lastName}`} src={props.image} />
            </div>
          </div>
          <div className="col-8 col-md-10">
            <div className="row">
              <div className="col-12 col-md-6 col-xl-3">
                <strong className='text-warning'>First Name:</strong> {props.firstName}
              </div>
              <div className="col-12 col-md-6 col-xl-3">
                <strong className='text-warning'>Last Name:</strong> {props.lastName}
              </div>
              <div className="col-12 col-md-6 col-xl-3">
                <div className=""><strong className='text-warning'>email:</strong> {props.email}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <span className="remove" onClick={() => props.handleRemoveFriend(props.id)}>𝘅</span> */}
    </div>
  );
}

export default EmployeeCard;

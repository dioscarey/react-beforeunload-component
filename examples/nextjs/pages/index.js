import React from "react";
import Link from 'next/link';
import BeforeUnloadComponent from "react-beforeunload-component";

export default () => {

  return (
    <div>
      <Link href={`/`}><a >Home</a></Link>
      <span> | </span>
      <Link href={{ pathname: '/form'}}><a>Form</a></Link>
      <hr />
      <BeforeUnloadComponent
        blockRoute={true}
      >
        <React.Fragment>
          <h2>Before Unload Component</h2>
          <div>This component has the default alert.</div>
          <p>          
            <ul>
              <li>{`blockRoute={true}`}</li>            
            </ul>
          </p>
        </React.Fragment>
      </BeforeUnloadComponent>
    </div>      
  );
};


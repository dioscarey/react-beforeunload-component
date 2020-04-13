
import React from "react";
import Link from 'next/link';

const Hello = ({query}) => {
  
    return (
      <div>
        <Link href={`/`}><a>Home</a></Link>
        <span> | </span>
        <Link href={'/form'}><a>Form</a></Link>
        <hr />
        <h1>Hi {query.name}</h1>
        <p>Alert was desactivated!</p>
      </div>
    );
  };

  Hello.getInitialProps = ({query}) => {
    return {query}
  }

  export default Hello
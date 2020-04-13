import React, {useState} from "react";
import Link from 'next/link';
import BeforeUnloadComponent from "react-beforeunload-component";
import Router from 'next/router'

const MyModal = ({ onClose, onSubmit }) => {
    return (
      <div className="modal" id="modal">
        <h2>Modal Window</h2>
        <div className="content">If you leave changes will not be saved.</div>
        <div className="actions">
          <button className="toggle-button" onClick={onSubmit}>
            Leave
          </button>
          <button className="toggle-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    );
  };  
  
  const Form = () => {
    const [blockRoute, setBlockRoute] = useState(true);
    const [name, setName] = useState("");
  
    return (
        <div>
            <Link href={`/`}><a>Home</a></Link>
            <span> | </span>
            <Link href={'/form'}><a>Form</a></Link>
            <hr />
            <BeforeUnloadComponent
            blockRoute={blockRoute}
            modalComponentHandler={({ handleModalLeave, handleModalCancel }) => {
                return (
                    <MyModal onClose={handleModalCancel} onSubmit={handleModalLeave} />
                );
            }}
            >
            <div>
                <h2>Custom Modal Before Unload</h2>
                <div>This component has a custom pop-up.</div>
                <br/>
                <div>After submitting the pop-up will be disabled.</div>
                <br/>
                <br/>
                <form
                onSubmit={(e) => {
                    e.preventDefault()
                    setBlockRoute(false);
                    Router.push({pathname: '/hello', query: {name}});
                }}
                >
                <div>
                    <label htmlFor="">My name</label>
                    <br />
                    <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    />
                </div>
                <br />
                <br />
                <button type="submit">Submit</button>
                </form>
            </div>
            </BeforeUnloadComponent>
        </div>
    );
  };
  
  export default Form;
//* modules
import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';
/** *========================================
 ** Main Function Hook -  Before unload
 */

const BeforeUnload = ({ 
  ignoreBeforeUnloadAlert = false, 
  blockRoute = true, 
  historyMode = false,
  replace = false, 
  children, 
  handleAfterLeave,   
  modalComponentHandler,
  alertMessage = "Are you sure to leave? Changes will not be saved."
}) => {
  /**
   * * States
   */

  const [showModal, setShowModal] = useState(false)
  const [internalData, setInternalData] = useState({})
  /**
   * * Functions
   */  

  const handleModalCancel = event => {
    if (event && event.preventDefault) event.preventDefault()
    setShowModal(false)
  }

  const handleModalLeave = event => {
    if (event && event.preventDefault) event.preventDefault()
    
    if(handleAfterLeave)
      handleAfterLeave(internalData)
    else {
      window.location.assign(internalData.to)
    }

  }

  const defaultModalHandler = () => {
    const r = confirm(alertMessage);
    setShowModal(false)
    if (r == true) {
      handleModalLeave()
    } else {
      handleModalCancel()
    }
  }

  const onUnload = e => {
    if (blockRoute) {
      e.preventDefault()
      e.returnValue = '';
    }
  }

  const handleClickEvents = (e) => {
    if (
      blockRoute &&
      e.currentTarget.pathname &&
      e.currentTarget.pathname !== ""
    ) {
      e.preventDefault();
      if(historyMode){      
        setInternalData({
          replace: replace || false,
          state: {},
          to: e.currentTarget.pathname + e.currentTarget.search,
        })
      } else {
        const linkElement = e.currentTarget;
        const newurl = linkElement.protocol + "//" + linkElement.host + linkElement.pathname + '?' + linkElement.search;
        setInternalData({
          state: null,
          href: linkElement,
          to: newurl
        })
      }     

      setShowModal(true)
    }
  }

  const setEventListeners = () => {
    const links = document.getElementsByTagName('a');    
    for(var i = 0; i< links.length; i++){
      links[i].addEventListener("click",handleClickEvents,false);
    }

    if(!ignoreBeforeUnloadAlert)
      window.addEventListener("beforeunload", onUnload)
  }

  const removeEventListeners = () => {
    const links = document.getElementsByTagName('a');
    for(var i = 0; i< links.length; i++){
      links[i].removeEventListener("click",handleClickEvents,false);
    }

    if(!ignoreBeforeUnloadAlert)
      window.removeEventListener("beforeunload", onUnload)
  }

  /**
   * * Effect
   */

  useEffect(() => {
    setEventListeners()
    return () => {
      removeEventListeners()      
    }
  })

  /**
   * * React dom
   */

  return (
    <React.Fragment>
      {showModal && (
        modalComponentHandler 
        && modalComponentHandler({handleModalLeave, handleModalCancel}) 
        || defaultModalHandler()
      )}
      {children}
    </React.Fragment>
  )
}

BeforeUnload.propTypes = {
  blockRoute: PropTypes.boolean, 
  ignoreBeforeUnloadAlert: PropTypes.boolean,   
  historyMode: PropTypes.boolean, 
  replace: PropTypes.boolean, 
  children: PropTypes.element.isRequired,
  alertMessage: PropTypes.string,
  handleAfterLeave: PropTypes.func,
  modalComponentHandler: PropTypes.element
};

export default BeforeUnload;

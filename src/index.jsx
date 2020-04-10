//* modules
import React, { useEffect, useState } from "react"

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
  modalComponentHandler 
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
    const r = confirm("Are you sure to leave?!");
    setShowModal(false)
    if (r == true) {
      onModalSubmitted()
    } else {
      onModalClose()
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
    <div>
      {showModal && (
        modalComponentHandler 
        && modalComponentHandler({handleModalLeave, handleModalCancel}) 
        || defaultModalHandler()
      )}
      {children}
    </div>
  )
}

export default BeforeUnload;

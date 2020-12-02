//* modules
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

//* Globals

let ignoreAlert = false;

const attributeExists = (e, attr) => {
  let exists = false;
  let elem = e.target === "" ? e : e.target;

  if(elem.attributes)
    for (let i = 0, atts = elem.attributes, n = atts.length; i < n; i++) {
      if (typeof attr === "object") {
        const index = attr.findIndex(a => a === atts[i].nodeName);
        if (index > -1) exists = true;
      } else if (atts[i].nodeName === attr) {
        exists = true;
      }
    }

  return exists;
};

const removeAttributeIgnore = e => {
  const ele = e.target || e.srcElement;
  ele.removeAttribute("ignoreTemp");
};

/** *========================================
 ** Main Function Hook -  Before unload
 */

const BeforeUnloadComponent = ({
  ignoreChildrenLinks = false,
  ignoreBeforeunloadDocument = false,
  blockRoute = true,
  children,
  modalComponentHandler,
  beforeUnload,
  beforeUnloadSendBeacon,
  alertMessage = "Are you sure you want to leave? Changes will not be saved."
}) => {
  /**
   * * States
   */

  let childEle = useRef();
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({});
  /**
   * * Functions
   */

  const handleModalCancel = event => {
    if (event && event.preventDefault) event.preventDefault();
    setShowModal(false);
  };

  const handleModalLeave = event => {
    const ele = eventData.event.target || eventData.event.srcElement;
    if (event && event.preventDefault) event.preventDefault();

    setShowModal(false);

    const updateClick = eleUpdated => {
      eleUpdated.setAttribute("ignoretemp", "true");
      eleUpdated.click();
    };

    console.log(beforeUnload);

    if (beforeUnload) {
      return beforeUnload(() => {
        updateClick(ele);
      });
    }

    return updateClick(ele);
  };

  const handleIgnoreLink = event => {
    const ele = event.target || event.srcElement;
    ele.setAttribute("ignoretemp", "true");
    ele.click();
  };

  const defaultModalHandler = () => {
    const r = confirm(alertMessage);
    setShowModal(false);
    if (r === true) {
      handleModalLeave();
    } else {
      handleModalCancel();
    }
  };

  const onUnload = e => {
    setShowModal(false);
    if (blockRoute && !ignoreAlert) {
      e.preventDefault();
      e.returnValue = alertMessage;
      return alertMessage;
    } else {
      ignoreAlert = false;
    }
  };

  const handleClickEvents = e => {
    if (attributeExists(e, "ignoretemp")) {
      removeAttributeIgnore(e);
      setEventData({});
    } else if (blockRoute && e.target.href !== window.location.href) {
      e.preventDefault();

      if (attributeExists(e, ["custom-ignore", "ignore"])) {
        ignoreAlert = true;
        return handleIgnoreLink(e);
      }

      setEventData({
        event: e
      });
      return setShowModal(true);
    }

    return true;
  };

  const handleBeacon = () => {
    return navigator.sendBeacon(
      beforeUnloadSendBeacon.path,
      beforeUnloadSendBeacon.data
    );
  };

  const setEventListeners = () => {
    const links = document.getElementsByTagName("a");
    if(links)
      for (let i = 0; i < links.length; i++) {
        if (attributeExists(links[i], "href")) {
          links[i].addEventListener("click", handleClickEvents, false);
        }
      }

    if (ignoreChildrenLinks && childEle.current) {
      const childrenLinks = childEle.current.getElementsByTagName("a");
      if(childrenLinks)
        for (let i = 0; i < childrenLinks.length; i++) {
          childrenLinks[i].setAttribute("ignore", "true");
        }
    }

    if (!ignoreBeforeunloadDocument)
      window.addEventListener("beforeunload", onUnload);

    if (beforeUnloadSendBeacon) {
      if (!navigator.sendBeacon)
        throw "sendBeacon not supported | remove beforeUnloadSendBeacon ";
      window.addEventListener("unload", handleBeacon);
    }
  };

  const removeEventListeners = () => {
    const links = document.getElementsByTagName("a");
    if(links)
      for (let i = 0; i < links.length; i++) {
        links[i].removeEventListener("click", handleClickEvents, false);
      }

    if (!ignoreBeforeunloadDocument)
      window.removeEventListener("beforeunload", onUnload);

    if (beforeUnloadSendBeacon && navigator.sendBeacon) {
      window.removeEventListener("unload", handleBeacon);
    }
  };

  const defaultComponentAlert = modalComponentHandler || defaultModalHandler;

  /**
   * * Effect
   */
  useEffect(() => {
    setEventListeners();
    return () => {
      removeEventListeners();
    };
  });

  /**
   * * React dom
   */
  return (
    <React.Fragment>
      {showModal
        ? defaultComponentAlert({ handleModalLeave, handleModalCancel })
        : null}
      <span ref={childEle}>{children}</span>
    </React.Fragment>
  );
};

BeforeUnloadComponent.propTypes = {
  ignoreChildrenLinks: PropTypes.bool,
  blockRoute: PropTypes.bool,
  ignoreBeforeunloadDocument: PropTypes.bool,
  children: PropTypes.any.isRequired,
  alertMessage: PropTypes.string,
  modalComponentHandler: PropTypes.any,
  beforeUnload: PropTypes.func,
  beforeUnloadSendBeacon: PropTypes.object
};

export default BeforeUnloadComponent;

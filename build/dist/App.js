import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import Loginform from "./loginForm/index.js";
import Heading from "./heading/index.js";
import Footer from "./footer/index.js";
import AdminPanel from "./APanel/index.js";
import RegForm from "./regForm/index.js";
const App = () => {
  const [isRegForm, setisRegForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let token = setTimeout(() => {
      setIsLoading(false);
    }, 2e3);
    return () => {
      clearTimeout(token);
    };
  }, [isRegForm, isAdmin]);
  const adminMode = (isMode) => {
    setIsAdmin(isMode);
    window.alert("Admin Mode Authorized");
  };
  const onData = (response) => {
    setisRegForm(response);
    console.log("values passed to parent:", response);
  };
  if (isLoading) {
    return /* @__PURE__ */ React.createElement("h1", null, "Page is Loading...");
  }
  ;
  return /* @__PURE__ */ React.createElement("div", {
    className: "app"
  }, /* @__PURE__ */ React.createElement(Heading, null), /* @__PURE__ */ React.createElement("div", {
    id: "formArea"
  }, isRegForm ? /* @__PURE__ */ React.createElement(RegForm, null) : isAdmin ? /* @__PURE__ */ React.createElement(AdminPanel, null) : /* @__PURE__ */ React.createElement(Loginform, {
    onRegToggle: onData,
    adminToggle: adminMode
  })), /* @__PURE__ */ React.createElement(Footer, null));
};
export default App;

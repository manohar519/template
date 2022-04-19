
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import axios from "axios";
import axios from '../../../Uri';
import { createUseGridApiEventHandler } from "@mui/x-data-grid";
import { CollectionsOutlined, ImageNotSupportedSharp } from "@mui/icons-material";
import ProtectedRoutes from "../ProtectedRoute";

function Basic() {
  var userStatus = {}
  var userData = {}
  var isAuth = {login: false};
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const[userData, setUserData]= useState({})
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    isAuth.login = false;
    sessionStorage.setItem('isLogin' , JSON.stringify(isAuth));
    sessionStorage.removeItem('userdata');
  },[]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    await axios.get(`/login/getUsersByUserEmailId?email=${email}&password=${password}`)
      .then((res) => {
       console.log(res.data);
        userStatus = res.data
        userData = userStatus.data
        console.log(userData)
        isAuth.login = true;
        sessionStorage.setItem('isLogin' , JSON.stringify(isAuth));
      })
      .catch((err) => {
        console.log(err);
                isAuth.login = false;
                sessionStorage.setItem('isLogin' , JSON.stringify(isAuth));

      });
    if(userStatus.status === true ){
      sessionStorage.setItem('userdata' , JSON.stringify(userStatus));
      sessionStorage.setItem('userData' , JSON.stringify(userData));
      // console.log( JSON.parse(sessionStorage.getItem('userdata')))
       navigate("/tracker")
    }
    //  if(userStatus.status===true){
    //    return <ProtectedRoutes auth={userStatus.status}/>
    //  }
  //  const result = res.data.filter(
  //     (u) => u.email === email && u.password === password 
  //   );
    // console.log(result);
    // console.log(result.userId);
    // if (result === "undefined") {
    //   alert("Invalid credentials");
    // } else {
    //   result.map((u) => {
    //     // console.log(u.)
    //     if (u.email === email && u.password === password ) {
    //       // navigate("/dashboard")
    //       alert("loggedin")
    //       ; 
    //     }
    //   });
    // }
  };

  const forgotPassword = () => {
    navigate('/forgotPassword')
  }
  const resetPassword = () => {
    navigate('/resetPassword')
  }

  const callAlert = () => {
    alert("Invalid credentials");
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            SRI LAKSHMI HEAVENS
          </MDTypography>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            SIGN IN
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                style={{ width: "100%" }}
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                fullwidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                style={{ width: "100%" }}
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                fullwidth
              />
            </MDBox>
           
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={handleSubmit}
                variant="gradient"
                color="info"
                fullWidth
              >
                <MDTypography
                  variant="button"
                  color="inherit"
                  fontWeight="medium"
                  textGradient
                >
                  SIGN IN
                </MDTypography>
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                onClick={forgotPassword}
                variant="gradient"
                color="info"
                fullWidth
              >
                <MDTypography
                  variant="button"
                  color="inherit"
                  fontWeight="medium"
                  textGradient
                >
                  FORGOT PASSWORD
                </MDTypography>
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}
export default Basic;
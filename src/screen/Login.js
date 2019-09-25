import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert'
import { connect } from 'react-redux'
import { login } from '../redux/action/login'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';

class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: []
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle(){
    this.setState({
      modal: !this.state.user.modal 
    })
  }

  render(){
    const userAdd = () => {
      this.state.user.push({
        email: this.state.email,
        password: this.state.password
      });
      add()
      this.setState((prevState) => ({
        modal: !prevState.modal
      }));
    };
    let add = async () => {
      await this.props.dispatch(login(this.state.user[0]))
        .then(() => {
          swal({
            title: "Login",
            text: `Login Success`,
            icon: "success",
            button: "OK"
          }).then(() => {
            window.location.href = '/';
          })
        })
        .catch(() => {
          swal({
            title: "Login Failed",
            text: "Email Or Password Wrong !!!",
            icon: "warning",
            buttons: "OK"
          }).then(() => {
            
          })
        })
    };
  return (
      <div style={{ marginTop: '8%', marginLeft: '35%' }}>
        {localStorage.jwtToken != undefined ? <Redirect to='/' /> :
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  Log in
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <MDBInput label="Email" group type="text" validate onChange={(e) => this.setState({ email: e.target.value })} />
              <MDBInput
                label="Password"
                group
                type="password"
                validate
                containerClass="mb-0"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <p className="font-small grey-text d-flex justify-content-end">
                Forgot
                <a
                  href="#!"
                  className="dark-grey-text font-weight-bold ml-1"
                >
                  Password?
                </a>
              </p>
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  color="danger"
                  type="button"
                  className="btn-block z-depth-2"
                  onClick={userAdd.bind(this)}
                >
                  Log in
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>}
    </div>
  );
}
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};
export default connect(mapStateToProps)(Login);
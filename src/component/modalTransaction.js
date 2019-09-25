import React from 'react';
import { connect } from 'react-redux'
import { Modal, ModalBody, Row, Col, Button, ModalHeader, ModalFooter, } from 'reactstrap';
import swal from 'sweetalert2'
import ReactToPrint from 'react-to-print'
import { postMail } from '../redux/action/sendMail'
let datauser = JSON.parse(localStorage.getItem('userid')) || 'Admin'
class Modaltransaction extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: this.props.dataCart,
            dataTransct: this.props.dataTransaction,
            modal: false,
            nestedModal: false,
            closeAll: false,
            fullname: localStorage.fullname || 'Arkan',
            harga: this.props.totall
        }
        this.toggle = this.toggle.bind(this)
        this.toggleNested = this.toggleNested.bind(this)
        this.toggleAll = this.toggleAll.bind(this)
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
      toggleNested() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: false
        });
      }
    
      toggleAll() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: true
        });
      }

      sendMail = async () => {
        await this.props.dispatch(postMail(document.getElementById('email').value))
        swal.fire({
            title: "Send Success",
            icon: "success",
            button: "Okey"
          })
    } 

    render() {
        let { cart, dataTransct } = this.state
        console.log(this.state.dataTransct, ' ini harga yang dicari');
        
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className} ref={el => (this.componentRef = el)} centered>
                    <ModalBody>
                        <Row>
                            <Col md="6" className="mr-auto">
                                <h6>Checkout</h6>
                            </Col>
                            <Col md="6" className="ml-auto">
                                <h6>Receipt No: #{dataTransct.id_transaction}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" className="mr-auto">
                                <h6>Cashier: {datauser}</h6>
                            </Col>
                        </Row>
                        <div className="mt-5">
                            {
                                cart && cart.length > 0
                                &&
                                cart.map((item) => {
                                    return (
                                        <Row className="mt-2">
                                            <Col md="6" className="mr-auto">
                                                <h6>{item.name}</h6>
                                            </Col>
                                            <Col md="6" className="ml-auto">
                                                <h6 style={{ textAlign: 'right' }}>Rp. {item.price * item.qty}</h6>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </div>
                        <Row className="mt-5">
                            <Col md="6" className="mr-auto">
                                <h6>Ppn 10%</h6>
                            </Col>
                            <Col md="6" className="ml-auto">
                                <h6 style={{ textAlign: 'right' }}>Rp. {this.props.totall / 10}</h6>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col md="6" className="ml-auto">
                                <h6 style={{ textAlign: 'right' }}>Total: {this.props.totall + this.props.totall / 10} </h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6" className="mr-auto">
                                <h6 style={{ textAlign: 'left' }}>Payment: Cash</h6>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <ReactToPrint
                                    trigger={() => <Button style={{ backgroundColor: '#F24F8A', width: '100%', height: 50, fontWeight: 'bold', fontSize: 20 }} onClick={this.toggle} block>print</Button>}
                                    content={() => this.componentRef}
                                    />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <h6 style={{ textAlign: 'center' }}>Or</h6>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>
                                <Button onClick={this.toggleNested} style={{ backgroundColor: '#57CAD5', width: '100%', height: 50, fontWeight: 'bold', fontSize: 20 }}>Send Email</Button>
                            </Col>
                        </Row>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined} style={{ marginTop: '15%' }}>
                        <ModalHeader>Send By Email</ModalHeader>
                        <ModalBody><input style={{ width: '100%' }} type="text" placeholder="email ..." id={'email'} name="email" required /></ModalBody>
                        <ModalFooter>
                        <Button color="primary" onClick={this.sendMail}>Send</Button>{' '}
                        <Button color="secondary" onClick={this.toggleAll}>Done</Button>
                        </ModalFooter>
                        </Modal>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


export default connect()(Modaltransaction)
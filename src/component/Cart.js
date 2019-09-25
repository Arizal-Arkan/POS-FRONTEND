import React, { Component } from 'react';
import { Row, Col, Container, Nav, NavItem, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import ProductList from './ProductList';
import swal from 'sweetalert2'
import Modaltransaction from './modalTransaction';
import { connect } from 'react-redux'
import { addTransaction } from '../redux/action/transaction'
const localdata = JSON.parse(localStorage.getItem('data')) || ''

export class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            modal: false,
            modalTransaction: false,
            total: 0
        };
        this.toggle = this.toggle.bind(this);
        this.toggleTransaction = this.toggleTransaction.bind(this);
        this.addToCart = this.addToCart.bind(this)
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleTransaction(data) {
        this.addTransaction(data)
        this.setState(prevState => ({
            modalTransaction: !prevState.modalTransaction
        }));
    }

    increment = (item) => { 
        this.state.cart[item].qty++
        this.state.total = this.state.total + Number(this.state.cart[item].price)
          this.setState({
            cart: this.state.cart,
          })
        console.log(this.state.total+ "haha")
        
        }

    decrement = (item) => {
        if( !(this.state.cart[item].qty <=1) ){ 
        this.state.cart[item].qty--
        this.state.total = this.state.total + Number(this.state.cart[item].price)
            this.setState({
            cart: this.state.cart,
           })}
        console.log(this.state.cart)
        }

          addToCart = (item) => {
            let cek = this.state.cart.find(prapto => prapto.name === item.name)
            let cari = this.state.cart.indexOf(cek)

            console.log(item, 'ini list itemnya');
            
            const input = {
                name: item.name,
                price: item.price,
                image: item.image,
                productid: item.productid,
                qty: 1
            }
            console.log('ini barangnya ',cek)
            if (cek === undefined) {
                this.state.total = this.state.total + Number(item.price)
                this.state.cart.push(input)
            } else {
                const remove = this.state.cart[cari]
                this.state.total = this.state.total - Number(input.price) * remove.qty
                this.state.cart.splice(cari, 1)
                // console.log(input.price+"ini price", input.qty+"ini qty");
                // console.log('ini yang mau dipake ', remove)
                console.log(this.state.total)
                
            }
            this.setState({
              cart: this.state.cart
            })
          }
    
          cancel = (item) => {
            
            this.state.total = this.state.total - Number(this.state.cart[item].price) * Number(this.state.cart[item].qty)
            this.state.cart.splice(0,[this.state.cart.length])
            
            this.setState({
              cart: this.state.cart
            })
            
          }

          totalHarga() {
            return this.state.cart.reduce((sum, val) => {
                let sumTotal = sum + val.price
    
                return sumTotal
            }, 0)
        }

    removeAllCart() {
        this.setState({
            
            cart: this.state.cart.length = []
        })
    }

    addTransaction(data) {
        let receiptNo = Math.floor((Math.random() * 1000000000) + 1)

        let dataInput = {
            id_transaction: receiptNo,
            id_user: localStorage.getItem('userid'),
            products: JSON.stringify(this.state.cart),
            total: this.state.total,
            created_at: new Date(),
            updated_at: new Date()
        }
        this.props.dispatch(addTransaction(dataInput))
            .then(() => {
                swal.fire({
                    type: 'success',
                    title: 'Transaction',
                    text: 'Transaction success!'
                })
            })
    }

    render() {
        const { cart } = this.state
        let receiptNo = Math.floor((Math.random() * 1000000000) + 1)

        // cart.reduce((sum, val) => {
        //     total = sum + val.price
        //     return total
        // }, 0)

        let data = {
            id_transaction: receiptNo,
            id_user: localdata && localdata.userid,
            total: this.state.total,
            created_at: new Date(),
            updated_at: new Date()
        }

        return (
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Container style={{ marginTop: "5%" }}>
                            <ProductList addCart={(item) => {
                                this.addToCart(item)
                                console.log('cart: ', cart)
                            }} />
                        </Container>
                    </Col>
                    <Col md="4" style={{ marginTop: "5%" }}>
                        <Nav vertical className="shadow-sm bg-white full-height">
                            {
                                cart &&
                                    cart.length > 0 ?
                                    <NavItem>
                                        {cart.map((item, key) => {
                                            return (
                                                <Card style={{ width: '100%', height: '100%' }} key={key}>
                                                    <CardBody>
                                                        <Row>
                                                            <Col md="3">
                                                                <img src={item.image} alt={item.image} style={{ width: 50, height: 50 }} />
                                                            </Col>
                                                            <Col md="9">
                                                                <Row>
                                                                    <Col>
                                                                        <CardTitle>{item.name}</CardTitle>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                    <Button onClick={() => this.decrement(key)}>-</Button>{item.qty}<Button onClick={() => this.increment(key)}>+</Button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col md="3">
                                                                <Row>
                                                                    <Col></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col><CardSubtitle style={{ fontSize: 12 }}>{item.price * item.qty}</CardSubtitle></Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            )
                                        })}
                                        <center>
                                            <Row style={{ marginTop: 20 }}>
                                                <Col><Button color="danger" style={{ width: '100%' }} onClick={() => this.toggleTransaction(data)}>Checkout</Button></Col>
                                            </Row>
                                            <Row style={{ marginTop: 20 }}>
                                                <Col><Button color="secondary" onClick={() => this.removeAllCart()} style={{ width: '100%' }}>Cancel</Button></Col>
                                            </Row>
                                        </center>
                                    </NavItem>
                                    :
                                    <NavItem>
                                      <div style={{ fontSize: 30, color: '#5e5d5a' }}> Cart </div>
                                        <center>
                                            <img src={require('../component/food-and-restaurant.png')} alt="empty cart" />
                                        </center>
                                        <div style={{ textAlign: 'center' }}>
                                            <h6>Your cart is empty</h6>
                                            <p style={{ color: '#CECECE' }}>Please add some items from the menu</p>
                                        </div>
                                    </NavItem>
                            }

                        </Nav>
                    </Col>
                </Row>
                <Modaltransaction toggle={this.toggleTransaction} modal={this.state.modalTransaction} dataTransaction={data} dataCart={cart} totall={this.state.total} />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        transaction: state.transaction.transactionList
    }
}

export default connect(mapStateToProps)(Cart);
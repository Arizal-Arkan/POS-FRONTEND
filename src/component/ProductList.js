import React, { Component } from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Row, Col,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux'

import { getProduct } from '../redux/action/product'

export class Menulist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            isLoading: true
        }
    }

    async componentDidMount() {
        await this.requestMenu()
    }

    requestMenu() {
        this.props.dispatch(getProduct())
            .then(() => {
                this.setState({
                    menus: this.props.menu,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.log('error ', error)
            })
    }

    render() {
        const { menus, isLoading } = this.state
        console.log('menu list: ', this.state.menus)
        return (
            <div>
              <div style={{ fontSize: 30, color: '#5e5d5a' }}> Food & Drink List </div>
                <Row>
                    {
                        isLoading ?
                            <Spinner color="#5e5d5a" className="m-auto mt-5" />
                            :
                            menus &&
                                menus.length > 0 ?
                                menus.map((item, index) => {

                                    return (
                                        <Col md="4" key={index}>
                                            <Card className="mt-4 mb-auto" style={{ backgroundColor: 'transparent', borderColor: 'transparent', cursor: 'pointer' }} onClick={() => this.props.addCart(item)}>
                                                <CardImg top width="100%" height="170" src={item.image} alt="Card image cap" />
                                                <CardBody>
                                                    <CardTitle>{item.name}</CardTitle>
                                                    <CardSubtitle style={{ fontWeight: 'bold' }}>Rp. {item.price}</CardSubtitle>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    )
                                })
                             :
                      <p>oops no data!</p>
                    }
                </Row>

            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        menu: state.product.productList
    }
}

export default connect(mapStateToProps)(Menulist);
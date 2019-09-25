import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import swal from 'sweetalert'

import { postProduct, getProduct } from '../redux/action/product'
export class Add extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    onChangeFile = e => {
        console.log(e.target.files[0]);
        this.setState({
          file: e.target.files[0]
        });
      };


      addItem = async () => {
        const data = new FormData();
        data.append("image", this.state.file);
        data.append("name", this.state.name);
        data.append("price", this.state.price);
    
        await this.props.dispatch(postProduct(data));
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    
        swal({
          title: "Add Item Success",
          icon: "success",
          button: "Okey"
        }).then(function() {
          window.location = "/";
        });
      };

    render() {
        
        return (
            <Form>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id='name' onChange={e => this.setState({ name: e.target.value })} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="examplePassword" sm={2}>Image</Label>
                    <Col sm={10}>
                        <Input type="file" name="image" id='name' onChange={this.onChangeFile} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Price</Label>
                    <Col sm={10}>
                        <Input type="number" name="price" id='price' onChange={e => this.setState({ price: e.target.valueAsNumber })} />
                    </Col>
                </FormGroup>
                <FormGroup check row className="mt-4">
                    <Col>
                        <Button className="float-right" style={{ backgroundColor: '#F24F8A', borderColor: 'transparent' }} onClick={() => this.addItem()}>Add</Button>
                    </Col>
                    <Col>
                        <Button className="float-right mr-3" style={{ backgroundColor: '#57CAD5', borderColor: 'transparent' }}>Cancel</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        menu: state.product.productList,
    }
}

export default connect(mapStateToProps)(Add)
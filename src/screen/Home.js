import React, { Component } from 'react'
import Card from '../component/ProductList'
import Cart from '../component/Cart'
import '../component/Home.css'
import Header from '../component/Header'


export default class Home extends Component{
    render(){
        return(
            <div>
            <Header/>
            <div class="container" style={{ marginTop: '5%' }}>
            <div className="row">
              {/* <div className="col-sm-2" ><Card/></div> */}
              <div className="col-sm-12" style={{ minHeight: '100vh' }}><Cart/></div>
            </div>
          </div>
          </div>
        )
    }
}
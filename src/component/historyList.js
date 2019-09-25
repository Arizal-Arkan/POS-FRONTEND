import React, { Component } from 'react'
import '../component/history.css'
import moment from 'moment'

class History extends Component {
    render(){
        const list = this.props.list
        console.log(this.props.list);
        
        return(
            <div>
                <table color="red">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID Receipt</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    {list &&
                        list.length > 0 &&
                        list.map((item, index) => {
                            console.log(item, 'ini item');
                            
                            return(
                                <tbody>
                                    <tr key={index} style={{ height: '50px' }}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>#{item.id_transaction}</td>
                                        <td style={{ textAlign: 'center' }}>{item.userid}</td>
                                        <td>
                                            {(JSON.parse(item.products)).map(items => 
                                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    <div style={{ width: '50%' }}>
                                                        <p style={{ margin: '0' }} >{items.name} {items.qty}X</p>
                                                    </div>
                                                    <div style={{ width: '45%' }}>
                                                        <p style={{ textAlign: 'right', margin: '0' }}>@ Rp.{items.price}</p>
                                                    </div>
                                                </div>
                                                )}
                                        </td>
                                        <td style={{ textAlign: 'center' }}>Rp.{item.total}</td>
                                        <td style={{ textAlign: 'center' }}>{moment(item.created_at).format('DD-MM-YYYY')}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                        }
                </table>
            </div>
        )
    }
}
export default History
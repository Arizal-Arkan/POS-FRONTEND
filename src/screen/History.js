import React, { Component } from 'react'
import History from '../component/historyList'
import '../component/history.css'
import { getAllTransaction } from '../redux/action/transaction'
import { connect } from 'react-redux'
import {Spinner} from 'reactstrap'
import Header from '../component/Header'

class HistoryTable extends Component {
    state = {
        transaction:[],
        isLoading: false
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.props.dispatch(getAllTransaction());
        this.setState({
            transaction: this.props.transaction.transactionList,
            isLoading: false
        });
    }

    render() {
        const list = this.state.transaction
        console.log(this.state.transaction)        
        return (
                    <div>
                    <Header />
                    <div className='menuItems' style={{ marginTop: '7%', marginLeft: '5%' }}>
                    {this.state.isLoading == true ?
                                <Spinner color="#5e5d5a" className="m-auto mt-5" /> :
                        <History list={list} />}
                    </div>
                    </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        transaction: state.transaction,
    };
};

export default connect(mapStateToProps)(HistoryTable);
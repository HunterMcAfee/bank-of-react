import React, { Component } from 'react';
import Debit from './Debit'

class DebitsList extends Component {
    constructor() {
        super();
        this.state = {
            newDebit: {}
        }
    }


    _handleDebitChange = (event) => {
        const attributeName = event.target.name;
        const attributeValue = event.target.value;
        
        const newDebit = { ...this.state.newDebit }
        newDebit[attributeName] = attributeValue;

        this.setState({ newDebit });
    }
    _handleDebitChangeAmount = (event) => {
        const attributeName = event.target.name;
        const attributeValue = parseFloat(event.target.value);

        const newDebit = { ...this.state.newDebit }
        newDebit[attributeName] = attributeValue;

        this.setState({ newDebit });
    }
    _addNewDebit = (e) => {
        e.preventDefault();
        this.props.addDebit(this.state.newDebit);
    }

    render() {
        const debits = this.props.debits;

        const debitsComponent = debits.map((debit, index) => {
            return <Debit description={debit.description}
                amount={debit.amount}
                date={debit.date}
                key={index}
                keyId={index} />
        });

        return (
            <div>
                <h1>DEBITS</h1>
                <div>Account Balance: {this.props.accountBalance}</div>
                <br />
                <h2>New Debit</h2>
                <form onSubmit={this._addNewDebit}>
                    <input name="description" onChange={this._handleDebitChange} type='text' placeholder="Description" />
                    <input name="amount" onChange={this._handleDebitChangeAmount} type='number' placeholder="Amount" />
                    <input name="date" onChange={this._handleDebitChange} type="text" placeholder="Date" />
                    <input type='submit' value='Add Debit' /> 
                </form>
                <br />
                {debitsComponent}
            </div>
        );
    }
}


export default DebitsList;
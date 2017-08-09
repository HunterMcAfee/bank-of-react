import React, { Component } from 'react';
import Credit from './Credit'

class CreditsList extends Component {
    constructor() {
        super();
        this.state = {
            newCredit: {}
        }
    }
    _handleCreditChange = (event) => {
        const attributeName = event.target.name;
        const attributeValue = event.target.value;
        
        const newCredit = { ...this.state.newCredit }
        newCredit[attributeName] = attributeValue;

        this.setState({ newCredit });
    }
    _handleCreditChangeAmount = (event) => {
        const attributeName = event.target.name;
        const attributeValue = parseFloat(event.target.value);

        const newCredit = { ...this.state.newCredit }
        newCredit[attributeName] = attributeValue;

        this.setState({ newCredit });
    }
    _addNewCredit = (e) => {
        e.preventDefault();
        this.props.addCredit(this.state.newCredit);
    }

    render() {
        const credits = this.props.credits;

        const creditsComponent = credits.map((credit, index) => {
            return <Credit description={credit.description}
                amount={credit.amount}
                date={credit.date}
                key={index}
                keyId={index} />
        });

        return (
            <div>
                <h1>CREDITS</h1>
                <div>Account Balance: {this.props.accountBalance}</div>
                <br />
                <h2>New Credit</h2>
                <form onSubmit={this._addNewCredit}>
                    <input name="description" onChange={this._handleCreditChange} type='text' placeholder="Description" />
                    <input name="amount" onChange={this._handleCreditChangeAmount} type='number' placeholder="Amount" />
                    <input name="date" onChange={this._handleCreditChange} type="text" placeholder="Date" />
                    <input type='submit' value='Add Credit' /> 
                </form>
                <br />
                {creditsComponent}
            </div>
        );
    }
}


export default CreditsList;
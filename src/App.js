import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import DebitsList from './components/DebitsList';
import CreditsList from './components/CreditsList';
class App extends Component {
  constructor() {
    super();

    this.state = {
      accountBalance: 14568.27,
      debits: [],
      credits: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }
  _getDebits = () => {
    axios.get('http://localhost:4000/debits')
      .then( (res) => {
        this.setState({debits: res.data})
      })
      .catch( (error) => {
        console.log(error);
      });
  };

  _getCredits = () => {
    axios.get('http://localhost:4000/credits')
      .then( (res) => {
        this.setState({credits: res.data})
      })
      .catch( (error) => {
        console.log(error);
      });
  };
  componentWillMount() {
    this._getDebits();
    this._getCredits();
  }
  
  _calculateAccountBalance = () => {
    const totalDebits = this.state.debits.reduce( (totalDebits, debit) => {
      return totalDebits + debit.amount;
    }, 0);
    const totalCredits = this.state.credits.reduce( (totalCredits, credit) => {
      return totalCredits + credit.amount;
    }, 0);
    return totalCredits - totalDebits;
  }

  _addDebit = (debit) => {
    const debits = [...this.state.debits];
    debits.push(debit);
    this.setState({debits});
  }

  _addCredit = (credit) => {
    const credits = [...this.state.credits];
    credits.push(credit);
    this.setState({credits});
  }

  render() {
    const accountBalance = this._calculateAccountBalance();
    const HomeComponent = () => (<Home accountBalance={accountBalance} />);
    const UserProfileComponent = () => (
        <UserProfile 
          userName={this.state.currentUser.userName} 
          memberSince={this.state.currentUser.memberSince}  />
    );
    const DebitsComponent = () => (<DebitsList debits={this.state.debits} accountBalance={accountBalance} addDebit={this._addDebit} />)
    const CreditsComponent = () => (<CreditsList credits={this.state.credits} accountBalance={accountBalance} addCredit={this._addCredit} />)
    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
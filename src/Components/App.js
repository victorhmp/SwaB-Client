import React, { Component } from 'react';
import Auth from '../Modules/Auth';
import axios from 'axios';

import '../styles/styles.scss';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import NotFoundPage from './NotFoundPage';
import Navbar from './Navbar';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Wishlist from './Wishlist';
import WishlistCreate from './WishlistCreate';
import WishlistUpdate from './WishlistUpdate';
import WishlistItem from './WishlistItem';
import WishlistItemCreate from './WishlistItemCreate';
import WishlistItemUpdate from './WishlistItemUpdate';

import Advertisement from './Advertisement';
import AdvertisementCreate from './AdvertisementCreate';
import Profile from './Profile';

import Offer from './Offer';
import OfferCreate from './OfferCreate';

import Trade from './Trade';

class App extends Component {
  constructor() {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
    };
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleWishlistSubmit = this.handleWishlistSubmit.bind(this);
    this.handleWishlistUpdate = this.handleWishlistUpdate.bind(this);
    this.handleWishlistDelete = this.handleWishlistDelete.bind(this);
    this.handleWishlistItemSubmit = this.handleWishlistItemSubmit.bind(this);
    this.handleWishlistItemUpdate = this.handleWishlistItemUpdate.bind(this);
    this.handleWishlistItemDelete = this.handleWishlistItemDelete.bind(this);
  }

  handleRegisterSubmit(e, data) {
    e.preventDefault();
    axios.post(`http://localhost:3000/users`, JSON.stringify({
      user: data,
    }), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      Auth.authenticateToken(response.data.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      });
    }).catch(err => {
      console.log(err);
    })
  }

  handleLoginSubmit(e, data) {
    e.preventDefault();
    axios.post(`http://localhost:3000/login`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      Auth.authenticateToken(response.data.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
        // shouldGoToDashboard: true,
      });
      console.log(Auth.getToken());
    }).catch(err => {
      console.log(err);
    })
  }

  handleLogout() {
    axios.delete('http://localhost:3000/logout', {
      headers: {
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(response => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch((err) => console.log(err));
  }

  handleWishlistSubmit(e, data) {
    e.preventDefault();
    axios.post('http://localhost:3000/wishlists', JSON.stringify({
      wishlist: data,
    }), {
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response);      
    }).catch(err => {
      console.log(err);
    })
  }

  handleWishlistUpdate(e, data, id){
    e.preventDefault();
    axios.put('http://localhost:3000/wishlists/' + id, JSON.stringify({
      wishlist: data,
    }), {
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response);      
    }).catch(err => {
      console.log(err);
    })
  }
  
  handleWishlistDelete(data) {
    axios.delete('http://localhost:3000/wishlists/' + data, {
      headers: {
        wishlist: data,
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(response => {
      console.log(response);   
    }).catch(err => {
      console.log(err);
    })
  }

  handleWishlistItemSubmit(e, data){
    e.preventDefault();
    console.log(data);
    axios.post('http://localhost:3000/wishlist_items', JSON.stringify({
    wishlist_item: data,}), 
    {
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response);      
    }).catch(err => {
      console.log(err);
    })
  }

  handleWishlistItemUpdate(e, data, id){
    e.preventDefault();
    console.log(data);
    axios.put('http://localhost:3000/wishlist_items/' + id, JSON.stringify({
    wishlist_item: data,}), 
    {
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then((response) => {
      console.log(response);      
    }).catch(err => {
      console.log(err);
    })
  }

  handleWishlistItemDelete(data) {
    axios.delete('http://localhost:3000/wishlist_items/' + data, {
      headers: {
        wishlist_item: data,
        token: Auth.getToken(),
        'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(response => {
      console.log(response);   
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar loggedIn={this.state.auth} handleLogout={this.handleLogout} />
          <Switch>
            <Route path="/" component={LandingPage} exact={true} />
            <Route 
              path="/register" 
              render={
                () => (this.state.auth)
                ? <Redirect to="dash" />
                : <RegisterForm handleRegisterSubmit={this.handleRegisterSubmit}/>}
            />
            <Route 
              path="/login" 
              render={
                () => (this.state.auth)
                ? <Redirect to="dash" />
                : <LoginForm handleLoginSubmit={this.handleLoginSubmit} />
              }
            />
            <Route 
              path="/dash"
              render={
                () => (this.state.auth)
                ? <Dashboard />
                : <Redirect to="/" />
              }
            />
            <Route 
              path="/wishlists"
              render={
                () => (this.state.auth)
                ? <Wishlist handleWishlistDelete={this.handleWishlistDelete} 
                    handleWishlistItemDelete={this.handleWishlistItemDelete}
                    handleWishlistUpdate={this.handleWishlistUpdate}/>
                : <Redirect to="/" />
              }
            />
            <Route 
              path="/wishlistsCreate"
              render={
                () => (this.state.auth)
                ? <WishlistCreate handleWishlistSubmit={this.handleWishlistSubmit}/>
                : <Redirect to="/wishlists"/>
              }
            />
            <Route 
              path="/wishlistsUpdate/:wishlistId"
              render={
                (match) => (this.state.auth)
                ? <WishlistUpdate handleWishlistUpdate={this.handleWishlistUpdate} wishlist={match}/>
                : <Redirect to="/wishlists"/>
              }
            />
            <Route 
              path="/wishlistItems"
              render={
                () => (this.state.auth)
                ? <WishlistItem/>
                : <Redirect to="/wishlists"/>
              }
            />
            <Route 
              path="/wishlistItemsCreate/:wishlistId" 
              render={
                (match) => (this.state.auth)
                ? <WishlistItemCreate handleWishlistItemSubmit={this.handleWishlistItemSubmit} wishlist={match}/>
                : <Redirect to="/wishlists"/>
              }
            />
            <Route 
              path="/wishlistItemsUpdate/:wishlistId/:wishlistItemId" 
              render={
                (match) => (this.state.auth)
                ? <WishlistItemUpdate handleWishlistItemUpdate={this.handleWishlistItemUpdate} 
                    match={match}/>
                : <Redirect to="/wishlists"/>
              }
            />

            <Route 
              path="/profile" 
              render={
                () => (this.state.auth)
                ? <Profile />
                : <Redirect to="/"/>
              }
            />

            <Route path="/my-advertisements"
              render={
                () => (this.state.auth)
                ? <Advertisement />
                : <Redirect to="/" />
              }
            />
            <Route path="/new-advertisement"
              render={
                () => (this.state.auth)
                ? <AdvertisementCreate />
                : <Redirect to="/" />
              }
            />

            <Route path="/my-offers"
              render={
                () => (this.state.auth)
                ? <Offer />
                : <Redirect to="/" />
              }
            />
            <Route path="/new-offer/:advId" component={OfferCreate} />

            <Route path="/my-trades"
              render={
                () => (this.state.auth)
                ? <Trade />
                : <Redirect to="/" />
              }
            />

            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
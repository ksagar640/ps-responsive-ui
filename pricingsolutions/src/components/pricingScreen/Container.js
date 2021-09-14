import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMarketPrice } from './Actions/fetchMarketPriceAction';
import GridView from './GridView';
import './pricingscreen.css'
import {fetchUserPref} from './Actions/fetchUserPrefAction';
import Header from '../header/Header';

class WithCustomMiddleware extends Component {
  componentDidMount() {
    this.props.getAllMarketprices();
    this.props.getUserPreference(this.props.email);
  }
  render = (props) => (
      <div>
      {/* <Header userRole = {props.userRole}/> */}
      <Header/>
      <GridView 
      data = {this.props.data}
      preference = {this.props.preference}
      email = {this.props.email}
      loadingStatus = {this.props.loadingStatus}
      ErrorStatus = {this.props.ErrorStatus}
      isHavingPreference = {this.props.isHavingPreference}
      >
      </GridView>
      </div>
  );
}

const mapStateToProps = function (state) {
  return {
  data : state.rows,
  preference : state.preference,
  email : state.email,
  loadingStatus : state.loadingStatus,
  ErrorStatus : state.ErrorStatus,
  isHavingPreference : state.isHavingPreference
  }
};

function mapDispatchToProps(dispatch) {
  return {
    getAllMarketprices: () => {dispatch(fetchMarketPrice())},
    getUserPreference : (email) => {dispatch(fetchUserPref(email));}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithCustomMiddleware);




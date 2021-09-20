import React , {Component} from 'react';
import {render ,screen } from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../store/store';
import * as Notification from '../Notification';
import ApplyUserPrefButton from '../ApplyUserPrefButton';
import SaveUserPrefButton from '../SaveUserPrefButton';


describe('Testing Notification Function of Apply User Preference' , ()=>{
    it('should should display Preferences Applied when invoked' , ()=> {
        render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        Notification.ApplySuccessNotify();
        expect(screen.findByText("Preferences Applied")).toBeInTheDocument;
        
    });
    it('should should display Error in Applying Preferences when invoked' , ()=> {
        render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        Notification.ApplyErrorNotify();
        expect(screen.findByText("Error in Applying Preferences")).toBeInTheDocument;
        
    });
});

describe('Testing Notification Function of Save User Preference' , ()=>{
    it('should should display Preferences Saved when invoked' , ()=> {
        render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        Notification.SaveSuccessNotify();
        expect(screen.findByText("Preferences Saved")).toBeInTheDocument;
        
    });
    it('should should display Error in Applying Preferences when invoked' , ()=> {
        render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        Notification.SaveErrorNotify();
        expect(screen.findByText("Error in Saving Preferences")).toBeInTheDocument;
        
    });
});


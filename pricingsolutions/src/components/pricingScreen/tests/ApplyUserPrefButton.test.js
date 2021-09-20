import React , {Component} from 'react';
import {render ,screen ,fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../store/store';
import ApplyUserPrefButton from "../ApplyUserPrefButton";
import { FETCH_PREF } from '../Actions/types';

describe('Apply User Preference Button Component Testing' , ()=>{
    it('should render Save User preference Component without crashing' , ()=>{
        const componentUnderTest = render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        expect(componentUnderTest).toBeInTheDocument;
    });
    it('should contain Apply User preference Button' , ()=>{
        render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        const componentUnderTest = screen.getAllByTestId("applyPrefBtn");
        expect(componentUnderTest).toBeInTheDocument;
    });
    it('should display Apply Preference text' , ()=>{
        render(<Provider store = {store}> <ApplyUserPrefButton/> </Provider>);
        const component = screen.getByTestId("applyPrefBtn");
        expect(component.textContent).toBe("Apply Preference");
    });
    it ('should test button click' , ()=>{
        const mockClick = jest.fn();
        const mockReset = jest.fn(()=>{return store.dispatch({type : "RESET_FETCH_PREF" , payload : FETCH_PREF})});
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : true,
            saveUserLoadingStatus : false,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : false,
        };
        const {getByTestId} = render(<Provider store = {store}> <ApplyUserPrefButton
            loadingStatus = {loadingStatus}
             ErrorStatus = {ErrorStatus}
            handleApplyButtonClick = {mockClick}
            resetFetchPrefStatus = {mockReset}
            /> </Provider>);
        
        fireEvent.click(getByTestId("applyPrefBtn"));
       
    });

    it ('should test button click' , ()=>{
        const mockClick = jest.fn();
        const mockReset = jest.fn(()=>{return store.dispatch({type : "RESET_FETCH_PREF" , payload : FETCH_PREF})});
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : true,
            saveUserLoadingStatus : false,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : true,
            saveUserErrorStatus : false,
        };
        const {getByTestId} = render(<Provider store = {store}> <ApplyUserPrefButton
            loadingStatus = {loadingStatus}
             ErrorStatus = {ErrorStatus}
            handleApplyButtonClick = {mockClick}
            resetFetchPrefStatus = {mockReset}
            /> </Provider>);
        
        fireEvent.click(getByTestId("applyPrefBtn"));
        
    });

});
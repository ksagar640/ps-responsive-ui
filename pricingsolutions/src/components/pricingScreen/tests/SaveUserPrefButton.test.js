import React , {Component} from 'react';
import {render ,screen ,fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../store/store';
import SaveUserPrefButton from "../SaveUserPrefButton";

describe('Save User Preference Button Component Testing' , ()=>{
    test('should render Save User preference Component without crashing' , ()=>{
        const componentUnderTest = render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        expect(componentUnderTest).toBeInTheDocument;
    });
    test('should contain Save User preference Button' , ()=>{
        render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        const componentUnderTest = screen.getAllByTestId("savePrefBtn");
        expect(componentUnderTest).toBeInTheDocument;
    });
    test('should display Save Preference text' , ()=>{
        render(<Provider store = {store}> <SaveUserPrefButton/> </Provider>);
        const component = screen.getByTestId("savePrefBtn");
        expect(component.textContent).toBe("Save Preference");
    });
    
    it ('should test button click for update perference' , ()=>{
        const mockSavePref = jest.fn();
        const mockUpdatePref = jest.fn();
        const mockReset = jest.fn();
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : false,
            saveUserLoadingStatus : false,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : false,
        };
        const CurrentUserDefinedStates = {

        }
        const {getByTestId} = render(<Provider store = {store}> <SaveUserPrefButton
            CurrentUserDefinedStates = {CurrentUserDefinedStates}
            isHavingPreference = {1}
            loadingStatus = {loadingStatus}
             ErrorStatus = {ErrorStatus}
             handleSavePreference = {mockSavePref}
             handleUpdatePreference = {mockUpdatePref}
             resetSavePrefStatus = {mockReset}
            /> </Provider>);
        
        fireEvent.click(getByTestId("savePrefBtn"));
       
    });

    it ('should test button click for add preference' , ()=>{
        const mockSavePref = jest.fn();
        const mockUpdatePref = jest.fn();
        const mockReset = jest.fn();
        const loadingStatus =  {
            marketPriceLoadingStatus : false,
            userPrefLoadingStatus : false,
            saveUserLoadingStatus : false,
         };
        const ErrorStatus = {
            marketPriceErrorStatus : false,
            userPrefErrorStatus : false,
            saveUserErrorStatus : false,
        };
        const CurrentUserDefinedStates = {

        }
        const {getByTestId} = render(<Provider store = {store}> <SaveUserPrefButton
            CurrentUserDefinedStates = {CurrentUserDefinedStates}
            isHavingPreference = {0}
            loadingStatus = {loadingStatus}
             ErrorStatus = {ErrorStatus}
             handleSavePreference = {mockSavePref}
             handleUpdatePreference = {mockUpdatePref}
             resetSavePrefStatus = {mockReset}
            /> </Provider>);
        
        fireEvent.click(getByTestId("savePrefBtn"));
       
    });
});


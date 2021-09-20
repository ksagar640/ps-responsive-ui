import React from 'react';
import ReactDOM  from 'react-dom';
import LoginBox from './LoginBox';
import {render, cleanup, screen } from '@testing-library/react';
import 'regenerator-runtime/runtime' 
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

afterEach(cleanup);

describe("LoginBox Component Tests", ()=>{

    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<LoginBox/>, div);
    });
    
    it("renders loginbox text correctly", ()=>{
        const {container} = render(<LoginBox text = "test"/>);
        expect(container.textContent).toBe("test");
    });
    
    it("renders loginbox botton correctly", ()=>{
        const vdom = render(<LoginBox text = "test"/>);
        expect(vdom.getByTestId("button")).toBeDefined();
    });
   
});
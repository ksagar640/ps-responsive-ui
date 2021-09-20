import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'

import '@testing-library/jest-dom'

import Header from './Header';

let vdom;
beforeEach(()=>{
    const history = createMemoryHistory()
    vdom = render(
    <Router history={history}>
        <Header />
      </Router>,)
    }
);
afterEach(cleanup);

describe('Header Component', () => {

    test("renders the header component", ()=>{
          
           expect(vdom.getByTestId("headerTest")).toBeDefined();
          
       });

       test('renders "pricing solution" as heading', ()=>{
          
        expect(vdom.getByTestId("headingTest").textContent).toBe("Pricing Solution");
       
    });

    test("renders signout button", ()=>{
          
        expect(vdom.getByTestId("signOutButtonTest").textContent).toBe("Sign out");
       
    });
    });

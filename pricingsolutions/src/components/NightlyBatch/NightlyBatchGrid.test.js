import {render, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router} from 'react-router-dom'
import ReactDOM  from 'react-dom';

import '@testing-library/jest-dom'



import NightlyBatchGrid from './NightlyBatchGrid';


let vdom;
beforeEach(()=>{
    vdom = render(<NightlyBatchGrid/>);
}
);
afterEach(cleanup);

describe('Nightly Batch Process Grid Component', () => {

test("renders without crashing", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<NightlyBatchGrid />, div);
});
test("renders Grid component", ()=>{
    expect(vdom.getByTestId("nightlyBatchGridTest")).toBeDefined();
});
// test("renders button component", ()=>{
//     expect(vdom.getByTestId("incompleteButtonTest")).toBeDefined();
// });
// test("renders button component", ()=>{
//     expect(vdom.getByTestId("completeButtonTest")).toBeDefined();
// });
// test("renders paper component", ()=>{
//     expect(vdom.getByTestId("paperTest")).toBeDefined();
// });


});
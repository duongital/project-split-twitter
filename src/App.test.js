import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//test the function splitMessage()
it('test function: splitMessage', () => {
  const wrapper = shallow(<App/>);

  //check the message is blank
  expect(wrapper.instance().splitMessage("")).toEqual([""]);

  //check the message is less than 50 chars
  expect(wrapper.instance().splitMessage("short message")).toEqual(["short message"]);

  //check the message is over 50 chars and not include space
  window.alert = () => {};
  expect(wrapper.instance().splitMessage("shortMessageButNotIncludeSpaceshortMessageButNotIncludeSpace"))
    .toEqual([]);

  //check the message is over than 50 chars
  expect(wrapper.instance().splitMessage("I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."))
    .toEqual(["1/2 I can't believe Tweeter now supports chunking", 
              "2/2 my messages, so I don't have to do it myself."]);

})

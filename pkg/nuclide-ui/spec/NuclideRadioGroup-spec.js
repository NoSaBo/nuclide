'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

const {RadioGroup} = require('../lib/RadioGroup');
const {
  React,
  ReactDOM,
  TestUtils,
} = require('react-for-atom');

const {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = TestUtils;

describe('RadioGroup', () => {

  it('honors the selectedIndex param', () => {
    const props = {optionLabels: ['foo', 'bar'], selectedIndex: 1};
    const component = renderIntoDocument(
      <RadioGroup {...props} />
    );
    expect(component.props.selectedIndex).toBe(1);

    const radioInputs = scryRenderedDOMComponentsWithTag(
      component,
      'input'
    );
    expect(ReactDOM.findDOMNode(radioInputs[0]).hasAttribute('checked')).toBe(false);
    expect(ReactDOM.findDOMNode(radioInputs[1]).hasAttribute('checked')).toBe(true);
  });


  it('should use the correct, unique radio group name', () => {
    const props = {optionLabels: ['foo', 'bar'], selectedIndex: 1};
    const component = renderIntoDocument(
      <RadioGroup {...props} />
    );
    const radioInputs = scryRenderedDOMComponentsWithTag(
      component,
      'input'
    );
    // Global uid is `1` as this point, since this is the second RadioGroup component to be created.
    expect(ReactDOM.findDOMNode(radioInputs[0]).getAttribute('name')).toEqual('radiogroup-1');
    expect(ReactDOM.findDOMNode(radioInputs[1]).getAttribute('name')).toEqual('radiogroup-1');
    const component2 = renderIntoDocument(
      <RadioGroup {...props} />
    );
    const radioInputs2 = scryRenderedDOMComponentsWithTag(
      component2,
      'input'
    );
    expect(ReactDOM.findDOMNode(radioInputs2[0]).getAttribute('name')).toEqual('radiogroup-2');
    expect(ReactDOM.findDOMNode(radioInputs2[1]).getAttribute('name')).toEqual('radiogroup-2');
  });


  it('calls its onSelectedChange handler when a radio input is changed', () => {
    const onSelectedChange = jasmine.createSpy('onSelectedChange');

    const props = {
      optionLabels: ['foo', 'bar'],
      selectedIndex: 0,
      onSelectedChange: onSelectedChange,
    };
    const component = renderIntoDocument(
      <RadioGroup {...props} />
    );
    const radioInputs = scryRenderedDOMComponentsWithTag(
      component,
      'input'
    );

    Simulate.change(ReactDOM.findDOMNode(radioInputs[1]));
    expect(onSelectedChange.mostRecentCall.args[0]).toEqual(1);
  });

});

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as api from '../../apiCalls';

import AddTacoButton from '../AddTacoButton/AddTacoButton';

describe('AddTacoButton', () => {
  const mockSubmitTaco = jest.fn();
  const wrapper = shallow(<AddTacoButton submitTaco={mockSubmitTaco} id={1}/>);
  it('renders correctly', () => {
    const wrapper = renderer.create(<AddTacoButton />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('handleSubmit resets state and calls submitTaco with correct params', async () => {
    wrapper.setState({ showAddTaco: true, selectedType: 'test' })
    expect(wrapper.state('showAddTaco')).toEqual(true);
    await wrapper.instance().handleSubmit();
    expect(wrapper.state('showAddTaco')).toEqual(false);
    expect(mockSubmitTaco).toHaveBeenCalledWith('test', 1);
  });

  it('when a user pressed add taco button showAddTaco should be updated to true', () => {
    expect(wrapper.state('showAddTaco')).toEqual(false);
    wrapper.simulate('press');
    expect(wrapper.state('showAddTaco')).toEqual(true);
  });
});
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import * as api from '../../apiCalls';

import AddTacoButton from '../AddTacoButton/AddTacoButton';

describe('AddTacoButton', () => {
  const mockSubmitTaco = jest.fn();
  it('renders correctly', () => {
    const wrapper = renderer.create(<AddTacoButton />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('handleSubmit resets state and calls submitTaco with correct params', async () => {
    const wrapper = shallow(<AddTacoButton submitTaco={mockSubmitTaco} id={1}/>);
    wrapper.setState({ showAddTaco: true, selectedType: 'test' })
    expect(wrapper.state('showAddTaco')).toEqual(true);
    await wrapper.instance().handleSubmit();
    expect(wrapper.state('showAddTaco')).toEqual(false);
    expect(mockSubmitTaco).toHaveBeenCalledWith('test', 1);
  });
});
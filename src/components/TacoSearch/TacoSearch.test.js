import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TacoSearch from '../TacoSearch/TacoSearch';

describe('TacoSearch', () => {
  const wrapper = shallow(<TacoSearch />);
  it('renders correctly', () => {
    const wrapper = renderer.create(<TacoSearch />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('handleChange should update state with a new search value', () => {
    expect(wrapper.state('search')).toEqual('');
    wrapper.instance().handleChange('carne asada');
    expect(wrapper.state('search')).toEqual('carne asada');
  });
});
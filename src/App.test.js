import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
/*
const wen = image.getAttribute('width')
    const hen = image.getAttribute('height')
    console.log(width, height, wen, hen);*/
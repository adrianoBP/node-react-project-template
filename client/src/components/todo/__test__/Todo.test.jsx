import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Todo from '../Todo';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Cleanup after testing is complete
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('Todo element render', () => {
  const todo = { id: 1, name: 'New TODO Element', complete: false };

  render(<Todo todo={todo} />);
  const todoElement = screen.getByText(/New TODO Element/i);
  expect(todoElement.textContent).toBe('New TODO Element');
});

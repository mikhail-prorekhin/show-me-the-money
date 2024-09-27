import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'components/App/App';
import { MemoryRouter } from 'react-router-dom';

test('Should test root page', async () => {
  await render(
    <MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>
  );
  expect(screen.queryByTestId('page-not-found')).not.toBeInTheDocument();
});
it('Should test page not found', async () => {
  await render(
    <MemoryRouter initialEntries={["/other"]}><App /></MemoryRouter>
  );
  expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
});
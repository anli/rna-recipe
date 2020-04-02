/**
 * @format
 */

import React from 'react';
import 'react-native';
import {render} from 'react-native-testing-library';
import App from '../App';

const mockUnsubscribe = jest.fn();
jest.mock('@react-native-firebase/firestore', () => ({
  __esModule: true,
  default: () => ({
    collection: () => ({
      onSnapshot: (callback: any) => {
        callback({
          docs: [
            {id: 'RECIPE_ID_A', data: () => ({title: 'RECIPE_TITLE_A'})},
            {id: 'RECIPE_ID_B', data: () => ({title: 'RECIPE_TITLE_B'})},
          ],
        });
        return () => mockUnsubscribe;
      },
    }),
  }),
}));

it('Given data, When I open App, Then I should see recipes title "RECIPE_TITLE_A", "RECIPE_TITLE_B"', async () => {
  const {getByText} = render(<App />);
  expect(getByText('RECIPE_TITLE_A')).toBeDefined();
  expect(getByText('RECIPE_TITLE_B')).toBeDefined();
});

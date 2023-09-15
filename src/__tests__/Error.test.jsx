import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Error } from '../components';

describe('Error', () => {
  it('Renders error page', () => {
    render(<Error />);
    expect(true).toBeTruthy();
  });
});

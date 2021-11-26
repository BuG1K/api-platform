import { render } from 'react-dom';

import App from '@components';

const rootElement = document.createElement('div');

document.body.appendChild(rootElement);
render(<App />, rootElement);

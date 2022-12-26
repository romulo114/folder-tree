import { SvgIcon } from 'components';
import { ReactComponent as Content } from 'assets/icons/chevron-down.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <SvgIcon content={<Content />} />
    </div>
  );
}

export default App;

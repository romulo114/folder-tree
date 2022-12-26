import { Tree } from 'components';
import { FileType } from 'types';
import TreeData from '_mock/tree.json';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Tree content={TreeData as FileType} />
    </div>
  );
}

export default App;

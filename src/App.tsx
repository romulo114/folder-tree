import { FSTree } from 'components';
import { FileType } from 'types';
import TreeData from '_mock/tree.json';
import './App.scss';

function App() {
  return (
    <div className="App">
      <FSTree content={TreeData as FileType} />
    </div>
  );
}

export default App;

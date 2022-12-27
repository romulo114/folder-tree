import { FSTree } from 'components';
import { consolidateTree } from 'helpers';
import { FileType } from 'types';
import TreeData from '_mock/tree.json';
import './App.scss';

function App() {
  const treeData = consolidateTree(TreeData as FileType);
  return (
    <div className="App">
      <FSTree content={treeData} />
    </div>
  );
}

export default App;

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FSTree } from "../fs-tree";
import { FileType } from 'types';
import TreeData from '_mock/tree.json';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/FSTree',
  component: FSTree,
} as ComponentMeta<typeof FSTree>;

const Template: ComponentStory<typeof FSTree> = (args) => (
  <div style={{ width: 480, height: 320 }}>
    <FSTree {...args} />
  </div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  content: TreeData as FileType
};

export const Narrow = Template.bind({})
Narrow.args = {
  content: TreeData as FileType,
  size: 'narrow'
};

export const Normal = Template.bind({})
Normal.args = {
  content: TreeData as FileType,
  size: 'normal'
};

export const Wide = Template.bind({})
Wide.args = {
  content: TreeData as FileType,
  size: 'wide'
};

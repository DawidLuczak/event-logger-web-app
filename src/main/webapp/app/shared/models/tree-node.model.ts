export interface ITreeNode {
  data?: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
}

export class TreeNode implements ITreeNode {
  data: any;
  children?: TreeNode[];
  leaf?: boolean;
  expanded?: boolean;
  constructor(data: any) {
    this.data = data;
  }
}

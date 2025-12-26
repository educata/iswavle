export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function buildTree(nums: number[]): TreeNode | null {
  if (!nums.length) return null;
  const root = new TreeNode(nums[0]);
  const queue: (TreeNode | null)[] = [root];
  let i = 1;

  while (i < nums.length) {
    const current = queue.shift();
    if (!current) continue;

    if (nums[i] != null) {
      current.left = new TreeNode(nums[i]);
      queue.push(current.left);
    }
    i++;

    if (i < nums.length && nums[i] != null) {
      current.right = new TreeNode(nums[i]);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

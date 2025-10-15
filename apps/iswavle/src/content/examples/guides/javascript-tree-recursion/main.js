const tree = document.querySelector('#tree');

const fileSystem = {
  name: 'Root',
  type: 'folder',
  children: [
    {
      name: 'Folder 1',
      type: 'folder',
      children: [
        {
          name: 'File 1.1',
          type: 'file',
        },
        {
          name: 'File 1.2',
          type: 'file',
        },
      ],
    },
    {
      name: 'Folder 2',
      type: 'folder',
      children: [
        {
          name: 'File 2.1',
          type: 'file',
        },
        {
          name: 'File 2.2',
          type: 'file',
        },
      ],
    },
    {
      name: 'File 3',
      type: 'file',
    },
  ],
};

function printTree(node, indent = 0) {
  console.log(' '.repeat(indent) + node.name); // კონსოლში ვიზუალზე გამოსატანად
  tree.innerHTML += `<li><span style="padding-left: ${indent * 10}px">${
    node.name
  }</span></li>`; // ვებგვერდზე ვიზუალზე გამოსატანად

  if (node.children) {
    // თუ შვილობილი ელემენტი არსებობს გამოვიტანოთ ისიც რეკურსიულად
    node.children.forEach((child) => {
      printTree(child, indent + 2);
    });
  }
}

printTree(fileSystem);

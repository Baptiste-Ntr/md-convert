import { useContext, useEffect, useMemo } from 'react';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';

import './FileTree.scss';
import { Button } from '@mui/material';
import { FileContext } from '../Context/FileContext';

// Librairie react-complex-tree

const FileTree = () => {

    const { setFileTree } = useContext(FileContext)

    const items = useMemo(() => ({
        root: {
            isFolder: true,
            index: 'root',
            children: ['child1', 'child2', 'child3'],
            data: 'Root item',
        },
        child1: {
            isFolder: true,
            index: 'child1',
            children: [],
            data: 'Child item 1',
        },
        child2: {
            isFolder: true,
            index: 'child2',
            children: [],
            data: 'Child item 2',
        },
        child3: {
            isFolder: true,
            index: 'child3',
            children: ['child4'],
            data: 'Child item 3',
        },
        child4: {
            index: 'child4',
            children: [],
            data: 'Child item 4',
        },
    }), []);


    const dataProvider = useMemo(
        () => new StaticTreeDataProvider(items, (item, data) => ({ ...item, data })),
        [items]
    )


    const handleAddFolder = () => {
        const rand = `${Math.random()}`
        items[rand] = { data: "New Folder", index: rand, isFolder: true, children: [] }
        items.root.children.push(rand)
        dataProvider.onDidChangeTreeDataEmitter.emit(['root'])
    };

    const handleAddFile = () => {
        const rand = `${Math.random()}`
        items[rand] = { data: "New File", index: rand, isFolder: false }
        items.root.children.push(rand)
        dataProvider.onDidChangeTreeDataEmitter.emit(['root'])
    }

    useEffect(() => {
        setFileTree(items)
        console.log("items", items)
        console.log('Provider', dataProvider)
    }, [items, setFileTree, dataProvider])
    return (
        <>
            <UncontrolledTreeEnvironment
                dataProvider={dataProvider}
                getItemTitle={item => item.data}
                viewState={{}}
                canDragAndDrop={true}
                canDropOnFolder={true}
                canReorderItems={true}
                canRename={true}
            >
                <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
            </UncontrolledTreeEnvironment>
            <Button onClick={handleAddFolder}>Add Folder</Button>
            <Button onClick={handleAddFile}>Add File</Button>
        </>
    );
};

export default FileTree;
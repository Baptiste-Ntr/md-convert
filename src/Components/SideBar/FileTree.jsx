// Librairie react-complex-tree, avec un peu d'aide de chatgpt pour forcer le composant a se re-render a cause de la gestion de react-complex-tree qui ne se met pas a jour lors de l'ajout d'un dossier ou d'un fichier.

import { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import './FileTree.scss';
import { Button } from '@mui/material';
import { FileContext } from '../Context/FileContext';
import { MDContext } from '../Context/MDContext';

const FileTree = () => {
    const { setFileTree, baseFileTree } = useContext(FileContext);
    const { setImportedFile } = useContext(MDContext);
    const [items, setItems] = useState({});
    // TreeKey est la pour obliger le composant a se rerender lors de l'ajout d'un dossier ou d'un fichier
    const [treeKey, setTreeKey] = useState(Date.now());

    console.log('Items:', items);
    console.log('BaseFileTree:', baseFileTree);

    useEffect(() => {
        if (baseFileTree) {
            setItems(baseFileTree);
        }
    }, [baseFileTree]);

    const dataProvider = useMemo(
        () => new StaticTreeDataProvider(items, (item, data) => ({ ...item, data })),
        [items]
    );

    useEffect(() => {
        setFileTree(items);
    }, [items, setFileTree]);

    const handleAddFolder = useCallback(() => {
        const rand = `${Math.random()}`;
        setItems(prevItems => {
            const newItems = { ...prevItems };
            newItems[rand] = { data: "New Folder", index: rand, isFolder: true, children: [] };
            if (newItems.root) {
                newItems.root.children = [...newItems.root.children, rand];
            } else {
                throw new Error("Root item not found in handleFolder");
            }
            return newItems;
        });
        setTreeKey(Date.now());  // Change la clé pour forcer le rerender du composant Tree
    }, []);

    const handleAddFile = useCallback(() => {
        const rand = `${Math.random()}`;
        setItems(prevItems => {
            const newItems = { ...prevItems };
            newItems[rand] = { data: "New File", index: rand, isFolder: false };
            if (newItems.root) {
                newItems.root.children = [...newItems.root.children, rand];
            } else {
                throw new Error("Root item not found in handleFile");
            }
            return newItems;
        });
        localStorage.setItem('New File', "#New file")
        setTreeKey(Date.now());  // Change la clé pour forcer le rerender du composant Tree
    }, []);

    const handleDrop = useCallback((newItems, dragSourceId, dropTargetId, index) => {
        setItems(prevItems => {
            const updatedItems = { ...prevItems };

            const sourceParent = Object.values(updatedItems).find(item =>
                item.children?.includes(dragSourceId)
            );

            if (!sourceParent) return updatedItems;

            sourceParent.children = sourceParent.children.filter(id => id !== dragSourceId);

            if (dropTargetId) {
                updatedItems[dropTargetId].children.splice(index, 0, dragSourceId);
            } else {
                updatedItems.root.children.splice(index, 0, dragSourceId);
            }

            return updatedItems;
        });
        setTreeKey(Date.now());  // Force également le rerender lors du drag and drop
    }, []);

    const handleContextMenu = (event) => {
        event.preventDefault();
        // Met le menu au niveau du curseur de la souris
        console.log(event.target.classList.contains('rct-tree-item-button-isFolder'));
        if (!event.target.classList.contains('rct-tree-item-button-isFolder')) {
            const fileName = event.target.getAttribute('data-rct-item-id')
            const fileContent = localStorage.getItem(fileName)
            setImportedFile(fileContent)
            console.log('File:', fileName, 'Content:', fileContent)
        }
    }

    return (
        <>
            <div onClick={handleContextMenu}>
                <UncontrolledTreeEnvironment
                    key={treeKey}  // Utilisation de la clé pour forcer le rerender
                    dataProvider={dataProvider}
                    getItemTitle={item => item.data}
                    viewState={{}}
                    canDragAndDrop={true}
                    canDropOnFolder={true}
                    canReorderItems={true}
                    canRename={true}
                    onDrop={handleDrop}

                >
                    <Tree treeId="tree-2" rootItem="root" treeLabel="Tree Example" />
                </UncontrolledTreeEnvironment>
            </div>
            <Button onClick={handleAddFolder}>Add Folder</Button>
            <Button onClick={handleAddFile}>Add File</Button>
        </>
    );
};

export default FileTree;
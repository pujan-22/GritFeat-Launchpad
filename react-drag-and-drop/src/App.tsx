import { useState } from 'react';

interface Item {
  id: string;
  content: string;
  color: string;
}

const DragDropContainer = () => {
  const [containerA, setContainerA] = useState<Item[]>([
    { id: 'a1', content: 'Item 1', color: 'bg-blue-200' },
    { id: 'a2', content: 'Item 2', color: 'bg-green-200' },
    { id: 'a3', content: 'Item 3', color: 'bg-yellow-200' },
    { id: 'a4', content: 'Item 4', color: 'bg-red-200' },
  ]);

  const [containerB, setContainerB] = useState<Item[]>([
    { id: 'b1', content: 'Item 5', color: 'bg-purple-200' },
    { id: 'b2', content: 'Item 6', color: 'bg-pink-200' },
  ]);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverContainer, setDragOverContainer] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggingId(id);
  };

  const handleDragOver = (e: React.DragEvent, containerName: string) => {
    e.preventDefault();
    setDragOverContainer(containerName);
  };

  const handleDragLeave = () => {
    setDragOverContainer(null);
  };

  const handleDrop = (e: React.DragEvent, targetContainer: 'A' | 'B') => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    
    // Find the item being dragged
    let item: Item | null = null;
    let sourceContainer: 'A' | 'B' | null = null;
    
    // Check if item is in container A
    const itemInA = containerA.find(i => i.id === id);
    if (itemInA) {
      item = itemInA;
      sourceContainer = 'A';
    }
    
    // Check if item is in container B
    const itemInB = containerB.find(i => i.id === id);
    if (itemInB) {
      item = itemInB;
      sourceContainer = 'B';
    }
    
    if (!item || sourceContainer === targetContainer) {
      setDragOverContainer(null);
      setDraggingId(null);
      return;
    }
    
    // Remove from source container
    if (sourceContainer === 'A') {
      setContainerA(prev => prev.filter(i => i.id !== id));
    } else {
      setContainerB(prev => prev.filter(i => i.id !== id));
    }
    
    // Add to target container
    if (targetContainer === 'A') {
      setContainerA(prev => [...prev, item as Item]);
    } else {
      setContainerB(prev => [...prev, item as Item]);
    }
    
    setDragOverContainer(null);
    setDraggingId(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverContainer(null);
  };

  // Render container function to avoid code duplication
  const renderContainer = (containerName: 'A' | 'B', items: Item[]) => {
    const isDragOver = dragOverContainer === containerName;
    
    return (
      <div 
        className={`w-1/2 p-4 border-2 rounded-lg ${
          isDragOver ? 'border-dashed border-blue-500 bg-blue-50' : 'border-gray-300'
        } transition-all duration-200`}
        onDragOver={(e) => handleDragOver(e, containerName)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, containerName)}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Container {containerName}</h2>
        <div className="min-h-40">
          {items.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
              className={`p-3 mb-2 rounded cursor-move shadow ${
                item.color
              } ${
                draggingId === item.id ? 'opacity-50 scale-95' : 'opacity-100'
              } transition-all duration-200`}
            >
              {item.content}
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-gray-400 text-center py-10 border-2 border-dashed rounded">
              Drop items here
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">React Drag-and-Drop</h1>
      <div className="flex gap-6">
        {renderContainer('A', containerA)}
        {renderContainer('B', containerB)}
      </div>
      <div className="mt-6 text-center text-sm text-gray-500">
        Drag items between containers to move them
      </div>
    </div>
  );
};

export default DragDropContainer;
import React, { useCallback } from 'react';
import ReactFlow, { Node, Edge, useNodesState, Controls } from 'reactflow';
import { useUserContext } from '../../context/UserContext';
import 'reactflow/dist/style.css';

const UserVisualization: React.FC = () => {
  const { users, updateUser } = useUserContext(); // Access context to modify users

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
  
      const hobby = event.dataTransfer.getData('text/plain');
      const targetNode = (event.target as HTMLElement).closest('.react-flow__node') as HTMLElement;
      const targetNodeId = targetNode?.dataset.id;
  
      if (hobby && targetNodeId) {
        console.log(`Dropped hobby "${hobby}" onto user ID: ${targetNodeId}`);

        const updatedUser= users.find((user) =>user.id===targetNodeId);
        if(!updatedUser)
          return;

        const updatedUserData= {...updatedUser, hobbies:[...updatedUser.hobbies,hobby]};
        // const updatedUsers = users.map((user) =>
        //   user.id === targetNodeId ? { ...user, hobbies: [...user.hobbies, hobby] } : user
        // );
  
        updateUser(targetNodeId,updatedUserData);
      }
    },
    [users, updateUser]
  );
  
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  // Create nodes for users and their hobbies
  const userNodes: Node[] = users.flatMap((user) => [
    {
      id: user.id,
      data: { label: `${user.username} (${user.age})` },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      type: 'default',
      draggable: true,
      dragHandle: '.drag-handle',
      className: 'react-flow__node',
      'data-id': user.id,
    },
    ...user.hobbies.map((hobby, index) => ({
      id: `${user.id}-hobby-${index}`,
      data: { label: hobby },
      position: { x: Math.random() * 500, y: Math.random() * 500 + 100 },
      type: 'output', // Different type for better visualization
    })),
  ]);

  // Create edges connecting users to their hobbies
  const userEdges: Edge[] = users.flatMap((user) =>
    user.hobbies.map((_, index) => ({
      id: `e${user.id}-hobby-${index}`,
      source: user.id,
      target: `${user.id}-hobby-${index}`,
      animated: true,
      style: { stroke: 'blue', strokeWidth: 2 },
    }))
  );

  return (
    <div style={{ height: '500px', border: '2px dashed #ddd', position: 'relative' }}>
      <ReactFlow nodes={userNodes} edges={userEdges} onDragOver={handleDragOver} onDrop={handleDrop}>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default UserVisualization;

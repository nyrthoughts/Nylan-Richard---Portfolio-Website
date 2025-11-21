import React, { Suspense, useState } from 'react';
import { NeuralNetwork } from './components/NeuralNetwork';
import { Interface } from './components/Interface';

const App: React.FC = () => {
  // State is now persistent: once true, it stays true
  const [hasHoveredNode, setHasHoveredNode] = useState(false);

  const handleHover = (isHovering: boolean) => {
    if (isHovering) {
      setHasHoveredNode(true);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white selection:bg-white selection:text-black">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <NeuralNetwork onHover={handleHover} />
        </Suspense>
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Interface isHoveringNode={hasHoveredNode} />
      </div>
    </div>
  );
};

export default App;
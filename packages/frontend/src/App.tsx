import { useSocket } from "./hooks/useSocket";
import { ChatContainer } from "./components/chat/ChatContainer";
import { Layout } from "./components/common/Layout";
import { ArtifactWindow } from "./components/artifacts/ArtifactWindow";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const {
    isConnected,
    isTyping,
    currentResponse,
    messages,
    error,
    artifact,
    isArtifactOpen,
    closeArtifact,
    toggleArtifact,
    sendMessage,
  } = useSocket();
  
  // State to track if there's a new artifact that hasn't been viewed
  const [hasNewArtifact, setHasNewArtifact] = useState(false);
  
  // Reset the new artifact indicator when the artifact window is opened
  useEffect(() => {
    if (isArtifactOpen) {
      setHasNewArtifact(false);
    }
  }, [isArtifactOpen]);
  
  // Set the new artifact indicator when a new artifact is received
  useEffect(() => {
    if (artifact && !isArtifactOpen) {
      setHasNewArtifact(true);
    }
  }, [artifact, isArtifactOpen]);
  
  // Always show the toggle button after the first message
  const hasMessages = messages.length > 0;

  return (
    <Layout>
      {isConnected && (
        <ChatContainer
          messages={messages}
          currentResponse={currentResponse}
          isTyping={isTyping}
          error={error}
          onSendMessage={sendMessage}
        />
      )}
      
      {/* Artifact Toggle Button - always show after first message */}
      {hasMessages && (
        <button 
          className={`artifact-toggle-button ${hasNewArtifact ? 'has-new-artifact' : ''}`}
          onClick={toggleArtifact}
          title="Toggle Code Artifacts"
        >
          {isArtifactOpen ? '❌ Close Code' : hasNewArtifact ? '🔔 New Code!' : '📋 View Code'}
        </button>
      )}
      
      {/* Artifact Window */}
      <ArtifactWindow 
        isOpen={isArtifactOpen} 
        onClose={closeArtifact} 
        artifact={artifact} 
      />
    </Layout>
  );
}

export default App;

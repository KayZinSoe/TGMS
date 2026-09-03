import React, { useEffect, useRef, useState } from 'react';
import './WorkflowDiagramCard.css';

let mermaidInitialised = false;

interface WorkflowDiagramCardProps {
  diagram: any;
}

const WorkflowDiagramCard: React.FC<WorkflowDiagramCardProps> = ({ diagram }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [renderError, setRenderError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  return (
    <div className="workflow-diagram-card">
      <h4 className="workflow-diagram-card__title">{diagram.title}</h4>

      <div className="workflow-diagram-card__body">
        {/* Left: editable Mermaid source */}
        <div className="workflow-diagram-card__editor-panel">
          <p className="workflow-diagram-card__panel-label">Mermaid Source</p>
          <textarea
            className="workflow-diagram-card__textarea"
            defaultValue={diagram.source}
            spellCheck={false}
            aria-label={`Mermaid source for ${diagram.title}`}
          />
        </div>

        {/* Right: rendered preview */}
        <div className="workflow-diagram-card__preview-panel">
          <p className="workflow-diagram-card__panel-label">Preview</p>
          {renderError ? (
            <p className="workflow-diagram-card__render-error" role="alert">
              {renderError}
            </p>
          ) : (
            <div
              className="workflow-diagram-card__svg-wrapper"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagramCard;

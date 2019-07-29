import styled from 'styled-components';
import { CodeExample } from './story-utils';

export const VisuallyHidden = styled.span`
  border: 0;
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  -webkit-clip-path: inset(50%);
`;

export const StoryVisuallyHidden = () => (
  <>
    <p>The VisuallyHidden component renders content for screen readers that is not visible on screen, but is visible to screen readers and text selection.</p>
    <CodeExample>{`<VisuallyHidden>hidden text</VisuallyHidden>`}</CodeExample>
    <div>
      <p>This paragraph contains <VisuallyHidden>(Bruce Willis was dead the whole time)</VisuallyHidden> a secret message.</p>
    </div>
  </>
)
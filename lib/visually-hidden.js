import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './button';
import { CodeExample, Prop, PropsDefinition } from './story-utils';

export const VisuallyHidden = styled.span.attrs(() => ({ 'data-module': 'VisuallyHidden' }))`
  ${props => !props.show && `
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
  `}
`;

export const StoryVisuallyHidden = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <p>
        The VisuallyHidden component renders content for screen readers that is not visible on screen, but is visible to screen readers and text
        selection.
      </p>
      <PropsDefinition>
        <Prop name="show">
          If true, do not hide the content. Useful for content that is sometimes visually hidden but always available to screen readers.
        </Prop>
      </PropsDefinition>
      <CodeExample>{`<VisuallyHidden>hidden text</VisuallyHidden>`}</CodeExample>
      <div>
        <p>
          This paragraph contains <VisuallyHidden>(Bruce Willis was dead the whole time)</VisuallyHidden> a secret message.
        </p>
      </div>
      <CodeExample>{`<VisuallyHidden show={toggleValue}>hidden text</VisuallyHidden>`}</CodeExample>
      <div>
        <p>
          This paragraph contains <VisuallyHidden show={show}>(The alien planet was actually Earth)</VisuallyHidden> a secret message too.
        </p>
        <Button onClick={() => setShow((show) => !show)}>Toggle secret</Button>
      </div>
    </>
  );
};

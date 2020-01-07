import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Icon } from './icon';
import { sizes } from './system';
import { CodeExample, PropsDefinition, Prop } from './story-utils';

const BaseButton = styled.button`
  appearance: none;
  color: inherit;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  text-transform: none;
  text-align: left;
  cursor: pointer;
`;
BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};
BaseButton.defaultProps = {
  type: 'button',
};

const StyledButton = styled.span`
  display: inline-block;
  border-radius: var(--rounded);
  font-family: var(--fonts-sans);
  font-weight: 600;
  line-height: 1;
  position: relative;
  white-space: nowrap;
  &:disabled,
  button:disabled &,
  a:disabled & {
    opacity: 0.5;
    pointer-events: none;
  }
  // Most buttons will have capital letters, but many will not have descenders.
  // As a result, even padding on buttons frequently looks unbalanced,
  // so we apply extra padding to the top to correct this.
  // Note that this is font-specific and proportional to font size,
  // and at smaller sizes this is complicated by pixel rounding.
  padding: 0.375em 0.5em 0.1875em;
  text-decoration: none;

  ${({ variant }) => variants[variant]}
  ${({ size }) => sizes[size]}
  ${({ textWrap }) =>
      textWrap &&
      css`
        white-space: normal;
    `}
  `;

const focus = (...args) => css`
  &:focus,
  button:focus &,
  a:focus & {
    box-shadow: 0 0 0 1px white, 0 0 0 3px var(--colors-focused);
    outline-color: transparent;
    color: var(--colors-selected-text);
    ${css(...args)}
  }
`;

const hover = (...args) => css`
  &:hover,
  button:hover &,
  a:hover & {
    ${css(...args)}
    text-decoration: none;
  }
  &:active,
  button:active &,
  a:active & {
    color: var(--colors-selected-text);
    background-color: var(--colors-selected-background);
  }
`;

const variants = {
  primary: css`
    color: var(--colors-primary);
    background-color: var(--colors-background);
    border: 2px solid var(--colors-primary);

    ${focus`
      background-color: var(--colors-selected-background);
    `}
    ${hover`
      background-color: var(--colors-secondaryBackground);
    `}
  `,
  secondary: css`
    color: var(--colors-secondary);
    background-color: var(--colors-background);
    border: 1px solid var(--colors-secondary);

    ${focus`
      background-color: var(--colors-selected-background);
    `}
    ${hover`
      background-color: var(--colors-secondaryBackground);
    `}
  `,
  cta: css`
    color: #222;
    background-color: #83ffcd;
    border: 2px solid var(--colors-primary);
    box-shadow: 4px 4px 0 var(--colors-primary);
    margin-right: 4px;

    ${hover`
      box-shadow: 2px 2px 0 var(--colors-primary);
    `}
  `,
  warning: css`
    color: var(--colors-secondary);
    background-color: var(--colors-background);
    border: 1px solid var(--colors-secondary);

    ${focus`
      background-color: var(--colors-warning-background);
    `}
    ${hover`
      color: var(--colors-warning-text);
      background-color: var(--colors-warning-background);
    `}
  `,
};

export const UnstyledButton = styled(BaseButton).attrs(() => ({ 'data-module': 'UnstyledButton' }))``;
export const Button = styled(StyledButton).attrs(() => ({ 'data-module': 'Button' }))``;

Button.propTypes = {
  variant: PropTypes.oneOf(Object.keys(variants)),
  size: PropTypes.oneOf(Object.keys(sizes)),
  textWrap: PropTypes.bool,
};
Button.defaultProps = {
  variant: 'primary',
  size: 'normal',
  textWrap: false,
  as: BaseButton,
};

const Container = styled.div`
  margin: var(--space-1) auto;
  & > * {
    margin: 0 var(--space-1) var(--space-1) 0;
  }
`;

export const StoryButton_unstyled = () => (
  <>
    <p>
      The UnstyledButton component renders buttons that have the behaviors of <code>{`<button>`}</code> elements, but with all the styling removed.
      These are not all that useful on their own, but are used as a base for creating other buttons, including those below.
    </p>
    <CodeExample>{`<UnstyledButton onClick={logClick}>unstyled button</UnstyledButton>`}</CodeExample>
    <Container>
      <UnstyledButton onClick={() => console.log('clicked unstyled button')}>unstyled button</UnstyledButton>
    </Container>
  </>
);

export const StoryButton = () => (
  <>
    <p>The Button component renders buttons and other elements that look like buttons.</p>
    <CodeExample>{`<Button variant="primary" onClick={logClick}>Click Me</Button>`}</CodeExample>
    <PropsDefinition>
      <Prop name="variant">The button style: "primary", "secondary", "cta", "warning" (default "primary") -- see below for examples.</Prop>
      <Prop name="size">The size of the text in the button: "tiny", "small", "normal", "big", "bigger", or "huge" (default "normal").</Prop>
    </PropsDefinition>
  </>
);

export const StoryButton_variants_and_sizes = () => (
  <>
    <p>(Note that the actual variant / size names are in lowercase, but button text should be written in title case.)</p>
    <Container>
      {['Primary', 'Secondary', 'CTA', 'Warning'].map((label) => (
        <Button key={label} as="span" disabled={false} size="normal" imagePosition="left" textWrap={true} variant={label.toLowerCase()} onClick={() => console.log(`clicked ${label}`)}>
          {label}
        </Button>
      ))}
    </Container>
    <Container>
      {['Tiny', 'Small', 'Normal', 'Big', 'Bigger', 'Huge'].map((label) => (
        <Button key={label} size={label.toLowerCase()} onClick={() => console.log(`clicked ${label}`)}>
          {label}
        </Button>
      ))}
    </Container>
  </>
);

const noop = () => {};

export const StoryButton_with_Icon = () => (
  <>
    <p>Buttons can contain icons, loaders, and other inline graphics in addition to text.</p>
    <CodeExample>{`<Button onClick={addProject}>Add Project <Icon icon="bentoBox" /></Button>`}</CodeExample>
    <Container>
      <Button onClick={noop}>No Icon</Button>
      <Button textWrap onClick={noop}>
        View 8 Projects <Icon icon="arrowRight" />
      </Button>
      <Button onClick={noop}>
        Add Project <Icon icon="bentoBox" />
      </Button>
      <Button variant="warning" size="tiny" onClick={noop}>
        Delete blob-papa <Icon icon="bomb" />
      </Button>
    </Container>
  </>
);

const ProjectLink = styled.a`
  display: block;
  width: 300px;
  border-radius: var(--rounded);
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
  padding: var(--space-1);
  margin: var(--space-1) 0;
  text-decoration: none;
`;

export const StoryButton_as_link = () => (
  <>
    <p>
      Button styles can be applied to other elements, such as <code>{`<a>`}</code> or <code>{`<summary>`}</code>. We can override the button's element
      with the "as" prop available on all styled components.
    </p>
    <CodeExample>{`<Button as="a" href="https://glitch.com/edit/#!/shared-components">View Source</Button>`}</CodeExample>
    <Container>
      <Button as="a" href="https://glitch.com/edit/#!/shared-components">
        View Source
      </Button>
    </Container>
  </>
);

const ShadowButton = styled(Button)`
  ${hover`
    background-color: var(--colors-secondaryBackground);
    box-shadow: 4px 4px 0 var(--colors-primary);
  `}
`;

export const StoryButton_custom_styles = () => (
  <>
    <p>Buttons can have custom styles via the "className" prop or by wrapping as a styled component.</p>
    <ShadowButton onClick={() => console.log('Button with Shadow')}>Button with Shadow</ShadowButton>
  </>
);

export const StoryButton_as_decorative_element = () => (
  <>
    <p>
      Sometimes we use a button as a decorative element inside a link or other, larger interactive element. In this case, we can use the "as" prop to
      use a non-interactive element for the button. This decorative button will have its hover styles applied when you hover over the <em>parent</em>{' '}
      element.
    </p>
    <CodeExample>{`<Button as="span">fir-nose</Button>`}</CodeExample>
    <ProjectLink href="https://glitch.com/~fir-nose">
      <Button as="span">fir-nose</Button>
      <p>Feature: button component</p>
    </ProjectLink>
  </>
);

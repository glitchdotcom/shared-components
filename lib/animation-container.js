import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
// stories
import { Button } from './button';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';

const nullAnimation = keyframes``;

export const slideUp = keyframes`
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
`;
export const slideDown = keyframes`
  to {
    transform: translateY(50px);
    opacity: 0;
  }
`;
export const fadeOut = keyframes`
  to {
    opacity: 0;
  }
`;

const AnimationWrap = styled.div`
  animation-name: ${({ animation }) => animation};
  @media (prefers-reduced-motion: reduce) {
    animation-name: ${({ reducedMotionAnimation }) => reducedMotionAnimation};
  }
  animation-duration: var(--animation-duration, 0.1s);
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

export const AnimationContainer = ({ animation, reducedMotionAnimation, duration, children, onAnimationEnd, ...props }) => {
  const [active, setActive] = React.useState(false);
  const ref = React.useRef();

  const handleAnimationEnd = (event) => {
    if (event.target === ref.current) onAnimationEnd(event);
  };

  return (
    <AnimationWrap
      data-module="AnimationContainer"
      animation={active ? animation || reducedMotionAnimation || nullAnimation : null}
      reducedMotionAnimation={active ? reducedMotionAnimation || nullAnimation : null}
      style={{
        '--duration': duration,
      }}
      ref={ref}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {children(() => setActive(true))}
    </AnimationWrap>
  );
};

AnimationContainer.propTypes = {
  animation: PropTypes.any,
  reducedMotionAnimation: PropTypes.any,
  children: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};

const ExampleBlock = styled.div`
  padding: var(--space-1);
  border: 1px solid var(--colors-border);
`;

const Grid = styled.div`
  display: grid;
  grid-gap: var(--space-1);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  margin: var(--space-1) auto;
`;

const ProjectItem = styled.div`
  border-radius: var(--rounded);
  padding: var(--space-1);
  color: var(--colors-tertiary-text);
  background-color: var(--colors-tertiary-background);
`;

export const StoryAnimationContainer = () => {
  const [projects, setProjects] = React.useState([{ id: 1, domain: 'power-passenger', pinned: true }, { id: 2, domain: 'deface-the-moon' }]);
  const pinnedProjects = projects.filter((p) => p.pinned);
  const recentProjects = projects.filter((p) => !p.pinned);

  const pinProject = (project) => {
    setProjects((projects) => projects.map((p) => (p.domain === project.domain ? { ...project, pinned: true } : p)));
  };
  const unpinProject = (project) => {
    setProjects((projects) => projects.map((p) => (p.domain === project.domain ? { ...project, pinned: false } : p)));
  };

  return (
    <>
      <p>The AnimationContainer component renders a container that adds animations to callbacks.</p>
      <CodeExample>
        {code`
          <AnimationContainer animation={slideUp} onAnimationEnd={() => featureProject(project)}>
            {(startAnimation) => <Project project={project} onFeature={startAnimation} />}
          </AnimationContainer>
        `}
      </CodeExample>
      <PropsDefinition>
        <Prop name="animation">
          The CSS animation to run. Can either be the name of an animation declared in a stylesheet or an object returned from{' '}
          <a href="https://www.styled-components.com/docs/api#keyframes">
            styled-components' <code>keyframes</code> helper
          </a>
          .
        </Prop>
        <Prop name="reducedMotionAnimation">
          The animation to run if the user has "prefers-reduced-motion" set, or if no value is provided for the "animation" prop. Read the{' '}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions">WCAG guidelines</a> for more information on accessibility
          in animations.
        </Prop>
        <Prop name="duration">The duration of the animation. Defaults to "0.1s".</Prop>
        <Prop name="children" required>
          A render prop, which passes in a callback function that starts the animation.
        </Prop>
        <Prop name="onAnimationEnd" required>
          A callback function, called when the animation is completed. If no animation is provided, this runs immediately.
        </Prop>
      </PropsDefinition>
      <ExampleBlock>
        <h3>Pinned Projects</h3>
        <p>(if "reduce motion" is active, these will dissapear without animating out.)</p>
        <Grid>
          {pinnedProjects.map((project) => (
            <AnimationContainer key={project.id} animation={slideDown} onAnimationEnd={() => unpinProject(project)}>
              {(animateAndUnpin) => (
                <ProjectItem>
                  <h3>{project.domain}</h3>
                  <Button size="small" onClick={animateAndUnpin}>
                    Un-pin Project
                  </Button>
                </ProjectItem>
              )}
            </AnimationContainer>
          ))}
        </Grid>
        <h3>Recent Projects</h3>
        <p>(if "reduce motion" is active, these will fade out.)</p>
        <Grid>
          {recentProjects.map((project) => (
            <AnimationContainer key={project.id} animation={slideUp} reducedMotionAnimation={fadeOut} onAnimationEnd={() => pinProject(project)}>
              {(animateAndPin) => (
                <ProjectItem>
                  <h3>{project.domain}</h3>
                  <Button size="small" onClick={animateAndPin}>
                    Pin Project
                  </Button>
                </ProjectItem>
              )}
            </AnimationContainer>
          ))}
        </Grid>
      </ExampleBlock>
    </>
  );
};

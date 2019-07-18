import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './button';

const animations = {
  slideUp: styled.keyframes`
    to {
      transform: translateY(-50px);
      opacity: 0;
    }
  `,
  slideDown: styled.keyframes`
    to {
      transform: translateY(50px);
      opacity: 0;
    }
  `,
};

const AnimationWrap = styled.div`
  animation-name: ${({ animation }) => animations[animation]};
  animation-duration: 0.1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

export const AnimationContainer = ({ animation, children, onAnimationEnd, ...props }) => {
  const [state, setState] = React.useState({ active: false, handlerArgs: [] });
  const ref = React.useRef();
  const handleAnimationEnd = (event) => {
    if (event.target === ref.current) {
      onAnimationEnd(...state.handlerArgs);
    }
  };

  return (
    <AnimationWrap
      data-module="AnimationContainer"
      animation={state.active ? animation : null}
      ref={ref}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {children((...handlerArgs) => setState({ active: true, handlerArgs }))}
    </AnimationWrap>
  );
};

AnimationContainer.propTypes = {
  animation: PropTypes.oneOf(Object.keys(animations)).isRequired,
  children: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};

const ProjectItem = styled.div`
  background-color: var(--colors-secondaryBackground);
  padding: var(--space-1);
  border-radius: var(--rounded);
  margin: var(--space-1) 0;
  max-width: 22rem;
`;

export const StoryAnimationContainer = () => {
  const [projects, setProjects] = React.useState([{ domain: 'power-passenger', pinned: true }, { domain: 'deface-the-moon' }]);
  const pinnedProjects = projects.filter((p) => p.pinned);
  const recentProjects = projects.filter((p) => !p.pinned);

  const pinProject = (project) => {
    setProjects((projects) => projects.map((p) => (p.domain === project.domain ? { ...project, pinned: true } : p)));
  };
  const unpinProject = (project) => {
    setProjects((projects) => projects.map((p) => (p.domain === project.domain ? { ...project, pinned: false } : p)));
  };

  return (
    <div>
      <h3>Pinned Projects</h3>
      <div>
        {pinnedProjects.map((project) => (
          <AnimationContainer animation="slideDown" onAnimationEnd={unpinProject} key={project.domain}>
            {(animateAndUnpin) => (
              <ProjectItem>
                <h3>{project.domain}</h3>
                <Button size="small" onClick={() => animateAndUnpin(project)}>
                  Un-pin Project
                </Button>
              </ProjectItem>
            )}
          </AnimationContainer>
        ))}
      </div>
      <h3>Recent Projects</h3>
      <div>
        {recentProjects.map((project) => (
          <AnimationContainer animation="slideUp" onAnimationEnd={pinProject} key={project.domain}>
            {(animateAndPin) => (
              <ProjectItem>
                <h3>{project.domain}</h3>
                <Button size="small" onClick={() => animateAndPin(project)}>
                  Pin Project
                </Button>
              </ProjectItem>
            )}
          </AnimationContainer>
        ))}
      </div>
    </div>
  );
};

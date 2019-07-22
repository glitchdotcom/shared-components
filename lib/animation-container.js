import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// stories
import { Button } from './button';
import { Box } from './box';
import { H } from './text';
import { Grid } from './grid';

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

const ProjectItem = (props) => <Box rounded variant="highlight" padding={1} {...props} />

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
    <div>
      <H as="h3">Pinned Projects</h3>
      <Grid items={pinnedProjects}>
        {((project) => (
          <AnimationContainer animation="slideDown" onAnimationEnd={unpinProject}>
            {(animateAndUnpin) => (
              <ProjectItem>
                <H as="h3" mb={1}>{project.domain}</H>
                <Button size="small" onClick={() => animateAndUnpin(project)}>
                  Un-pin Project
                </Button>
              </ProjectItem>
            )}
          </AnimationContainer>
        ))}
      </Grid>
      <h3>Recent Projects</h3>
      <Grid items={recentProjects}>
        {((project) => (
          <AnimationContainer animation="slideUp" onAnimationEnd={pinProject}>
            {(animateAndPin) => (
              <ProjectItem>
                <H as="h3" mb={1}>{project.domain}</H>
                <Button size="small" onClick={() => animateAndPin(project)}>
                  Pin Project
                </Button>
              </ProjectItem>
            )}
          </AnimationContainer>
        ))}
      </Grid>
    </div>
  );
};

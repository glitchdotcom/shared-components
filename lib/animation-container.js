import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
// stories
import { Button } from './button';

const animations = {
  slideUp: keyframes`
    to {
      transform: translateY(-50px);
      opacity: 0;
    }
  `,
  slideDown: keyframes`
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

const createAnimationEndHandler = (...args) => (event, ref, onAnimationEnd) => {
  if (event.target === ref.current) onAnimationEnd(...args);
}

export const AnimationContainer = ({ animation, children, onAnimationEnd, ...props }) => {
  const [handleAnimationEnd, setHandler] = React.useState(null);
  const ref = React.useRef();

  return (
    <AnimationWrap
      data-module="AnimationContainer"
      animation={handleAnimationEnd ? animation : null}
      ref={ref}
      onAnimationEnd={(event) => handleAnimationEnd(event, ref, onAnimationEnd)}
      {...props}
    >
      {children((...handlerArgs) => setHandler(() => createAnimationEndHandler(...handlerArgs)))}
    </AnimationWrap>
  );
};

AnimationContainer.propTypes = {
  animation: PropTypes.oneOf(Object.keys(animations)).isRequired,
  children: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};

const ProjectItem = (props) => <Box rounded variant="tertiary" padding={1} {...props} />;

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
      <h3>
        Pinned Projects
      </h3>
      <Grid items={pinnedProjects}>
        {(project) => (
          <AnimationContainer animation="slideDown" onAnimationEnd={unpinProject}>
            {(animateAndUnpin) => (
              <ProjectItem>
                <H as="h3" mb={1}>
                  {project.domain}
                </H>
                <Button size="small" onClick={() => animateAndUnpin(project)}>
                  Un-pin Project
                </Button>
              </ProjectItem>
            )}
          </AnimationContainer>
        )}
      </Grid>
      <h3>
        Recent Projects
      </h3>
      <Grid items={recentProjects}>
        {(project) => (
          <AnimationContainer animation="slideUp" onAnimationEnd={pinProject}>
            {(animateAndPin) => (
              <ProjectItem>
                <H as="h3" mb={1}>
                  {project.domain}
                </H>
                <Button size="small" onClick={() => animateAndPin(project)}>
                  Pin Project
                </Button>
              </ProjectItem>
            )}
          </AnimationContainer>
        )}
      </Grid>
    </div>
  );
};


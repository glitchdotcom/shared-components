import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


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
  `
}

const AnimationWrap = styled.div`
  animation-name: ${({ animation }) => animations[animation]};
  animation-duration: 0.1s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`

/* Usage:
<AnimationContainer type="slideDown" onAnimationEnd={(id) => deleteProject(id)}>
  {(animateOutAndDeleteProject) => (
    <Button onClick={() => animateOutAndDeleteProject(id)}>Delete Project</Button>
  )}
</AnimationContainer>
*/
const AnimationContainer = ({ animation, children, onAnimationEnd, ...props }) => {
  const [state, setState] = React.useState({ active: false, handlerArgs: [] });
  const ref = React.useRef();
  const handleAnimationEnd = (event) => {
    if (event.target === ref.current) {
      onAnimationEnd(...state.handlerArgs);
    }
  }

  return (
    <div
      data-module=""
      ref={ref}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {children((...handlerArgs) => setState({ active: true, handlerArgs }))}
    </div>
  );
};

AnimationContainer.propTypes = {
  animation: PropTypes.oneOf(['slideDown', 'slideUp']).isRequired,
  children: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
};


export default AnimationContainer;


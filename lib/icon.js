import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconBase = styled.img`
  display: inline-block;
  vertical-align: top;
  height: 0.9em;
  width: auto;

  ${(props) => customStyles[props.icon]}
`;

const SVGBase = styled.svg`
  display: inline-block;
  vertical-align: top;
  height: 0.9em;
  width: auto;
  color: var(--colors-primary);

  ${(props) => customStyles[props.icon]}
`;

// monochromatic SVGs are handled separately from emoji so that their color can be overridden / be legible in dark mode
// should these be handled by a separate component?

const Arrow = ({ rotate, ...props }) => (
  <SVGBase viewBox="0 0 64 64" {...props}>
    <polygon points="64,32 48,48 48,36 0,36 0,28 48,28 48,16" transform={`translate(32,32) rotate(${rotate}) translate(-32,-32)`} fill="currentColor" />
  </SVGBase>
);

const Chevron = ({ rotate, ...props }) => (
  <SVGBase viewBox="0 0 64 64" {...props}>
    <path d="M20,8 L44,32 L20,56" transform={`translate(32,32) rotate(${rotate}) translate(-32,-32)`} stroke="currentColor" strokeWidth="10" fill="none" />
  </SVGBase>
);

const svgs = {
  arrowDown: (props) => <Arrow rotate="90" {...props} />,
  arrowLeft: (props) => <Arrow rotate="180" {...props} />,
  arrowRight: (props) => <Arrow rotate="0" {...props} />,
  arrowUp: (props) => <Arrow rotate="-90" {...props} />,
  chevronDown: (props) => <Chevron rotate="90" {...props} />,
  chevronLeft: (props) => <Chevron rotate="180" {...props} />,
  chevronRight: (props) => <Chevron rotate="0" {...props} />,
  chevronUp: (props) => <Chevron rotate="-90" {...props} />,
  octocat: (props) => (
    <SVGBase viewBox="-291 293 16 15" {...props}>
      <g transform="translate(-817, -18)">
        <g transform="translate(720, 13)">
          <path
            fill="currentColor"
            d="M-186,298.7c2,0,3.6,0.7,5,2s2,3,2,5c0,1.6-0.5,2.9-1.4,4.1s-2,2-3.4,2.5c-0.2,0-0.3,0-0.4-0.1
            c-0.1-0.1-0.1-0.2-0.1-0.3l0-1.9c0-0.3,0-0.6-0.1-0.8s-0.2-0.4-0.3-0.5c0.8-0.1,1.5-0.3,2.2-0.8s1-1.4,1-2.7
            c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.6-0.5-0.8c0.1-0.1,0.1-0.3,0.1-0.6c0-0.3,0-0.7-0.2-1.2c0,0-0.2,0-0.5,0
            c-0.3,0-0.8,0.3-1.5,0.7c-0.6-0.2-1.1-0.2-1.7-0.2c-0.6,0-1.2,0.1-1.8,0.2c-0.7-0.4-1.2-0.7-1.5-0.7c-0.3,0-0.5,0-0.5,0
            c-0.2,0.5-0.2,0.9-0.2,1.2c0,0.3,0.1,0.5,0.1,0.6c-0.2,0.2-0.4,0.5-0.5,0.8c-0.1,0.3-0.2,0.7-0.2,1c0,1.3,0.4,2.2,1,2.7
            c0.6,0.5,1.4,0.7,2.2,0.8c-0.1,0.1-0.2,0.2-0.3,0.4s-0.1,0.3-0.2,0.6c-0.2,0.1-0.5,0.2-0.9,0.2c-0.4,0-0.8-0.3-1.1-0.8
            c0,0-0.1-0.1-0.3-0.3c-0.2-0.2-0.4-0.3-0.8-0.4c0,0-0.1,0-0.3,0s-0.1,0.2,0.2,0.4c0,0,0.1,0.1,0.3,0.2c0.2,0.2,0.3,0.4,0.5,0.8
            c0,0.1,0.1,0.3,0.4,0.6c0.3,0.3,1,0.4,1.9,0.2l0,1.3c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.4,0.1c-1.4-0.5-2.6-1.3-3.4-2.5
            s-1.3-2.6-1.4-4.1c0-2,0.7-3.6,2-5C-189.6,299.4-188,298.7-186,298.7L-186,298.7z"
          />
        </g>
      </g>
    </SVGBase>
  ),
  search: (props) => (
    <SVGBase viewBox="0 0 15 14" {...props}>
      <g transform="translate(-582, -19)">
        <g transform="translate(297.500000, 13)">
          <path
            fill="currentColor"
            d="M294.514691,14.6722222 L294.514691,14.6722222 C295.907691,12.4516667 295.594901,9.57077778 293.804007,7.65044444 C292.780533,6.57011111 291.473007,6 290.051638,6 C288.63027,6 287.294007,6.60044444 286.270533,7.65044444 C284.166849,9.871 284.195586,13.4118333 286.242164,15.6024444 C287.265638,16.6823889 288.573164,17.2525 290.02327,17.2525 C291.075112,17.2525 292.069849,16.9526667 292.922743,16.3825556 L295.481059,19.083 C296.049901,19.6830556 296.931164,19.6830556 297.499638,19.083 L298.09648,18.453 L294.514691,14.6722222 L294.514691,14.6722222 Z M287.86248,13.8921111 C286.725533,12.6916111 286.668796,10.7413333 287.749007,9.451 C287.777375,9.39072222 287.834112,9.36077778 287.86248,9.33083333 C288.459691,8.73077778 289.198743,8.37066667 290.02327,8.37066667 C290.847428,8.37066667 291.615217,8.70083333 292.183691,9.33083333 C293.377743,10.5912222 293.377743,12.6317222 292.183691,13.8921111 C291.615217,14.4921667 290.847428,14.8522778 290.02327,14.8522778 C289.198743,14.8522778 288.459691,14.4921667 287.86248,13.8921111 L287.86248,13.8921111 Z"
            transform="translate(291.700000, 13) scale(-1, 1) translate(-291.700000, -13) "
          ></path>
        </g>
      </g>
    </SVGBase>
  ),
  sunglasses: (props) => (
    <SVGBase viewBox="0 0 29 15" {...props}>
      <path d="M2.805 8.461l6.219-6.218s.882-.93 2.226-.462m8.41 7.36l6.898-6.898s.882-.93 2.226-.462" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.991 8.514l-.001.002.484.761c.599-.599 2.121-.559 2.745.017l.482-.801c-1.045-.996-2.694-.995-3.71.021" fill="currentColor" />
      <path
        d="M5.199 5.411c-2.416 0-4.375 1.958-4.375 4.375 0 2.416 1.959 4.375 4.375 4.375 2.417 0 4.375-1.959 4.375-4.375 0-2.417-1.958-4.375-4.375-4.375zm1.703 4.375c-.032-.785-.675-1.414-1.468-1.414h-.002v-1h.002c1.344 0 2.436 1.078 2.468 2.414h-1z"
        fill="currentColor"
      />
      <path
        d="M16.356 5.411c-2.417 0-4.375 1.958-4.375 4.375 0 2.416 1.958 4.375 4.375 4.375 2.416 0 4.375-1.959 4.375-4.375 0-2.417-1.959-4.375-4.375-4.375zm1.702 4.375c-.032-.785-.675-1.414-1.467-1.414h-.003v-1h.003c1.344 0 2.435 1.078 2.467 2.414h-1z"
        fill="currentColor"
      />
    </SVGBase>
  ),
};

export const icons = {
  ambulance: 'https://cdn.glitch.com/cc880f8d-a84f-4909-b676-497522a8c625%2Fambulance.png',
  balloon: 'https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fballoon.png',
  bentoBox: 'https://cdn.glitch.com/55f8497b-3334-43ca-851e-6c9780082244%2Fbento-box.png',
  bicep: 'https://cdn.glitch.com/a7b5cfd3-307b-4b99-bc1c-ca96f720521a%2Fbiceps.png',
  bomb: 'https://cdn.glitch.com/f34c5d19-c958-40f6-b11f-7a4542a5ae5f%2Fbomb.png',
  bouquet: 'https://cdn.glitch.com/1afc1ac4-170b-48af-b596-78fe15838ad3%2Fbouquet.png',
  carpStreamer: 'https://cdn.glitch.com/f7224274-1330-4022-a8f2-8ae09dbd68a8%2Fcarp_streamer.png',
  clapper: 'https://cdn.glitch.com/25a45fb6-d565-483a-87d2-f944befeb36b%2Fclapper.png',
  creditCard: 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Fcredit-card.png',
  crystalBall: 'https://cdn.glitch.com/d1106f7a-2623-4461-8326-5945e5b97d8b%2Fcrystal-ball_1f52e.png',
  diamondSmall: 'https://cdn.glitch.com/180b5e22-4649-4c71-9a21-2482eb557c8c%2Fdiamond-small.svg',
  dogFace: 'https://cdn.glitch.com/03736932-82dc-40e8-8dc7-93330c933143%2Fdog-face.png',
  email: 'https://cdn.glitch.com/aebac4f9-ae14-4d54-aa60-de46dac3b603%2Femail.png',
  eyes: 'https://cdn.glitch.com/9c72d8a2-2546-4c4c-9e97-2e6450752c11%2Feyes.png',
  facebook: 'https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Ffacebook-logo.png',
  faceExpressionless: 'https://cdn.glitch.com/a7b5cfd3-307b-4b99-bc1c-ca96f720521a%2Fface-expressionless.png?1555609837739',
  faceSlightlySmiling: 'https://cdn.glitch.com/a7b5cfd3-307b-4b99-bc1c-ca96f720521a%2Fface-slightly-smiling.png?1555609837380',
  fastDown: 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Ffast_down.png',
  fastUp: 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Ffast_up.png',
  fireEngine: 'https://cdn.glitch.com/39e02e0b-2b15-4c60-a7f0-1aa4d05cce4a%2FfireEngine.png',
  fishingPole: 'https://cdn.glitch.com/55f8497b-3334-43ca-851e-6c9780082244%2Ffishing_pole.png',
  framedPicture: 'https://cdn.glitch.com/f7224274-1330-4022-a8f2-8ae09dbd68a8%2Fframed_picture.png',
  google: 'https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2FgoogleLogo.png',
  herb: 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Fherb.png',
  key: 'https://cdn.glitch.com/006d6bcf-f2b7-4a29-b55d-c097b491e09c%2Fkey.png?1555429359426',
  mailboxOpen: 'https://cdn.glitch.com/006d6bcf-f2b7-4a29-b55d-c097b491e09c%2Fopen-mailbox.png?1555429351403',
  horizontalTrafficLight: 'https://cdn.glitch.com/d1106f7a-2623-4461-8326-5945e5b97d8b%2Fhorizontal-traffic-light_1f6a5.png',
  index: 'https://cdn.glitch.com/997e1260-f54f-47ad-936b-1eca8e555a51%2Findex.png?1555620428434',
  loveLetter: 'https://cdn.glitch.com/7ce3d054-7a26-40e1-9268-4189fc526e5b%2Flove-letter.png?v=1562660085578',
  microphone: 'https://cdn.glitch.com/9c72d8a2-2546-4c4c-9e97-2e6450752c11%2Fmicrophone.png',
  newspaper: 'https://cdn.glitch.com/d1106f7a-2623-4461-8326-5945e5b97d8b%2Fnewspaper_1f4f0.png',
  park: 'https://cdn.glitch.com/4f4a169a-9b63-4daa-8b6a-0e50d5c06e25%2Fnational-park_1f3de.png',
  playButton: 'https://cdn.glitch.com/6ce807b5-7214-49d7-aadd-f11803bc35fd%2Fplay.svg',
  policeOfficer: 'https://cdn.glitch.com/d1106f7a-2623-4461-8326-5945e5b97d8b%2Fpolice-officer_1f46e.png',
  private: 'https://cdn.glitch.com/f7224274-1330-4022-a8f2-8ae09dbd68a8%2Fprivate.svg',
  pushpin: 'https://cdn.glitch.com/55f8497b-3334-43ca-851e-6c9780082244%2Fpushpin.png',
  public: 'https://cdn.glitch.com/26aa7be9-76e2-4f1c-a3e4-6a41ddcec98f%2Fpublic.svg',
  rainbow: 'https://cdn.glitch.com/e5154318-7816-4ec9-a72a-a0e767031e99%2Frainbow.png',
  scales: 'https://cdn.glitch.com/6c8c1a17-f6e4-41c4-8861-378c4fad4c22%2Fscales_64.png',
  //search: 'https://cdn.glitch.com/us-east-1%3Acba180f4-ee65-4dfc-8dd5-f143280d3c10%2Fsearch.svg',
  sick: 'https://cdn.glitch.com/4f4a169a-9b63-4daa-8b6a-0e50d5c06e25%2Fface-with-thermometer_1f912.png',
  slack: 'https://cdn.glitch.com/1eaf9cb4-5150-4c24-bb91-28623c3b9da4%2Fslack.svg',
  sparkles: 'https://cdn.glitch.com/f7224274-1330-4022-a8f2-8ae09dbd68a8%2Fsparkles.png',
  sparklingHeart: 'https://cdn.glitch.com/f7224274-1330-4022-a8f2-8ae09dbd68a8%2Fsparkling_heart.png',
  spiralNotePad: 'https://cdn.glitch.com/78273300-9a1e-4c5f-804c-5e7c3c27af17%2Fspiral_note_pad.png',
  thumbsDown: 'https://cdn.glitch.com/55f8497b-3334-43ca-851e-6c9780082244%2Fthumbs_down.png',
  thumbsUp: 'https://cdn.glitch.com/c53fd895-ee00-4295-b111-7e024967a033%2Fthumbs-up.png',
  umbrella: 'https://cdn.glitch.com/d1106f7a-2623-4461-8326-5945e5b97d8b%2Fumbrella_2602.png',
  verified: 'https://cdn.glitch.com/55f8497b-3334-43ca-851e-6c9780082244%2Fverified.svg',
  wave: 'https://cdn.glitch.com/55f8497b-3334-43ca-851e-6c9780082244%2Fwave.png',
  ...svgs,
};

const customStyles = {
  search: styled.css`
    color: #ccc;
  `,
};

export const Icon = ({ icon, alt, ...props }) => {
  if (svgs[icon]) {
    const SVGIcon = svgs[icon];
    return <SVGIcon icon={icon} aria-label={alt || undefined} aria-hidden={!alt} {...props} />;
  }

  return <IconBase data-module="Icon" icon={icon} src={icons[icon]} alt={alt} {...props} />;
};
Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  alt: PropTypes.string,
};
Icon.defaultProps = {
  alt: '',
};

const Grid = styled.div`
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Header = styled.h2`
  font-weight: bold;
  font-size: var(--fontSizes-big);
  margin: 0;
`;

export const StoryIcons_in_Header = () => (
  <Grid>
    {Object.keys(icons).map((icon) => (
      <Header key={icon}>
        {icon} <Icon icon={icon} />
      </Header>
    ))}
  </Grid>
);

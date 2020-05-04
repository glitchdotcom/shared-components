import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';
import { SearchGalaxy } from './icons/searchGalaxy';

const IconBase = styled.img`
  display: inline-block;
  height: 1em;
  width: auto;
  vertical-align: top;
`;

const SVGBase = styled.svg`
  display: inline-block;
  height: 1em;
  width: auto;
  color: inherit;
  vertical-align: top;
`;

const Arrow = ({ rotate, ...props }) => (
  <SVGBase viewBox="0 0 64 64" {...props}>
    <polygon
      points="64,32 48,48 48,36 0,36 0,28 48,28 48,16"
      transform={`translate(32,32) rotate(${rotate}) translate(-32,-32)`}
      fill="currentColor"
    />
  </SVGBase>
);

const Chevron = ({ rotate, ...props }) => (
  <SVGBase viewBox="0 0 64 64" {...props}>
    <path
      d="M20,8 L44,32 L20,56"
      transform={`translate(32,32) rotate(${rotate}) translate(-32,-32)`}
      stroke="currentColor"
      strokeWidth="10"
      fill="none"
    />
  </SVGBase>
);

/* eslint-disable react/display-name */
const svgs = {
  arrowDown: (props) => <Arrow rotate="90" {...props} />,
  arrowLeft: (props) => <Arrow rotate="180" {...props} />,
  arrowRight: (props) => <Arrow rotate="0" {...props} />,
  arrowUp: (props) => <Arrow rotate="-90" {...props} />,
  chevronDown: (props) => <Chevron rotate="90" {...props} />,
  chevronLeft: (props) => <Chevron rotate="180" {...props} />,
  chevronRight: (props) => <Chevron rotate="0" {...props} />,
  chevronUp: (props) => <Chevron rotate="-90" {...props} />,
  collapse: (props) => (
    <SVGBase viewBox="0 0 14 12" {...props}>
      <rect x="0.5" y="0.5" width="13" height="11" rx="3" stroke="currentColor" strokeWidth="1" fill="none" />
      <polygon fill="currentColor" points="8.5,3 8.5,9 4.5,6" />
    </SVGBase>
  ),
  external: (props) => (
    <SVGBase width="12" height="12" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1.2V0h6v6h-1.2V2.046l-3.6 3.6V6.6v-.954L3.846 9 3 8.154 7.554 3.6H5.4v1.2H1.2v6h6V6.6h1.2V12H0V3.6h7.554l2.4-2.4H6z"
        fill="currentColor"
      />
    </SVGBase>
  ),
  eye: (props) => (
    <SVGBase viewBox="0 0 19 14" {...props}>
      <path
        d="M1.785 7.451c8.071 10.224 14.687 2.044 16.1.032.168-.241.161-.575-.021-.806-8.07-10.223-14.687-2.045-16.1-.032-.168.241-.161.575.021.806z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.116 7.056c0-1.547 1.254-2.8 2.8-2.8 1.547 0 2.8 1.254 2.8 2.8 0 1.547-1.254 2.8-2.8 2.8-1.547 0-2.8-1.254-2.8-2.8z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-inejoin="round"
      />
      <path
        d="M8.637 7.868c0-1.082.976-1.96 2.178-1.96 1.203 0 2.179.877 2.179 1.96 0 1.082-.976 1.96-2.179 1.96-1.203 0-2.178-.877-2.178-1.96"
        fill="currentColor"
      />
    </SVGBase>
  ),
  octocat: (props) => (
    <SVGBase viewBox="-194 298 16 15" {...props}>
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
    </SVGBase>
  ),
  private: (props) => (
    <SVGBase viewBox="0 0 10 12" {...props}>
      <path
        d="M0 7.006c0-1.108.887-2.006 2-2.006h6.001c1.104 0 2 .887 2 2.006v2.988c0 1.108-.887 2.006-2 2.006h-6.001c-1.104 0-2-.887-2-2.006v-2.988zm5 1.994c.46 0 .833-.373.833-.833 0-.46-.373-.833-.833-.833-.46 0-.833.373-.833.833 0 .46.373.833.833.833z"
        fill="currentColor"
      />
      <path
        d="M2.235 6.632v-2.995c0-1.107.898-2.005 1.995-2.005h1.451c1.102 0 1.995.895 1.995 1.99v2.768"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
      />
    </SVGBase>
  ),
  public: (props) => (
    <SVGBase viewBox="0 0 10 12" {...props}>
      <path
        d="M0 7.006C0 5.898.887 5 2 5h6.001c1.104 0 2 .887 2 2.006v2.988a1.998 1.998 0 0 1-2 2.006H2c-1.104 0-2-.887-2-2.006V7.006zM5 9a.833.833 0 1 0 0-1.666A.833.833 0 0 0 5 9z"
        fill="currentColor"
        fillRule="nonzero"
      />
      <path
        d="M2.235 6.632V3.637c0-1.107.898-2.005 1.995-2.005h1.451a1.998 1.998 0 0 1 1.995 1.99"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </SVGBase>
  ),
  rewind: (props) => (
    <SVGBase viewBox="0 0 14 10" {...props}>
      <path d="M6.901 0v9.804L0 4.902zM13.901 0v9.804L7 4.902z" fill="currentColor" fillRule="evenodd" />
    </SVGBase>
  ),
  search: (props) => (
    <SVGBase viewBox="0 0 19 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8ZM12.2335 14.7893C11.0056 15.5566 9.55458 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 10.0678 15.2155 11.9524 13.9278 13.3724L18.6757 18.1203C19.1053 18.5498 19.1053 19.2463 18.6757 19.6759C18.2461 20.1055 17.5496 20.1055 17.12 19.6759L12.2335 14.7893Z"
        fill="currentColor"
      />
    </SVGBase>
  ),
  searchGalaxy: (props) => (
    <SVGBase viewBox="0 0 25 26" {...props}>
      <SearchGalaxy />
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
  x: (props) => (
    <SVGBase viewBox="0 0 64 64" {...props}>
      <path d="M8,8 L56,56 M8,56 L56,8" stroke="currentColor" fill="none" strokeWidth="12" />
    </SVGBase>
  ),
};
/* eslint-enable react/display-name */

const icons = {
  ambulance: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fambulance.png?v=1568142111248',
  arrowBackward: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Farrow-backward.png',
  backhandIndex: 'https://cdn.glitch.com/652d1806-f6c1-4fa5-82e8-d5aa0e605a64%2Fbackhand.png?v=1568928651311',
  balloon: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fballoon.png?v=1568142111269',
  bentoBox: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fbento_box.png?v=1568142111435',
  bicep: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fbicep.png?v=1568142111496',
  blockArrowDown: 'https://cdn.glitch.com/9bff3f87-ccb0-468f-93d1-0b14fc94ada6%2F66866070-8ba41600-ef66-11e9-8ba5-b956864b3564.png?v=1571236309579',
  blockArrowUp: 'https://cdn.glitch.com/9bff3f87-ccb0-468f-93d1-0b14fc94ada6%2F66866071-8ba41600-ef66-11e9-881d-aa5ffd8d863d.png?v=1571236309671',
  bomb: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fbomb.png?v=1568142111619',
  boosted: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fboosted-default.png?v=1583253498622',
  bouquet: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fbouquet.png?v=1568142111689',
  carpStreamer: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fcarp_streamer.png?v=1568142111776',
  clap: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fclap.png',
  clapper: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fclapper.png?v=1568142111883',
  coffin: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fcoffin.png?v=1572970796613',
  creditCard: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fcredit_card.png?v=1568142111994',
  crescentMoon: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fcrescent-moon.png',
  crystalBall: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fcrystal_ball.png?v=1568142112091',
  cyclone: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fcyclone.png?v=1578491957356',
  dancers: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fdancers.png',
  dev: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ffooter_icon_dev.png?v=1584034391207',
  diamondSmall: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fdiamond_small.svg?v=1568142112219',
  dogFace: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fdog_face.png?v=1568142112319',
  earthAsia: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fearth-asia.png',
  email: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Femail.png?v=1568142112421',
  eyeglasses: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Feyeglasses.png?v=1578491957263',
  eyes: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Feyes.png?v=1568142112532',
  facebook: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Ffacebook.png?v=1568142112883',
  faceExpressionless: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fface_expressionless.png?v=1568142112635',
  faceSlightlySmiling: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fface_slightly_smiling.png?v=1568142112758',
  fastDown: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Ffast_down.png?v=1568142112926',
  fastUp: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Ffast_up.png?v=1568142113072',
  femaleTechnologist: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ffemale-technologist.png',
  ferrisWheel: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fferris-wheel.png',
  fireEngine: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Ffireengine.png?v=1568142113308',
  fishingPole: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Ffishing_pole.png?v=1568142113454',
  framedPicture: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fframed_picture.png?v=1568142113549',
  ghost: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fghost.png',
  glitchLogo: 'https://cdn.glitch.com/4bca9911-a70a-46cd-b0b2-f1b103c832d9%2FglitchLogo.svg?v=1569963961866',
  globeWithMeridians: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fglobe-with-meridians.png',
  google: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fgoogle.png?v=1568142113626',
  handshake: 'https://cdn.glitch.com/652d1806-f6c1-4fa5-82e8-d5aa0e605a64%2Fhandshake.png?v=1568927803312',
  helmetWithWhiteCross: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fhelmet-with-white-cross.png',
  herb: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fherb.png?v=1568142113698',
  hibiscus: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fhibiscus.png',
  horizontalTrafficLight: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Ftraffic_light.png?v=1568142116458',
  index: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Findex.png?v=1568142113805',
  key: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fkey.png?v=1568142113969',
  keyboard: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fkeyboard.png?v=1568144626975',
  ladyBeetle: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Flady-beetle.png',
  lightbulb: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Flightbulb.png?v=1575320161677',
  linkedin: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ffooter_icon_linkedin.png?v=1584034393831',
  lock: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Flock.png',
  loveLetter: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Flove_letter.png?v=1568142114067',
  mailboxOpen: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fmailbox_open.png?v=1568142114385',
  microphone: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fmicrophone.png?v=1568142114522',
  mouse: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fmouse.png?v=1568144623017',
  musicalKeyboard: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fmusical-keyboard.png',
  new: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fnew.png?v=1568142114658',
  newspaper: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fnewspaper.png?v=1568142114698',
  octagonalSign: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Foctagonal-sign.png',
  pager: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fpager.png',
  paperclip: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fpaperclip.png',
  park: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fpark.png?v=1568142114803',
  party: 'https://cdn.glitch.com/652d1806-f6c1-4fa5-82e8-d5aa0e605a64%2Fparty.png?v=1568927803442',
  playButton: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fplay_button.svg?v=1568142114870',
  policeOfficer: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fpolice_officer.png?v=1568142115138',
  pushpin: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fpushpin.png?v=1568142115347',
  rainbow: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Frainbow.png?v=1568142115279',
  raisingHandWoman: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fraising-hand-woman.png',
  refresh: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Frefresh.png?v=1574355709844',
  scales: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fscales.png?v=1568142115455',
  seedling: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fseedling.png',
  shuffle: 'https://cdn.glitch.com/e1cf74cf-ceb1-447d-a028-37499fd8f19f%2Fshuffle.png?v=1570050892416',
  sick: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fsick.png?v=1568142115737',
  slack: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fslack.svg?v=1568142115840',
  sparkles: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fsparkles.png?v=1568142115895',
  sparklingHeart: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fsparkling_heart.png?v=1568142116065',
  spiralNotePad: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fspiral_notepad.png?v=1568142116198',
  sunny: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fsunny.png',
  telephone: 'https://cdn.glitch.com/652d1806-f6c1-4fa5-82e8-d5aa0e605a64%2Ftelephone.png?v=1568928922344',
  television: 'https://cdn.glitch.com/652d1806-f6c1-4fa5-82e8-d5aa0e605a64%2Ftelevision.png?v=1568928956732',
  thumbsDown: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fthumbs_down.png?v=1568142116261',
  thumbsUp: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fthumbs_up.png?v=1568142116372',
  tokyoTower: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ftokyo-tower.png?v=1578491957385',
  trafficLight: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ftraffic-light.png',
  truck: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ftruck.png',
  turtle: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fturtle.png',
  twitter: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ffooter_icon_twitter.png?v=1584034389011',
  two: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ftwo.png',
  umbrella: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fumbrella.png?v=1568142116596',
  verified: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fverified.svg?v=1568142116735',
  victoryHand: 'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fpeace.png?v=1574355737767',
  wave: 'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fwave.png?v=1568142111233',
};

const iconOptions = Object.keys(icons).concat(Object.keys(svgs));

export const Icon = ({ icon, alt, ...props }) => {
  if (svgs[icon]) {
    const SVGIcon = svgs[icon];
    return <SVGIcon icon={icon} aria-label={alt || undefined} aria-hidden={!alt} {...props} />;
  }

  return <IconBase data-module="Icon" icon={icon} src={icons[icon]} alt={alt} {...props} />;
};
Icon.propTypes = {
  icon: PropTypes.oneOf(iconOptions).isRequired,
  alt: PropTypes.string,
};
Icon.defaultProps = {
  alt: '',
};

export const StoryIcon = () => (
  <>
    <p>The Icon component renders inline icons, dingbats and emoji in a consistent, cross-platform style.</p>
    <CodeExample>{`<Icon icon="x" alt="Close popover" />`}</CodeExample>
    <PropsDefinition>
      <Prop name="icon" required>
        The name of the icon. See <a href="#StoryIcon_options">Icon options</a> below for valid values.
      </Prop>
      <Prop name="alt">
        The accessible label for the icon. If an icon is paired with a text label (e.g. in a button) you should leave this blank.
      </Prop>
    </PropsDefinition>
  </>
);

const GiantIcon = styled(Icon)`
  height: 300px;
`;

export const StoryIcon_sizes = () => (
  <>
    <p>By default, Icons match the size of their surrounding text.</p>
    <h1 style={{ fontSize: '2rem' }}>
      Pinned Projects <Icon icon="pushpin" />
    </h1>
    <h2>
      Pinned Projects <Icon icon="pushpin" />
    </h2>
    <h3>
      Pinned Projects <Icon icon="pushpin" />
    </h3>
    <h4>
      Pinned Projects <Icon icon="pushpin" />
    </h4>
    <h5>
      Pinned Projects <Icon icon="pushpin" />
    </h5>
    <h6>
      Pinned Projects <Icon icon="pushpin" />
    </h6>
    <p>
      Icon sizes can be overridden with css classes, inline styles, or styled components. Note that many icons are 64x64 pixel PNGs and will not scale
      well.
    </p>
    <CodeExample>{code`
      const GiantIcon = styled(Icon)\`
        height: 300px;
      \`

      <GiantIcon icon="slack" />
    `}</CodeExample>
    <GiantIcon icon="slack" />
  </>
);

const Grid = styled.div`
  display: grid;
  grid-gap: var(--space-1);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  margin: var(--space-1) auto;
`;

const Inverted = styled.div`
  padding: var(--space-2);
  color: var(--colors-background);
  background-color: var(--colors-primary);
  > * + * {
    margin-left: var(--space-2);
  }
`;

export const StoryIcon_options = () => (
  <>
    <h3>Text-color icons</h3>
    <p>These icons are implemented as SVGs and match the color of their surrounding text.</p>
    <Grid>
      {Object.keys(svgs).map((icon) => (
        <span key={icon}>
          <Icon icon={icon} /> {icon}
        </span>
      ))}
    </Grid>
    <Inverted>
      {Object.keys(svgs).map((icon) => (
        <span key={icon}>
          <Icon icon={icon} alt={icon} />
        </span>
      ))}
    </Inverted>
    <h3>Pseudo-emoji</h3>
    <p>These icons have consistent colors regardless of their context.</p>
    <Grid>
      {Object.keys(icons).map((icon) => (
        <span key={icon}>
          <Icon icon={icon} /> {icon}
        </span>
      ))}
    </Grid>
  </>
);

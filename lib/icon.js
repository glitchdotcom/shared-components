import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { code, CodeExample, PropsDefinition, Prop } from './story-utils';
import { SearchGalaxy } from './icons/searchGalaxy';
import { parse } from 'twemoji-parser';

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

const BackArrow = ({ ...props }) => (
  <SVGBase viewBox="0 0 17 19" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M5.46967 0.469727L0.46967 5.46973C0.176777 5.76262 0.176777 6.23749 0.46967 6.53039L5.46967 11.5304L6.53033 10.4697L2.81068 6.75008H2.82047H2.83928H2.85815H2.87708H2.89607H2.91512H2.93423H2.9534H2.97263H2.99191H3.01125H3.03065H3.0501H3.06961H3.08917H3.10878H3.12845H3.14817H3.16795H3.18777H3.20765H3.22758H3.24755H3.26758H3.28765H3.30777H3.32794H3.34816H3.36842H3.38873H3.40909H3.42949H3.44993H3.47041H3.49094H3.51151H3.53213H3.55278H3.57347H3.59421H3.61498H3.63579H3.65664H3.67753H3.69846H3.71942H3.74042H3.76145H3.78252H3.80362H3.82475H3.84592H3.86712H3.88835H3.90961H3.93091H3.95223H3.97359H3.99497H4.01638H4.03782H4.05928H4.08077H4.10229H4.12383H4.1454H4.16699H4.18861H4.21025H4.23191H4.25359H4.2753H4.29702H4.31877H4.34054H4.36232H4.38412H4.40594H4.42778H4.44963H4.47151H4.49339H4.51529H4.53721H4.55914H4.58108H4.60303H4.625H4.64698H4.66897H4.69097H4.71298H4.73499H4.75702H4.77906H4.8011H4.82315H4.8452H4.86726H4.88933H4.9114H4.93347H4.95555H4.97763H4.99971H5.0218H5.04388H5.06597H5.08805H5.11014H5.13222H5.1543H5.17638H5.19845H5.22053H5.24259H5.26466H5.28671H5.30877H5.33081H5.35285H5.37488H5.3969H5.41891H5.44092H5.46291H5.48489H5.50686H5.52882H5.55077H5.5727H5.59462H5.61653H5.63842H5.6603H5.68216H5.704H5.72583H5.74764H5.76943H5.7912H5.81296H5.83469H5.8564H5.8781H5.89977H5.92141H5.94304H5.96464H5.98622H6.00777H6.0293H6.0508H6.07227H6.09372H6.11514H6.13654H6.1579H6.17924H6.20054H6.22182H6.24306H6.26427H6.28545H6.3066H6.32772H6.3488H6.36984H6.39085H6.41183H6.43277H6.45367H6.47453H6.49536H6.51615H6.5369H6.55761H6.57828H6.59891H6.61949H6.64004H6.66054H6.681H6.70142H6.72179H6.74211H6.76239H6.78263H6.80282H6.82296H6.84305H6.86309H6.88309H6.90304H6.92293H6.94278H6.96257H6.98231H7.002H7.02164H7.04122H7.06075H7.08022H7.09964H7.119H7.13831H7.15756H7.17675H7.19588H7.21495H7.23397H7.25292H7.27181H7.29065H7.30942H7.32812H7.34677H7.36535H7.38387H7.40232H7.42071H7.43903H7.45729H7.47548H7.4936H7.51165H7.52963H7.54755H7.56539H7.58317H7.60087H7.6185H7.63606H7.65354H7.67096H7.6883H7.70556H7.72275H7.73986H7.7569H7.77386H7.79074H7.80755H7.82427H7.84092H7.85749H7.87398H7.89038H7.9067H7.92295H7.93911H7.95518H7.97117H7.98708H8.00291H8.01864H8.03429H8.04986H8.06533H8.08072H8.09602H8.11124H8.12636H8.14139H8.15633H8.17118H8.18593H8.2006H8.21517H8.22965H8.24403H8.25832H8.27251H8.28661H8.30061H8.31451H8.32832H8.34202H8.35563H8.36914H8.38255H8.39586H8.40906H8.42217H8.43517H8.44807H8.46086H8.47355H8.48614H8.49862H8.51099H8.52326H8.53542H8.54748H8.55942H8.57126H8.58298H8.5946H8.60611H8.6175H8.62879H8.63996H8.65102H8.66196H8.67279H8.68351H8.69411H8.70459H8.71496H8.72521H8.73535H8.74536H8.75526H8.76504H8.77469H8.78423H8.79365H8.80294H8.81211H8.82116H8.83009H8.83889H8.84757H8.85612H8.86455H8.87285H8.88102H8.88907H8.89699H8.90478H8.91244H8.91997H8.92737H8.93464H8.94177H8.94878H8.95565H8.96239H8.969H8.97547H8.98181H8.98801H8.99407H9C9.49332 6.75008 11.0971 6.75554 12.5607 7.43105C13.2806 7.76331 13.9433 8.24763 14.4282 8.95525C14.9099 9.65834 15.25 10.631 15.25 12.0001C15.25 13.3692 14.9099 14.3418 14.4282 15.0449C13.9433 15.7525 13.2806 16.2368 12.5607 16.5691C11.0971 17.2446 9.49332 17.2501 9 17.2501H8.99414H8.98828H8.98242H8.97656H8.9707H8.96485H8.95899H8.95313H8.94727H8.94141H8.93556H8.9297H8.92384H8.91799H8.91213H8.90628H8.90043H8.89458H8.88872H8.88287H8.87702H8.87117H8.86532H8.85948H8.85363H8.84779H8.84194H8.8361H8.83026H8.82442H8.81858H8.81274H8.80691H8.80107H8.79524H8.78941H8.78358H8.77775H8.77193H8.7661H8.76028H8.75446H8.74864H8.74282H8.73701H8.73119H8.72538H8.71957H8.71377H8.70796H8.70216H8.69636H8.69056H8.68477H8.67897H8.67318H8.6674H8.66161H8.65583H8.65005H8.64427H8.63849H8.63272H8.62695H8.62119H8.61542H8.60966H8.6039H8.59815H8.5924H8.58665H8.58091H8.57516H8.56943H8.56369H8.55796H8.55223H8.5465H8.54078H8.53506H8.52935H8.52364H8.51793H8.51223H8.50653H8.50083H8.49514H8.48945H8.48377H8.47809H8.47241H8.46674H8.46107H8.45541H8.44975H8.44409H8.43844H8.43279H8.42715H8.42151H8.41588H8.41025H8.40463H8.39901H8.39339H8.38778H8.38217H8.37657H8.37098H8.36539H8.3598H8.35422H8.34864H8.34307H8.3375H8.33194H8.32639H8.32084H8.31529H8.30975H8.30421H8.29869H8.29316H8.28764H8.28213H8.27662H8.27112H8.26562H8.26013H8.25465H8.24917H8.2437H8.23823H8.23277H8.22732H8.22187H8.21642H8.21099H8.20556H8.20013H8.19471H8.1893H8.1839H8.1785H8.1731H8.16772H8.16234H8.15697H8.1516H8.14624H8.14089H8.13554H8.1302H8.12487H8.11954H8.11422H8.10891H8.10361H8.09831H8.09302H8.08773H8.08246H8.07719H8.07193H8.06667H8.06142H8.05619H8.05095H8.04573H8.04051H8.0353H8.0301H8.02491H8.01972H8.01454H8.00937H8.00421H7.99905H7.9939H7.98876H7.98363H7.97851H7.9734H7.96829H7.96319H7.9581H7.95302H7.94794H7.94288H7.93782H7.93277H7.92773H7.9227H7.91768H7.91267H7.90766H7.90267H7.89768H7.8927H7.88773H7.88277H7.87782H7.87287H7.86794H7.86302H7.8581H7.85319H7.8483H7.84341H7.83853H7.83366H7.8288H7.82395H7.81911H7.81428H7.80946H7.80465H7.79985H7.79505H7.79027H7.7855H7.78074H7.77598H7.77124H7.76651H7.76178H7.75707H7.75237H7.74768H7.74299H7.73832H7.73366H7.72901H7.72437H7.71974H7.71512H7.71051H7.70591H7.70132H7.69675H7.69218H7.68762H7.68308H7.67855H7.67402H7.66951H7.66501H7.66052H7.65604H7.65157H7.64711H7.64267H7.63824H7.63381H7.6294H7.625H7.62061H7.61623H7.61187H7.60751H7.60317H7.59884H7.59452H7.59021H7.58592H7.58163H7.57736H7.5731H7.56885H7.56462H7.56039H7.55618H7.55198H7.5478H7.54362H7.53946H7.53531H7.53117H7.52704H7.52293H7.51883H7.51474H7.51067H7.5066H7.50255H7.49852H7.49449H7.49048H7.48648H7.48249H7.47852H7.47456H7.47061H7.46668H7.46276H7.45885H7.45496H7.45108H7.44721H7.44335H7.43951H7.43568H7.43187H7.42807H7.42428H7.42051H7.41675H7.413H7.40927H7.40555H7.40185H7.39816H7.39448H7.39082H7.38717H7.38354H7.37992H7.37631H7.37272H7.36914H7.36558H7.36203H7.35849H7.35497H7.35147H7.34798H7.3445H7.34104H7.33759H7.33416H7.33074H7.32734H7.32395H7.32058H7.31722H7.31387H7.31054H7.30723H7.30393H7.30065H7.29738H7.29413H7.29089H7.28767H7.28446H7.28127H7.2781H7.27494H7.27179H7.26866H7.26555H7.26245H7.25937H7.2563H7.25325H7.25022H7.2472H7.2442H7.24121H7.23824H7.23528H7.23235H7.22942H7.22652H7.22363H7.22076H7.2179H7.21506H7.21223H7.20943H7.20663H7.20386H7.2011H7.19836H7.19564H7.19293H7.19024H7.18756H7.18491H7.18227H7.17964H7.17704H7.17445H7.17188H7.16932H7.16678H7.16426H7.16176H7.15927H7.1568H7.15435H7.15192H7.1495H7.14711H7.14473H7.14236H7.14002H7.13769H7.13538H7.13309H7.13081H7.12856H7.12632H7.1241H7.1219H7.11971H7.11755H7.1154H7.11327H7.11116H7.10907H7.10699H7.10493H7.1029H7.10088H7.09888H7.0969H7.09493H7.09299H7.09106H7.08915H7.08727H7.0854H7.08355H7.08171H7.0799H7.07811H7.07633H7.07458H7.07284H7.07113H7.06943H7.06775H7.06609H7.06445H7.06283H7.06123H7.05965H7.05809H7.05655H7.05502H7.05352H7.05204H7.05057H7.04913H7.04771H7.04631H7.04492H7.04356H7.04222H7.04089H7.03959H7.03831H7.03704H7.0358H7.03458H7.03338H7.0322H7.03104H7.0299H7.02878H7.02768H7.0266H7.02554H7.02451H7.02349H7.0225H7.02152H7.02057H7.01964H7.01872H7.01783H7.01696H7.01612H7.01529H7.01448H7.0137H7.01294H7.01219H7.01147H7.01078H7.0101H7.00944H7.00881H7.0082H7.00761H7.00704H7.00649H7.00596H7.00546H7.00498H7.00452H7.00408H7.00366H7.00327H7.0029H7.00255H7.00222H7.00192H7.00164H7.00137H7.00114H7.00092H7.00073H7.00056H7.00041H7.00029H7.00018H7.0001H7.00005H7.00001L7 18.0001L7.00001 18.7501H7.00005H7.0001H7.00018H7.00029H7.00041H7.00056H7.00073H7.00092H7.00114H7.00137H7.00164H7.00192H7.00222H7.00255H7.0029H7.00327H7.00366H7.00408H7.00452H7.00498H7.00546H7.00596H7.00649H7.00704H7.00761H7.0082H7.00881H7.00944H7.0101H7.01078H7.01147H7.01219H7.01294H7.0137H7.01448H7.01529H7.01612H7.01696H7.01783H7.01872H7.01964H7.02057H7.02152H7.0225H7.02349H7.02451H7.02554H7.0266H7.02768H7.02878H7.0299H7.03104H7.0322H7.03338H7.03458H7.0358H7.03704H7.03831H7.03959H7.04089H7.04222H7.04356H7.04492H7.04631H7.04771H7.04913H7.05057H7.05204H7.05352H7.05502H7.05655H7.05809H7.05965H7.06123H7.06283H7.06445H7.06609H7.06775H7.06943H7.07113H7.07284H7.07458H7.07633H7.07811H7.0799H7.08171H7.08355H7.0854H7.08727H7.08915H7.09106H7.09299H7.09493H7.0969H7.09888H7.10088H7.1029H7.10493H7.10699H7.10907H7.11116H7.11327H7.1154H7.11755H7.11971H7.1219H7.1241H7.12632H7.12856H7.13081H7.13309H7.13538H7.13769H7.14002H7.14236H7.14473H7.14711H7.1495H7.15192H7.15435H7.1568H7.15927H7.16176H7.16426H7.16678H7.16932H7.17188H7.17445H7.17704H7.17964H7.18227H7.18491H7.18756H7.19024H7.19293H7.19564H7.19836H7.2011H7.20386H7.20663H7.20943H7.21223H7.21506H7.2179H7.22076H7.22363H7.22652H7.22942H7.23235H7.23528H7.23824H7.24121H7.2442H7.2472H7.25022H7.25325H7.2563H7.25937H7.26245H7.26555H7.26866H7.27179H7.27494H7.2781H7.28127H7.28446H7.28767H7.29089H7.29413H7.29738H7.30065H7.30393H7.30723H7.31054H7.31387H7.31722H7.32058H7.32395H7.32734H7.33074H7.33416H7.33759H7.34104H7.3445H7.34798H7.35147H7.35497H7.35849H7.36203H7.36558H7.36914H7.37272H7.37631H7.37992H7.38354H7.38717H7.39082H7.39448H7.39816H7.40185H7.40555H7.40927H7.413H7.41675H7.42051H7.42428H7.42807H7.43187H7.43568H7.43951H7.44335H7.44721H7.45108H7.45496H7.45885H7.46276H7.46668H7.47061H7.47456H7.47852H7.48249H7.48648H7.49048H7.49449H7.49852H7.50255H7.5066H7.51067H7.51474H7.51883H7.52293H7.52704H7.53117H7.53531H7.53946H7.54362H7.5478H7.55198H7.55618H7.56039H7.56462H7.56885H7.5731H7.57736H7.58163H7.58592H7.59021H7.59452H7.59884H7.60317H7.60751H7.61187H7.61623H7.62061H7.625H7.6294H7.63381H7.63824H7.64267H7.64711H7.65157H7.65604H7.66052H7.66501H7.66951H7.67402H7.67855H7.68308H7.68762H7.69218H7.69675H7.70132H7.70591H7.71051H7.71512H7.71974H7.72437H7.72901H7.73366H7.73832H7.74299H7.74768H7.75237H7.75707H7.76178H7.76651H7.77124H7.77598H7.78074H7.7855H7.79027H7.79505H7.79985H7.80465H7.80946H7.81428H7.81911H7.82395H7.8288H7.83366H7.83853H7.84341H7.8483H7.85319H7.8581H7.86302H7.86794H7.87287H7.87782H7.88277H7.88773H7.8927H7.89768H7.90267H7.90766H7.91267H7.91768H7.9227H7.92773H7.93277H7.93782H7.94288H7.94794H7.95302H7.9581H7.96319H7.96829H7.9734H7.97851H7.98363H7.98876H7.9939H7.99905H8.00421H8.00937H8.01454H8.01972H8.02491H8.0301H8.0353H8.04051H8.04573H8.05095H8.05619H8.06142H8.06667H8.07193H8.07719H8.08246H8.08773H8.09302H8.09831H8.10361H8.10891H8.11422H8.11954H8.12487H8.1302H8.13554H8.14089H8.14624H8.1516H8.15697H8.16234H8.16772H8.1731H8.1785H8.1839H8.1893H8.19471H8.20013H8.20556H8.21099H8.21642H8.22187H8.22732H8.23277H8.23823H8.2437H8.24917H8.25465H8.26013H8.26562H8.27112H8.27662H8.28213H8.28764H8.29316H8.29869H8.30421H8.30975H8.31529H8.32084H8.32639H8.33194H8.3375H8.34307H8.34864H8.35422H8.3598H8.36539H8.37098H8.37657H8.38217H8.38778H8.39339H8.39901H8.40463H8.41025H8.41588H8.42151H8.42715H8.43279H8.43844H8.44409H8.44975H8.45541H8.46107H8.46674H8.47241H8.47809H8.48377H8.48945H8.49514H8.50083H8.50653H8.51223H8.51793H8.52364H8.52935H8.53506H8.54078H8.5465H8.55223H8.55796H8.56369H8.56943H8.57516H8.58091H8.58665H8.5924H8.59815H8.6039H8.60966H8.61542H8.62119H8.62695H8.63272H8.63849H8.64427H8.65005H8.65583H8.66161H8.6674H8.67318H8.67897H8.68477H8.69056H8.69636H8.70216H8.70796H8.71377H8.71957H8.72538H8.73119H8.73701H8.74282H8.74864H8.75446H8.76028H8.7661H8.77193H8.77775H8.78358H8.78941H8.79524H8.80107H8.80691H8.81274H8.81858H8.82442H8.83026H8.8361H8.84194H8.84779H8.85363H8.85948H8.86532H8.87117H8.87702H8.88287H8.88872H8.89458H8.90043H8.90628H8.91213H8.91799H8.92384H8.9297H8.93556H8.94141H8.94727H8.95313H8.95899H8.96485H8.9707H8.97656H8.98242H8.98828H8.99414H9H9.00994C9.53106 18.7501 11.4144 18.7502 13.1893 17.931C14.0944 17.5133 14.9942 16.8726 15.6656 15.8928C16.3401 14.9083 16.75 13.631 16.75 12.0001C16.75 10.3692 16.3401 9.09182 15.6656 8.10741C14.9942 7.12753 14.0944 6.48685 13.1893 6.06911C11.4144 5.24991 9.53106 5.25004 9.00994 5.25008L9 5.25008H8.99407H8.98801H8.98181H8.97547H8.969H8.96239H8.95565H8.94878H8.94177H8.93464H8.92737H8.91997H8.91244H8.90478H8.89699H8.88907H8.88102H8.87285H8.86455H8.85612H8.84757H8.83889H8.83009H8.82116H8.81211H8.80294H8.79365H8.78423H8.77469H8.76504H8.75526H8.74536H8.73535H8.72521H8.71496H8.70459H8.69411H8.68351H8.67279H8.66196H8.65102H8.63996H8.62879H8.6175H8.60611H8.5946H8.58298H8.57126H8.55942H8.54748H8.53542H8.52326H8.51099H8.49862H8.48614H8.47355H8.46086H8.44807H8.43517H8.42217H8.40906H8.39586H8.38255H8.36914H8.35563H8.34202H8.32832H8.31451H8.30061H8.28661H8.27251H8.25832H8.24403H8.22965H8.21517H8.2006H8.18593H8.17118H8.15633H8.14139H8.12636H8.11124H8.09602H8.08072H8.06533H8.04986H8.03429H8.01864H8.00291H7.98708H7.97117H7.95518H7.93911H7.92295H7.9067H7.89038H7.87398H7.85749H7.84092H7.82427H7.80755H7.79074H7.77386H7.7569H7.73986H7.72275H7.70556H7.6883H7.67096H7.65354H7.63606H7.6185H7.60087H7.58317H7.56539H7.54755H7.52963H7.51165H7.4936H7.47548H7.45729H7.43903H7.42071H7.40232H7.38387H7.36535H7.34677H7.32812H7.30942H7.29065H7.27181H7.25292H7.23397H7.21495H7.19588H7.17675H7.15756H7.13831H7.119H7.09964H7.08022H7.06075H7.04122H7.02164H7.002H6.98231H6.96257H6.94278H6.92293H6.90304H6.88309H6.86309H6.84305H6.82296H6.80282H6.78263H6.76239H6.74211H6.72179H6.70142H6.681H6.66054H6.64004H6.61949H6.59891H6.57828H6.55761H6.5369H6.51615H6.49536H6.47453H6.45367H6.43277H6.41183H6.39085H6.36984H6.3488H6.32772H6.3066H6.28545H6.26427H6.24306H6.22182H6.20054H6.17924H6.1579H6.13654H6.11514H6.09372H6.07227H6.0508H6.0293H6.00777H5.98622H5.96464H5.94304H5.92141H5.89977H5.8781H5.8564H5.83469H5.81296H5.7912H5.76943H5.74764H5.72583H5.704H5.68216H5.6603H5.63842H5.61653H5.59462H5.5727H5.55077H5.52882H5.50686H5.48489H5.46291H5.44092H5.41891H5.3969H5.37488H5.35285H5.33081H5.30877H5.28671H5.26466H5.24259H5.22053H5.19845H5.17638H5.1543H5.13222H5.11014H5.08805H5.06597H5.04388H5.0218H4.99971H4.97763H4.95555H4.93347H4.9114H4.88933H4.86726H4.8452H4.82315H4.8011H4.77906H4.75702H4.73499H4.71298H4.69097H4.66897H4.64698H4.625H4.60303H4.58108H4.55914H4.53721H4.51529H4.49339H4.47151H4.44963H4.42778H4.40594H4.38412H4.36232H4.34054H4.31877H4.29702H4.2753H4.25359H4.23191H4.21025H4.18861H4.16699H4.1454H4.12383H4.10229H4.08077H4.05928H4.03782H4.01638H3.99497H3.97359H3.95223H3.93091H3.90961H3.88835H3.86712H3.84592H3.82475H3.80362H3.78252H3.76145H3.74042H3.71942H3.69846H3.67753H3.65664H3.63579H3.61498H3.59421H3.57347H3.55278H3.53213H3.51151H3.49094H3.47041H3.44993H3.42949H3.40909H3.38873H3.36842H3.34816H3.32794H3.30777H3.28765H3.26758H3.24755H3.22758H3.20765H3.18777H3.16795H3.14817H3.12845H3.10878H3.08917H3.06961H3.0501H3.03065H3.01125H2.99191H2.97263H2.9534H2.93423H2.91512H2.89607H2.87708H2.85815H2.83928H2.82047H2.81064L6.53033 1.53039L5.46967 0.469727Z"
    />
  </SVGBase>
);

/* eslint-disable react/display-name */
const svgs = {
  arrowDown: (props) => <Arrow rotate="90" {...props} />,
  arrowLeft: (props) => <Arrow rotate="180" {...props} />,
  arrowRight: (props) => <Arrow rotate="0" {...props} />,
  arrowUp: (props) => <Arrow rotate="-90" {...props} />,
  backArrow: (props) => <BackArrow {...props} />,
  chevronDown: (props) => <Chevron rotate="90" {...props} />,
  chevronLeft: (props) => <Chevron rotate="180" {...props} />,
  chevronRight: (props) => <Chevron rotate="0" {...props} />,
  chevronUp: (props) => <Chevron rotate="-90" {...props} />,
  clock: (props) => (
    <SVGBase viewBox="0 0 19 20" {...props}>
      <path
        d="M9.68121 0.833252C4.76352 0.833252 0.78125 4.93992 0.78125 9.99992C0.78125 15.0599 4.76352 19.1666 9.68121 19.1666C14.6078 19.1666 18.599 15.0599 18.599 9.99992C18.599 4.93992 14.6078 0.833252 9.68121 0.833252ZM9.69012 17.3333C5.7524 17.3333 2.56302 14.0516 2.56302 9.99992C2.56302 5.94825 5.7524 2.66659 9.69012 2.66659C13.6278 2.66659 16.8172 5.94825 16.8172 9.99992C16.8172 14.0516 13.6278 17.3333 9.69012 17.3333Z"
        fill="currentColor"
      />
      <path d="M10.1361 5.41675H8.7998V10.9167L13.477 13.8042L14.1451 12.6767L10.1361 10.2292V5.41675Z" fill="currentColor" />
    </SVGBase>
  ),
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
  globe: (props) => (
    <SVGBase viewBox="0 0 15 15" {...props}>
      <path
        d="M7.5 0.95C3.88612 0.95 0.95 3.88611 0.95 7.5C0.95 11.1139 3.88612 14.05 7.5 14.05C11.1139 14.05 14.05 11.1139 14.05 7.5C14.05 3.88611 11.1139 0.95 7.5 0.95ZM5.56498 3.38988C6.01425 2.53413 6.57447 2.0111 7.14767 1.85734V4.57791H5.08711C5.22 4.13971 5.38172 3.73895 5.56498 3.38988ZM7.85233 4.57791V1.85734C8.42553 2.0111 8.98575 2.53413 9.43502 3.38988C9.61828 3.73895 9.78 4.13971 9.91289 4.57791H7.85233ZM2.43218 4.57791C3.15829 3.32098 4.34271 2.36308 5.75452 1.92261C5.44787 2.23389 5.17419 2.61893 4.94265 3.05997C4.70628 3.51019 4.50851 4.02092 4.35364 4.57791H2.43218ZM9.24548 1.92261C10.6573 2.36308 11.8417 3.32098 12.5678 4.57791H10.6464C10.4915 4.02092 10.2937 3.51019 10.0574 3.05997C9.82581 2.61893 9.55212 2.23389 9.24548 1.92261ZM2.09158 5.28256H4.18885C4.07162 5.86989 3.99824 6.49415 3.97931 7.14767H1.66221C1.70153 6.49081 1.85338 5.86335 2.09158 5.28256ZM4.90441 5.28256H7.14767V7.14767H4.6841C4.7046 6.48893 4.78026 5.86101 4.90441 5.28256ZM7.85233 5.28256H10.0956C10.2197 5.86101 10.2954 6.48893 10.3159 7.14767H7.85233V5.28256ZM10.8111 5.28256H12.9084C13.1466 5.86335 13.2985 6.49081 13.3378 7.14767H11.0207C11.0018 6.49415 10.9284 5.86989 10.8111 5.28256ZM1.66221 7.85233H3.97931C3.99824 8.50585 4.07162 9.13011 4.18885 9.71744H2.09158C1.85338 9.13665 1.70153 8.50919 1.66221 7.85233ZM4.6841 7.85233H7.14767V9.71744H4.90441C4.78026 9.13899 4.7046 8.51106 4.6841 7.85233ZM7.85233 7.85233H10.3159C10.2954 8.51106 10.2197 9.13899 10.0956 9.71744H7.85233V7.85233ZM10.8111 9.71744C10.9284 9.13011 11.0018 8.50585 11.0207 7.85233H13.3378C13.2985 8.50919 13.1466 9.13665 12.9084 9.71744H10.8111ZM4.94265 11.94C5.17419 12.3811 5.44787 12.7661 5.75452 13.0774C4.34271 12.6369 3.15829 11.679 2.43218 10.4221H4.35364C4.50851 10.9791 4.70628 11.4898 4.94265 11.94ZM5.56498 11.6101C5.38172 11.2611 5.22 10.8603 5.08711 10.4221H7.14767V13.1427C6.57447 12.9889 6.01425 12.4659 5.56498 11.6101ZM7.85233 10.4221H9.91289C9.78 10.8603 9.61828 11.2611 9.43502 11.6101C8.98575 12.4659 8.42553 12.9889 7.85233 13.1427V10.4221ZM10.0574 11.94C10.2937 11.4898 10.4915 10.9791 10.6464 10.4221H12.5678C11.8417 11.679 10.6573 12.6369 9.24548 13.0774C9.55212 12.7661 9.82581 12.3811 10.0574 11.94Z"
        fill="currentColor"
        strokeWidth="0.1"
      />
    </SVGBase>
  ),
  info: (props) => (
    <SVGBase viewBox="0 0 14 14" {...props}>
      <path
        d="M6.99902 0C3.13502 0 -0.000976562 3.136 -0.000976562 7C-0.000976562 10.864 3.13502 14 6.99902 14C10.863 14 13.999 10.864 13.999 7C13.999 3.136 10.863 0 6.99902 0ZM7.69902 10.5H6.29902V6.3H7.69902V10.5ZM7.69902 4.9H6.29902V3.5H7.69902V4.9Z"
        fill="currentColor"
      />
    </SVGBase>
  ),
  lock: (props) => (
    <SVGBase viewBox="0 0 12 14" {...props}>
      <path
        d="M10.3286 5.16333H3.94872V3.21602C3.94872 2.5079 4.55264 1.93256 5.29593 1.93256H6.53474C7.27803 1.93256 7.88195 2.5079 7.88195 3.21602V5.34921C7.88195 5.48198 8.00583 5.6 8.1452 5.6H9.64726C9.78663 5.6 9.91051 5.48198 9.91051 5.34921V3.21602C9.91051 1.43098 8.39296 0 6.53474 0H5.29593C3.42222 0 1.92016 1.44573 1.92016 3.21602V5.14858H1.50206C0.665862 5.14858 0 5.79768 0 6.57956V12.569C0 13.3656 0.681347 14 1.50206 14H10.3441C11.1803 14 11.8462 13.3509 11.8462 12.569V6.59431C11.8462 5.79768 11.1648 5.16333 10.3286 5.16333ZM6.4728 10.0021V11.8757H5.37335V10.0021C4.83137 9.79558 4.45973 9.29399 4.45973 8.7039C4.45973 7.93678 5.11011 7.30242 5.93082 7.30242C6.75153 7.30242 7.40191 7.92202 7.40191 8.7039C7.38643 9.29399 6.9993 9.78082 6.4728 10.0021Z"
        fill="currentColor"
      />
    </SVGBase>
  ),
  lockCode: (props) => (
    <SVGBase viewBox="0 0 14 16" {...props}>
      <path
        d="M 6.2597656 0 C 4.0453656 0 2.2695312 1.6420237 2.2695312 3.6523438 L 2.2695312 5.8476562 L 1.7753906 5.8476562 C 0.78715868 5.8476562 2.9605947e-16 6.5847562 0 7.4726562 L 0 14.273438 C 0 15.178036 0.80545866 15.898436 1.7753906 15.898438 L 12.224609 15.898438 C 13.212909 15.898438 14 15.161338 14 14.273438 L 14 7.4882812 C 14 6.5836213 13.195331 5.8632814 12.207031 5.8632812 L 11.712891 5.8632812 L 11.712891 3.6523438 C 11.712891 1.6252736 9.9187362 2.9605947e-16 7.7226562 0 L 6.2597656 0 z M 6.2597656 2.1953125 L 7.7226562 2.1953125 C 8.6010963 2.1953125 9.3144531 2.8482236 9.3144531 3.6523438 L 9.3144531 5.8632812 L 4.6660156 5.8632812 L 4.6660156 3.6523438 C 4.6660156 2.8482235 5.3813256 2.1953125 6.2597656 2.1953125 z M 4.609375 8.546875 L 4.609375 9.7109375 L 2.5136719 10.980469 L 4.609375 12.248047 L 4.609375 13.412109 L 1.5039062 11.367188 L 1.5039062 10.591797 L 4.609375 8.546875 z M 7.7714844 8.546875 L 8.7382812 8.546875 L 6.2167969 13.412109 L 5.25 13.412109 L 7.7714844 8.546875 z M 9.4101562 8.546875 L 12.515625 10.591797 L 12.515625 11.367188 L 9.4101562 13.412109 L 9.4101562 12.248047 L 11.505859 10.980469 L 9.4101562 9.7109375 L 9.4101562 8.546875 z "
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
  textLightningBolt: (props) => (
    <SVGBase viewBox="0 0 11 15" {...props}>
      <path d="M0 8.44221L8.30935 0L4.7482 6.03015L11 5.80402L0.316547 15L5.46043 8.1407L0 8.44221Z" fill="currentColor" />
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
  ambulance:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f691.svg',
  arrowBackward:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/25c0.svg',
  backhandIndex:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f447.svg',
  balloon:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f388.svg',
  bentoBox:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f371.svg',
  bicep:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4aa.svg',
  blockArrowDown:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2b07.svg',
  blockArrowUp:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2b06.svg',
  bomb:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4a3.svg',
  boosted:
    'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Fboosted-default.png?v=1583253498622',
  bouquet:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f490.svg',
  carpStreamer:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f38f.svg',
  clap:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44f.svg',
  clapper:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f3ac.svg',
  coffin:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/26b0.svg',
  creditCard:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4b3.svg',
  crescentMoon:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f319.svg',
  crystalBall:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f52e.svg',
  cyclone:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f300.svg',
  dancers:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f46f-200d-2640-fe0f.svg',
  dev:
    'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ffooter_icon_dev.png?v=1584034391207',
  diamondSmall:
    'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fdiamond_small.svg?v=1568142112219',
  dogFace:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f436.svg',
  earthAsia:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f30f.svg',
  email:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4e7.svg',
  eyeglasses:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f453.svg',
  eyes:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f440.svg',
  facebook:
    'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Ffacebook.png?v=1568142112883',
  faceExpressionless:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f611.svg',
  faceSlightlySmiling:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f642.svg',
  fastDown:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/23ec.svg',
  fastUp:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/23eb.svg',
  femaleTechnologist:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f469-200d-1f4bb.svg',
  ferrisWheel:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f3a1.svg',
  fireEngine:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f692.svg',
  fishingPole:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f3a3.svg',
  framedPicture:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f5bc.svg',
  gift:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f381.svg',
  ghost:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f47b.svg',
  glitchLogo:
    'https://cdn.glitch.com/4bca9911-a70a-46cd-b0b2-f1b103c832d9%2FglitchLogo.svg?v=1569963961866',
  globeWithMeridians:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f310.svg',
  google:
    'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fgoogle.png?v=1568142113626',
  handshake:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f91d.svg',
  helmetWithWhiteCross:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/26d1.svg',
  herb:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f33f.svg',
  hibiscus:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f33a.svg',
  horizontalTrafficLight:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f6a5.svg',
  index:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/261d.svg',
  key:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f511.svg',
  keyboard:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2328.svg',
  ladyBeetle:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f41e.svg',
  lightbulb:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4a1.svg',
  lightningBolt:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/26a1.svg',
  linkedin:
    'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ffooter_icon_linkedin.png?v=1584034393831',
  lock:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f512.svg',
  loveLetter:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f48c.svg',
  mailboxOpen:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4ec.svg',
  microphone:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f3a4.svg',
  mouse:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f5b1.svg',
  musicalKeyboard:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f3b9.svg',
  new:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f195.svg',
  newspaper:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4f0.svg',
  octagonalSign:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f6d1.svg',
  pager:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4df.svg',
  paperclip:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4ce.svg',
  park:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f3de.svg',
  party:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f389.svg',
  playButton:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/25b6.svg',
  policeOfficer:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f46e.svg',
  pushpin:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4cc.svg',
  rainbow:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f308.svg',
  raisingHandWoman:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f64b-200d-2640-fe0f.svg',
  refresh:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f504.svg',
  rocket:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f680.svg',
  scales:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2696.svg',
  seedling:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f331.svg',
  shuffle:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f500.svg',
  sick:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f912.svg',
  slack:
    'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fslack.svg?v=1568142115840',
  sparkles:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2728.svg',
  sparklingHeart:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f496.svg',
  spiralNotePad:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f5d2.svg',
  sunny:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2600.svg',
  telephone:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/260e.svg',
  television:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4fa.svg',
  thumbsDown:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44e.svg',
  thumbsUp:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44d.svg',
  tokyoTower:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f5fc.svg',
  trafficLight:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f6a6.svg',
  truck:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f69a.svg',
  turtle:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f422.svg',
  twitter:
    'https://cdn.glitch.com/d7f4f279-e13b-4330-8422-00b2d9211424%2Ffooter_icon_twitter.png?v=1584034389011',
  two:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/32-20e3.svg',
  umbrella:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/2602.svg',
  verified:
    'https://cdn.glitch.com/e7e23ba6-c0ec-4a5a-8dcf-b6f61984cea8%2Fverified.svg?v=1568142116735',
  victoryHand:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/270c.svg',
  wave:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44b.svg',
  zzz:
    'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f4a4.svg',
}

const iconOptions = Object.keys(icons).concat(Object.keys(svgs));

export const Icon = ({ icon, alt, emoji, ...props }) => {
  if (emoji) {
    const parsedEmoji = parse(emoji);
    return (
      <IconBase
        data-module="Icon"
        icon={parsedEmoji[0].text}
        src={parsedEmoji[0].url}
        alt={alt}
      />)
  }

  if (svgs[icon]) {
    const SVGIcon = svgs[icon];
    return <SVGIcon icon={icon} aria-label={alt || undefined} aria-hidden={!alt} {...props} />;
  }

  return <IconBase data-module="Icon" icon={icon} src={icons[icon]} alt={alt} {...props} />;
};
Icon.propTypes = {
  icon: PropTypes.oneOf(iconOptions),
  alt: PropTypes.string,
  emoji: PropTypes.string
};
Icon.defaultProps = {
  alt: '',
};

export const StoryIcon = () => (
  <>
    <p>The Icon component renders inline icons, dingbats and emoji in a consistent, cross-platform style.</p>
    <CodeExample>{`<Icon icon="x" alt="Close popover" />`}</CodeExample>
    <PropsDefinition>
      <Prop name="icon">
        The name of the icon. See <a href="#StoryIcon_options">Icon options</a> below for valid values.
      </Prop>
      <Prop name="alt">
        The accessible label for the icon. If an icon is paired with a text label (e.g. in a button) you should leave this blank.
      </Prop>
      <Prop name="emoji">
        An emoji to turn into an icon. Works with any valid emoji from the latest <a href="https://twemoji.twitter.com">twemoji</a> release.
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

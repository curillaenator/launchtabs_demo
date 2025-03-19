import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
        font-family: 'SanFrancisco';
        src: url('/assets/fonts/SFNSRounded.woff2') format('woff2');
        /* font-weight: 400; */
        font-style: normal;
    };

    @font-face {
        font-family: 'SpaceMono';
        src: url('/assets/fonts/SpaceMonoRegular.ttf') format('ttf');
        /* font-weight: 400; */
        font-style: normal;
    }
`;

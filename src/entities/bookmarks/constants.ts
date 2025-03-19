import { BookmarkTabProps, BookmarksStore } from './interfaces';

const DEFAULT_PAGES: BookmarkTabProps[] = [
  {
    name: 'Home',
    pages: [
      {
        id: 'app_default_1',
        name: 'About app',
        link: '/notes/jtG8WhhR5KHtpBxqtUs5',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/firebase.svg',
      },
      {
        id: 'app_default_2',
        name: 'Tabs Guide',
        link: '/notes/m4fCGpakK6eDhqsDZfCB',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/firebase.svg',
      },
      {
        id: 'app_default_3',
        name: 'Notes Guide',
        link: '/notes/Wa3oXR4V2vCuFBhfydJZ',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/firebase.svg',
      },
    ],
  },
  {
    name: 'Social',
    pages: [
      {
        id: 'home_default_1',
        name: 'Whatsapp',
        link: 'https://web.whatsapp.com',
        iconURL: 'https://www.vectorlogo.zone/logos/whatsapp/whatsapp-icon.svg',
      },
      {
        id: 'home_default_2',
        name: 'Facebook',
        link: 'https://facebook.com',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/facebook.svg',
      },
      {
        id: 'home_default_3',
        name: 'Instagram',
        link: 'https://instagram.com',
        iconURL: 'https://brandeps.com/logo-download/I/Instagram-Icon-logo-vector-01.svg',
      },
      {
        id: 'home_default_4',
        name: 'Gmail',
        link: 'https://gmail.com',
        iconURL: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/gmail.svg',
      },
    ],
  },
  {
    name: 'Video',
    pages: [
      {
        id: 'video_default_1',
        name: 'YouTube',
        link: 'https://youtube.com',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/youtube-icon.svg',
      },
      {
        id: 'video_default_3',
        name: 'Twitch',
        link: 'https://twitch.tv',
        iconURL: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/twitch.svg',
      },
    ],
  },
  {
    name: 'Music',
    pages: [
      {
        id: 'music_default_1',
        name: 'Spotify',
        link: 'https://spotify.com',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/spotify-icon.svg',
      },
      {
        id: 'music_default_2',
        name: 'Soundcloud',
        link: 'https://soundcloud.com',
        iconURL:
          'https://raw.githubusercontent.com/uditkumar489/Icon-pack/master/Social media/Flat - circular/svg/soundcloud.svg',
      },
    ],
  },
];

const DEFAULT_CARDS_STORE: BookmarksStore = {
  currentTab: 'Home',
  tabs: DEFAULT_PAGES,
};

export { DEFAULT_PAGES, DEFAULT_CARDS_STORE };

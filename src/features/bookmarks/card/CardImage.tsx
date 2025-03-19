import React, { FC } from 'react';
import styled from 'styled-components';

import { getValidatedHref } from './utils';
import type { BookmarkCardProps } from '@src/entities/bookmarks';

const CardImageStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 142px;
  border-radius: var(--card-bdrs) var(--card-bdrs) 0px 0px;
  overflow: hidden;
  padding: 6px 6px 0 6px;

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    border-radius: 0 0 6px 6px;
  }

  .card-icon {
    width: 88px;
    height: 88px;
    user-select: none;

    .content-svg {
      width: 100%;
      height: 100%;
    }

    .svg-icon {
      width: 100%;
      height: 100%;

      &-light {
        fill: ${({ theme }) => theme.neutral[100]};
      }

      &-dark {
        fill: ${({ theme }) => theme.neutral[500]};
      }
    }
  }
`;

// const IMAGE_THUM_IO = 'https://image.thum.io/get/auth/53623-screenshot/allowJPG/width/640/crop/1200/viewportWidth/1520/noanimate/maxAge/48/';
const IMAGE_THUM_IO = 'https://image.thum.io/get/auth/53623-screenshot/allowJPG/width/320/noanimate/maxAge/48';
const NOTES_ROUTE_RE = /^\/notes\/([A-Za-z0-9]+)$/;

export const CardImage: FC<BookmarkCardProps> = ({ name, link, iconURL }) => {
  const validLink = getValidatedHref(link);

  if (iconURL)
    return (
      <CardImageStyled>
        <img className='card-icon' src={iconURL} alt={name} draggable={false} />
      </CardImageStyled>
    );

  if (!NOTES_ROUTE_RE.test(validLink) && !!link.length)
    return (
      <CardImageStyled>
        <img className='card-image' src={`${IMAGE_THUM_IO}/${validLink}`} alt={name} draggable={false} />
      </CardImageStyled>
    );

  return (
    <CardImageStyled>
      <div className='card-icon'>
        <svg
          data-description='card-icon-placeholder'
          className='svg-icon'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            className='svg-icon-light'
            d='M16.3387 2H7.67134C4.27455 2 2 4.37607 2 7.91411V16.086C2 17.3181 2.28056 18.4119 2.79158 19.3042C3.12224 18.9022 3.49299 18.4621 3.85371 18.0199C4.46493 17.2891 5.05611 16.5662 5.42685 16.096C5.97796 15.4143 7.43086 13.6197 9.44489 14.4618C9.85571 14.6323 10.2164 14.8729 10.5471 15.0834C11.3587 15.6248 11.6994 15.7852 12.2705 15.4734C12.9018 15.1336 13.3126 14.4618 13.7435 13.759C13.9739 13.3881 14.2044 13.0282 14.4549 12.6973C15.5471 11.2737 17.2305 10.8927 18.6333 11.7349C19.3347 12.1559 19.9359 12.6873 20.497 13.2277C20.6172 13.348 20.7375 13.4593 20.8477 13.5696C20.998 13.7189 21.499 14.2202 22 14.7025V7.91411C22 4.37607 19.7255 2 16.3387 2Z'
          />
          <path
            className='svg-icon-dark'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.87324 11.3782C10.2811 11.3782 11.4544 10.2052 11.4544 8.79665C11.4544 7.38905 10.2811 6.21505 8.87324 6.21505C7.46643 6.21505 6.29308 7.38905 6.29308 8.79665C6.29308 10.2052 7.46643 11.3782 8.87324 11.3782ZM21.9999 16.0859V14.7024C21.4989 14.2211 20.9979 13.7199 20.8476 13.5695L20.8476 13.5695C20.7937 13.5155 20.7374 13.4613 20.6798 13.406C20.6197 13.3481 20.5583 13.289 20.4969 13.2276C19.9358 12.6872 19.3346 12.1558 18.6332 11.7348C17.2304 10.8926 15.547 11.2736 14.4548 12.6972C14.2043 13.0281 13.9738 13.388 13.7434 13.7599L13.7386 13.7677C13.3095 14.4667 12.8994 15.1347 12.2704 15.4743C11.6993 15.7851 11.3586 15.6247 10.547 15.0833C10.5153 15.0631 10.4833 15.0427 10.451 15.022C10.1467 14.8273 9.81621 14.6158 9.44478 14.4617C7.43075 13.6196 5.97785 15.4142 5.42674 16.0959C5.056 16.5661 4.46482 17.289 3.8536 18.0208C3.65023 18.2695 3.44368 18.5179 3.24293 18.7593C3.08759 18.9461 2.93572 19.1287 2.79147 19.3041C3.04197 19.7753 3.36262 20.1864 3.74338 20.5363C4.71532 21.4797 6.06803 22 7.67123 22H16.3285C19.4949 22 21.6893 19.9357 21.9698 16.7767C21.9899 16.5471 21.9999 16.3155 21.9999 16.0859Z'
          />
        </svg>
      </div>
    </CardImageStyled>
  );
};

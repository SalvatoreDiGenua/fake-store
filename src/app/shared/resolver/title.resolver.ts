import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { capitalizeString } from '../utility/functions';

export const titleResolver = (extraTitle = ''): ResolveFn<string> => {
  return (route: ActivatedRouteSnapshot) => {
    const title = 'Fake store';
    if (extraTitle) {
      return `${title} | ${capitalizeString(extraTitle)}`;
    }
    const path = (route?.routeConfig?.path || '').replaceAll('-', ' ');
    return path ? `${title} | ${capitalizeString(path)}` : title;
  };
};

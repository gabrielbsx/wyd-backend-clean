import slugify from 'slugify';
import { Slugify } from '@/ports/generic-libs';
import { injectable } from 'inversify';

@injectable()
export class SlugifyAdapter implements Slugify {
  slugify(text: string, options?: any): string {
    return slugify(text, options);
  }
}


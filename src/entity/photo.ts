import { EntityModel } from '@midwayjs/orm';

@EntityModel('photo')
export class Photo {
  id: number;
  name: string;
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
}

import { entity } from '@deepkit/type';

@entity.name('@error/unexpected')
export class UnexpectedError extends Error {}

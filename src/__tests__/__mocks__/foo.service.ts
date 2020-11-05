import { Injectable } from '@angular/core';

export class ClassInject {}

@Injectable()
export class MyService {
  // eslint-disable-next-line
  constructor(_v: ClassInject) {}
}

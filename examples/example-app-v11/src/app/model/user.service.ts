import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  isLoggedIn = true;
  user = { name: 'Sam Spade' };
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

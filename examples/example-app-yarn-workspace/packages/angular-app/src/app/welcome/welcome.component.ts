import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../user/src';

@Component({
  selector: 'app-welcome',
  template: '<h3 class="welcome"><i>{{welcome}}</i></h3>',
  standalone: true,
})
export class WelcomeComponent implements OnInit {
  welcome = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.welcome = this.userService.isLoggedIn ? 'Welcome, ' + this.userService.user.name : 'Please log in.';
  }
}

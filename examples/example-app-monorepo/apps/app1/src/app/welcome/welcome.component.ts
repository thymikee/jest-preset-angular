import { Component, inject, OnInit } from '@angular/core';
import { UserService } from 'libs/user/src/lib/user.service';

@Component({
    standalone: true,
    selector: 'app-welcome',
    template: '<h3 class="welcome"><i>{{welcome}}</i></h3>',
})
export class WelcomeComponent implements OnInit {
    welcome = '';
    private readonly userService = inject(UserService);

    ngOnInit(): void {
        this.welcome = this.userService.isLoggedIn ? 'Welcome, ' + this.userService.user.name : 'Please log in.';
    }
}

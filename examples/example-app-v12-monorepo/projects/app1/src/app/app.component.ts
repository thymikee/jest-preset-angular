import { Component, OnInit } from '@angular/core';
import { FooService } from '@app1/services/foo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app1';

  constructor(private fooService: FooService) {}

  ngOnInit(): void {
    this.fooService.getFoo();
  }
}

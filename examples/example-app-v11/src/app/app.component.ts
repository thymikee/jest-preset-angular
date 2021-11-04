import { Component, OnInit } from '@angular/core';
import { FooService } from '@services/foo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'example-app-v11';

  constructor(private fooService: FooService) {}

  ngOnInit(): void {
    this.fooService.getFoo();
  }
}

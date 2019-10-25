import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: any;

  constructor(private router: Router) {
    this.person = this.router.getCurrentNavigation() !== null
    ? this.router.getCurrentNavigation().extras.state.data
    : null;
  }

  ngOnInit() {
    if (this.person === null) {
      this.goToLandingPage();
    }
  }

  goToLandingPage() {
    this.router.navigateByUrl('');
    window.location.reload();
  }

}

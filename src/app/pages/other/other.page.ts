import { TrackService } from './../../services/track.service';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.scss'],
})
export class OtherPage implements OnInit {
  person: Person;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personS: PersonService,
    private track: TrackService,
    private router: Router
  ) { }

  ngOnInit() {
    const personId = this.activatedRoute.snapshot.params['id'];
    this.getPersonDetail(personId);
  }

  onSearch() {
    this.router.navigate(['search']);
  }

  getPersonDetail(id: number) {
    this.personS.getPersonDetail(id).subscribe(res => {
      this.person = res;
      this.track.viewPerson(id, this.person.name);
    });
  }

  onPersonDetail(id: number) {
    this.router.navigate(['person-detail', id]);
  }


}

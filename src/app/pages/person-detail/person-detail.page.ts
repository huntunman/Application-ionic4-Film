import { Person } from 'src/app/models/person';
import { TrackService } from './../../services/track.service';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {

  person: Person;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personS: PersonService,
    private track: TrackService
  ) { }

  ngOnInit() {
    const personId = this.activatedRoute.snapshot.params['id'];
    this.getPersonDetail(personId);
  }

  getPersonDetail(id: number) {
    this.personS.getPersonDetail(id).subscribe(res => {
      this.person = res;
      this.track.viewPerson(id, this.person.name);
    });
  }

  onMovieDetail(id: number) {
    this.router.navigate(['movie-detail', id]);
  }


}

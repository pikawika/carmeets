import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meeting } from '../../meeting/meeting.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-single-meeting',
  templateUrl: './single-meeting.component.html',
  styleUrls: ['./single-meeting.component.css']
})
export class SingleMeetingComponent implements OnInit {
  singleMeeting: Meeting;
  likeAmount: string;
  goingAmount: string;
  hasLiked: boolean;
  isGoing: boolean;
  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.route.data.subscribe(item=>this.singleMeeting = item['meeting']);
    this.likeAmount = this.singleMeeting.likeAmount.toString();
    this.goingAmount = this.singleMeeting.goingAmount.toString();
    let id = this.authenticationService.idFromToken;
    if (id != "-1"){
      this.hasLiked = (this.singleMeeting.listUsersLiked.indexOf(id) > -1);
      this.isGoing = (this.singleMeeting.listUsersGoing.indexOf(id) > -1);
    }
  }


  onClickLike() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService.toggleLiked(this.singleMeeting.id).subscribe(val => {
        if (val != null) {
          this.likeAmount = val;
          this.hasLiked = !this.hasLiked;
        }
      });
    } else {
      alert("niet aangemeld!");
    }
  }

  onClickGoing() {
    if (this.authenticationService.isLoggedIn) {
      this.authenticationService.toggleGoing(this.singleMeeting.id).subscribe(val => {
        if (val != null) {
          this.goingAmount = val;
          this.isGoing = !this.isGoing;
        }
      });
    } else {
      alert("niet aangemeld!");
    }
  }

}
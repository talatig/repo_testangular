import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-s3',
  templateUrl: './s3.component.html',
  styleUrls: ['./s3.component.scss']
})
export class S3Component implements OnInit {
  onboardingData={};

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    // this.getData(dataService);
    this.dataService.getObdata().subscribe(response => {
      console.log(response[0]);
      this.onboardingData = response[0];
    });      
  }

  ngOnInit() {    
    // this.dataService.addIssue('title4','fdsfa','desc4','low').subscribe(response => {
    //   console.log(response);
    // });    
    // this.dataService.getIssues().subscribe(response => {
    //   console.log(response);
    // });
    // this.dataService.getObdata().subscribe(response => {
    //   console.log(response);
    // });

    // this.dataService.updateObdata('5c04dd1c8d38e61834661c0d','title4','fdsfa','desc4','low','open').subscribe(response => {
    //   console.log(response);
    // });   
  }

  goToSecondScreen() {
    this.router.navigate(['/s2']);
  }  

  getData(dataService) {
    console.log(dataService.getOption());    
    this.dataService.getObdata().subscribe(response => {
      console.log(response[0]);
      this.onboardingData = response[0];
    });    

    //  this.dataService.updateObdata('5c04dd1c8d38e61834661c00','Invoice','yes',3,'Etsy',true,false,'user3','pass3').subscribe(response => {
    //   console.log(response);
    // });    

    // this.dataService.addObdata('Invoice','yes',3,'Etsy',true,false,'user777','pass777').subscribe(response => {
    //   console.log(response);
    // });      
  }

}

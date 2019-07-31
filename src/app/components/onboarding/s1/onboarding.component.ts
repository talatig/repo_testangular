import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})

export class OnboardingComponent implements OnInit {
  onboardingData;

  storeArr: string[] = ['Amazon','Ebay','Shopify','Etsy','Magento','Square'];
  showCredentialScreen: boolean = false;
  showCredentialSuccessScreen: boolean = false;
  storeDisplay: boolean = true;
  selectedStoreName: string;
  storeUsername: string;
  storePassword: string;
  hightlightStatus: Array<boolean> = [];
  selectedStoreIndex: Number;
  constructor(private router: Router,
    private dataService: DataService) { 
      this.dataService.getObdata().subscribe(response => {
        if(response.toString().trim()!='') {
          this.onboardingData = response[0];
          this.onboardingData['onboardingRecordID'] = response[0]._id;
          this.selectedStoreIndex=this.onboardingData.selectedStoreIndex;
        }
        else {
          this.onboardingData = {};
        }
      });       
      // this.onboardingData = dataService.getOption();
      // console.log(dataService.getOption());      
      // this.onboardingData = Object.keys(dataService.getOption()).length!=0 ? dataService.getOption() : JSON.parse(localStorage.getItem('Settings')); 

  }

  ngOnInit() {
    
  }

  displayStores() {
    this.storeDisplay = true;
    this.showCredentialScreen=false;
    this.showCredentialSuccessScreen=false;
    this.storeUsername = '';
    this.storePassword = '';
  }  

  displayCredentialScreen(item,i) {
    this.selectedStoreIndex=i;
    this.hightlightStatus.fill(false);//initially set all to false
    this.hightlightStatus[i]=!this.hightlightStatus[i];
    setTimeout(() => {
      this.router.navigate(['/s2']);
    }, 1000);
    // this.router.navigate(['/s2']);

    setTimeout(() => {
      this.storeDisplay = false;
      this.showCredentialScreen=true;
      this.showCredentialSuccessScreen=false;
      this.selectedStoreName=item||this.selectedStoreName;
      // this.dataService.setOption('storeDisplay',this.storeDisplay);
      // this.dataService.setOption('showCredentialScreen',this.showCredentialScreen); 
      // this.dataService.setOption('selectedStoreName',this.selectedStoreName); 
      
      // this.onboardingData = {
      //   storeDisplay: this.storeDisplay,
      //   showCredentialScreen: this.showCredentialScreen,
      //   selectedStoreName: this.selectedStoreName,
      //   selectedStoreIndex: this.selectedStoreIndex
      // }
      if(Object.entries(this.onboardingData).length === 0) {
        console.log('inside if');
        this.dataService.addObdata('','',this.selectedStoreIndex,this.selectedStoreName,this.showCredentialScreen,this.storeDisplay,'','').subscribe(response => {
          this.dataService.getObdata().subscribe(response => {
            console.log(response[0]);
            this.onboardingData['onboardingRecordID'] = response[0]._id;
            this.onboardingData['storeDisplay']=this.storeDisplay;
            this.onboardingData['showCredentialScreen']=this.showCredentialScreen;
            this.onboardingData['selectedStoreName']=this.selectedStoreName;
            this.onboardingData['selectedStoreIndex']=this.selectedStoreIndex;            
          }); 
        }); 
      } else {
        console.log('inside else');
        this.dataService.updateObdata(this.onboardingData.onboardingRecordID,'','',this.selectedStoreIndex,this.selectedStoreName,this.showCredentialScreen,this.storeDisplay,'','').subscribe(response => {
          console.log(response);
        }); 
      }
        
      this.dataService.setOption(this.onboardingData);   
    }, 200); 
  }

  displayCredentialSuccessScreen() {
    this.showCredentialScreen=false;
    this.showCredentialSuccessScreen=true;
  }  
}
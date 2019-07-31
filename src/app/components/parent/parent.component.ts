import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  amount: number = 500;
  constructor() { }

  ngOnInit() {
  }

  deposit(){
    this.amount += 100;
    console.log(this.amount);
  }
}

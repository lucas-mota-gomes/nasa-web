import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, FormsModule, ProgressSpinnerModule, ButtonModule, AutoCompleteModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor() { }

  items: any[] | undefined;

  selectedItem: any;

  suggestions: any;

  search(event: any) {
      this.suggestions = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  ngOnInit(): void {

  }

}

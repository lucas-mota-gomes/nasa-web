import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ExperimentService } from '../../service/experiment.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, FormsModule, ProgressSpinnerModule, ButtonModule, AutoCompleteModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private readonly experimentService: ExperimentService, private readonly router: Router) { }

  items: any[] | undefined;

  selectedItem: any;

  suggestions: any;

  search(event: any) {
    this.experimentService.serachByTerm(event.query).subscribe((data: any) => {
      console.log("🚀 ~ HomeComponent ~ this.experimentService.serachByTerm ~ data:", data)
      this.suggestions = data.hits.map((item: any) => {
        return {
          label: item._source.Accession + ' - ' + item._index,
          info: item
        }
      });
    });
  }

  ngOnInit(): void {

  }

  select(){
    const numberPattern = /\d+/;
    const match = this.selectedItem.label.match(numberPattern);
    if (match) {
      const number = match[0];
      localStorage.setItem('selectedItem', JSON.stringify(this.selectedItem));
      this.router.navigate(['/details', number]);
    }
  }

}

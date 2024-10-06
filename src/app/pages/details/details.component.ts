import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MultiSelectModule } from 'primeng/multiselect';
import { StyleClassModule } from 'primeng/styleclass';
import { ExperimentService } from '../../service/experiment.service';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ButtonModule, ChartModule, MultiSelectModule, FormsModule, StyleClassModule, TableModule, ProgressSpinnerModule, MarkdownModule],
  providers: [MarkdownService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  encapsulation: ViewEncapsulation.None
})


export class DetailsComponent implements OnInit {
  constructor(private readonly activatedRoute: ActivatedRoute, private readonly experimentService: ExperimentService) { }

  id: string | undefined;
  basicData: any;

  basicOptions: any;

  colunas!: City[];

  selectedCols: any = [];

  public experimentResult: any;
  public assayResult: any;
  public sampleResult: any;
  public assay2Result: any;
  public sample2Result: any;
  public studyResult: any;
  public data: any;
  public aiResponse: any;

  ngOnInit() {

    if(localStorage.getItem('selectedItem')){
      this.data = JSON.parse(localStorage.getItem('selectedItem') as string);
    }

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.selectedCols = this.id == '379' ? ['Assay Name', 'Parameter Value[QA Score]'] : ['a100000samplename', 'a100004parametervalueqascore'];
    });

    this.getSamples(this.id as string);
    this.getExperiment('OS-'+this.id);
    this.getStudy(this.id as string);
    

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Samples',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.colunas = [
      {name: 'Col 1', code: 'NY'},
      {name: 'Col 2', code: 'RM'},
      {name: 'Col 3', code: 'LDN'},
      {name: 'Col 4', code: 'IST'},
      {name: 'Col 5', code: 'PRS'}
  ];

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  getSamples(id: string) {
    this.experimentService.getSamples(id).subscribe((result: any) => {
      this.sampleResult = result;
    });

    this.experimentService.getSamples2('379').subscribe((result) => {
      this.sample2Result = result;
    });
  }

  getExperiment(id: string) {
    this.experimentService.getExperiment(id).subscribe((result) => {
      this.experimentResult = result;
    });
  }

  async getAiresponse() {
    this.aiResponse = 'Generating...';
    this.experimentService.getAIResult(this.id as string).subscribe((result: any) => {
      this.aiResponse = result.response;
    });
  }

  getStudy(id: string) {
    this.experimentService.getStudy(id).subscribe((result: any) => {
      this.studyResult = result;
      this.basicData.dataSets = result.chartData.datasets;
      this.basicData.labels = result.chartData.labels;
    });
  }

  getCols(object: any) {
    return Object.keys(object);
  }

  isLink(value: any) {
    return typeof value === 'string' && value.startsWith('<a');
  }
}
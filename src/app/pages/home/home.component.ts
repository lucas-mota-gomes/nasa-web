import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ExperimentService } from '../../service/experiment.service';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, FormsModule, ProgressSpinnerModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public experimentResult: any;
  public assayResult: any;
  public sampleResult: any;
  public assay2Result: any;
  public sample2Result: any;
  public assayResultCols = ['Sample Name', 'Protocol REF', 'Parameter Value[QA Instrument]', 'Parameter Value[QA Assay]', 'Parameter Value[QA Score]', 'Extract Name', 'Protocol REF.1', 'Parameter Value[Spike-in Quality Control]', 'Parameter Value[Spike-in Mix Number]', 'Protocol REF.2', 'Parameter Value[library selection]', 'Parameter Value[library layout]', 'Parameter Value[stranded]', 'Parameter Value[Library QA Instrument]', 'Parameter Value[Library QA Assay]', 'Parameter Value[Fragment Size]', 'Comment[Library Prep Date]', 'Protocol REF.3', 'Parameter Value[sequencing instrument]', 'Parameter Value[Read Length]', 'Parameter Value[base caller]', 'Assay Name', 'Raw Data File', 'Protocol REF.4', 'Parameter Value[rRNA Contamination]', 'Parameter Value[Read Depth]', 'Parameter Value[Raw sequence data/MultiQC Reports]'];
  public sampleResultCols = ['Source Name', 'Sample Name', 'Characteristics[Organism]', 'Characteristics[Strain]', 'Characteristics[Genotype]', 'Characteristics[Sex]', 'Characteristics[Material Type]', 'Factor Value[Spaceflight]', 'Factor Value[Duration]', 'Characteristics[Animal Source]', 'Factor Value[Euthanasia Location]', 'Factor Value[Dissection Condition]', 'Factor Value[Age]', 'Protocol REF', 'Parameter Value[Light Cycle]', 'Parameter Value[Diet]', 'Parameter Value[Feeding Schedule]', 'Comment[LAR Animal Receipt Date at Scrippts]', 'Comment[Euthanasia Dates]', 'Comment[Dissection Dates]', 'Parameter Value[Euthanasia Method]', 'Parameter Value[Carcass Preservation Method]', 'Parameter Value[Sample Preservation Method]', 'Parameter Value[Sample Storage Temperature]'];
  public selected = 0;


  constructor(private readonly experimentService: ExperimentService) { }

  ngOnInit(): void {
    this.getExperiment('OS-665');
    this.getAssay('665');
    this.getSamples('665');
  }

  getExperiment(id: string) {
    this.experimentService.getExperiment(id).subscribe((result) => {
      this.experimentResult = result;
    });
  }

  getAssay(id: string) {
    this.experimentService.getAssay(id).subscribe((result: any) => {
      this.assayResult = result;
    });

    this.experimentService.getAssay2('379').subscribe((result) => {
      this.assay2Result = result;
    });
  }

  getSamples(id: string) {
    this.experimentService.getSamples(id).subscribe((result: any) => {
      this.sampleResult = result;
    });

    this.experimentService.getSamples2('379').subscribe((result) => {
      this.sample2Result = result;
    });
  }

  isLink(value: any) {
    return typeof value === 'string' && value.startsWith('<a');
  }
}

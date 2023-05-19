import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{
  
  public client: Client = new Client();
  public title: String = "Create client";

  constructor(
    private clientService: ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
    ngOnInit(): void {
        this.loadCLient();
    }

  private loadCLient(): void{
    this.activatedRoute.params
    .subscribe(params => {
      let id = params['id'];
      if(id){
        this.clientService.getClient(id)
          .subscribe(client=> this.client = client)
      }
    })
  }

  public create(): void{
    this.clientService.create(this.client)
    .subscribe( response => {
      this.router.navigate(['/clients']);
      swal('Client created', 
        `Client ${this.client.firstName} created with success`, 
        'success'
      );
    })
  }

  public update():void {
    this.clientService.update(this.client)
    .subscribe(client=> {
      this.router.navigate(['/clients']);
      swal('Client updated',
      `Client ${this.client.firstName} updated with success`, 
        'success'
      )
    })

  }
}

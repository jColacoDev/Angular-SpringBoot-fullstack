import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit{
  clients: Client[];

  constructor(
    private clientService: ClientService
  ){

  }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => this.clients =  clients
    );
  }

  delete(client: Client): void {
    // swal('Client updated',
    // `Client ${this.client.firstName} updated with success`, 
    //   'success'
    // )
    
    swal({
      title: 'Are you sure?',
      text: `You are deleting ${client.firstName} ${client.lastName}!`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'No, cancel',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clientService.delete(client.id).subscribe( res=>{
          this.clients = this.clients.filter(cli=> cli !== client);
          swal(
            'Deleted!',
            `Client ${client.firstName} ${client.lastName} was deleted`,
            'success'
          )
        })

      } else if(
        result.dismiss === swal.DismissReason.cancel
      ) {
        swal(
          'Cancelled',
          'Your file is safe',
          'error'
        )
      }
    })
  }
}
